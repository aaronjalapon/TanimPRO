import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Settings as SettingsIcon, Download, RefreshCw, Globe, Smartphone, User, Bell, Shield, HelpCircle } from 'lucide-react';

export function Settings({ user, isOfflineMode, setIsOfflineMode, onNavigate }) {
  const handleDownloadData = () => {
    // Simulate downloading offline data
    alert('Downloading planting calendar and recent price data for offline use...');
  };

  const handleSyncData = () => {
    // Simulate syncing data
    alert('Syncing with server... Data updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('tanimproUser');
    window.location.reload();
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h2>Settings & Preferences</h2>
      
      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Name:</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Location:</span>
              <span>{user?.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Primary Crop:</span>
              <span>{user?.primaryCrop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Farm Size:</span>
              <span>{user?.farmSize} hectares</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Language:</span>
              <span className="capitalize">{user?.language}</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Offline Mode Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Offline Mode
            {isOfflineMode && (
              <Badge className="bg-orange-100 text-orange-800">Active</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="offline-mode">Enable Offline Mode</Label>
                <p className="text-xs text-muted-foreground">
                  Access core tools without internet connection
                </p>
              </div>
              <Switch
                id="offline-mode"
                checked={isOfflineMode}
                onCheckedChange={setIsOfflineMode}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={handleDownloadData}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Data
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSyncData}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Sync Data
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Planting calendar and recommendations</p>
              <p>• Recent market prices (last 30 days)</p>
              <p>• Crop health detection models</p>
              <p>• Financial calculator tools</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language & Region
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="language">Preferred Language</Label>
            <Select defaultValue={user?.language || 'english'}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="tagalog">Tagalog</SelectItem>
                <SelectItem value="bisaya">Bisaya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="region">Region</Label>
            <Select defaultValue={user?.location}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Metro Manila">Metro Manila</SelectItem>
                <SelectItem value="Nueva Ecija">Nueva Ecija</SelectItem>
                <SelectItem value="Laguna">Laguna</SelectItem>
                <SelectItem value="Pangasinan">Pangasinan</SelectItem>
                <SelectItem value="Cebu">Cebu</SelectItem>
                <SelectItem value="Davao">Davao</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Weather Alerts</Label>
                <p className="text-xs text-muted-foreground">Get notified about weather changes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Price Alerts</Label>
                <p className="text-xs text-muted-foreground">Notifications when prices change significantly</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Planting Reminders</Label>
                <p className="text-xs text-muted-foreground">Reminders for optimal planting times</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Community Updates</Label>
                <p className="text-xs text-muted-foreground">New answers to your questions</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Data & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Export My Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Data Usage
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            <p>We respect your privacy and data security. Your farm data is encrypted and stored securely.</p>
          </div>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Help & Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            User Guide
          </Button>
          <Button variant="outline" className="w-full justify-start">
            FAQ
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Contact Support
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Report a Problem
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle>App Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version:</span>
              <span>1.0.0 (MVP)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated:</span>
              <span>January 28, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Source:</span>
              <span>Philippine DA, Weather API</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card>
        <CardContent className="p-4">
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}