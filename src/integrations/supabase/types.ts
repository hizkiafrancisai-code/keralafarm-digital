export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      climate_predictions: {
        Row: {
          alert_level: string | null
          created_at: string
          farmer_id: string
          id: string
          location_data: Json
          prediction_data: Json
          valid_until: string
        }
        Insert: {
          alert_level?: string | null
          created_at?: string
          farmer_id: string
          id?: string
          location_data: Json
          prediction_data: Json
          valid_until: string
        }
        Update: {
          alert_level?: string | null
          created_at?: string
          farmer_id?: string
          id?: string
          location_data?: Json
          prediction_data?: Json
          valid_until?: string
        }
        Relationships: [
          {
            foreignKeyName: "climate_predictions_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmer_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      crop_calendars: {
        Row: {
          created_at: string
          crop_name: string
          farmer_id: string
          harvest_date: string | null
          id: string
          is_active: boolean | null
          season: string
          sowing_date: string | null
          tasks: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          crop_name: string
          farmer_id: string
          harvest_date?: string | null
          id?: string
          is_active?: boolean | null
          season: string
          sowing_date?: string | null
          tasks?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          crop_name?: string
          farmer_id?: string
          harvest_date?: string | null
          id?: string
          is_active?: boolean | null
          season?: string
          sowing_date?: string | null
          tasks?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crop_calendars_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmer_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      disease_detections: {
        Row: {
          ai_diagnosis: Json | null
          confidence_score: number | null
          created_at: string
          crop_name: string
          farmer_id: string
          id: string
          image_url: string | null
          symptoms: string | null
          treatment_recommendations: Json | null
        }
        Insert: {
          ai_diagnosis?: Json | null
          confidence_score?: number | null
          created_at?: string
          crop_name: string
          farmer_id: string
          id?: string
          image_url?: string | null
          symptoms?: string | null
          treatment_recommendations?: Json | null
        }
        Update: {
          ai_diagnosis?: Json | null
          confidence_score?: number | null
          created_at?: string
          crop_name?: string
          farmer_id?: string
          id?: string
          image_url?: string | null
          symptoms?: string | null
          treatment_recommendations?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "disease_detections_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmer_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      emergency_sos: {
        Row: {
          created_at: string
          description: string
          emergency_type: string
          farmer_id: string
          id: string
          location_coordinates: unknown | null
          resolved_at: string | null
          responders_notified: Json | null
          status: string | null
        }
        Insert: {
          created_at?: string
          description: string
          emergency_type: string
          farmer_id: string
          id?: string
          location_coordinates?: unknown | null
          resolved_at?: string | null
          responders_notified?: Json | null
          status?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          emergency_type?: string
          farmer_id?: string
          id?: string
          location_coordinates?: unknown | null
          resolved_at?: string | null
          responders_notified?: Json | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_sos_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmer_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      farmer_profiles: {
        Row: {
          created_at: string
          district: string
          id: string
          irrigation_method: string
          land_size_acres: number
          language_preference: string | null
          mobile_number: string
          name: string
          primary_crop: string
          soil_type: string
          updated_at: string
          user_id: string
          village: string
        }
        Insert: {
          created_at?: string
          district: string
          id?: string
          irrigation_method: string
          land_size_acres: number
          language_preference?: string | null
          mobile_number: string
          name: string
          primary_crop: string
          soil_type: string
          updated_at?: string
          user_id: string
          village: string
        }
        Update: {
          created_at?: string
          district?: string
          id?: string
          irrigation_method?: string
          land_size_acres?: number
          language_preference?: string | null
          mobile_number?: string
          name?: string
          primary_crop?: string
          soil_type?: string
          updated_at?: string
          user_id?: string
          village?: string
        }
        Relationships: []
      }
      insurance_policies: {
        Row: {
          coverage_amount: number | null
          coverage_details: Json
          created_at: string
          end_date: string
          farmer_id: string
          id: string
          policy_name: string
          premium_amount: number | null
          provider: string
          start_date: string
          status: string | null
        }
        Insert: {
          coverage_amount?: number | null
          coverage_details: Json
          created_at?: string
          end_date: string
          farmer_id: string
          id?: string
          policy_name: string
          premium_amount?: number | null
          provider: string
          start_date: string
          status?: string | null
        }
        Update: {
          coverage_amount?: number | null
          coverage_details?: Json
          created_at?: string
          end_date?: string
          farmer_id?: string
          id?: string
          policy_name?: string
          premium_amount?: number | null
          provider?: string
          start_date?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_policies_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmer_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      market_intelligence: {
        Row: {
          ai_insights: Json | null
          created_at: string
          crop_name: string
          data_date: string
          id: string
          market_location: string
          price_data: Json
          trends_analysis: Json | null
        }
        Insert: {
          ai_insights?: Json | null
          created_at?: string
          crop_name: string
          data_date?: string
          id?: string
          market_location: string
          price_data: Json
          trends_analysis?: Json | null
        }
        Update: {
          ai_insights?: Json | null
          created_at?: string
          crop_name?: string
          data_date?: string
          id?: string
          market_location?: string
          price_data?: Json
          trends_analysis?: Json | null
        }
        Relationships: []
      }
      microplastic_detections: {
        Row: {
          ai_analysis: Json
          contamination_risk: string | null
          created_at: string
          farmer_id: string
          id: string
          recommendations: Json | null
          sample_data: Json
          sample_type: string
        }
        Insert: {
          ai_analysis: Json
          contamination_risk?: string | null
          created_at?: string
          farmer_id: string
          id?: string
          recommendations?: Json | null
          sample_data: Json
          sample_type: string
        }
        Update: {
          ai_analysis?: Json
          contamination_risk?: string | null
          created_at?: string
          farmer_id?: string
          id?: string
          recommendations?: Json | null
          sample_data?: Json
          sample_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "microplastic_detections_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmer_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      satellite_damage_mapping: {
        Row: {
          affected_area_hectares: number | null
          area_coordinates: Json
          created_at: string
          damage_analysis: Json | null
          damage_severity: string | null
          farmer_id: string
          id: string
          satellite_data: Json
        }
        Insert: {
          affected_area_hectares?: number | null
          area_coordinates: Json
          created_at?: string
          damage_analysis?: Json | null
          damage_severity?: string | null
          farmer_id: string
          id?: string
          satellite_data: Json
        }
        Update: {
          affected_area_hectares?: number | null
          area_coordinates?: Json
          created_at?: string
          damage_analysis?: Json | null
          damage_severity?: string | null
          farmer_id?: string
          id?: string
          satellite_data?: Json
        }
        Relationships: [
          {
            foreignKeyName: "satellite_damage_mapping_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmer_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      voice_queries: {
        Row: {
          ai_response: string
          created_at: string
          farmer_id: string
          id: string
          language: string
          query_audio_url: string | null
          query_text: string
          response_audio_url: string | null
        }
        Insert: {
          ai_response: string
          created_at?: string
          farmer_id: string
          id?: string
          language?: string
          query_audio_url?: string | null
          query_text: string
          response_audio_url?: string | null
        }
        Update: {
          ai_response?: string
          created_at?: string
          farmer_id?: string
          id?: string
          language?: string
          query_audio_url?: string | null
          query_text?: string
          response_audio_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voice_queries_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmer_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
