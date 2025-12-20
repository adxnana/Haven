import { useState, useRef } from 'react';
import { Download, Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { format } from 'date-fns';

const DataManager = () => {
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAllData = () => {
    const data: Record<string, unknown> = {};
    
    // Get all haven-related data from localStorage
    const keys = [
      'haven_moods',
      'haven_journal',
      'haven_habits',
      'haven_routines',
      'haven_theme',
      'haven_favorites',
      'haven_quotes',
      'haven_dark_mode',
    ];

    keys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    });

    return data;
  };

  const exportData = (formatType: 'json' | 'csv') => {
    const data = getAllData();

    if (formatType === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `haven-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Data exported as JSON');
    } else {
      // Convert to CSV format for mood data
      const moods = data.haven_moods as Array<{
        id: string;
        date: string;
        mood: string;
        intensity: number;
        note: string;
        triggers: string[];
      }> || [];
      
      if (moods.length === 0) {
        toast.error('No mood data to export');
        return;
      }

      const csvHeader = 'Date,Mood,Intensity,Note,Triggers\n';
      const csvRows = moods.map(m => 
        `"${m.date}","${m.mood}",${m.intensity},"${m.note?.replace(/"/g, '""') || ''}","${m.triggers?.join(', ') || ''}"`
      ).join('\n');

      const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `haven-moods-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Mood data exported as CSV');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        // Validate and import data
        let importedCount = 0;

        Object.entries(data).forEach(([key, value]) => {
          if (key.startsWith('haven_')) {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
            importedCount++;
          }
        });

        toast.success(`Successfully imported ${importedCount} data categories`);
        
        // Refresh the page to reflect changes
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        toast.error('Invalid file format. Please use a Haven export file.');
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.onerror = () => {
      toast.error('Failed to read file');
      setIsImporting(false);
    };

    reader.readAsText(file);
  };

  const dataCategories = [
    { key: 'haven_moods', name: 'Mood Entries', icon: '😊' },
    { key: 'haven_journal', name: 'Journal Entries', icon: '📓' },
    { key: 'haven_habits', name: 'Habits', icon: '✅' },
    { key: 'haven_routines', name: 'Routines', icon: '🌅' },
    { key: 'haven_favorites', name: 'Favorites', icon: '⭐' },
  ];

  const getCount = (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) return 0;
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed.length : 1;
    } catch {
      return 0;
    }
  };

  return (
    <Card className="shadow-soft p-6 border-0">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Data Import/Export</h2>
      </div>

      <p className="text-muted-foreground mb-6">
        Export your data to backup or transfer to another device. Import previously exported data to restore your entries.
      </p>

      {/* Data Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {dataCategories.map(category => {
          const count = getCount(category.key);
          return (
            <div key={category.key} className="text-center p-3 bg-muted rounded-lg">
              <span className="text-2xl mb-1 block">{category.icon}</span>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">{category.name}</p>
            </div>
          );
        })}
      </div>

      {/* Export Buttons */}
      <div className="space-y-4">
        <h3 className="font-medium">Export Data</h3>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => exportData('json')} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export All (JSON)
          </Button>
          <Button onClick={() => exportData('csv')} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Moods (CSV)
          </Button>
        </div>
      </div>

      {/* Import Section */}
      <div className="space-y-4 mt-6">
        <h3 className="font-medium">Import Data</h3>
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            id="import-file"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            disabled={isImporting}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            {isImporting ? 'Importing...' : 'Import from File'}
          </Button>
        </div>
        <div className="flex items-start gap-2 p-3 bg-muted rounded-lg text-sm">
          <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-muted-foreground">
            Importing data will merge with existing data. Use a Haven JSON export file for best results.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DataManager;
