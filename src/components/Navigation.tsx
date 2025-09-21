import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Globe, LogOut } from 'lucide-react';

const Navigation = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌾</span>
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">Krishi Sakhi</div>
              <div className="text-xs text-muted-foreground">കൃഷി സഖി</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/features/voice-based-queries" className="text-foreground hover:text-primary transition-colors">
                  {t('nav.voiceQueries')}
                </Link>
                <Link to="/features/climate-smart-predictions" className="text-foreground hover:text-primary transition-colors">
                  {t('nav.climatePredictions')}
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-foreground hover:text-primary transition-colors">
                  {t('nav.features')}
                </Link>
                <Link to="/" className="text-foreground hover:text-primary transition-colors">
                  {t('nav.howItWorks')}
                </Link>
                <Link to="/" className="text-foreground hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'ML' : 'EN'}
              </span>
            </Button>

            {user ? (
              /* Authenticated User Actions */
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('nav.signOut')}</span>
              </Button>
            ) : (
              /* Unauthenticated User Actions */
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button size="sm" className="bg-primary hover:bg-primary-dark text-white">
                    {t('nav.getStarted')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;