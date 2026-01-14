import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Article from '../models/Article';

export const getPublishedArticles = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, tags } = req.query;
    
    const query: any = { status: 'published' };
    
    if (search) {
      query.$text = { $search: search as string };
    }
    
    if (tags) {
      const tagArray = (tags as string).split(',');
      query.tags = { $in: tagArray };
    }
    
    const articles = await Article.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();
      
    const total = await Article.countDocuments(query);
    
    res.json({
      articles,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching articles' });
  }
};

export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    
    const query: any = {};
    
    if (search) {
      query.$text = { $search: search as string };
    }
    
    if (status) {
      query.status = status;
    }
    
    const articles = await Article.find(query)
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();
      
    const total = await Article.countDocuments(query);
    
    res.json({
      articles,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching articles' });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'username email');
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching article' });
  }
};

export const createArticle = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must be less than 200 characters'),
  
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required'),
  
  body('status')
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { title, content, excerpt, status, tags, featuredImage } = req.body;
      
      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Check if slug already exists
      const existingArticle = await Article.findOne({ slug });
      if (existingArticle) {
        return res.status(400).json({ error: 'Article with this title already exists' });
      }
      
      const article = new Article({
        title,
        slug,
        content,
        excerpt: excerpt || content.substring(0, 200),
        status,
        tags: tags || [],
        featuredImage,
        author: (req as any).user._id
      });
      
      await article.save();
      
      res.status(201).json({
        message: 'Article created successfully',
        article
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error while creating article' });
    }
  }
];

export const updateArticle = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be less than 200 characters'),
  
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { title, content, excerpt, status, tags, featuredImage } = req.body;
      
      const updateData: any = {};
      if (title) {
        // If title is being updated, also update the slug
        updateData.title = title;
        updateData.slug = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      if (content) updateData.content = content;
      if (excerpt !== undefined) updateData.excerpt = excerpt;
      if (status) updateData.status = status;
      if (tags) updateData.tags = tags;
      if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
      
      const article = await Article.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      ).populate('author', 'username email');
      
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
      
      res.json({
        message: 'Article updated successfully',
        article
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error while updating article' });
    }
  }
];

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting article' });
  }
};