import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Calendar, Plus, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CropCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const cropActivities = [
    {
      date: '15 Dec',
      crop: 'Rice Paddy - Block A',
      activity: 'Fertilizer Application',
      status: 'pending',
      priority: 'high'
    },
    {
      date: '18 Dec',
      crop: 'Coconut Grove',
      activity: 'Pest Inspection',
      status: 'pending',
      priority: 'medium'
    },
    {
      date: '20 Dec',
      crop: 'Vegetable Garden',
      activity: 'Harvest Tomatoes',
      status: 'pending',
      priority: 'high'
    },
    {
      date: '12 Dec',
      crop: 'Rice Paddy - Block B',
      activity: 'Irrigation Check',
      status: 'completed',
      priority: 'medium'
    },
    {
      date: '10 Dec',
      crop: 'Pepper Vine',
      activity: 'Pruning',
      status: 'completed',
      priority: 'low'
    }
  ];

  const upcomingTasks = cropActivities.filter(activity => activity.status === 'pending');
  const completedTasks = cropActivities.filter(activity => activity.status === 'completed');

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
            Crop Calendar
          </h1>
          <p className="text-xl text-muted-foreground">
            Plan your farming activities with personalized schedules and seasonal reminders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-primary" />
                Calendar View
              </h3>
              
              <div className="grid grid-cols-3 gap-2 mb-6">
                {months.map((month, index) => (
                  <Button
                    key={month}
                    variant={selectedMonth === index ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedMonth(index)}
                    className="text-xs"
                  >
                    {month.slice(0, 3)}
                  </Button>
                ))}
              </div>
              
              <Button className="w-full mb-4">
                <Plus className="h-4 w-4 mr-2" />
                Add New Activity
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p className="mb-2"><span className="inline-block w-3 h-3 bg-success rounded-full mr-2"></span>Completed</p>
                <p className="mb-2"><span className="inline-block w-3 h-3 bg-warning rounded-full mr-2"></span>Pending</p>
                <p><span className="inline-block w-3 h-3 bg-destructive rounded-full mr-2"></span>Overdue</p>
              </div>
            </Card>
          </div>

          {/* Activities List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Tasks */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Upcoming Activities</h3>
              
              <div className="space-y-4">
                {upcomingTasks.map((activity, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${
                    activity.priority === 'high' ? 'border-destructive/20 bg-destructive/5' :
                    activity.priority === 'medium' ? 'border-warning/20 bg-warning/5' :
                    'border-border bg-muted/30'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-muted-foreground">{activity.date}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            activity.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                            activity.priority === 'medium' ? 'bg-warning/20 text-warning' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {activity.priority} priority
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground">{activity.activity}</h4>
                        <p className="text-sm text-muted-foreground">{activity.crop}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Completed Tasks */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recently Completed</h3>
              
              <div className="space-y-4">
                {completedTasks.map((activity, index) => (
                  <div key={index} className="p-4 border border-success/20 bg-success/5 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm font-medium text-muted-foreground">{activity.date}</span>
                        </div>
                        <h4 className="font-semibold text-foreground">{activity.activity}</h4>
                        <p className="text-sm text-muted-foreground">{activity.crop}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Seasonal Recommendations */}
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold mb-4">Seasonal Farming Calendar for Kerala</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">🌧️ Monsoon (Jun-Sep)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Rice transplanting</li>
                <li>• Coconut harvesting</li>
                <li>• Spice planting</li>
              </ul>
            </div>
            
            <div className="p-4 bg-feature-orange/10 border border-feature-orange/20 rounded-lg">
              <h4 className="font-semibold text-feature-orange mb-2">☀️ Post-Monsoon (Oct-Nov)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Vegetable sowing</li>
                <li>• Pepper harvesting</li>
                <li>• Land preparation</li>
              </ul>
            </div>
            
            <div className="p-4 bg-feature-blue/10 border border-feature-blue/20 rounded-lg">
              <h4 className="font-semibold text-feature-blue mb-2">🌤️ Winter (Dec-Feb)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Rice harvesting</li>
                <li>• Vegetable cultivation</li>
                <li>• Irrigation planning</li>
              </ul>
            </div>
            
            <div className="p-4 bg-feature-purple/10 border border-feature-purple/20 rounded-lg">
              <h4 className="font-semibold text-feature-purple mb-2">🌞 Summer (Mar-May)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Summer crops</li>
                <li>• Irrigation intensive</li>
                <li>• Shade management</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CropCalendar;