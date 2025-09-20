import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { crop_name, market_location = 'Kerala' } = await req.json();
    
    if (!crop_name) {
      throw new Error('crop_name is required');
    }

    console.log('Generating market intelligence for:', crop_name, 'in', market_location);

    // Mock current market data (in production, integrate with actual market APIs)
    const mockPriceData = {
      current_price: Math.floor(Math.random() * 50) + 20,
      price_change: (Math.random() - 0.5) * 10,
      volume_traded: Math.floor(Math.random() * 1000) + 500,
      last_updated: new Date().toISOString()
    };

    // Prepare prompt for Gemini
    const prompt = `As a market analysis expert, provide comprehensive market intelligence for ${crop_name} in ${market_location}, India.

    Current market data:
    - Price: ₹${mockPriceData.current_price}/kg
    - Price change: ${mockPriceData.price_change > 0 ? '+' : ''}${mockPriceData.price_change.toFixed(2)}%
    - Volume: ${mockPriceData.volume_traded} tons

    Provide detailed analysis including:
    1. Price trend analysis (short-term and seasonal)
    2. Factors affecting current prices
    3. Best time to sell recommendations
    4. Market demand forecast
    5. Quality requirements and grading
    6. Alternative markets to consider
    7. Price predictions for next 30 days
    8. Risk assessment and mitigation strategies

    Focus on actionable insights for farmers to maximize their profits.`;

    // Call Gemini AI API
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${Deno.env.get('GEMINI_API_KEY')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2000,
        }
      }),
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${await geminiResponse.text()}`);
    }

    const geminiData = await geminiResponse.json();
    const analysis = geminiData.candidates[0].content.parts[0].text;

    // Store in database
    const { error: insertError } = await supabase
      .from('market_intelligence')
      .insert({
        crop_name,
        market_location,
        price_data: mockPriceData,
        ai_insights: { analysis, generated_at: new Date().toISOString() },
        trends_analysis: { 
          trend_direction: mockPriceData.price_change > 0 ? 'upward' : 'downward',
          analysis: analysis
        }
      });

    if (insertError) {
      console.error('Error storing market intelligence:', insertError);
      throw insertError;
    }

    console.log('Market intelligence generated successfully');

    return new Response(
      JSON.stringify({ 
        market_analysis: analysis,
        price_data: mockPriceData,
        crop_name,
        market_location,
        success: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in market-intelligence function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});