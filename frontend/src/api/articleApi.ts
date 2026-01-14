export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  tags: string[];
  featuredImage?: string;
  author: {
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateArticleData {
  title: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published';
  tags: string[];
  featuredImage?: string;
}

export interface UpdateArticleData {
  title?: string;
  content?: string;
  excerpt?: string;
  status?: 'draft' | 'published';
  tags?: string[];
  featuredImage?: string;
}

export const articleApi = {
  getPublishedArticles: async (): Promise<{ articles: Article[] }> => {
    const response = await fetch('/api/articles');
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch published articles: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  getAllArticles: async (token: string): Promise<{ articles: Article[] }> => {
    const response = await fetch('/api/articles', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch all articles: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  getArticleById: async (id: string): Promise<Article> => {
    const response = await fetch(`/api/articles/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch article: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  createArticle: async (token: string, articleData: CreateArticleData): Promise<{ message: string; article: Article }> => {
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(articleData)
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create article: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  updateArticle: async (token: string, id: string, articleData: UpdateArticleData): Promise<{ message: string; article: Article }> => {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(articleData)
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update article: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  deleteArticle: async (token: string, id: string): Promise<{ message: string }> => {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete article: ${response.status} - ${errorText}`);
    }
    return response.json();
  }
};