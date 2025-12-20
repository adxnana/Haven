export const quotes = [
  "You are stronger than you think, braver than you believe, and more loved than you know.",
  "Taking care of yourself is not selfish. It's essential.",
  "Progress, not perfection.",
  "Every day may not be good, but there is something good in every day.",
  "Your mental health is a priority. Don't be afraid to ask for help.",
  "Small steps every day lead to big changes over time.",
  "It's okay to not be okay. Be gentle with yourself.",
  "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.",
  "Healing doesn't mean the damage never existed. It means the damage no longer controls your life.",
  "Your feelings are valid, and so are you.",
  "Self-care is giving the world the best of you, instead of what's left of you.",
  "You have been assigned this mountain to show others it can be moved.",
  "The only way out is through.",
  "You are worthy of love and belonging just as you are.",
  "Sometimes the bravest thing you can do is rest.",
];

export const getRandomQuote = (): string => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const getDailyQuote = (): string => {
  const today = new Date().toDateString();
  const stored = localStorage.getItem('haven_daily_quote');
  const parsed = stored ? JSON.parse(stored) : null;
  
  if (parsed && parsed.date === today) {
    return parsed.quote;
  }
  
  const quote = getRandomQuote();
  localStorage.setItem('haven_daily_quote', JSON.stringify({ date: today, quote }));
  return quote;
};

export const reflectionPrompts = [
  "What are you grateful for today?",
  "What's one thing that brought you joy this week?",
  "How did you practice self-care today?",
  "What emotions did you experience today, and what triggered them?",
  "What's one thing you learned about yourself recently?",
  "How can you be kinder to yourself tomorrow?",
  "What's causing you stress right now, and what can you do about it?",
  "What are three things you accomplished today, no matter how small?",
  "Who in your life makes you feel supported?",
  "What boundaries do you need to set for your wellbeing?",
];

export const getRandomPrompt = (): string => {
  return reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)];
};
