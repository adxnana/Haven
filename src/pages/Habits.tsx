import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Check, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import { storage, Habit } from '@/lib/storage';
import { format, startOfWeek, addDays } from 'date-fns';
import { toast } from 'sonner';

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setHabits(storage.getHabits());
  }, []);

  const addHabit = () => {
    if (!newHabitName.trim()) {
      toast.error('Please enter a habit name');
      return;
    }

    if (habits.length >= 7) {
      toast.error('Maximum 7 habits allowed');
      return;
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      completedDates: [],
    };

    const updated = [...habits, newHabit];
    setHabits(updated);
    storage.saveHabits(updated);
    setNewHabitName('');
    setIsDialogOpen(false);
    toast.success('Habit added!');
  };

  const toggleHabit = (habitId: string, date: string) => {
    const updated = habits.map((habit) => {
      if (habit.id === habitId) {
        const completed = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: completed
            ? habit.completedDates.filter((d) => d !== date)
            : [...habit.completedDates, date],
        };
      }
      return habit;
    });

    setHabits(updated);
    storage.saveHabits(updated);
  };

  const deleteHabit = (habitId: string) => {
    const updated = habits.filter((h) => h.id !== habitId);
    setHabits(updated);
    storage.saveHabits(updated);
    toast.success('Habit deleted');
  };

  const getWeekDates = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const weekDates = getWeekDates();

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Habit Tracker</h1>
              <p className="text-muted-foreground">Build consistency day by day</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" disabled={habits.length >= 7}>
                <Plus className="w-5 h-5 mr-2" />
                Add Habit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Habit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  placeholder="e.g., Drink 8 glasses of water"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                />
                <Button onClick={addHabit} className="w-full">
                  Add Habit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {habits.length === 0 ? (
          <Card className="shadow-soft p-12 border-0 text-center">
            <p className="text-muted-foreground mb-4">No habits yet. Start building your routine!</p>
            <Button onClick={() => setIsDialogOpen(true)}>Add Your First Habit</Button>
          </Card>
        ) : (
          <Card className="shadow-soft p-6 border-0 overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header */}
              <div className="grid grid-cols-8 gap-2 mb-4">
                <div className="font-semibold">Habit</div>
                {weekDates.map((date) => (
                  <div key={date.toISOString()} className="text-center text-sm">
                    <div className="font-medium">{format(date, 'EEE')}</div>
                    <div className="text-muted-foreground text-xs">{format(date, 'd')}</div>
                  </div>
                ))}
              </div>

              {/* Habits */}
              <div className="space-y-3">
                {habits.map((habit) => (
                  <div key={habit.id} className="grid grid-cols-8 gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{habit.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 hover:opacity-100 transition-smooth"
                        onClick={() => deleteHabit(habit.id)}
                      >
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                    {weekDates.map((date) => {
                      const dateStr = format(date, 'yyyy-MM-dd');
                      const isCompleted = habit.completedDates.includes(dateStr);
                      const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                      
                      return (
                        <button
                          key={dateStr}
                          onClick={() => toggleHabit(habit.id, dateStr)}
                          className={`h-12 rounded-xl transition-smooth ${
                            isCompleted
                              ? 'bg-gradient-to-br from-success to-primary text-white shadow-soft'
                              : isToday
                              ? 'bg-primary/10 hover:bg-primary/20 border-2 border-primary/30'
                              : 'bg-muted hover:bg-muted/70'
                          }`}
                        >
                          {isCompleted && <Check className="w-5 h-5 mx-auto" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Stats */}
        {habits.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {habits.slice(0, 3).map((habit) => {
              const thisWeek = habit.completedDates.filter((date) =>
                weekDates.some((d) => format(d, 'yyyy-MM-dd') === date)
              ).length;
              const percentage = Math.round((thisWeek / 7) * 100);

              return (
                <Card key={habit.id} className="shadow-soft p-4 border-0">
                  <h3 className="font-semibold mb-2 truncate">{habit.name}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-success transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-primary">{thisWeek}/7</span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Habits;
