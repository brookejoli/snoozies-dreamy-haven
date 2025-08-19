import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Menu, X, Star, Youtube, User, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import logoImage from '@/assets/snoozies-logo.png';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Stories', path: '/stories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-2 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logoImage} alt="Snoozies" className="h-12 w-auto" />
            <span className="text-2xl font-nunito font-bold text-gradient">
              Snoozies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-bold text-base transition-colors duration-300 hover:text-primary px-2 py-2 rounded-lg ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:bg-accent/50'
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
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 px-2 py-2 rounded-lg hover:bg-accent/50 font-bold"
              title="Visit our YouTube channel"
            >
              <Youtube className="h-5 w-5" />
              <span className="text-sm font-bold">Stories</span>
            </a>

            {/* Auth Navigation */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/story-management" 
                  className={`flex items-center gap-2 font-bold text-base transition-colors duration-300 hover:text-primary px-2 py-2 rounded-lg ${
                    isActive('/story-management')
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:bg-accent/50'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  Manage
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                <Link to="/auth" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
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
          <div className="md:hidden">
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

              {/* Mobile Auth Navigation */}
              {user ? (
                <>
                  <Link 
                    to="/story-management" 
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                      isActive('/story-management')
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:text-primary hover:bg-accent'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    Manage Stories
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors duration-300 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="block mx-3 my-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;