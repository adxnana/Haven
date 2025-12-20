import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Search, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import { storage, JournalEntry } from '@/lib/storage';
import { format } from 'date-fns';
import { toast } from 'sonner';

const emotions = ['Happy', 'Sad', 'Anxious', 'Grateful', 'Excited', 'Calm', 'Frustrated', 'Peaceful'];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  useEffect(() => {
    setEntries(storage.getJournalEntries());
  }, []);

  const handleSaveEntry = () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      title,
      content,
      emotions: selectedEmotions,
    };

    storage.saveJournalEntry(entry);
    setEntries(storage.getJournalEntries());
    toast.success('Entry saved!');
    
    setTitle('');
    setContent('');
    setSelectedEmotions([]);
    setIsDialogOpen(false);
  };

  const handleDeleteEntry = (id: string) => {
    storage.deleteJournalEntry(id);
    setEntries(storage.getJournalEntries());
    toast.success('Entry deleted');
  };

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev =>
      prev.includes(emotion) ? prev.filter(e => e !== emotion) : [...prev, emotion]
    );
  };

  const filteredEntries = entries
    .filter(entry =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Journal</h1>
              <p className="text-muted-foreground">Your private thoughts</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-elevated">
                <Plus className="w-5 h-5 mr-2" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>New Journal Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    placeholder="Give your entry a title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
                  <div className="flex flex-wrap gap-2">
                    {emotions.map((emotion) => (
                      <Badge
                        key={emotion}
                        variant={selectedEmotions.includes(emotion) ? 'default' : 'outline'}
                        className="cursor-pointer transition-smooth hover:scale-105"
                        onClick={() => toggleEmotion(emotion)}
                      >
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Your thoughts</label>
                  <Textarea
                    placeholder="Write your thoughts here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-64 resize-none"
                  />
                </div>

                <Button onClick={handleSaveEntry} className="w-full" size="lg">
                  Save Entry
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="shadow-soft p-6 border-0 group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(entry.date), 'EEEE, MMMM d, yyyy h:mm a')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="opacity-0 group-hover:opacity-100 transition-smooth"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
              
              {entry.emotions.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-3">
                  {entry.emotions.map((emotion) => (
                    <Badge key={emotion} variant="secondary" className="text-xs">
                      {emotion}
                    </Badge>
                  ))}
                </div>
              )}
              
              <p className="text-foreground whitespace-pre-wrap">{entry.content}</p>
            </Card>
          ))}
          
          {filteredEntries.length === 0 && (
            <Card className="shadow-soft p-12 border-0 text-center">
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'No entries found' : 'No journal entries yet'}
              </p>
              {!searchQuery && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  Create your first entry
                </Button>
              )}
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Journal;
