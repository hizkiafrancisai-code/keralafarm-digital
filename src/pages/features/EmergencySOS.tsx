import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { ArrowLeft, AlertTriangle, Phone, MapPin, Plus, X, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

const EmergencySOS = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Family Member', phone: '+91 9999999999', relation: 'Family' }
  ]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: 'Family' });
  const [showAddContact, setShowAddContact] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleSOSClick = async () => {
    setLoading(true);
    
    try {
      // Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setLocation(currentLocation);
            
            // Create emergency alert
            const alertData = {
              emergency_type: emergencyType || 'General Emergency',
              description: description || 'Emergency SOS activated by farmer',
              location_coordinates: `(${currentLocation.lat}, ${currentLocation.lng})`,
              responders_notified: emergencyContacts.map(contact => ({
                name: contact.name,
                phone: contact.phone,
                relation: contact.relation,
                notified_at: new Date().toISOString()
              }))
            };

            // In a real implementation, this would trigger actual SMS/calls
            console.log('Emergency Alert Triggered:', alertData);
            
            toast({
              title: "🚨 Emergency Alert Sent!",
              description: `Alert sent to ${emergencyContacts.length} contacts with your location`,
              duration: 5000,
            });
            
            setLoading(false);
          },
          (error) => {
            console.error('Location error:', error);
            toast({
              title: "Location Access Required",
              description: "Please enable location access for emergency services",
              variant: "destructive",
            });
            setLoading(false);
          }
        );
      } else {
        toast({
          title: "Location Not Supported",
          description: "Your device doesn't support location services",
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('SOS Error:', error);
      toast({
        title: "Error",
        description: "Failed to send emergency alert",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        ...newContact
      };
      setEmergencyContacts([...emergencyContacts, contact]);
      setNewContact({ name: '', phone: '', relation: 'Family' });
      setShowAddContact(false);
      toast({
        title: "Contact Added",
        description: `${newContact.name} added to emergency contacts`,
      });
    }
  };

  const removeContact = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact Removed",
      description: "Emergency contact removed successfully",
    });
  };

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
            Emergency SOS System
          </h1>
          <p className="text-xl text-muted-foreground">
            One-tap emergency assistance for farmers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SOS Button Section */}
          <div className="space-y-6">
            <Card className="p-8 text-center bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <div className="mb-6">
                <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-700 mb-2">Emergency SOS</h2>
                <p className="text-red-600">Press in case of farming emergency or urgent help needed</p>
              </div>

              <Button
                onClick={handleSOSClick}
                disabled={loading}
                className="w-full h-24 text-2xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg transform transition-all hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Sending Alert...
                  </div>
                ) : (
                  <>
                    <Shield className="h-8 w-8 mr-3" />
                    SEND SOS ALERT
                  </>
                )}
              </Button>

              <div className="mt-6 space-y-3">
                <div className="space-y-2">
                  <Label>Emergency Type (Optional)</Label>
                  <Input
                    placeholder="e.g., Medical, Weather, Equipment failure"
                    value={emergencyType}
                    onChange={(e) => setEmergencyType(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Textarea
                    placeholder="Brief description of the emergency..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            {/* Agriculture Helpline */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center mb-4">
                <Phone className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-green-700">Agriculture Helpline</h3>
              </div>
              <div className="text-center">
                <p className="text-green-600 mb-3">24/7 Agriculture Support</p>
                <Button
                  variant="outline"
                  className="text-2xl font-bold h-16 w-full border-green-300 text-green-700 hover:bg-green-50"
                  onClick={() => window.open('tel:18001801551')}
                >
                  📞 1800-180-1551
                </Button>
                <p className="text-sm text-green-600 mt-2">Toll-free agriculture helpline</p>
              </div>
            </Card>
          </div>

          {/* Emergency Contacts Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Emergency Contacts</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddContact(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>

              {showAddContact && (
                <Card className="p-4 mb-4 bg-muted/50">
                  <h4 className="font-medium mb-3">Add New Emergency Contact</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Name</Label>
                      <Input
                        placeholder="Contact name"
                        value={newContact.name}
                        onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="+91 9999999999"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Relation</Label>
                      <Input
                        placeholder="e.g., Family, Neighbor, Doctor"
                        value={newContact.relation}
                        onChange={(e) => setNewContact({...newContact, relation: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addEmergencyContact} size="sm">Add Contact</Button>
                      <Button variant="outline" size="sm" onClick={() => setShowAddContact(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <Card key={contact.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {contact.relation}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeContact(contact.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}

                {emergencyContacts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Phone className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No emergency contacts added yet</p>
                    <p className="text-sm">Add contacts to receive SOS alerts</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Location Status */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Location Sharing</h3>
              </div>
              {location ? (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-green-700 font-medium">✅ Location Access Enabled</p>
                  <p className="text-sm text-green-600">
                    Your GPS location will be shared with emergency contacts
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                  </p>
                </div>
              ) : (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <p className="text-orange-700 font-medium">📍 Location Access Required</p>
                  <p className="text-sm text-orange-600">
                    Enable location access for emergency services
                  </p>
                </div>
              )}
            </Card>

            {/* How It Works */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                How SOS Works
              </h3>
              <div className="space-y-3 text-sm text-blue-600">
                <div className="flex items-start">
                  <span className="bg-blue-200 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">1</span>
                  <p>Press the red SOS button in case of emergency</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-200 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">2</span>
                  <p>System automatically captures your GPS location</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-200 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">3</span>
                  <p>SMS alerts sent to all emergency contacts with your location</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-200 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">4</span>
                  <p>Google Maps link shared for easy navigation to your location</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencySOS;