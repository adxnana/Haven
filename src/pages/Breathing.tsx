import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const exercises = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Equal parts inhale, hold, exhale, hold',
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
    description: 'Relaxing breath for sleep and anxiety',
    steps: [
      { text: 'Inhale', duration: 4 },
      { text: 'Hold', duration: 7 },
      { text: 'Exhale', duration: 8 },
    ],
  },
  {
    id: 'calm',
    name: 'Calm Breathing',
    description: 'Simple deep breathing',
    steps: [
      { text: 'Inhale deeply', duration: 4 },
      { text: 'Exhale slowly', duration: 6 },
    ],
  },
];

const Breathing = () => {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(selectedExercise.steps[0].duration);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const nextStep = (currentStep + 1) % selectedExercise.steps.length;
            setCurrentStep(nextStep);
            return selectedExercise.steps[nextStep].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, currentStep, selectedExercise]);

  const handleReset = () => {
    setIsActive(false);
    setCurrentStep(0);
    setTimeLeft(selectedExercise.steps[0].duration);
  };

  const currentStepData = selectedExercise.steps[currentStep];
  const progress = ((currentStepData.duration - timeLeft) / currentStepData.duration) * 100;

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
            <h1 className="text-3xl font-bold">Breathing Exercises</h1>
            <p className="text-muted-foreground">Find your calm</p>
          </div>
        </div>

        {/* Exercise Selection */}
        <div className="grid md:grid-cols-3 gap-4">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className={`p-4 cursor-pointer transition-smooth border-2 ${
                selectedExercise.id === exercise.id
                  ? 'border-primary shadow-glow'
                  : 'border-transparent hover:border-border'
              }`}
              onClick={() => {
                setSelectedExercise(exercise);
                handleReset();
              }}
            >
              <h3 className="font-semibold mb-1">{exercise.name}</h3>
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
            </Card>
          ))}
        </div>

        {/* Breathing Circle */}
        <Card className="shadow-elevated p-8 border-0">
          <div className="flex flex-col items-center space-y-8">
            {/* Animated Circle */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-glow transition-all duration-1000 ease-in-out"
                style={{
                  transform: currentStepData.text.includes('Inhale')
                    ? 'scale(1)'
                    : currentStepData.text.includes('Exhale')
                    ? 'scale(0.6)'
                    : 'scale(0.8)',
                  opacity: 0.3,
                }}
              />
              <div className="relative z-10 text-center">
                <p className="text-3xl font-bold mb-2">{currentStepData.text}</p>
                <p className="text-5xl font-bold text-primary">{timeLeft}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={() => setIsActive(!isActive)}
                className="w-32"
              >
                {isActive ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleReset}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <Card className="shadow-soft p-6 border-0 bg-gradient-to-br from-accent/10 to-primary/10">
          <h3 className="text-lg font-semibold mb-3">How to practice</h3>
          <ul className="space-y-2 text-foreground">
            <li>• Find a comfortable, quiet place to sit or lie down</li>
            <li>• Close your eyes or soften your gaze</li>
            <li>• Follow the guided breathing pattern</li>
            <li>• Focus on the sensation of your breath</li>
            <li>• Practice for 5-10 minutes daily</li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default Breathing;
