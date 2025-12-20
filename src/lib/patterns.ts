import { MoodEntry } from './storage';
import { format, getDay } from 'date-fns';

export interface MoodPattern {
  type: 'day' | 'trigger' | 'streak';
  message: string;
  severity: 'info' | 'warning';
}

export const analyzeMoodPatterns = (moods: MoodEntry[]): MoodPattern[] => {
  if (moods.length < 5) return [];
  
  const patterns: MoodPattern[] = [];
  
  // Analyze by day of week
  const dayPatterns: Record<number, { good: number; bad: number }> = {};
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  moods.forEach(mood => {
    const day = getDay(new Date(mood.date));
    if (!dayPatterns[day]) {
      dayPatterns[day] = { good: 0, bad: 0 };
    }
    if (mood.intensity <= 2) {
      dayPatterns[day].bad++;
    } else if (mood.intensity >= 4) {
      dayPatterns[day].good++;
    }
  });
  
  Object.entries(dayPatterns).forEach(([day, counts]) => {
    if (counts.bad >= 3) {
      patterns.push({
        type: 'day',
        message: `You tend to feel down on ${dayNames[parseInt(day)]}s. Consider scheduling self-care activities for this day.`,
        severity: 'warning',
      });
    }
    if (counts.good >= 3) {
      patterns.push({
        type: 'day',
        message: `${dayNames[parseInt(day)]}s seem to be good days for you! Keep up what you're doing.`,
        severity: 'info',
      });
    }
  });
  
  // Analyze triggers
  const triggerCounts: Record<string, { good: number; bad: number }> = {};
  
  moods.forEach(mood => {
    mood.triggers.forEach(trigger => {
      if (!triggerCounts[trigger]) {
        triggerCounts[trigger] = { good: 0, bad: 0 };
      }
      if (mood.intensity <= 2) {
        triggerCounts[trigger].bad++;
      } else if (mood.intensity >= 4) {
        triggerCounts[trigger].good++;
      }
    });
  });
  
  Object.entries(triggerCounts).forEach(([trigger, counts]) => {
    if (counts.bad >= 3) {
      patterns.push({
        type: 'trigger',
        message: `"${trigger}" often correlates with negative moods. Consider strategies to manage this trigger.`,
        severity: 'warning',
      });
    }
  });
  
  // Analyze recent streak of bad moods
  const recentMoods = moods.slice(-7);
  const badMoodStreak = recentMoods.filter(m => m.intensity <= 2).length;
  
  if (badMoodStreak >= 5) {
    patterns.push({
      type: 'streak',
      message: `You've logged several low moods recently. Consider reaching out to a friend, therapist, or crisis support.`,
      severity: 'warning',
    });
  }
  
  return patterns;
};

export const getWeeklySummary = (moods: MoodEntry[]): string => {
  const weekMoods = moods.slice(-7);
  if (weekMoods.length === 0) return "No mood data available yet.";
  
  const avgIntensity = weekMoods.reduce((sum, m) => sum + m.intensity, 0) / weekMoods.length;
  const mostCommonTrigger = getMostCommonTrigger(weekMoods);
  
  if (avgIntensity >= 4) {
    return `Great week! Your average mood was positive${mostCommonTrigger ? `, even when dealing with ${mostCommonTrigger}.` : '.'}`;
  } else if (avgIntensity >= 3) {
    return `Balanced week. You've had ups and downs${mostCommonTrigger ? `, with ${mostCommonTrigger} being a common factor.` : '.'}`;
  } else {
    return `Challenging week. Remember it's okay to ask for support${mostCommonTrigger ? `, especially with ${mostCommonTrigger}.` : '.'}`;
  }
};

const getMostCommonTrigger = (moods: MoodEntry[]): string | null => {
  const triggerCounts: Record<string, number> = {};
  
  moods.forEach(mood => {
    mood.triggers.forEach(trigger => {
      triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
    });
  });
  
  const entries = Object.entries(triggerCounts);
  if (entries.length === 0) return null;
  
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
};
