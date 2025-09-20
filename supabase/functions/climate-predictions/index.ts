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
    const { farmer_id, location_data } = await req.json();
    
    if (!farmer_id || !location_data) {
      throw new Error('farmer_id and location_data are required');
    }

    console.log('Generating climate predictions for location:', location_data);

    // Get current weather data (mock for now - in production, integrate with weather API)
    const currentWeather = {
      temperature: 28,
      humidity: 75,
      rainfall_mm: 12,
      wind_speed: 15,
      pressure: 1013
    };

    // Prepare prompt for Gemini
    const prompt = `As a climate and agricultural expert, analyze the current weather conditions and provide detailed predictions for farming in Kerala, India.

    Current conditions:
    - Temperature: ${currentWeather.temperature}°C
    - Humidity: ${currentWeather.humidity}%
    - Recent rainfall: ${currentWeather.rainfall_mm}mm
    - Wind speed: ${currentWeather.wind_speed}km/h
    - Location: ${location_data.district || 'Kerala'}

    Provide:
    1. 7-day weather outlook
    2. Agricultural recommendations for next week
    3. Best crops to plant in current conditions  
    4. Irrigation scheduling advice
    5. Pest and disease risk assessment
    6. Alert level (low/medium/high) with reasons

    Focus on actionable advice for farmers.`;

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
          temperature: 0.4,
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
    const predictions = geminiData.candidates[0].content.parts[0].text;

    // Extract alert level
    const alertMatch = predictions.match(/alert level[:\s]*(low|medium|high)/i);
    const alert_level = alertMatch ? alertMatch[1].toLowerCase() : 'medium';

    // Calculate valid until (7 days from now)
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7);

    // Store in database
    const { error: insertError } = await supabase
      .from('climate_predictions')
      .insert({
        farmer_id,
        location_data,
        prediction_data: { 
          forecast: predictions,
          current_conditions: currentWeather,
          generated_at: new Date().toISOString()
        },
        alert_level,
        valid_until: validUntil.toISOString()
      });

    if (insertError) {
      console.error('Error storing climate prediction:', insertError);
      throw insertError;
    }

    console.log('Climate prediction generated successfully');

    return new Response(
      JSON.stringify({ 
        predictions,
        alert_level,
        current_conditions: currentWeather,
        valid_until: validUntil,
        success: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in climate-predictions function:', error);
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