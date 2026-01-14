import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.username}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/articles" className="block">
            <Card className="glass border border-primary/30 hover:border-primary/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <span>Articles</span>
                </CardTitle>
                <CardDescription>Manage your articles</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Create, edit, and publish articles</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/settings" className="block">
            <Card className="glass border border-primary/30 hover:border-primary/50 transition-all cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Settings className="w-8 h-8 text-primary" />
                  <span>Settings</span>
                </CardTitle>
                <CardDescription>Configure your site</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage site settings and appearance</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="glass border border-primary/30 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-primary" />
                <span>Analytics</span>
              </CardTitle>
              <CardDescription>Site statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Coming soon...</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={logout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;