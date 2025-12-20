import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import MoodCalendar from '@/components/MoodCalendar';
import { storage, MoodEntry } from '@/lib/storage';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const moods = [
  { emoji: '😊', label: 'Great', value: 5 },
  { emoji: '😄', label: 'Happy', value: 4 },
  { emoji: '😌', label: 'Calm', value: 3 },
  { emoji: '😐', label: 'Okay', value: 2 },
  { emoji: '😔', label: 'Sad', value: 1 },
  { emoji: '😰', label: 'Anxious', value: 1 },
  { emoji: '😤', label: 'Frustrated', value: 2 },
  { emoji: '😴', label: 'Tired', value: 2 },
  { emoji: '😖', label: 'Stressed', value: 1 },
  { emoji: '🥺', label: 'Lonely', value: 1 },
];

const triggers = ['Work/School', 'Social', 'Sleep', 'Health', 'Family', 'Money', 'Weather', 'Exercise'];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<typeof moods[0] | null>(null);
  const [note, setNote] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [view, setView] = useState<'log' | 'history' | 'calendar'>('log');

  useEffect(() => {
    setMoodHistory(storage.getMoods());
  }, []);

  const handleSaveMood = () => {
    if (!selectedMood) {
      toast.error('Please select a mood');
      return;
    }

    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      mood: selectedMood.emoji,
      intensity: selectedMood.value,
      note,
      triggers: selectedTriggers,
    };

    storage.saveMood(entry);
    toast.success('Mood logged successfully!');
    
    setSelectedMood(null);
    setNote('');
    setSelectedTriggers([]);
    setMoodHistory(storage.getMoods());
  };

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger) ? prev.filter(t => t !== trigger) : [...prev, trigger]
    );
  };

  const chartData = moodHistory.slice(-7).map(entry => ({
    date: format(new Date(entry.date), 'MMM d'),
    mood: entry.intensity,
  }));

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
            <h1 className="text-3xl font-bold">Mood Tracker</h1>
            <p className="text-muted-foreground">How are you feeling today?</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={view === 'log' ? 'default' : 'outline'}
            onClick={() => setView('log')}
          >
            Log Mood
          </Button>
          <Button
            variant={view === 'history' ? 'default' : 'outline'}
            onClick={() => setView('history')}
          >
            View History
          </Button>
          <Button
            variant={view === 'calendar' ? 'default' : 'outline'}
            onClick={() => setView('calendar')}
            className="gap-2"
          >
            <CalendarDays className="w-4 h-4" />
            Calendar
          </Button>
        </div>

        {view === 'calendar' ? (
          <MoodCalendar />
        ) : view === 'log' ? (
          <>
            {/* Mood Selection */}
            <Card className="shadow-soft p-6 border-0">
              <h2 className="text-xl font-semibold mb-4">Select your mood</h2>
              <div className="grid grid-cols-5 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(mood)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-smooth hover:scale-105 ${
                      selectedMood?.label === mood.label
                        ? 'bg-primary/20 shadow-glow ring-2 ring-primary'
                        : 'bg-muted hover:bg-muted/70'
                    }`}
                  >
                    <span className="text-4xl">{mood.emoji}</span>
                    <span className="text-xs font-medium">{mood.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Triggers */}
            <Card className="shadow-soft p-6 border-0">
              <h2 className="text-xl font-semibold mb-4">What triggered this mood?</h2>
              <div className="flex flex-wrap gap-2">
                {triggers.map((trigger) => (
                  <Badge
                    key={trigger}
                    variant={selectedTriggers.includes(trigger) ? 'default' : 'outline'}
                    className="cursor-pointer transition-smooth hover:scale-105"
                    onClick={() => toggleTrigger(trigger)}
                  >
                    {trigger}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Note */}
            <Card className="shadow-soft p-6 border-0">
              <h2 className="text-xl font-semibold mb-4">Add a note (optional)</h2>
              <Textarea
                placeholder="What's on your mind?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-32 resize-none"
              />
            </Card>

            <Button
              onClick={handleSaveMood}
              size="lg"
              className="w-full shadow-elevated"
            >
              Save Mood Entry
            </Button>
          </>
        ) : (
          <>
            {/* Chart */}
            {chartData.length > 0 && (
              <Card className="shadow-soft p-6 border-0">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Your Mood Trend (Last 7 Days)
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            {/* History */}
            <div className="space-y-4">
              {moodHistory.slice().reverse().map((entry) => (
                <Card key={entry.id} className="shadow-soft p-4 border-0">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl animate-float">{entry.mood}</div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">
                        {format(new Date(entry.date), 'EEEE, MMMM d, yyyy')}
                      </p>
                      {entry.note && <p className="mb-2">{entry.note}</p>}
                      {entry.triggers.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {entry.triggers.map((trigger) => (
                            <Badge key={trigger} variant="secondary" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              {moodHistory.length === 0 && (
                <Card className="shadow-soft p-8 border-0 text-center">
                  <p className="text-muted-foreground">No mood entries yet. Start tracking!</p>
                </Card>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MoodTracker;
