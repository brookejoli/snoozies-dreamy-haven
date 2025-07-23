import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Moon, Star, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-night">
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="mb-8">
          <Moon className="h-24 w-24 text-star-yellow mx-auto mb-4 float" />
          <Star className="h-8 w-8 text-primary mx-auto sparkle" />
        </div>
        <h1 className="text-6xl font-fredoka font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-fredoka font-semibold text-white mb-4">
          Oops! This page is still dreaming
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          It looks like this page wandered off into dreamland. Let's get you back to where the magic happens.
        </p>
        <Button asChild className="bg-white text-foreground hover:bg-white/90 px-8 py-4 text-lg">
          <Link to="/">
            <Home className="h-5 w-5 mr-2" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
