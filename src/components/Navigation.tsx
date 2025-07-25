import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Menu, X, Star, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import logoImage from '@/assets/snoozies-logo.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Stories', path: '/stories' },
    { name: 'Suggest Story', path: '/story-suggestions' },
    { name: 'Subscribe', path: '/subscribe' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={logoImage} alt="Snoozies" className="h-8 w-auto" />
            <span className="text-lg font-nunito font-semibold text-gradient">
              Snoozies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium text-sm transition-colors duration-300 hover:text-primary ${
                  isActive(item.path)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* YouTube Button */}
            <a
              href="https://www.youtube.com/@snooziestories"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 px-1 py-1 rounded-lg hover:bg-accent"
              title="Visit our YouTube channel"
            >
              <Youtube className="h-4 w-4" />
              <span className="text-xs font-medium">Stories</span>
            </a>
            
            <Button className="btn-dreamy text-xs px-3 py-1">
              Try Free
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-accent'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile YouTube Button */}
              <a
                href="https://www.youtube.com/@snooziestories"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                <Youtube className="h-5 w-5" />
                YouTube Stories
              </a>
              
              <div className="px-3 py-2">
                <Button className="btn-dreamy w-full">
                  Try Free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;