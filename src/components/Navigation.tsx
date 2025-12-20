import { Home, Heart, BookOpen, Wind, Library, Settings, Target, CheckSquare, LifeBuoy, Users, GraduationCap, Activity, Phone, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mainNavItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/mood', icon: Heart, label: 'Mood' },
    { to: '/journal', icon: BookOpen, label: 'Journal' },
    { to: '/exercises', icon: Wind, label: 'Exercises' },
    { to: '/resources', icon: Library, label: 'Resources' },
  ];

  const moreNavItems = [
    { to: '/community', icon: Users, label: 'Community' },
    { to: '/learn', icon: GraduationCap, label: 'Learn' },
    { to: '/professionals', icon: Phone, label: 'Get Help' },
    { to: '/routines', icon: Target, label: 'Routines' },
    { to: '/habits', icon: CheckSquare, label: 'Habits' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const allItems = [...mainNavItems, ...moreNavItems];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-card border-b border-border shadow-soft">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-1">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-xl transition-smooth ${
                    isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {moreNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-xl transition-smooth ${
                    isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevated z-50 md:hidden">
        <div className="flex justify-around items-center px-2 py-2">
          {mainNavItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-smooth ${
                  isActive ? 'bg-primary/10 text-primary' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
          
          {/* More Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-smooth">
                <Menu className="w-5 h-5" />
                <span className="text-xs font-medium">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-3xl">
              <div className="grid grid-cols-3 gap-4 py-6">
                {allItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex flex-col items-center gap-2 p-4 rounded-2xl transition-smooth ${
                        isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                      }`
                    }
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
