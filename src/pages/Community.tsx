import { useState } from 'react';
import { ArrowLeft, Users, MessageCircle, Heart, Shield, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';

const Community = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const supportGroups = [
    {
      id: 'anxiety',
      name: 'Anxiety Support Circle',
      members: 15420,
      description: 'A safe space to share experiences and coping strategies for anxiety',
      topics: ['panic attacks', 'social anxiety', 'GAD', 'coping tips'],
      icon: '💙',
    },
    {
      id: 'depression',
      name: 'Depression Warriors',
      members: 12890,
      description: 'Supporting each other through difficult times with understanding',
      topics: ['daily struggles', 'motivation', 'self-care', 'recovery stories'],
      icon: '💜',
    },
    {
      id: 'stress',
      name: 'Stress Management Hub',
      members: 8750,
      description: 'Share tips and strategies for managing daily stress',
      topics: ['work stress', 'burnout', 'relaxation', 'time management'],
      icon: '💚',
    },
    {
      id: 'sleep',
      name: 'Sleep Better Together',
      members: 6320,
      description: 'For those struggling with sleep issues and insomnia',
      topics: ['insomnia', 'sleep hygiene', 'nighttime anxiety', 'tips'],
      icon: '🌙',
    },
    {
      id: 'grief',
      name: 'Grief & Loss Support',
      members: 4580,
      description: 'A compassionate community for processing grief',
      topics: ['loss', 'healing', 'memories', 'moving forward'],
      icon: '🤍',
    },
    {
      id: 'teens',
      name: 'Teen Mental Health',
      members: 9120,
      description: 'Peer support for teens navigating mental health',
      topics: ['school stress', 'peer pressure', 'identity', 'family'],
      icon: '🌟',
    },
  ];

  const forums = [
    {
      title: 'Daily Check-In',
      description: 'Share how you\'re feeling today',
      posts: 342,
      lastActive: '2 min ago',
      category: 'General',
    },
    {
      title: 'Coping Strategies That Work',
      description: 'Share your tried and tested techniques',
      posts: 1250,
      lastActive: '15 min ago',
      category: 'Tips',
    },
    {
      title: 'Success Stories',
      description: 'Celebrate your wins, big or small',
      posts: 856,
      lastActive: '1 hour ago',
      category: 'Inspiration',
    },
    {
      title: 'New to Therapy?',
      description: 'Questions and experiences about starting therapy',
      posts: 543,
      lastActive: '30 min ago',
      category: 'Resources',
    },
    {
      title: 'Medication Experiences',
      description: 'Discuss medications with others (not medical advice)',
      posts: 421,
      lastActive: '45 min ago',
      category: 'Discussion',
    },
    {
      title: 'Mindfulness & Meditation',
      description: 'Share your practice and learn from others',
      posts: 678,
      lastActive: '20 min ago',
      category: 'Practice',
    },
  ];

  const peerSupport = [
    {
      name: 'Sarah M.',
      role: 'Peer Supporter',
      specialties: ['Anxiety', 'Social Skills'],
      available: true,
      avatar: '👩‍🦰',
    },
    {
      name: 'Marcus T.',
      role: 'Recovery Mentor',
      specialties: ['Depression', 'Self-Care'],
      available: true,
      avatar: '👨',
    },
    {
      name: 'Alex K.',
      role: 'Peer Supporter',
      specialties: ['Stress', 'Work-Life Balance'],
      available: false,
      avatar: '🧑',
    },
    {
      name: 'Priya R.',
      role: 'Community Leader',
      specialties: ['Mindfulness', 'Grief'],
      available: true,
      avatar: '👩',
    },
  ];

  const externalCommunities = [
    {
      name: 'Reddit r/mentalhealth',
      description: 'Large community for mental health discussions',
      url: 'https://reddit.com/r/mentalhealth',
      members: '900K+',
    },
    {
      name: 'NAMI Connection Groups',
      description: 'Free peer-led support groups',
      url: 'https://www.nami.org/Support-Education/Support-Groups',
      members: 'Nationwide',
    },
    {
      name: '7 Cups',
      description: 'Free emotional support and counseling',
      url: 'https://www.7cups.com',
      members: 'Global',
    },
    {
      name: 'Mental Health America',
      description: 'Resources and community support',
      url: 'https://mhanational.org',
      members: 'Nationwide',
    },
    {
      name: 'The Mighty',
      description: 'Stories and support for chronic conditions',
      url: 'https://themighty.com',
      members: '3M+',
    },
  ];

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
            <h1 className="text-3xl font-bold">Community</h1>
            <p className="text-muted-foreground">Connect with others who understand</p>
          </div>
        </div>

        {/* Safety Notice */}
        <Card className="shadow-soft p-4 border-2 border-primary/30 bg-primary/5">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-primary mb-1">Safe Space Guidelines</h3>
              <p className="text-sm text-muted-foreground">
                This is a moderated community. Be kind, respectful, and supportive. 
                For emergencies, please contact professional help immediately.
              </p>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 mb-6">
            <TabsTrigger value="groups">
              <Users className="w-4 h-4 mr-2" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="forums">
              <MessageCircle className="w-4 h-4 mr-2" />
              Forums
            </TabsTrigger>
            <TabsTrigger value="peers">
              <Heart className="w-4 h-4 mr-2" />
              Peer Support
            </TabsTrigger>
            <TabsTrigger value="external">
              <Globe className="w-4 h-4 mr-2" />
              More
            </TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {supportGroups.map((group) => (
                <Card 
                  key={group.id} 
                  className="shadow-soft p-6 border-0 hover:shadow-elevated transition-smooth cursor-pointer"
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{group.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{group.name}</h3>
                        <Badge variant="secondary">{group.members.toLocaleString()} members</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{group.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.topics.map((topic) => (
                          <span key={topic} className="px-2 py-1 bg-muted rounded-full text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Join Group
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forums" className="space-y-4">
            {forums.map((forum, index) => (
              <Card key={index} className="shadow-soft p-5 border-0 hover:shadow-elevated transition-smooth cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{forum.title}</h3>
                      <Badge variant="outline" className="text-xs">{forum.category}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{forum.description}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">{forum.posts} posts</p>
                    <p className="text-muted-foreground text-xs">{forum.lastActive}</p>
                  </div>
                </div>
              </Card>
            ))}
            
            <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-accent/10">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Start a Discussion</h3>
              <p className="text-muted-foreground mb-4">Share your thoughts or ask for support</p>
              <Button>Create New Post</Button>
            </Card>
          </TabsContent>

          <TabsContent value="peers" className="space-y-4">
            <Card className="shadow-soft p-6 border-0 bg-gradient-to-br from-accent/10 to-primary/10 mb-6">
              <h3 className="text-lg font-semibold mb-2">What is Peer Support?</h3>
              <p className="text-muted-foreground">
                Peer supporters are trained individuals who have lived experience with mental health challenges. 
                They offer understanding, hope, and practical guidance based on their own journey.
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {peerSupport.map((peer, index) => (
                <Card key={index} className="shadow-soft p-6 border-0">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{peer.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{peer.name}</h3>
                        <Badge variant={peer.available ? 'default' : 'secondary'}>
                          {peer.available ? 'Available' : 'Offline'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{peer.role}</p>
                      <div className="flex flex-wrap gap-2">
                        {peer.specialties.map((specialty) => (
                          <span key={specialty} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={peer.available ? 'default' : 'outline'} 
                    size="sm" 
                    className="w-full mt-4"
                    disabled={!peer.available}
                  >
                    {peer.available ? 'Request Chat' : 'Unavailable'}
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="p-6 text-center">
              <h3 className="font-semibold mb-2">Become a Peer Supporter</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Help others by sharing your experience. Training provided.
              </p>
              <Button variant="outline">Learn More</Button>
            </Card>
          </TabsContent>

          <TabsContent value="external" className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Connect with established mental health communities and organizations worldwide.
            </p>
            
            {externalCommunities.map((community, index) => (
              <Card key={index} className="shadow-soft p-5 border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{community.name}</h3>
                    <p className="text-muted-foreground text-sm">{community.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">{community.members}</Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={community.url} target="_blank" rel="noopener noreferrer">
                        Visit →
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Community;
