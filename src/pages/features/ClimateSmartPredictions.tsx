import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { ArrowLeft, CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClimateSmartPredictions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Climate Smart Predictions
          </h1>
          <p className="text-xl text-muted-foreground">
            Get AI-powered weather predictions and climate insights for better farming decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Weather */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CloudRain className="h-6 w-6 mr-2 text-primary" />
              Current Weather
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <Thermometer className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">28°C</div>
                <div className="text-sm text-muted-foreground">Temperature</div>
              </div>
              
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <Droplets className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-muted-foreground">Humidity</div>
              </div>
              
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <Wind className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">12 km/h</div>
                <div className="text-sm text-muted-foreground">Wind Speed</div>
              </div>
              
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <CloudRain className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">65%</div>
                <div className="text-sm text-muted-foreground">Rain Chance</div>
              </div>
            </div>
            
            <Button className="w-full">View Detailed Report</Button>
          </Card>

          {/* 7-Day Forecast */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">7-Day Weather Forecast</h3>
            
            <div className="space-y-3">
              {[
                { day: 'Today', weather: 'Partly Cloudy', temp: '28°C', rain: '65%' },
                { day: 'Tomorrow', weather: 'Rainy', temp: '26°C', rain: '85%' },
                { day: 'Thu', weather: 'Sunny', temp: '30°C', rain: '15%' },
                { day: 'Fri', weather: 'Cloudy', temp: '27°C', rain: '45%' },
                { day: 'Sat', weather: 'Rainy', temp: '25°C', rain: '80%' },
                { day: 'Sun', weather: 'Sunny', temp: '29°C', rain: '20%' },
                { day: 'Mon', weather: 'Partly Cloudy', temp: '28°C', rain: '35%' }
              ].map((forecast, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium">{forecast.day}</div>
                  <div className="text-sm text-muted-foreground">{forecast.weather}</div>
                  <div className="font-medium">{forecast.temp}</div>
                  <div className="text-sm text-muted-foreground">☔ {forecast.rain}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold mb-4">AI-Powered Climate Recommendations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <h4 className="font-semibold text-success mb-2">🌾 Optimal Planting Window</h4>
              <p className="text-sm text-muted-foreground">
                Next 3 days show ideal conditions for rice transplanting. Soil moisture levels will be optimal.
              </p>
            </div>
            
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <h4 className="font-semibold text-warning mb-2">⚠️ Heavy Rain Alert</h4>
              <p className="text-sm text-muted-foreground">
                Expected heavy rainfall on Friday. Secure harvested crops and check drainage systems.
              </p>
            </div>
            
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">💧 Irrigation Schedule</h4>
              <p className="text-sm text-muted-foreground">
                Reduce irrigation for next 2 days due to expected rainfall. Resume normal schedule on Sunday.
              </p>
            </div>
            
            <div className="p-4 bg-feature-teal/10 border border-feature-teal/20 rounded-lg">
              <h4 className="font-semibold text-feature-teal mb-2">🌡️ Temperature Alert</h4>
              <p className="text-sm text-muted-foreground">
                High temperatures expected next week. Plan shade management for sensitive crops.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClimateSmartPredictions;