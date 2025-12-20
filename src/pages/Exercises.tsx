import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import MeditationPlayer from '@/components/MeditationPlayer';
import { toast } from 'sonner';

const Exercises = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const breathingExercises = [
    {
      id: 'box',
      name: 'Box Breathing',
      description: 'Equal parts inhale, hold, exhale, hold. Used by Navy SEALs for calm under pressure.',
      duration: '4 minutes',
      difficulty: 'Beginner',
      benefits: ['Reduces stress', 'Improves focus', 'Lowers heart rate'],
      icon: '📦',
      steps: [
        { text: 'Inhale', duration: 4 },
        { text: 'Hold', duration: 4 },
        { text: 'Exhale', duration: 4 },
        { text: 'Hold', duration: 4 },
      ],
    },
    {
      id: '478',
      name: '4-7-8 Breathing',
      description: 'The relaxing breath technique developed by Dr. Andrew Weil.',
      duration: '3 minutes',
      difficulty: 'Beginner',
      benefits: ['Promotes sleep', 'Reduces anxiety', 'Manages cravings'],
      icon: '💤',
      steps: [
        { text: 'Inhale through nose', duration: 4 },
        { text: 'Hold breath', duration: 7 },
        { text: 'Exhale through mouth', duration: 8 },
      ],
    },
    {
      id: 'calm',
      name: 'Calm Breathing',
      description: 'Simple deep breathing for everyday stress relief.',
      duration: '2 minutes',
      difficulty: 'Beginner',
      benefits: ['Quick relief', 'Easy to remember', 'Can do anywhere'],
      icon: '🌊',
      steps: [
        { text: 'Breathe in slowly', duration: 4 },
        { text: 'Breathe out slowly', duration: 6 },
      ],
    },
    {
      id: 'energizing',
      name: 'Energizing Breath',
      description: 'Quick breathing to boost energy and alertness.',
      duration: '1 minute',
      difficulty: 'Intermediate',
      benefits: ['Increases energy', 'Improves alertness', 'Wakes you up'],
      icon: '⚡',
      steps: [
        { text: 'Quick inhale', duration: 1 },
        { text: 'Quick exhale', duration: 1 },
        { text: 'Quick inhale', duration: 1 },
        { text: 'Quick exhale', duration: 1 },
        { text: 'Deep breath in', duration: 3 },
        { text: 'Hold', duration: 2 },
        { text: 'Exhale slowly', duration: 4 },
      ],
    },
    {
      id: 'alternate',
      name: 'Alternate Nostril',
      description: 'Traditional yoga breathing for balance and calm.',
      duration: '5 minutes',
      difficulty: 'Intermediate',
      benefits: ['Balances mind', 'Reduces anxiety', 'Improves focus'],
      icon: '🧘',
      steps: [
        { text: 'Close right nostril, inhale left', duration: 4 },
        { text: 'Close both, hold', duration: 4 },
        { text: 'Close left nostril, exhale right', duration: 4 },
        { text: 'Inhale right nostril', duration: 4 },
        { text: 'Close both, hold', duration: 4 },
        { text: 'Exhale left nostril', duration: 4 },
      ],
    },
    {
      id: 'resonant',
      name: 'Resonant Breathing',
      description: '5 breaths per minute for heart-brain coherence.',
      duration: '5 minutes',
      difficulty: 'Advanced',
      benefits: ['Heart coherence', 'Deep relaxation', 'Emotional balance'],
      icon: '💓',
      steps: [
        { text: 'Inhale slowly', duration: 6 },
        { text: 'Exhale slowly', duration: 6 },
      ],
    },
  ];

  const groundingExercises = [
    {
      id: '54321',
      name: '5-4-3-2-1 Technique',
      description: 'Use your senses to ground yourself in the present moment.',
      duration: '5 minutes',
      difficulty: 'Beginner',
      icon: '👁️',
      steps: [
        'Name 5 things you can SEE',
        'Name 4 things you can TOUCH',
        'Name 3 things you can HEAR',
        'Name 2 things you can SMELL',
        'Name 1 thing you can TASTE',
      ],
    },
    {
      id: 'body-scan',
      name: 'Body Scan',
      description: 'Progressively relax each part of your body.',
      duration: '10 minutes',
      difficulty: 'Beginner',
      icon: '🧘‍♀️',
      steps: [
        'Focus on your feet - notice any sensations',
        'Move attention to your calves and shins',
        'Notice your thighs and hips',
        'Feel your stomach and chest',
        'Relax your shoulders and arms',
        'Release tension in your neck',
        'Soften your face and jaw',
        'Feel your whole body as one',
      ],
    },
    {
      id: 'ice-cube',
      name: 'Ice Cube Grounding',
      description: 'Use cold sensation to anchor to the present.',
      duration: '2 minutes',
      difficulty: 'Beginner',
      icon: '🧊',
      steps: [
        'Hold an ice cube in your hand',
        'Focus on the cold sensation',
        'Notice how it feels as it melts',
        'Observe the water droplets',
        'Stay present with the sensation',
      ],
    },
    {
      id: 'muscle-relaxation',
      name: 'Progressive Muscle Relaxation',
      description: 'Tense and release muscle groups for deep relaxation.',
      duration: '15 minutes',
      difficulty: 'Intermediate',
      icon: '💪',
      steps: [
        'Clench your fists tight for 5 seconds, then release',
        'Tense your forearms, hold, then relax',
        'Shrug shoulders to ears, hold, release',
        'Scrunch your face, hold, relax',
        'Tighten your stomach, hold, release',
        'Squeeze your thighs, hold, relax',
        'Point toes, hold, release',
        'Take a deep breath and feel complete relaxation',
      ],
    },
    {
      id: 'safe-place',
      name: 'Safe Place Visualization',
      description: 'Create a mental sanctuary for calm and peace.',
      duration: '10 minutes',
      difficulty: 'Intermediate',
      icon: '🏝️',
      steps: [
        'Close your eyes and take deep breaths',
        'Imagine a place where you feel completely safe',
        'Notice the colors and shapes around you',
        'What sounds do you hear in this place?',
        'Feel the temperature on your skin',
        'Notice any pleasant scents',
        'Allow yourself to feel completely at peace',
        'Slowly return, knowing you can come back anytime',
      ],
    },
  ];

  const meditationExercises = [
    {
      id: 'mindful-minute',
      name: 'One Minute Meditation',
      description: 'A quick reset for busy moments.',
      duration: '1 minute',
      difficulty: 'Beginner',
      icon: '⏱️',
    },
    {
      id: 'loving-kindness',
      name: 'Loving-Kindness Meditation',
      description: 'Cultivate compassion for yourself and others.',
      duration: '10 minutes',
      difficulty: 'Intermediate',
      icon: '💕',
    },
    {
      id: 'body-awareness',
      name: 'Body Awareness',
      description: 'Connect with physical sensations mindfully.',
      duration: '15 minutes',
      difficulty: 'Beginner',
      icon: '🧠',
    },
    {
      id: 'walking',
      name: 'Walking Meditation',
      description: 'Mindful movement and presence.',
      duration: '20 minutes',
      difficulty: 'Beginner',
      icon: '🚶',
    },
    {
      id: 'sleep',
      name: 'Sleep Meditation',
      description: 'Gentle guidance into restful sleep.',
      duration: '20 minutes',
      difficulty: 'Beginner',
      icon: '🌙',
    },
  ];

  const selectedBreathing = breathingExercises.find(e => e.id === activeExercise);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && selectedBreathing) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const nextStep = (currentStep + 1) % selectedBreathing.steps.length;
            if (nextStep === 0 && currentStep > 0) {
              // Completed a full cycle
              if (!completedExercises.includes(activeExercise!)) {
                setCompletedExercises([...completedExercises, activeExercise!]);
                toast.success('Exercise completed! Great job! 🎉');
              }
            }
            setCurrentStep(nextStep);
            return selectedBreathing.steps[nextStep].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, currentStep, selectedBreathing, activeExercise, completedExercises]);

  const startExercise = (id: string) => {
    const exercise = breathingExercises.find(e => e.id === id);
    if (exercise) {
      setActiveExercise(id);
      setCurrentStep(0);
      setTimeLeft(exercise.steps[0].duration);
      setIsActive(false);
    }
  };

  const resetExercise = () => {
    if (selectedBreathing) {
      setCurrentStep(0);
      setTimeLeft(selectedBreathing.steps[0].duration);
      setIsActive(false);
    }
  };

  const currentStepData = selectedBreathing?.steps[currentStep];

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
            <h1 className="text-3xl font-bold">Exercises</h1>
            <p className="text-muted-foreground">Breathing, grounding, and meditation techniques</p>
          </div>
        </div>

        {/* Quick Panic Button */}
        <Card className="shadow-elevated p-6 border-2 border-destructive/50 bg-destructive/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-1">Feeling Overwhelmed?</h3>
              <p className="text-sm text-muted-foreground">Start an immediate calming exercise</p>
            </div>
            <Button 
              variant="destructive" 
              size="lg"
              onClick={() => {
                startExercise('calm');
                setIsActive(true);
              }}
            >
              Calm Me Now
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="breathing" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
            <TabsTrigger value="breathing">🌬️ Breathing</TabsTrigger>
            <TabsTrigger value="grounding">🌍 Grounding</TabsTrigger>
            <TabsTrigger value="meditation">🧘 Meditation</TabsTrigger>
          </TabsList>

          <TabsContent value="breathing" className="space-y-6">
            {/* Active Exercise Player */}
            {activeExercise && selectedBreathing && (
              <Card className="shadow-elevated p-8 border-0">
                <div className="flex flex-col items-center space-y-6">
                  <h3 className="text-2xl font-bold">{selectedBreathing.name}</h3>
                  
                  {/* Animated Circle */}
                  <div className="relative w-56 h-56 flex items-center justify-center">
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-glow transition-all duration-1000 ease-in-out"
                      style={{
                        transform: currentStepData?.text.toLowerCase().includes('inhale')
                          ? 'scale(1)'
                          : currentStepData?.text.toLowerCase().includes('exhale')
                          ? 'scale(0.6)'
                          : 'scale(0.8)',
                        opacity: 0.3,
                      }}
                    />
                    <div className="relative z-10 text-center">
                      <p className="text-2xl font-bold mb-2">{currentStepData?.text}</p>
                      <p className="text-5xl font-bold text-primary">{timeLeft}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="w-full max-w-md">
                    <Progress 
                      value={currentStepData ? ((currentStepData.duration - timeLeft) / currentStepData.duration) * 100 : 0} 
                      className="h-2"
                    />
                  </div>

                  {/* Controls */}
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      onClick={() => setIsActive(!isActive)}
                      className="w-32"
                    >
                      {isActive ? (
                        <><Pause className="w-5 h-5 mr-2" />Pause</>
                      ) : (
                        <><Play className="w-5 h-5 mr-2" />Start</>
                      )}
                    </Button>
                    <Button size="lg" variant="outline" onClick={resetExercise}>
                      <RotateCcw className="w-5 h-5 mr-2" />Reset
                    </Button>
                    <Button size="lg" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                  </div>

                  <Button variant="ghost" onClick={() => setActiveExercise(null)}>
                    Choose Different Exercise
                  </Button>
                </div>
              </Card>
            )}

            {/* Exercise List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {breathingExercises.map((exercise) => (
                <Card 
                  key={exercise.id} 
                  className={`shadow-soft p-6 border-0 cursor-pointer transition-smooth hover:shadow-elevated ${
                    activeExercise === exercise.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => startExercise(exercise.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{exercise.icon}</span>
                    {completedExercises.includes(exercise.id) && (
                      <Check className="w-5 h-5 text-success" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{exercise.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{exercise.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{exercise.duration}</span>
                    <span className="px-2 py-1 bg-muted rounded-full">{exercise.difficulty}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {exercise.benefits.map((benefit) => (
                      <span key={benefit} className="text-xs text-muted-foreground">• {benefit}</span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grounding" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {groundingExercises.map((exercise) => (
                <Card key={exercise.id} className="shadow-soft p-6 border-0">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{exercise.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{exercise.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{exercise.description}</p>
                      <div className="flex items-center gap-2 text-xs mb-4">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{exercise.duration}</span>
                        <span className="px-2 py-1 bg-muted rounded-full">{exercise.difficulty}</span>
                      </div>
                      <div className="space-y-2">
                        {exercise.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="meditation" className="space-y-4">
            <Card className="shadow-soft p-6 border-0 bg-gradient-to-br from-primary/10 to-accent/10 mb-6">
              <h3 className="text-lg font-semibold mb-2">Meditation Audio</h3>
              <p className="text-muted-foreground">
                Choose from ambient sounds to help you relax, meditate, or fall asleep.
                Each track loops continuously for an immersive experience.
              </p>
            </Card>

            {/* Meditation Player */}
            <MeditationPlayer />

            {/* Guided Meditations Info */}
            <h3 className="text-lg font-semibold mt-8 mb-4">Guided Meditations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {meditationExercises.map((exercise) => (
                <Card key={exercise.id} className="shadow-soft p-6 border-0 hover:shadow-elevated transition-smooth cursor-pointer">
                  <span className="text-4xl mb-4 block">{exercise.icon}</span>
                  <h3 className="text-lg font-semibold mb-1">{exercise.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{exercise.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{exercise.duration}</span>
                    <span className="px-2 py-1 bg-muted rounded-full">{exercise.difficulty}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Play className="w-4 h-4 mr-2" /> Start Session
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Exercises;
