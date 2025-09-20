import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { 
  CheckCircle, 
  TrendingUp, 
  Calendar, 
  AlertTriangle, 
  Cloud, 
  Droplets,
  Plus,
  BarChart,
  MessageCircle,
  CalendarDays
} from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();

  const farmerName = "രാജേഷ് കുമാർ"; // Placeholder farmer name

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('home.welcome')}{farmerName}
          </h1>
          <p className="text-muted-foreground">
            Here's your farm overview for today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-success text-white">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold mb-1">12</div>
            <div className="text-sm opacity-90">{t('home.activeCrops')}</div>
          </Card>
          
          <Card className="p-4 border-border">
            <div className="flex items-center justify-center mb-2 text-success">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-success mb-1">+25%</div>
            <div className="text-xs text-muted-foreground">{t('home.yieldIncrease')}</div>
          </Card>
          
          <Card className="p-4 border-border">
            <div className="flex items-center justify-center mb-2 text-muted-foreground">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">5</div>
            <div className="text-xs text-muted-foreground">{t('home.pendingTasks')}</div>
          </Card>
          
          <Card className="p-4 border-border">
            <div className="flex items-center justify-center mb-2 text-warning">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">3</div>
            <div className="text-xs text-muted-foreground">{t('home.alerts')}</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weather Widget */}
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center mb-4">
              <Cloud className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">{t('home.weatherToday')}</h3>
            </div>
            <div className="mb-4">
              <div className="text-sm opacity-90">Kochi, Kerala</div>
            </div>
            
            <div className="text-4xl font-bold mb-4">28°C</div>
            
            <div className="flex items-center mb-4">
              <Droplets className="h-4 w-4 mr-2" />
              <span className="text-sm">85% {t('home.humidity')}</span>
            </div>
            
            <p className="text-sm opacity-90">
              Partly cloudy with chances of evening showers.
              Good conditions for watering.
            </p>
          </Card>

          {/* AI Recommendations */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 mr-2 text-primary" />
                <h3 className="text-xl font-semibold">{t('home.aiRecommendations')}</h3>
              </div>
              <p className="text-muted-foreground mb-6">{t('home.personalizedAdvice')}</p>
              
              <div className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="font-medium text-success mb-1">Rice Paddy - Block A</div>
                  <p className="text-sm text-muted-foreground">
                    Perfect time for fertilizer application. Apply NPK 20:10:10.
                  </p>
                </div>
                
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="font-medium text-warning mb-1">Coconut Grove</div>
                  <p className="text-sm text-muted-foreground">
                    Monitor for rhinoceros beetle. Check tree crowns daily.
                  </p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Recommendations
              </Button>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">{t('home.quickActions')}</h3>
            <p className="text-muted-foreground mb-6">{t('home.logActivities')}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-16 flex-col space-y-2 bg-primary hover:bg-primary-dark">
                <Plus className="h-5 w-5" />
                <span className="text-sm">{t('home.logFarmActivity')}</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <CalendarDays className="h-5 w-5" />
                <span className="text-sm">{t('home.viewFarmCalendar')}</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">{t('home.askAiAssistant')}</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <BarChart className="h-5 w-5" />
                <span className="text-sm">{t('home.viewAnalytics')}</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Farm Activities</h3>
          <Card className="p-6">
            <p className="text-muted-foreground mb-6">Your latest logged activities and system updates</p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 pb-4 border-b border-border">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-medium">Irrigation - Rice Block A</div>
                  <div className="text-sm text-muted-foreground">
                    Completed morning irrigation cycle. Water level optimal.
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-medium">Pest Monitoring - Coconut</div>
                  <div className="text-sm text-muted-foreground">
                    Weekly inspection completed. No pest activity detected.
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">1 day ago</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;