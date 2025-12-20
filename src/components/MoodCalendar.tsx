import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { storage, MoodEntry } from '@/lib/storage';
import { format, isSameDay, parseISO } from 'date-fns';

const MoodCalendar = () => {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMood, setSelectedMood] = useState<MoodEntry | null>(null);

  useEffect(() => {
    setMoodHistory(storage.getMoods());
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const mood = moodHistory.find(m => 
        isSameDay(parseISO(m.date), selectedDate)
      );
      setSelectedMood(mood || null);
    }
  }, [selectedDate, moodHistory]);

  const getMoodForDate = (date: Date) => {
    return moodHistory.find(m => isSameDay(parseISO(m.date), date));
  };

  const modifiers = {
    hasMood: (date: Date) => !!getMoodForDate(date),
  };

  const modifiersStyles = {
    hasMood: {
      backgroundColor: 'hsl(var(--primary) / 0.2)',
      borderRadius: '50%',
    },
  };

  return (
    <Card className="shadow-soft p-6 border-0">
      <h2 className="text-xl font-semibold mb-4">Mood Calendar</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="pointer-events-auto rounded-lg border border-border p-3"
          />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          {selectedDate && (
            <div className="space-y-3">
              <h3 className="font-medium">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
              
              {selectedMood ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedMood.mood}</span>
                    <span className="text-lg font-medium">
                      Intensity: {selectedMood.intensity}/5
                    </span>
                  </div>
                  
                  {selectedMood.note && (
                    <p className="text-muted-foreground">{selectedMood.note}</p>
                  )}
                  
                  {selectedMood.triggers.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedMood.triggers.map((trigger) => (
                        <Badge key={trigger} variant="secondary">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No mood logged for this day</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MoodCalendar;
