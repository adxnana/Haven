import { useState } from 'react';
import { ArrowLeft, BookOpen, Music, Heart, ExternalLink, Search, Star, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { storage, ResourceFavorite } from '@/lib/storage';
import { toast } from 'sonner';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<ResourceFavorite[]>(storage.getFavorites());

  const articles = [
    {
      id: 'anxiety-101',
      title: 'Understanding Anxiety',
      description: 'Learn about anxiety symptoms and coping strategies',
      category: 'Mental Health',
      url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
      keywords: ['anxiety', 'stress', 'panic', 'worry'],
    },
    {
      id: 'sleep-guide',
      title: 'Sleep Hygiene Guide',
      description: 'Tips for better sleep and rest',
      category: 'Wellness',
      url: 'https://www.sleepfoundation.org/sleep-hygiene',
      keywords: ['sleep', 'insomnia', 'rest', 'tired'],
    },
    {
      id: 'mindfulness-basics',
      title: 'Mindfulness for Beginners',
      description: 'Start your mindfulness journey',
      category: 'Practice',
      url: 'https://www.mindful.org/meditation/mindfulness-getting-started/',
      keywords: ['mindfulness', 'meditation', 'calm', 'present'],
    },
    {
      id: 'stress-management',
      title: 'Managing Stress',
      description: 'Practical techniques for daily stress',
      category: 'Mental Health',
      url: 'https://www.apa.org/topics/stress',
      keywords: ['stress', 'coping', 'overwhelmed'],
    },
    {
      id: 'depression-guide',
      title: 'Understanding Depression',
      description: 'Recognizing signs and finding support',
      category: 'Mental Health',
      url: 'https://www.nimh.nih.gov/health/topics/depression',
      keywords: ['depression', 'sad', 'hopeless', 'mood'],
    },
    {
      id: 'self-care',
      title: 'Self-Care Essentials',
      description: 'Building a sustainable self-care routine',
      category: 'Wellness',
      url: 'https://www.psychologytoday.com/us/basics/self-care',
      keywords: ['self-care', 'wellness', 'routine', 'health'],
    },
  ];

  const playlists = [
    {
      id: 'calm-focus',
      title: 'Calm Focus',
      description: 'Lofi beats for studying and relaxation',
      mood: 'Calm',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
      keywords: ['lofi', 'study', 'focus', 'calm'],
    },
    {
      id: 'deep-sleep',
      title: 'Deep Sleep',
      description: 'Gentle sounds for restful sleep',
      mood: 'Sleepy',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp',
      keywords: ['sleep', 'rest', 'night', 'peaceful'],
    },
    {
      id: 'morning-energy',
      title: 'Morning Energy',
      description: 'Uplifting music to start your day',
      mood: 'Energized',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0',
      keywords: ['morning', 'energy', 'uplifting', 'happy'],
    },
    {
      id: 'meditation',
      title: 'Meditation Soundscapes',
      description: 'Ambient sounds for deep meditation',
      mood: 'Peaceful',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DX9uKNf5jGX6m',
      keywords: ['meditation', 'ambient', 'peaceful', 'mindful'],
    },
    {
      id: 'anxiety-relief',
      title: 'Anxiety Relief',
      description: 'Calming music to ease anxious thoughts',
      mood: 'Anxious',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa',
      keywords: ['anxiety', 'calm', 'relief', 'soothing'],
    },
  ];

  const books = [
    {
      id: 'anxiety-workbook',
      title: 'The Anxiety and Phobia Workbook',
      author: 'Edmund Bourne',
      description: 'Practical guide for managing anxiety',
      keywords: ['anxiety', 'phobia', 'workbook', 'cbt'],
    },
    {
      id: 'feeling-good',
      title: 'Feeling Good',
      author: 'David Burns',
      description: 'Cognitive behavioral therapy techniques',
      keywords: ['depression', 'cbt', 'therapy', 'mood'],
    },
    {
      id: 'mindful-depression',
      title: 'The Mindful Way Through Depression',
      author: 'Mark Williams et al.',
      description: 'Using mindfulness to break free from depression',
      keywords: ['mindfulness', 'depression', 'meditation'],
    },
    {
      id: 'lost-connections',
      title: 'Lost Connections',
      author: 'Johann Hari',
      description: 'Understanding the real causes of depression',
      keywords: ['depression', 'society', 'connection'],
    },
    {
      id: 'body-keeps-score',
      title: 'The Body Keeps the Score',
      author: 'Bessel van der Kolk',
      description: 'Understanding and healing trauma',
      keywords: ['trauma', 'ptsd', 'healing', 'therapy'],
    },
  ];

  const hotlines = [
    {
      name: '988 Suicide & Crisis Lifeline',
      number: '988',
      description: 'Free, 24/7 crisis support (USA)',
    },
    {
      name: 'Crisis Text Line',
      number: 'Text "HELLO" to 741741',
      description: 'Free, 24/7 text support',
    },
    {
      name: 'SAMHSA Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral (USA)',
    },
  ];

  const toggleFavorite = (type: 'article' | 'playlist' | 'book', id: string, title: string) => {
    const existing = favorites.find(f => f.id === id);
    if (existing) {
      storage.removeFavorite(id);
      setFavorites(favorites.filter(f => f.id !== id));
      toast.success('Removed from favorites');
    } else {
      const fav: ResourceFavorite = {
        id,
        type,
        title,
        date: new Date().toISOString(),
      };
      storage.addFavorite(fav);
      setFavorites([...favorites, fav]);
      toast.success('Added to favorites');
    }
  };

  const isFavorite = (id: string) => favorites.some(f => f.id === id);

  const filterBySearch = (item: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.keywords?.some((k: string) => k.toLowerCase().includes(query)) ||
      item.category?.toLowerCase().includes(query) ||
      item.author?.toLowerCase().includes(query)
    );
  };

  const filteredArticles = articles.filter(filterBySearch);
  const filteredPlaylists = playlists.filter(filterBySearch);
  const filteredBooks = books.filter(filterBySearch);

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
            <h1 className="text-3xl font-bold">Resources</h1>
            <p className="text-muted-foreground">Curated content for your wellbeing</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search articles, playlists, books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Crisis Hotlines */}
        <Card className="shadow-elevated p-6 border-2 border-destructive/50 bg-destructive/5">
          <div className="flex items-start gap-3 mb-4">
            <Phone className="w-6 h-6 text-destructive flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                If you're in crisis, please reach out. You're not alone.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {hotlines.map((hotline, index) => (
              <div key={index} className="p-3 rounded-lg bg-background">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{hotline.name}</p>
                    <p className="text-primary font-mono">{hotline.number}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{hotline.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3" asChild>
            <Link to="/help">More Support Resources</Link>
          </Button>
        </Card>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
            <TabsTrigger value="articles">
              <BookOpen className="w-4 h-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="playlists">
              <Music className="w-4 h-4 mr-2" />
              Playlists
            </TabsTrigger>
            <TabsTrigger value="books">
              <Heart className="w-4 h-4 mr-2" />
              Books
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="shadow-soft p-6 border-0 hover:shadow-elevated transition-smooth">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                      <p className="text-muted-foreground mb-3">{article.description}</p>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {article.category}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite('article', article.id, article.title)}
                    >
                      <Star className={`w-5 h-5 ${isFavorite(article.id) ? 'fill-warning text-warning' : ''}`} />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4" asChild>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </Card>
              ))}
            </div>
            {filteredArticles.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No articles found matching your search.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="playlists" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredPlaylists.map((playlist) => (
                <Card key={playlist.id} className="shadow-soft p-6 border-0 hover:shadow-elevated transition-smooth group">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center group-hover:scale-110 transition-bounce flex-shrink-0">
                      <Music className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-semibold truncate">{playlist.title}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite('playlist', playlist.id, playlist.title)}
                        >
                          <Star className={`w-5 h-5 ${isFavorite(playlist.id) ? 'fill-warning text-warning' : ''}`} />
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{playlist.description}</p>
                      <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                        {playlist.mood}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                    <a href={playlist.url} target="_blank" rel="noopener noreferrer">
                      Listen Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </Card>
              ))}
            </div>
            {filteredPlaylists.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No playlists found matching your search.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="books" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="shadow-soft p-6 border-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-16 rounded bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-semibold">{book.title}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite('book', book.id, book.title)}
                        >
                          <Star className={`w-5 h-5 ${isFavorite(book.id) ? 'fill-warning text-warning' : ''}`} />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                      <p className="text-sm text-foreground">{book.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {filteredBooks.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No books found matching your search.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Today's Pick */}
        <Card className="shadow-elevated p-6 border-0 bg-gradient-to-br from-accent/20 to-primary/20">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent" />
            Resource of the Day
          </h3>
          <p className="text-foreground mb-4">
            Based on your recent moods, we suggest exploring mindfulness practices. Try the "Calm Focus" playlist while journaling.
          </p>
          <Button variant="default">Explore Now</Button>
        </Card>
      </main>
    </div>
  );
};

export default Resources;
