import { useEffect, useState } from 'react';
import { Heart, BookOpen, Wind, TrendingUp, AlertCircle, Users, GraduationCap, Phone, Library, Target, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navigation from '@/components/Navigation';
import { storage, MoodEntry } from '@/lib/storage';
import { getDailyQuote } from '@/lib/quotes';
import { analyzeMoodPatterns } from '@/lib/patterns';
import { format } from 'date-fns';

const Index = () => {
  const [recentMood, setRecentMood] = useState<MoodEntry | null>(null);
  const [moodStreak, setMoodStreak] = useState(0);
  const [dailyQuote, setDailyQuote] = useState('');
  const [moodPatterns, setMoodPatterns] = useState<any[]>([]);

  useEffect(() => {
    const moods = storage.getMoods();
    setDailyQuote(getDailyQuote());
    
    if (moods.length > 0) {
      setRecentMood(moods[moods.length - 1]);
      setMoodPatterns(analyzeMoodPatterns(moods));
      
      // Calculate streak
      const today = format(new Date(), 'yyyy-MM-dd');
      let streak = 0;
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = format(date, 'yyyy-MM-dd');
        const hasEntry = moods.some(m => m.date === dateStr);
        if (hasEntry) streak++;
        else break;
      }
      setMoodStreak(streak);
    }
  }, []);

  const quickActions = [
    {
      title: 'Log Mood',
      icon: Heart,
      description: 'How are you feeling?',
      to: '/mood',
      gradient: 'from-primary to-primary-glow',
    },
    {
      title: 'Journal',
      icon: BookOpen,
      description: 'Write your thoughts',
      to: '/journal',
      gradient: 'from-accent to-warning',
    },
    {
      title: 'Exercises',
      icon: Wind,
      description: 'Breathing & grounding',
      to: '/exercises',
      gradient: 'from-success to-primary',
    },
  ];

  const features = [
    { title: 'Resources', icon: Library, to: '/resources', color: 'bg-blue-500/10 text-blue-500' },
    { title: 'Community', icon: Users, to: '/community', color: 'bg-purple-500/10 text-purple-500' },
    { title: 'Learn', icon: GraduationCap, to: '/learn', color: 'bg-green-500/10 text-green-500' },
    { title: 'Get Help', icon: Phone, to: '/professionals', color: 'bg-red-500/10 text-red-500' },
    { title: 'Routines', icon: Target, to: '/routines', color: 'bg-orange-500/10 text-orange-500' },
    { title: 'Habits', icon: CheckSquare, to: '/habits', color: 'bg-teal-500/10 text-teal-500' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Haven
          </h1>
          <p className="text-muted-foreground text-lg">Your peaceful space for mental wellness</p>
        </div>

        {/* Welcome Card */}
        <Card className="gradient-card shadow-soft p-6 border-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
              <p className="text-muted-foreground">
                {recentMood 
                  ? `Last logged ${format(new Date(recentMood.date), 'MMM d')}`
                  : 'Start your wellness journey today'}
              </p>
            </div>
            {moodStreak > 0 && (
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">{moodStreak} day streak!</span>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.to}>
              <Card className="group hover:shadow-elevated transition-smooth cursor-pointer border-0 overflow-hidden h-full">
                <div className={`h-2 bg-gradient-to-r ${action.gradient}`} />
                <div className="p-6 space-y-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.gradient} flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{action.title}</h3>
                    <p className="text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Today's Mood */}
        {recentMood && (
          <Card className="shadow-soft p-6 border-0">
            <h3 className="text-xl font-semibold mb-4">Recent Mood Check</h3>
            <div className="flex items-center gap-4">
              <div className="text-5xl animate-float">{recentMood.mood}</div>
              <div className="flex-1">
                <p className="text-muted-foreground text-sm mb-1">
                  {format(new Date(recentMood.date), 'EEEE, MMMM d')}
                </p>
                {recentMood.note && (
                  <p className="text-foreground">{recentMood.note}</p>
                )}
                {recentMood.triggers.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {recentMood.triggers.map((trigger) => (
                      <span key={trigger} className="px-2 py-1 bg-muted rounded-full text-xs">
                        {trigger}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {features.map((feature) => (
            <Link key={feature.title} to={feature.to}>
              <Card className="p-4 text-center hover:shadow-elevated transition-smooth cursor-pointer h-full">
                <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-2`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">{feature.title}</span>
              </Card>
            </Link>
          ))}
        </div>

        {/* Tips Card */}
        <Card className="shadow-soft p-6 border-0 bg-gradient-to-br from-accent/10 to-primary/10">
          <h3 className="text-xl font-semibold mb-2">💭 Daily Affirmation</h3>
          <p className="text-foreground text-lg italic">{dailyQuote}</p>
        </Card>

        {/* Quick Help Banner */}
        <Card className="shadow-soft p-4 border-0 bg-gradient-to-r from-destructive/10 to-primary/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-destructive" />
              <div>
                <p className="font-semibold">Need immediate support?</p>
                <p className="text-sm text-muted-foreground">Crisis helplines are available 24/7</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link to="/professionals">Get Help Now</Link>
            </Button>
          </div>
        </Card>

        {/* Pattern Alerts */}
        {moodPatterns.filter(p => p.severity === 'warning').slice(0, 2).map((pattern, index) => (
          <Alert key={index} variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{pattern.message}</AlertDescription>
          </Alert>
        ))}
      </main>
    </div>
  );
};

export default Index;
