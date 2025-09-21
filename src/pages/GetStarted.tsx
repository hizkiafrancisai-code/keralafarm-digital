import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const GetStarted = () => {
  const { t } = useLanguage();
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    district: '',
    village: '',
    landSize: '',
    primaryCrop: '',
    soilType: '',
    irrigationMethod: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (user) {
      // User is already logged in, just save profile data and go to home
      toast({
        title: "Profile Updated",
        description: "Your farm profile has been created successfully!",
      });
      navigate('/home');
      return;
    }

    // New user signup
    const { error } = await signUp(formData.email, formData.password, {
      name: formData.name,
      mobile: formData.mobile,
      district: formData.district,
      village: formData.village,
      landSize: formData.landSize,
      primaryCrop: formData.primaryCrop,
      soilType: formData.soilType,
      irrigationMethod: formData.irrigationMethod
    });
    
    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
    } else {
      toast({
        title: "Account Created!",
        description: "Your farm profile has been created successfully!",
      });
      navigate('/home');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const districts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 
    'Wayanad', 'Kannur', 'Kasaragod'
  ];

  const crops = [
    'Rice', 'Coconut', 'Rubber', 'Pepper', 'Cardamom', 'Tea', 'Coffee', 
    'Banana', 'Cashew', 'Ginger', 'Turmeric', 'Vegetables', 'Spices'
  ];

  const soilTypes = [
    'Red Soil', 'Laterite Soil', 'Coastal Alluvium', 'Forest Loam', 
    'High Range Soil', 'Kuttanad Clay', 'Sandy Soil'
  ];

  const irrigationMethods = [
    'Rainfed', 'Bore Well', 'Open Well', 'Canal Irrigation', 'Drip Irrigation', 
    'Sprinkler System', 'Pond/Tank'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Started with Krishi Sakhi
          </h1>
          <p className="text-xl text-muted-foreground">
            Tell us about your farm to get personalized recommendations
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Information - Only show for new users */}
              {!user && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Account Information
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="farmer@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="+91 9999999999"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Location Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
                    <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="village">Village/Panchayat *</Label>
                    <Input
                      id="village"
                      placeholder="Enter your village name"
                      value={formData.village}
                      onChange={(e) => handleInputChange('village', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Farm Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Farm Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="landSize">Land Size (in acres) *</Label>
                    <Input
                      id="landSize"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.landSize}
                      onChange={(e) => handleInputChange('landSize', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primaryCrop">Primary Crop *</Label>
                    <Select value={formData.primaryCrop} onValueChange={(value) => handleInputChange('primaryCrop', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {crops.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type *</Label>
                    <Select value={formData.soilType} onValueChange={(value) => handleInputChange('soilType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map((soil) => (
                          <SelectItem key={soil} value={soil}>
                            {soil}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="irrigationMethod">Irrigation Method *</Label>
                    <Select value={formData.irrigationMethod} onValueChange={(value) => handleInputChange('irrigationMethod', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select irrigation method" />
                      </SelectTrigger>
                      <SelectContent>
                        {irrigationMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white h-12 text-lg"
                >
                  {loading ? 'Creating Profile...' : (user ? 'Update My Profile' : 'Create My Farm Profile')}
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  By creating a profile, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;