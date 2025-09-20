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
    const { image_data, crop_name, symptoms, farmer_id } = await req.json();
    
    if (!farmer_id || !crop_name) {
      throw new Error('farmer_id and crop_name are required');
    }

    console.log('Processing disease detection for crop:', crop_name);

    // Prepare prompt for Gemini
    const prompt = `Analyze this crop disease case for ${crop_name}. 
    ${symptoms ? `Observed symptoms: ${symptoms}` : ''}
    ${image_data ? 'An image has been provided for analysis.' : ''}
    
    Provide a detailed diagnosis including:
    1. Most likely disease(s)
    2. Confidence level (0-100%)
    3. Detailed treatment recommendations
    4. Prevention measures
    5. When to seek expert help
    
    Format your response as a structured analysis suitable for a farmer in Kerala, India.`;

    const requestBody: any = {
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
    };

    // Add image if provided
    if (image_data) {
      requestBody.contents[0].parts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: image_data
        }
      });
    }

    // Call Gemini AI API
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${Deno.env.get('GEMINI_API_KEY')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${await geminiResponse.text()}`);
    }

    const geminiData = await geminiResponse.json();
    const analysis = geminiData.candidates[0].content.parts[0].text;

    // Extract confidence score (simplified extraction)
    const confidenceMatch = analysis.match(/confidence[:\s]*(\d+)%/i);
    const confidence_score = confidenceMatch ? parseFloat(confidenceMatch[1]) / 100 : 0.75;

    // Store in database
    const { error: insertError } = await supabase
      .from('disease_detections')
      .insert({
        farmer_id,
        crop_name,
        symptoms: symptoms || null,
        ai_diagnosis: { analysis, raw_response: analysis },
        confidence_score,
        treatment_recommendations: { recommendations: analysis }
      });

    if (insertError) {
      console.error('Error storing disease detection:', insertError);
      throw insertError;
    }

    console.log('Disease detection completed successfully');

    return new Response(
      JSON.stringify({ 
        diagnosis: analysis,
        confidence_score,
        success: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in disease-detection function:', error);
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