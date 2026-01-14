import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { Settings as SettingsIcon, Save, X } from 'lucide-react';

interface Settings {
  _id?: string;
  aboutContent: string;
  featuredRepos: string[];
  themeOptions: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  siteSections: {
    showAbout: boolean;
    showProjects: boolean;
    showArticles: boolean;
    showContact: boolean;
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<Settings>({
    aboutContent: '',
    featuredRepos: [],
    themeOptions: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      fontFamily: 'Inter, sans-serif'
    },
    siteSections: {
      showAbout: true,
      showProjects: true,
      showArticles: true,
      showContact: true
    },
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      email: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [token]);

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleThemeChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      themeOptions: {
        ...prev.themeOptions,
        [field]: value
      }
    }));
  };

  const handleSectionChange = (field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      siteSections: {
        ...prev.siteSections,
        [field]: value
      }
    }));
  };

  const handleSocialChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setSavedSuccessfully(true);
        setTimeout(() => setSavedSuccessfully(false), 3000);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-white">Site Settings</h1>
          </div>
          <p className="text-muted-foreground">Manage your portfolio site configuration</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Site Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass border border-primary/30">
                <CardHeader>
                  <CardTitle>About Section</CardTitle>
                  <CardDescription>Update your bio and professional summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="aboutContent">About Content</Label>
                      <Textarea
                        id="aboutContent"
                        value={settings.aboutContent}
                        onChange={(e) => handleChange('aboutContent', e.target.value)}
                        placeholder="Tell visitors about yourself..."
                        rows={6}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border border-primary/30">
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>Connect with visitors on social platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub Profile</Label>
                      <Input
                        id="github"
                        type="url"
                        value={settings.socialLinks.github || ''}
                        onChange={(e) => handleSocialChange('github', e.target.value)}
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        type="url"
                        value={settings.socialLinks.linkedin || ''}
                        onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter/X Profile</Label>
                      <Input
                        id="twitter"
                        type="url"
                        value={settings.socialLinks.twitter || ''}
                        onChange={(e) => handleSocialChange('twitter', e.target.value)}
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.socialLinks.email || ''}
                        onChange={(e) => handleSocialChange('email', e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Theme & Sections */}
            <div className="space-y-6">
              <Card className="glass border border-primary/30">
                <CardHeader>
                  <CardTitle>Theme Options</CardTitle>
                  <CardDescription>Customize the look and feel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={settings.themeOptions.primaryColor}
                          onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={settings.themeOptions.primaryColor}
                          onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={settings.themeOptions.secondaryColor}
                          onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={settings.themeOptions.secondaryColor}
                          onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                          placeholder="#8b5cf6"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fontFamily">Font Family</Label>
                      <Input
                        id="fontFamily"
                        value={settings.themeOptions.fontFamily}
                        onChange={(e) => handleThemeChange('fontFamily', e.target.value)}
                        placeholder="Inter, sans-serif"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border border-primary/30">
                <CardHeader>
                  <CardTitle>Site Sections</CardTitle>
                  <CardDescription>Control which sections are visible</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showAbout">Show About Section</Label>
                      <Switch
                        id="showAbout"
                        checked={settings.siteSections.showAbout}
                        onCheckedChange={(checked) => handleSectionChange('showAbout', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showProjects">Show Projects Section</Label>
                      <Switch
                        id="showProjects"
                        checked={settings.siteSections.showProjects}
                        onCheckedChange={(checked) => handleSectionChange('showProjects', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showArticles">Show Articles Section</Label>
                      <Switch
                        id="showArticles"
                        checked={settings.siteSections.showArticles}
                        onCheckedChange={(checked) => handleSectionChange('showArticles', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showContact">Show Contact Section</Label>
                      <Switch
                        id="showContact"
                        checked={settings.siteSections.showContact}
                        onCheckedChange={(checked) => handleSectionChange('showContact', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border border-primary/30">
                <CardHeader>
                  <CardTitle>Featured Repositories</CardTitle>
                  <CardDescription>Specify which GitHub repos to highlight</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="featuredRepos">Repository Names (one per line)</Label>
                    <Textarea
                      id="featuredRepos"
                      value={settings.featuredRepos.join('\n')}
                      onChange={(e) => handleChange('featuredRepos', e.target.value.split('\n'))}
                      placeholder="repo-name-1&#10;repo-name-2&#10;repo-name-3"
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">Enter one repository name per line</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button type="submit" disabled={saving} className="flex items-center gap-2">
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Settings
                </>
              )}
            </Button>
            {savedSuccessfully && (
              <div className="flex items-center gap-2 text-green-500">
                <X className="w-4 h-4" />
                Settings saved successfully!
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;