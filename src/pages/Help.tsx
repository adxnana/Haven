import { ArrowLeft, Phone, ExternalLink, AlertCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Help = () => {
  const hotlines = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: 'Free, 24/7 crisis support',
      country: 'USA',
    },
    {
      name: 'Crisis Text Line',
      number: 'Text "HELLO" to 741741',
      description: 'Free, 24/7 text support',
      country: 'USA/Canada/UK',
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral and information',
      country: 'USA',
    },
    {
      name: 'International Association for Suicide Prevention',
      number: 'Visit iasp.info/resources',
      description: 'Directory of crisis centers worldwide',
      country: 'International',
    },
  ];

  const whenToSeekHelp = [
    'Thoughts of self-harm or suicide',
    'Overwhelming anxiety or panic attacks',
    'Inability to perform daily tasks',
    'Substance abuse issues',
    'Significant changes in sleep or appetite',
    'Persistent feelings of hopelessness',
    'Withdrawal from friends and activities',
    'Extreme mood swings',
  ];

  const professionals = [
    {
      type: 'Psychiatrist',
      description: 'Medical doctor who can diagnose and prescribe medication',
      when: 'Severe symptoms, medication needed',
    },
    {
      type: 'Psychologist',
      description: 'PhD-level therapist specializing in assessment and therapy',
      when: 'In-depth therapy, psychological testing',
    },
    {
      type: 'Licensed Therapist/Counselor',
      description: 'Masters-level mental health professional',
      when: 'Talk therapy, coping strategies',
    },
    {
      type: 'Social Worker',
      description: 'Provides therapy and connects you to resources',
      when: 'Community resources, case management',
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Professional Support</h1>
            <p className="text-muted-foreground">You're not alone. Help is available.</p>
          </div>
        </div>

        {/* Emergency Alert */}
        <Card className="shadow-soft p-6 border-2 border-destructive/50 bg-destructive/5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-2">In Crisis? Get Help Now</h3>
              <p className="text-foreground mb-3">
                If you're in immediate danger or having thoughts of self-harm, please call 988 (USA) or your local emergency services.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="destructive" size="sm" asChild>
                  <a href="tel:988">Call 988</a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/breathing">Immediate Grounding</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Crisis Hotlines */}
        <Card className="shadow-soft p-6 border-0">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Phone className="w-6 h-6 text-primary" />
            Crisis Hotlines
          </h2>
          <div className="space-y-3">
            {hotlines.map((hotline, index) => (
              <div key={index} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-smooth">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{hotline.name}</h3>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {hotline.country}
                  </span>
                </div>
                <p className="text-primary font-mono text-lg mb-1">{hotline.number}</p>
                <p className="text-muted-foreground text-sm">{hotline.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* When to Seek Help */}
        <Card className="shadow-soft p-6 border-0">
          <h2 className="text-2xl font-semibold mb-4">When to Seek Professional Help</h2>
          <p className="text-muted-foreground mb-4">
            Consider reaching out to a mental health professional if you experience:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {whenToSeekHelp.map((sign, index) => (
              <div key={index} className="flex items-start gap-2">
                <Heart className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{sign}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Types of Professionals */}
        <Card className="shadow-soft p-6 border-0">
          <h2 className="text-2xl font-semibold mb-4">Types of Mental Health Professionals</h2>
          <div className="space-y-4">
            {professionals.map((pro, index) => (
              <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5">
                <h3 className="font-semibold text-lg mb-1">{pro.type}</h3>
                <p className="text-foreground mb-2">{pro.description}</p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Best for:</span> {pro.when}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Find Help */}
        <Card className="shadow-elevated p-6 border-0 bg-gradient-to-br from-primary/10 to-accent/10">
          <h3 className="text-xl font-semibold mb-3">Finding a Therapist</h3>
          <p className="text-foreground mb-4">
            Use these resources to find licensed mental health professionals in your area:
          </p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-between" asChild>
              <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer">
                Psychology Today Directory
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <a href="https://www.betterhelp.com" target="_blank" rel="noopener noreferrer">
                BetterHelp (Online Therapy)
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <a href="https://openpathcollective.org" target="_blank" rel="noopener noreferrer">
                Open Path (Affordable Therapy)
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </Card>

        {/* Quick Grounding */}
        <Card className="shadow-soft p-6 border-0 text-center">
          <h3 className="text-xl font-semibold mb-2">Need Immediate Relief?</h3>
          <p className="text-muted-foreground mb-4">
            Try our grounding exercises to help calm your mind right now.
          </p>
          <Button size="lg" asChild>
            <Link to="/breathing">Start Grounding Exercises</Link>
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Help;
