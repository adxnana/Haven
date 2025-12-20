import { useState } from 'react';
import { ArrowLeft, BookOpen, Brain, Heart, Lightbulb, ChevronRight, Search, Star, Video, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navigation from '@/components/Navigation';

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const conditions = [
    {
      id: 'anxiety',
      name: 'Anxiety Disorders',
      icon: '😰',
      color: 'from-blue-500 to-blue-600',
      description: 'Learn about different types of anxiety and how to manage them',
      types: ['Generalized Anxiety', 'Social Anxiety', 'Panic Disorder', 'Phobias', 'OCD', 'PTSD'],
      symptoms: ['Excessive worry', 'Restlessness', 'Difficulty concentrating', 'Sleep problems', 'Muscle tension'],
      coping: ['Deep breathing', 'Grounding techniques', 'Cognitive restructuring', 'Regular exercise'],
    },
    {
      id: 'depression',
      name: 'Depression',
      icon: '😔',
      color: 'from-purple-500 to-purple-600',
      description: 'Understanding depression, its causes, and treatment options',
      types: ['Major Depression', 'Persistent Depressive Disorder', 'Seasonal Affective Disorder', 'Postpartum Depression'],
      symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Changes in appetite', 'Difficulty concentrating'],
      coping: ['Professional therapy', 'Medication when needed', 'Regular routine', 'Social connection'],
    },
    {
      id: 'stress',
      name: 'Stress & Burnout',
      icon: '🔥',
      color: 'from-orange-500 to-red-500',
      description: 'Managing chronic stress and preventing burnout',
      types: ['Work Stress', 'Academic Stress', 'Relationship Stress', 'Financial Stress', 'Burnout'],
      symptoms: ['Exhaustion', 'Cynicism', 'Reduced performance', 'Physical symptoms', 'Emotional detachment'],
      coping: ['Setting boundaries', 'Time management', 'Self-care routines', 'Seeking support'],
    },
    {
      id: 'bipolar',
      name: 'Bipolar Disorder',
      icon: '🔄',
      color: 'from-green-500 to-teal-500',
      description: 'Understanding mood episodes and management strategies',
      types: ['Bipolar I', 'Bipolar II', 'Cyclothymic Disorder'],
      symptoms: ['Mood episodes', 'Changes in energy', 'Sleep disturbances', 'Impulsivity during mania'],
      coping: ['Medication adherence', 'Mood tracking', 'Regular sleep schedule', 'Stress management'],
    },
    {
      id: 'trauma',
      name: 'Trauma & PTSD',
      icon: '🌱',
      color: 'from-emerald-500 to-green-600',
      description: 'Healing from traumatic experiences',
      types: ['PTSD', 'Complex PTSD', 'Acute Stress Disorder'],
      symptoms: ['Flashbacks', 'Nightmares', 'Avoidance', 'Hypervigilance', 'Emotional numbness'],
      coping: ['Trauma-focused therapy', 'EMDR', 'Grounding techniques', 'Building safety'],
    },
    {
      id: 'eating',
      name: 'Eating Disorders',
      icon: '🍃',
      color: 'from-pink-500 to-rose-500',
      description: 'Understanding disordered eating and recovery',
      types: ['Anorexia', 'Bulimia', 'Binge Eating Disorder', 'ARFID'],
      symptoms: ['Food preoccupation', 'Body image issues', 'Restrictive eating', 'Purging behaviors'],
      coping: ['Professional treatment', 'Nutritional counseling', 'Body acceptance work', 'Support groups'],
    },
  ];

  const copingStrategies = [
    {
      category: 'Immediate Relief',
      icon: '⚡',
      strategies: [
        { name: '5-4-3-2-1 Grounding', description: 'Use your senses to ground yourself in the present moment', time: '2-5 min' },
        { name: 'Box Breathing', description: 'Breathe in, hold, out, hold - each for 4 seconds', time: '2-4 min' },
        { name: 'Cold Water Technique', description: 'Splash cold water on your face to activate the dive reflex', time: '1 min' },
        { name: 'Progressive Muscle Relaxation', description: 'Tense and release muscle groups systematically', time: '10-15 min' },
      ],
    },
    {
      category: 'Daily Practices',
      icon: '🌅',
      strategies: [
        { name: 'Morning Journaling', description: 'Write 3 pages of stream-of-consciousness thoughts', time: '15-20 min' },
        { name: 'Gratitude Practice', description: 'List 3 things you\'re grateful for each day', time: '5 min' },
        { name: 'Mindful Walking', description: 'Walk slowly and notice each sensation', time: '10-20 min' },
        { name: 'Evening Reflection', description: 'Review your day without judgment', time: '10 min' },
      ],
    },
    {
      category: 'Long-term Wellness',
      icon: '🌳',
      strategies: [
        { name: 'Therapy', description: 'Work with a professional to address root causes', time: 'Weekly' },
        { name: 'Regular Exercise', description: 'Physical activity releases endorphins and reduces stress', time: '30 min daily' },
        { name: 'Sleep Hygiene', description: 'Maintain consistent sleep schedule and bedtime routine', time: 'Nightly' },
        { name: 'Social Connection', description: 'Maintain meaningful relationships and community', time: 'Regular' },
      ],
    },
  ];

  const articles = [
    { title: 'Understanding Your Emotions', category: 'Fundamentals', readTime: '5 min', type: 'article' },
    { title: 'The Science of Stress', category: 'Science', readTime: '8 min', type: 'article' },
    { title: 'Building Healthy Boundaries', category: 'Relationships', readTime: '6 min', type: 'article' },
    { title: 'Introduction to CBT', category: 'Therapy', readTime: '10 min', type: 'video' },
    { title: 'Mindfulness for Beginners', category: 'Practice', readTime: '7 min', type: 'article' },
    { title: 'How Trauma Affects the Brain', category: 'Science', readTime: '12 min', type: 'video' },
    { title: 'Self-Compassion Exercises', category: 'Practice', readTime: '5 min', type: 'article' },
    { title: 'Recognizing Anxiety Triggers', category: 'Self-Awareness', readTime: '6 min', type: 'article' },
  ];

  const faqs = [
    {
      question: 'When should I seek professional help?',
      answer: 'Consider seeking professional help if your symptoms interfere with daily life, last more than two weeks, or if you have thoughts of self-harm. There\'s no wrong time to reach out for support.',
    },
    {
      question: 'What\'s the difference between a psychiatrist and psychologist?',
      answer: 'Psychiatrists are medical doctors who can prescribe medication. Psychologists hold doctoral degrees in psychology and provide therapy. Both can help, and many people work with both.',
    },
    {
      question: 'Is it normal to feel anxious or sad sometimes?',
      answer: 'Yes, experiencing a range of emotions is normal and healthy. The concern arises when these feelings become persistent, overwhelming, or interfere with your daily functioning.',
    },
    {
      question: 'How long does therapy usually take?',
      answer: 'It varies greatly depending on your goals and the type of therapy. Some see improvement in 6-12 sessions, while others benefit from longer-term treatment. Your therapist can help set realistic expectations.',
    },
    {
      question: 'Can mental health conditions be cured?',
      answer: 'Many mental health conditions can be effectively managed with treatment. Some people experience full recovery, while others learn to manage symptoms successfully. Treatment can significantly improve quality of life.',
    },
  ];

  const filteredConditions = conditions.filter(c => 
    !searchQuery || 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.types.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Learn</h1>
            <p className="text-muted-foreground">Education and understanding for mental wellness</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search conditions, strategies, articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="conditions" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 mb-6">
            <TabsTrigger value="conditions">
              <Brain className="w-4 h-4 mr-2" />
              Conditions
            </TabsTrigger>
            <TabsTrigger value="coping">
              <Heart className="w-4 h-4 mr-2" />
              Coping
            </TabsTrigger>
            <TabsTrigger value="articles">
              <BookOpen className="w-4 h-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="faq">
              <Lightbulb className="w-4 h-4 mr-2" />
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conditions" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredConditions.map((condition) => (
                <Card key={condition.id} className="shadow-soft border-0 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${condition.color}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{condition.icon}</span>
                      <h3 className="text-xl font-semibold">{condition.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{condition.description}</p>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="types" className="border-b-0">
                        <AccordionTrigger className="py-2 text-sm">Types</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-wrap gap-2">
                            {condition.types.map((type) => (
                              <Badge key={type} variant="secondary">{type}</Badge>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="symptoms" className="border-b-0">
                        <AccordionTrigger className="py-2 text-sm">Common Symptoms</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {condition.symptoms.map((symptom) => (
                              <li key={symptom}>{symptom}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="coping" className="border-b-0">
                        <AccordionTrigger className="py-2 text-sm">Coping Strategies</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {condition.coping.map((strategy) => (
                              <li key={strategy}>{strategy}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      Learn More <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="coping" className="space-y-6">
            {copingStrategies.map((category) => (
              <Card key={category.category} className="shadow-soft p-6 border-0">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  {category.category}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.strategies.map((strategy) => (
                    <div key={strategy.name} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-smooth">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{strategy.name}</h4>
                        <Badge variant="outline">{strategy.time}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="articles" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {articles.map((article, index) => (
                <Card key={index} className="shadow-soft p-5 border-0 hover:shadow-elevated transition-smooth cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      article.type === 'video' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                    }`}>
                      {article.type === 'video' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{article.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            <Card className="shadow-soft p-6 border-0">
              <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Access */}
        <Card className="shadow-elevated p-6 border-0 bg-gradient-to-br from-primary/10 to-accent/10">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-warning" />
            Quick Access Tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" asChild className="h-auto py-3 flex-col">
              <Link to="/breathing">
                <span className="text-2xl mb-1">🌬️</span>
                <span className="text-sm">Breathing</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto py-3 flex-col">
              <Link to="/mood">
                <span className="text-2xl mb-1">😊</span>
                <span className="text-sm">Mood Check</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto py-3 flex-col">
              <Link to="/journal">
                <span className="text-2xl mb-1">📝</span>
                <span className="text-sm">Journal</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto py-3 flex-col">
              <Link to="/help">
                <span className="text-2xl mb-1">🆘</span>
                <span className="text-sm">Get Help</span>
              </Link>
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Learn;
