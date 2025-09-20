import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { 
  CloudRain, 
  Microscope, 
  Mic, 
  Bug, 
  Calendar, 
  Satellite, 
  Shield, 
  Phone, 
  TrendingUp,
  Users,
  Award,
  Headphones
} from 'lucide-react';

const Landing = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <CloudRain className="h-6 w-6" />,
      title: t('features.climateSmartPredictions'),
      description: 'Get AI-powered weather predictions and climate insights for better farming decisions.',
      color: 'bg-feature-blue',
    },
    {
      icon: <Microscope className="h-6 w-6" />,
      title: t('features.aiMicroplasticDetector'),
      description: 'Detect microplastics in your soil using advanced AI technology.',
      color: 'bg-feature-purple',
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: t('features.voiceBasedQueries'),
      description: 'Ask questions and get answers in Malayalam using voice commands.',
      color: 'bg-feature-orange',
    },
    {
      icon: <Bug className="h-6 w-6" />,
      title: t('features.cropDiseaseDetection'),
      description: 'Identify crop diseases early with AI-powered image recognition.',
      color: 'bg-feature-teal',
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: t('features.cropCalendar'),
      description: 'Plan your farming activities with personalized schedules and seasonal reminders.',
      color: 'bg-feature-purple',
    },
    {
      icon: <Satellite className="h-6 w-6" />,
      title: t('features.satelliteDamageMapping'),
      description: 'Monitor crop damage using satellite imagery and remote sensing.',
      color: 'bg-feature-blue',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('features.smartInsuranceConnector'),
      description: 'Connect with insurance providers for crop protection and claims.',
      color: 'bg-feature-teal',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: t('features.emergencySosSystem'),
      description: 'Emergency support system for urgent farming and weather-related issues.',
      color: 'bg-feature-orange',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t('features.marketIntelligence'),
      description: 'Get market prices, trends, and selling opportunities for your crops.',
      color: 'bg-feature-purple',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark min-h-screen flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="mr-2">🌟</span>
              AI-Powered Farming Assistant
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Farming for<br />
              <span className="text-yellow-300">Kerala Farmers</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
              {t('landing.subtitle')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/get-started">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto">
                  {t('landing.startJourney')} 
                  <span className="ml-2">→</span>
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary text-lg px-8 py-4 h-auto"
              >
                {t('landing.scheduleDemoCall')}
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">{t('landing.activeThousands')}</div>
                <div className="text-white/80">{t('landing.activeFarmers')}</div>
              </Card>
              
              <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">{t('landing.yieldIncrease')}</div>
                <div className="text-white/80">{t('landing.yieldIncreaseText')}</div>
              </Card>
              
              <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-2">
                  <Headphones className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/80">AI Support</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need for<br />
              <span className="text-primary">Smart Farming</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive support for Kerala farmers, from
              crop planning to harvest optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={`/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 border-border hover:border-primary/20">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform<br />
            <span className="text-yellow-300">Your Farming?</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Start your journey with Krishi Sakhi today and experience the power of
            AI-driven farming. Get personalized recommendations, weather alerts,
            and expert guidance in Malayalam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto">
                Start Free Trial
                <span className="ml-2">→</span>
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary text-lg px-8 py-4 h-auto"
            >
              Schedule Demo Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">🌾</span>
                </div>
                <div>
                  <div className="text-xl font-bold">Krishi Sakhi</div>
                  <div className="text-xs text-white/80">കൃഷി സഖി</div>
                </div>
              </div>
              <p className="text-white/80 mb-4 max-w-md">
                Empowering Kerala farmers with AI-driven insights, personalized recommendations,
                and modern farming solutions in Malayalam.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span>📘</span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span>🐦</span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span>📷</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-white/80">
                <li>AI Crop Advisory</li>
                <li>Weather Monitoring</li>
                <li>Pest Detection</li>
                <li>Farm Analytics</li>
                <li>Market Insights</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-white/80">
                <p>📍 Technopark, Thiruvananthapuram, Kerala 695581</p>
                <p>📞 +91 471 2700 200</p>
                <p>✉️ support@krishisakhi.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80">© 2024 Krishi Sakhi. All rights reserved.</p>
            <div className="flex space-x-6 text-white/80 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;