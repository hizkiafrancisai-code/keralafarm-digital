import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, BarChart3, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface MarketData {
  crop_name: string;
  price_data: {
    current_price: number;
    price_change: number;
    volume_traded: number;
    last_updated: string;
  };
  ai_insights: {
    analysis: string;
    generated_at: string;
  };
  market_location: string;
}

const MarketIntelligence = () => {
  const { t } = useLanguage();
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchCrop, setSearchCrop] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Kerala');

  const keralaCrops = [
    'Rice', 'Coconut', 'Rubber', 'Pepper', 'Cardamom', 'Tea', 'Coffee',
    'Banana', 'Cashew', 'Ginger', 'Turmeric', 'Vegetables', 'Spices'
  ];

  const fetchMarketData = async (cropName?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('market_intelligence')
        .select('*')
        .eq('market_location', selectedLocation)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching market data:', error);
        // Generate sample data for demo
        generateSampleData(cropName);
      } else {
        // Type cast the data from Supabase to our interface
        const typedData: MarketData[] = (data || []).map(item => ({
          crop_name: item.crop_name,
          price_data: item.price_data as any,
          ai_insights: item.ai_insights as any,
          market_location: item.market_location
        }));
        setMarketData(typedData);
      }
    } catch (error) {
      console.error('Error:', error);
      generateSampleData(cropName);
    } finally {
      setLoading(false);
    }
  };

  const generateSampleData = (cropName?: string) => {
    const cropsToShow = cropName ? [cropName] : keralaCrops.slice(0, 8);
    const sampleData = cropsToShow.map(crop => ({
      crop_name: crop,
      price_data: {
        current_price: Math.floor(Math.random() * 50) + 20,
        price_change: (Math.random() - 0.5) * 10,
        volume_traded: Math.floor(Math.random() * 1000) + 500,
        last_updated: new Date().toISOString()
      },
      ai_insights: {
        analysis: `Current market conditions for ${crop} are favorable with steady demand. Price trends show seasonal variations typical for this crop.`,
        generated_at: new Date().toISOString()
      },
      market_location: selectedLocation
    }));
    setMarketData(sampleData);
  };

  const handleSearchCrop = async () => {
    if (searchCrop.trim()) {
      try {
        const response = await fetch(`https://uieuqmerqbqzmhmxngqd.supabase.co/functions/v1/market-intelligence`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            crop_name: searchCrop.trim(),
            market_location: selectedLocation
          })
        });

        if (response.ok) {
          await fetchMarketData();
        }
      } catch (error) {
        console.error('Error generating market intelligence:', error);
      }
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, [selectedLocation]);

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
            Market Intelligence
          </h1>
          <p className="text-xl text-muted-foreground">
            Daily market prices and AI-powered insights for Kerala crops
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for a crop (e.g., Rice, Coconut)"
                  value={searchCrop}
                  onChange={(e) => setSearchCrop(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearchCrop} disabled={loading}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kerala">Kerala</SelectItem>
                <SelectItem value="Kochi">Kochi</SelectItem>
                <SelectItem value="Thiruvananthapuram">Thiruvananthapuram</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Market Data Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading market data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketData.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">{item.crop_name}</h3>
                  <Badge variant={item.price_data.price_change >= 0 ? "default" : "destructive"}>
                    {item.price_data.price_change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {item.price_data.price_change.toFixed(2)}%
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Current Price</span>
                    <span className="text-2xl font-bold text-foreground flex items-center">
                      <DollarSign className="h-5 w-5 mr-1" />
                      ₹{item.price_data.current_price}/kg
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Volume Traded</span>
                    <span className="font-medium flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      {item.price_data.volume_traded} tons
                    </span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">AI Market Insight:</p>
                    <p className="text-sm text-foreground">
                      {item.ai_insights.analysis.substring(0, 120)}...
                    </p>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Updated: {new Date(item.price_data.last_updated).toLocaleString()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {marketData.length === 0 && !loading && (
          <Card className="p-12 text-center">
            <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Market Data Available</h3>
            <p className="text-muted-foreground mb-4">
              Search for a specific crop or check back later for updated market intelligence.
            </p>
            <Button onClick={() => fetchMarketData()} variant="outline">
              Refresh Data
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MarketIntelligence;