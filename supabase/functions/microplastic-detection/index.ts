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
    const { sample_data, sample_type, farmer_id, image_data } = await req.json();
    
    if (!farmer_id || !sample_type || !sample_data) {
      throw new Error('farmer_id, sample_type, and sample_data are required');
    }

    console.log('Processing microplastic detection for sample type:', sample_type);

    // Prepare prompt for Gemini
    const prompt = `As an environmental and agricultural expert, analyze this ${sample_type} sample for microplastic contamination.

    Sample details: ${JSON.stringify(sample_data)}
    ${image_data ? 'Microscopic image provided for analysis.' : ''}

    Provide comprehensive analysis including:
    1. Microplastic contamination assessment
    2. Risk level (low/medium/high/critical)
    3. Potential sources of contamination
    4. Health and environmental implications
    5. Immediate safety recommendations
    6. Long-term mitigation strategies
    7. Monitoring frequency recommendations
    8. Regulatory compliance status
    9. Alternative practices to reduce contamination

    Focus on practical, actionable advice for farmers in Kerala, India to protect soil health and crop safety.`;

    const requestBody: any = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.2,
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

    // Extract contamination risk level
    const riskMatch = analysis.match(/risk level[:\s]*(low|medium|high|critical)/i);
    const contamination_risk = riskMatch ? riskMatch[1].toLowerCase() : 'medium';

    // Store in database
    const { error: insertError } = await supabase
      .from('microplastic_detections')
      .insert({
        farmer_id,
        sample_type,
        sample_data,
        ai_analysis: { 
          analysis,
          risk_assessment: contamination_risk,
          generated_at: new Date().toISOString()
        },
        contamination_risk,
        recommendations: { 
          immediate_actions: analysis,
          monitoring_plan: analysis
        }
      });

    if (insertError) {
      console.error('Error storing microplastic detection:', insertError);
      throw insertError;
    }

    console.log('Microplastic detection analysis completed successfully');

    return new Response(
      JSON.stringify({ 
        analysis,
        contamination_risk,
        sample_type,
        recommendations: analysis,
        success: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in microplastic-detection function:', error);
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