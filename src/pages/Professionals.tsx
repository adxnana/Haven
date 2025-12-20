import { ArrowLeft, Phone, ExternalLink, AlertCircle, Heart, MapPin, Video, MessageCircle, Clock, DollarSign, Star, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { useState } from 'react';

const Professionals = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const hotlines = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: 'Free, 24/7 crisis support for anyone in distress',
      country: 'USA',
      available: '24/7',
      type: 'call',
    },
    {
      name: 'Crisis Text Line',
      number: 'Text "HELLO" to 741741',
      description: 'Free, 24/7 text-based crisis support',
      country: 'USA/Canada/UK/Ireland',
      available: '24/7',
      type: 'text',
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral and information service',
      country: 'USA',
      available: '24/7',
      type: 'call',
    },
    {
      name: 'Veterans Crisis Line',
      number: '988, Press 1',
      description: 'Support for veterans and their families',
      country: 'USA',
      available: '24/7',
      type: 'call',
    },
    {
      name: 'Trevor Project',
      number: '1-866-488-7386',
      description: 'Crisis support for LGBTQ+ youth',
      country: 'USA',
      available: '24/7',
      type: 'call',
    },
    {
      name: 'Childhelp National Child Abuse Hotline',
      number: '1-800-422-4453',
      description: 'Support for children and parents',
      country: 'USA',
      available: '24/7',
      type: 'call',
    },
    {
      name: 'Samaritans',
      number: '116 123',
      description: 'Emotional support for anyone in distress',
      country: 'UK/Ireland',
      available: '24/7',
      type: 'call',
    },
    {
      name: 'Beyond Blue',
      number: '1300 22 4636',
      description: 'Anxiety and depression support',
      country: 'Australia',
      available: '24/7',
      type: 'call',
    },
  ];

  const internationalHotlines = [
    { country: 'Canada', name: 'Canada Suicide Prevention', number: '1-833-456-4566' },
    { country: 'UK', name: 'Samaritans', number: '116 123' },
    { country: 'Australia', name: 'Lifeline', number: '13 11 14' },
    { country: 'India', name: 'iCall', number: '9152987821' },
    { country: 'Germany', name: 'Telefonseelsorge', number: '0800 111 0 111' },
    { country: 'France', name: 'SOS Amitié', number: '09 72 39 40 50' },
    { country: 'Japan', name: 'TELL Lifeline', number: '03-5774-0992' },
    { country: 'Brazil', name: 'CVV', number: '188' },
    { country: 'South Africa', name: 'SADAG', number: '0800 567 567' },
    { country: 'Philippines', name: 'Hopeline', number: '0917 558 4673' },
  ];

  const professionals = [
    {
      type: 'Psychiatrist',
      icon: '👨‍⚕️',
      description: 'Medical doctor specializing in mental health. Can diagnose conditions and prescribe medication.',
      when: 'Severe symptoms, medication evaluation, complex diagnoses',
      cost: '$150-400 per session',
      education: 'MD or DO + Psychiatry Residency',
    },
    {
      type: 'Psychologist',
      icon: '🧠',
      description: 'Doctoral-level therapist specializing in psychological assessment and therapy.',
      when: 'In-depth therapy, psychological testing, research-based treatment',
      cost: '$100-250 per session',
      education: 'PhD or PsyD in Psychology',
    },
    {
      type: 'Licensed Clinical Social Worker (LCSW)',
      icon: '🤝',
      description: 'Provides therapy and connects clients to community resources.',
      when: 'Talk therapy, case management, navigating systems',
      cost: '$75-150 per session',
      education: 'Master\'s in Social Work + Clinical License',
    },
    {
      type: 'Licensed Professional Counselor (LPC)',
      icon: '💬',
      description: 'Masters-level mental health professional providing counseling.',
      when: 'Talk therapy, coping strategies, life transitions',
      cost: '$75-150 per session',
      education: 'Master\'s in Counseling + License',
    },
    {
      type: 'Marriage & Family Therapist (MFT)',
      icon: '👨‍👩‍👧',
      description: 'Specializes in relationship and family dynamics.',
      when: 'Couples therapy, family conflicts, relationship issues',
      cost: '$100-200 per session',
      education: 'Master\'s in Marriage & Family Therapy',
    },
    {
      type: 'Psychiatric Nurse Practitioner',
      icon: '👩‍⚕️',
      description: 'Advanced practice nurse who can prescribe psychiatric medications.',
      when: 'Medication management, psychiatric care',
      cost: '$100-200 per session',
      education: 'MSN or DNP + Psychiatric Certification',
    },
  ];

  const findTherapyLinks = [
    {
      name: 'Psychology Today',
      description: 'Comprehensive therapist directory with filters',
      url: 'https://www.psychologytoday.com/us/therapists',
      icon: '🔍',
    },
    {
      name: 'BetterHelp',
      description: 'Online therapy platform with licensed therapists',
      url: 'https://www.betterhelp.com',
      icon: '💻',
    },
    {
      name: 'Talkspace',
      description: 'Text, voice, and video therapy online',
      url: 'https://www.talkspace.com',
      icon: '📱',
    },
    {
      name: 'Open Path Collective',
      description: 'Affordable therapy for those in financial need',
      url: 'https://openpathcollective.org',
      icon: '💚',
    },
    {
      name: 'Good Therapy',
      description: 'Find ethical, caring therapists',
      url: 'https://www.goodtherapy.org',
      icon: '✨',
    },
    {
      name: 'SAMHSA Treatment Locator',
      description: 'Find treatment facilities near you',
      url: 'https://findtreatment.samhsa.gov',
      icon: '🏥',
    },
    {
      name: 'TherapyDen',
      description: 'Inclusive therapist directory',
      url: 'https://www.therapyden.com',
      icon: '🌈',
    },
    {
      name: 'Alma',
      description: 'Insurance-friendly therapy matching',
      url: 'https://helloalma.com',
      icon: '💜',
    },
  ];

  const whenToSeekHelp = [
    { sign: 'Thoughts of self-harm or suicide', urgent: true },
    { sign: 'Overwhelming anxiety or panic attacks', urgent: false },
    { sign: 'Inability to perform daily tasks', urgent: false },
    { sign: 'Substance abuse issues', urgent: false },
    { sign: 'Significant changes in sleep or appetite', urgent: false },
    { sign: 'Persistent feelings of hopelessness', urgent: true },
    { sign: 'Withdrawal from friends and activities', urgent: false },
    { sign: 'Extreme mood swings', urgent: false },
    { sign: 'Hearing voices or seeing things', urgent: true },
    { sign: 'Feeling disconnected from reality', urgent: true },
  ];

  const filteredHotlines = hotlines.filter(h => 
    !searchQuery || 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.country.toLowerCase().includes(searchQuery.toLowerCase())
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
                If you're in immediate danger or having thoughts of self-harm, please reach out immediately.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="destructive" size="sm" asChild>
                  <a href="tel:988">📞 Call 988</a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="sms:741741?body=HELLO">💬 Text 741741</a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/exercises">🌬️ Grounding Exercises</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search hotlines, resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="hotlines" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 mb-6">
            <TabsTrigger value="hotlines">
              <Phone className="w-4 h-4 mr-2" />
              Hotlines
            </TabsTrigger>
            <TabsTrigger value="professionals">
              <Heart className="w-4 h-4 mr-2" />
              Types
            </TabsTrigger>
            <TabsTrigger value="find">
              <MapPin className="w-4 h-4 mr-2" />
              Find Help
            </TabsTrigger>
            <TabsTrigger value="when">
              <Clock className="w-4 h-4 mr-2" />
              When to Seek
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hotlines" className="space-y-6">
            <div className="space-y-3">
              {filteredHotlines.map((hotline, index) => (
                <Card key={index} className="shadow-soft p-5 border-0 hover:shadow-elevated transition-smooth">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{hotline.name}</h3>
                        <Badge variant="secondary">{hotline.country}</Badge>
                        <Badge variant="outline">{hotline.available}</Badge>
                      </div>
                      <p className="text-primary font-mono text-xl mb-1">{hotline.number}</p>
                      <p className="text-muted-foreground text-sm">{hotline.description}</p>
                    </div>
                    <Button variant="default" size="sm" asChild>
                      <a href={hotline.type === 'call' ? `tel:${hotline.number.replace(/\D/g, '')}` : '#'}>
                        {hotline.type === 'call' ? <Phone className="w-4 h-4 mr-2" /> : <MessageCircle className="w-4 h-4 mr-2" />}
                        {hotline.type === 'call' ? 'Call' : 'Text'}
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* International Hotlines */}
            <Card className="shadow-soft p-6 border-0">
              <h3 className="text-xl font-semibold mb-4">🌍 International Hotlines</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {internationalHotlines.map((hotline, index) => (
                  <div key={index} className="p-3 rounded-xl bg-muted/50 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{hotline.country}</p>
                      <p className="text-sm text-muted-foreground">{hotline.name}</p>
                    </div>
                    <p className="font-mono text-primary">{hotline.number}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer">
                  Find More International Hotlines
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="professionals" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {professionals.map((pro, index) => (
                <Card key={index} className="shadow-soft p-6 border-0">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{pro.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{pro.type}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{pro.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-primary mt-0.5" />
                          <span><strong>Best for:</strong> {pro.when}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <DollarSign className="w-4 h-4 text-success mt-0.5" />
                          <span><strong>Cost:</strong> {pro.cost}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-warning mt-0.5" />
                          <span><strong>Education:</strong> {pro.education}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="find" className="space-y-4">
            <Card className="shadow-soft p-6 border-0 bg-gradient-to-br from-primary/10 to-accent/10 mb-6">
              <h3 className="text-lg font-semibold mb-2">Finding the Right Therapist</h3>
              <p className="text-muted-foreground">
                Finding a therapist is like dating - sometimes it takes a few tries to find the right fit. 
                Consider factors like specialty, approach, cost, and personal connection.
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {findTherapyLinks.map((link, index) => (
                <Card key={index} className="shadow-soft p-5 border-0 hover:shadow-elevated transition-smooth">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{link.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{link.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{link.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          Visit <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 text-center">
              <Video className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Online Therapy Options</h3>
              <p className="text-muted-foreground mb-4">
                Can't find local help? Online therapy connects you with licensed professionals from anywhere.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <Button asChild>
                  <a href="https://www.betterhelp.com" target="_blank" rel="noopener noreferrer">BetterHelp</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.talkspace.com" target="_blank" rel="noopener noreferrer">Talkspace</a>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="when" className="space-y-4">
            <Card className="shadow-soft p-6 border-0">
              <h3 className="text-xl font-semibold mb-4">When to Seek Professional Help</h3>
              <p className="text-muted-foreground mb-6">
                There's no wrong time to reach out for support. However, these signs indicate it may be especially helpful:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {whenToSeekHelp.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 p-3 rounded-xl ${
                      item.urgent ? 'bg-destructive/10 border border-destructive/30' : 'bg-muted/50'
                    }`}
                  >
                    {item.urgent ? (
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    ) : (
                      <Heart className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className={item.urgent ? 'font-medium' : ''}>{item.sign}</span>
                      {item.urgent && <Badge variant="destructive" className="ml-2">Urgent</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="shadow-elevated p-6 border-0 bg-gradient-to-br from-success/10 to-primary/10">
              <h3 className="text-xl font-semibold mb-3">Remember</h3>
              <ul className="space-y-2 text-foreground">
                <li>• Seeking help is a sign of strength, not weakness</li>
                <li>• Mental health is just as important as physical health</li>
                <li>• Treatment works - many people recover and thrive</li>
                <li>• You deserve support and care</li>
                <li>• It's okay to shop around for the right therapist</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Professionals;
