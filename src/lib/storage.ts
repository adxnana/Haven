// Local storage utilities for Haven app

export interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  intensity: number;
  note: string;
  triggers: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  emotions: string[];
  mood?: string;
}

export interface Habit {
  id: string;
  name: string;
  completedDates: string[];
}

export interface Routine {
  id: string;
  type: 'morning' | 'night';
  tasks: { id: string; text: string; completed: boolean }[];
  reminders?: boolean;
}

export interface ResourceFavorite {
  id: string;
  type: 'article' | 'playlist' | 'book';
  title: string;
  date: string;
}

const STORAGE_KEYS = {
  MOODS: 'haven_moods',
  JOURNAL: 'haven_journal',
  HABITS: 'haven_habits',
  ROUTINES: 'haven_routines',
  THEME: 'haven_theme',
  PIN: 'haven_pin',
  FAVORITES: 'haven_favorites',
  QUOTES: 'haven_quotes',
};

export const storage = {
  // Mood entries
  getMoods: (): MoodEntry[] => {
    const data = localStorage.getItem(STORAGE_KEYS.MOODS);
    return data ? JSON.parse(data) : [];
  },
  saveMood: (mood: MoodEntry) => {
    const moods = storage.getMoods();
    moods.push(mood);
    localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(moods));
  },
  
  // Journal entries
  getJournalEntries: (): JournalEntry[] => {
    const data = localStorage.getItem(STORAGE_KEYS.JOURNAL);
    return data ? JSON.parse(data) : [];
  },
  saveJournalEntry: (entry: JournalEntry) => {
    const entries = storage.getJournalEntries();
    entries.push(entry);
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
  },
  updateJournalEntry: (id: string, updates: Partial<JournalEntry>) => {
    const entries = storage.getJournalEntries();
    const index = entries.findIndex(e => e.id === id);
    if (index !== -1) {
      entries[index] = { ...entries[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
    }
  },
  deleteJournalEntry: (id: string) => {
    const entries = storage.getJournalEntries().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
  },
  
  // Habits
  getHabits: (): Habit[] => {
    const data = localStorage.getItem(STORAGE_KEYS.HABITS);
    return data ? JSON.parse(data) : [];
  },
  saveHabits: (habits: Habit[]) => {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  },
  
  // Routines
  getRoutines: (): Routine[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ROUTINES);
    return data ? JSON.parse(data) : [
      {
        id: 'morning',
        type: 'morning',
        tasks: [
          { id: '1', text: 'Drink water', completed: false },
          { id: '2', text: 'Morning stretch', completed: false },
          { id: '3', text: 'Breakfast', completed: false },
        ],
      },
      {
        id: 'night',
        type: 'night',
        tasks: [
          { id: '1', text: 'Evening journal', completed: false },
          { id: '2', text: 'Skincare routine', completed: false },
          { id: '3', text: 'Read or meditate', completed: false },
        ],
      },
    ];
  },
  saveRoutines: (routines: Routine[]) => {
    localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(routines));
  },
  
  // Theme
  getTheme: (): string => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'calm';
  },
  setTheme: (theme: string) => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },
  
  // PIN
  getPin: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.PIN);
  },
  setPin: (pin: string) => {
    localStorage.setItem(STORAGE_KEYS.PIN, pin);
  },
  clearPin: () => {
    localStorage.removeItem(STORAGE_KEYS.PIN);
  },
  
  // Favorites
  getFavorites: (): ResourceFavorite[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  },
  addFavorite: (favorite: ResourceFavorite) => {
    const favorites = storage.getFavorites();
    favorites.push(favorite);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  },
  removeFavorite: (id: string) => {
    const favorites = storage.getFavorites().filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  },
  
  // Reset all data
  resetAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};
