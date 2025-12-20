import { useState, useEffect } from 'react';
import { ArrowLeft, Palette, Bell, Shield, Trash2, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Navigation from '@/components/Navigation';
import DataManager from '@/components/DataManager';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';

const themes = [
  { id: 'calm', name: 'Calm Blue', color: 'bg-[hsl(210,70%,55%)]' },
  { id: 'sunset', name: 'Sunset Pink', color: 'bg-[hsl(340,75%,60%)]' },
  { id: 'forest', name: 'Forest Green', color: 'bg-[hsl(140,60%,45%)]' },
];

const Settings = () => {
  const [currentTheme, setCurrentTheme] = useState('calm');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    moodCheck: true,
    journalPrompt: false,
  });

  useEffect(() => {
    setCurrentTheme(storage.getTheme());
    const savedDarkMode = localStorage.getItem('haven_dark_mode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    storage.setTheme(themeId);
    
    if (themeId === 'calm') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
    
    toast.success('Theme updated!');
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    setIsDarkMode(enabled);
    localStorage.setItem('haven_dark_mode', String(enabled));
    
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast.success(enabled ? 'Dark mode enabled' : 'Light mode enabled');
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      storage.resetAll();
      toast.success('All data has been reset');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Customize your experience</p>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <Card className="shadow-soft p-6 border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
              <div>
                <h2 className="text-xl font-semibold">Dark Mode</h2>
                <p className="text-muted-foreground text-sm">Switch between light and dark themes</p>
              </div>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
        </Card>

        {/* Theme Selection */}
        <Card className="shadow-soft p-6 border-0">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Color Theme</h2>
          </div>
          <p className="text-muted-foreground mb-4">Choose your preferred color palette</p>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`p-4 rounded-xl transition-smooth hover:scale-105 ${
                  currentTheme === theme.id
                    ? 'ring-2 ring-primary shadow-glow'
                    : 'bg-muted hover:bg-muted/70'
                }`}
              >
                <div className={`w-full h-20 rounded-lg ${theme.color} mb-3`} />
                <p className="text-sm font-medium text-center">{theme.name}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="shadow-soft p-6 border-0">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Reminder</p>
                <p className="text-sm text-muted-foreground">Get reminded to check in daily</p>
              </div>
              <Switch
                checked={notifications.dailyReminder}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, dailyReminder: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mood Check Reminders</p>
                <p className="text-sm text-muted-foreground">Gentle reminders to log your mood</p>
              </div>
              <Switch
                checked={notifications.moodCheck}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, moodCheck: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Journal Prompts</p>
                <p className="text-sm text-muted-foreground">Daily prompts for journaling</p>
              </div>
              <Switch
                checked={notifications.journalPrompt}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, journalPrompt: checked })
                }
              />
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="shadow-soft p-6 border-0">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Privacy</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            All your data is stored locally on your device. We don't collect or share any personal information.
          </p>
          <Button variant="outline">Learn More</Button>
        </Card>

        {/* Data Import/Export */}
        <DataManager />

        {/* Data Management */}
        <Card className="shadow-soft p-6 border-0 border-destructive/20">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-5 h-5 text-destructive" />
            <h2 className="text-xl font-semibold">Reset All Data</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Delete all your mood logs, journal entries, and habits. This action cannot be undone.
          </p>
          <Button variant="destructive" onClick={handleResetData}>
            Reset All Data
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
