import { useState, useEffect } from 'react';
import { ArrowLeft, Sunrise, Moon, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Navigation from '@/components/Navigation';
import { storage, Routine } from '@/lib/storage';
import { toast } from 'sonner';

const Routines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    setRoutines(storage.getRoutines());
  }, []);

  const toggleTask = (routineId: string, taskId: string) => {
    const updated = routines.map((routine) => {
      if (routine.id === routineId) {
        return {
          ...routine,
          tasks: routine.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      }
      return routine;
    });
    
    setRoutines(updated);
    storage.saveRoutines(updated);
    toast.success('Task updated!');
  };

  const resetRoutine = (routineId: string) => {
    const updated = routines.map((routine) => {
      if (routine.id === routineId) {
        return {
          ...routine,
          tasks: routine.tasks.map((task) => ({ ...task, completed: false })),
        };
      }
      return routine;
    });
    
    setRoutines(updated);
    storage.saveRoutines(updated);
    toast.success('Routine reset!');
  };

  const morningRoutine = routines.find((r) => r.type === 'morning');
  const nightRoutine = routines.find((r) => r.type === 'night');

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
            <h1 className="text-3xl font-bold">Self-Care Routines</h1>
            <p className="text-muted-foreground">Build healthy daily habits</p>
          </div>
        </div>

        {/* Morning Routine */}
        {morningRoutine && (
          <Card className="shadow-soft p-6 border-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-warning to-accent flex items-center justify-center">
                  <Sunrise className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Morning Routine</h2>
                  <p className="text-sm text-muted-foreground">
                    {morningRoutine.tasks.filter((t) => t.completed).length} of{' '}
                    {morningRoutine.tasks.length} completed
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => resetRoutine(morningRoutine.id)}>
                Reset
              </Button>
            </div>

            <div className="space-y-3">
              {morningRoutine.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 transition-smooth hover:bg-muted"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(morningRoutine.id, task.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Night Routine */}
        {nightRoutine && (
          <Card className="shadow-soft p-6 border-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Night Routine</h2>
                  <p className="text-sm text-muted-foreground">
                    {nightRoutine.tasks.filter((t) => t.completed).length} of{' '}
                    {nightRoutine.tasks.length} completed
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => resetRoutine(nightRoutine.id)}>
                Reset
              </Button>
            </div>

            <div className="space-y-3">
              {nightRoutine.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 transition-smooth hover:bg-muted"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(nightRoutine.id, task.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Completion Message */}
        {morningRoutine?.tasks.every((t) => t.completed) &&
          nightRoutine?.tasks.every((t) => t.completed) && (
            <Card className="shadow-elevated p-6 border-0 bg-gradient-to-br from-success/20 to-primary/20 text-center">
              <div className="w-16 h-16 rounded-full bg-success mx-auto mb-4 flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Amazing work!</h3>
              <p className="text-foreground">
                You've completed all your routines for today. Keep up the great self-care!
              </p>
            </Card>
          )}
      </main>
    </div>
  );
};

export default Routines;
