import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Settings from '../models/Settings';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      // Create default settings if none exist
      settings = new Settings();
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching settings' });
  }
};

export const updateSettings = [
  body('aboutContent')
    .optional()
    .isString()
    .withMessage('About content must be a string'),
  
  body('featuredRepos')
    .optional()
    .isArray()
    .withMessage('Featured repos must be an array'),
  
  body('themeOptions.primaryColor')
    .optional()
    .isString()
    .withMessage('Primary color must be a string'),
  
  body('themeOptions.secondaryColor')
    .optional()
    .isString()
    .withMessage('Secondary color must be a string'),
  
  body('themeOptions.fontFamily')
    .optional()
    .isString()
    .withMessage('Font family must be a string'),
  
  body('siteSections.showAbout')
    .optional()
    .isBoolean()
    .withMessage('Show about section must be a boolean'),
  
  body('siteSections.showProjects')
    .optional()
    .isBoolean()
    .withMessage('Show projects section must be a boolean'),
  
  body('siteSections.showArticles')
    .optional()
    .isBoolean()
    .withMessage('Show articles section must be a boolean'),
  
  body('siteSections.showContact')
    .optional()
    .isBoolean()
    .withMessage('Show contact section must be a boolean'),
  
  body('socialLinks.github')
    .optional()
    .isString()
    .withMessage('GitHub link must be a string'),
  
  body('socialLinks.linkedin')
    .optional()
    .isString()
    .withMessage('LinkedIn link must be a string'),
  
  body('socialLinks.twitter')
    .optional()
    .isString()
    .withMessage('Twitter link must be a string'),
  
  body('socialLinks.email')
    .optional()
    .isString()
    .withMessage('Email link must be a string'),
  
  body('githubUsername')
    .optional()
    .isString()
    .withMessage('GitHub username must be a string'),
  
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      let settings = await Settings.findOne();
      
      if (!settings) {
        // Create new settings if none exist
        settings = new Settings(req.body);
      } else {
        // Update existing settings
        Object.assign(settings, req.body);
      }
      
      await settings.save();
      
      res.json({
        message: 'Settings updated successfully',
        settings
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error while updating settings' });
    }
  }
];