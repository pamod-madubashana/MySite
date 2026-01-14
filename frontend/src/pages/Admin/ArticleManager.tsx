import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';

interface Article {
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

const ArticleManager = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft' as 'draft' | 'published',
    tags: '' // Will be converted to array
  });
  const { token } = useAuth();

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setArticles(data.articles || []);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [token]);

  // Filter articles based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredArticles(articles);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredArticles(
        articles.filter(article => 
          article.title.toLowerCase().includes(term) ||
          article.content.toLowerCase().includes(term) ||
          article.tags.some(tag => tag.toLowerCase().includes(term))
        )
      );
    }
  }, [searchTerm, articles]);

  const handleCreateArticle = async () => {
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newArticle,
          tags: newArticle.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setArticles([data.article, ...articles]);
        setNewArticle({
          title: '',
          content: '',
          excerpt: '',
          status: 'draft',
          tags: ''
        });
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const handleUpdateArticle = async () => {
    if (!editingArticle) return;

    try {
      const response = await fetch(`/api/articles/${editingArticle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editingArticle.title,
          content: editingArticle.content,
          excerpt: editingArticle.excerpt,
          status: editingArticle.status,
          tags: editingArticle.tags
        })
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(articles.map(a => a._id === editingArticle._id ? data.article : a));
        setEditingArticle(null);
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(`/api/articles/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setArticles(articles.filter(article => article._id !== id));
        }
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Article Manager</h1>
              <p className="text-muted-foreground">Manage your blog posts and articles</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Article
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Article</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                      placeholder="Enter article title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={newArticle.excerpt}
                      onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                      placeholder="Brief description of the article"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newArticle.content}
                      onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                      placeholder="Write your article content here..."
                      rows={8}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={newArticle.tags}
                      onChange={(e) => setNewArticle({...newArticle, tags: e.target.value})}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          checked={newArticle.status === 'draft'}
                          onChange={() => setNewArticle({...newArticle, status: 'draft'})}
                        />
                        Draft
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          checked={newArticle.status === 'published'}
                          onChange={() => setNewArticle({...newArticle, status: 'published'})}
                        />
                        Published
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateArticle}>
                      <Save className="w-4 h-4 mr-2" />
                      Create Article
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <Card className="glass border border-primary/30">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No articles found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article._id} className="glass border border-primary/30">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                      {article.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    By {article.author.username} • {formatDate(article.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt || article.content.substring(0, 100) + '...'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingArticle(article);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteArticle(article._id)}
                      className="text-red-500 border-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Article Dialog */}
        {editingArticle && (
          <Dialog open={!!editingArticle} onOpenChange={(open) => !open && setEditingArticle(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Article</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})}
                    placeholder="Enter article title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-excerpt">Excerpt</Label>
                  <Textarea
                    id="edit-excerpt"
                    value={editingArticle.excerpt}
                    onChange={(e) => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                    placeholder="Brief description of the article"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    value={editingArticle.content}
                    onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})}
                    placeholder="Write your article content here..."
                    rows={8}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                  <Input
                    id="edit-tags"
                    value={editingArticle.tags.join(', ')}
                    onChange={(e) => setEditingArticle({...editingArticle, tags: e.target.value.split(',').map(tag => tag.trim())})}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="edit-status"
                        checked={editingArticle.status === 'draft'}
                        onChange={() => setEditingArticle({...editingArticle, status: 'draft'})}
                      />
                      Draft
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="edit-status"
                        checked={editingArticle.status === 'published'}
                        onChange={() => setEditingArticle({...editingArticle, status: 'published'})}
                      />
                      Published
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setEditingArticle(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateArticle}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ArticleManager;