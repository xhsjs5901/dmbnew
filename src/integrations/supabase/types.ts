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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      compatibility_scores: {
        Row: {
          career_score: number | null
          created_at: string
          id: string
          lifestyle_score: number | null
          overall_score: number
          personality_score: number | null
          user_id_1: string
          user_id_2: string
          values_score: number | null
        }
        Insert: {
          career_score?: number | null
          created_at?: string
          id?: string
          lifestyle_score?: number | null
          overall_score: number
          personality_score?: number | null
          user_id_1: string
          user_id_2: string
          values_score?: number | null
        }
        Update: {
          career_score?: number | null
          created_at?: string
          id?: string
          lifestyle_score?: number | null
          overall_score?: number
          personality_score?: number | null
          user_id_1?: string
          user_id_2?: string
          values_score?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          about_me: string | null
          avatar_url: string | null
          city: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          family_verified: boolean | null
          first_name: string
          gender: Database["public"]["Enums"]["gender"] | null
          height_cm: number | null
          hospital_name: string | null
          id: string
          is_profile_complete: boolean | null
          last_active_at: string | null
          last_name: string
          looking_for: string | null
          marital_status: Database["public"]["Enums"]["marital_status"] | null
          medical_registration_number: string | null
          phone: string | null
          photos: string[] | null
          preferred_age_max: number | null
          preferred_age_min: number | null
          preferred_location: string[] | null
          questionnaire_completed: boolean | null
          specialty: Database["public"]["Enums"]["medical_specialty"] | null
          state: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at: string
          user_id: string
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          years_of_experience: number | null
        }
        Insert: {
          about_me?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          family_verified?: boolean | null
          first_name: string
          gender?: Database["public"]["Enums"]["gender"] | null
          height_cm?: number | null
          hospital_name?: string | null
          id?: string
          is_profile_complete?: boolean | null
          last_active_at?: string | null
          last_name: string
          looking_for?: string | null
          marital_status?: Database["public"]["Enums"]["marital_status"] | null
          medical_registration_number?: string | null
          phone?: string | null
          photos?: string[] | null
          preferred_age_max?: number | null
          preferred_age_min?: number | null
          preferred_location?: string[] | null
          questionnaire_completed?: boolean | null
          specialty?: Database["public"]["Enums"]["medical_specialty"] | null
          state?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string
          user_id: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          years_of_experience?: number | null
        }
        Update: {
          about_me?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          family_verified?: boolean | null
          first_name?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          height_cm?: number | null
          hospital_name?: string | null
          id?: string
          is_profile_complete?: boolean | null
          last_active_at?: string | null
          last_name?: string
          looking_for?: string | null
          marital_status?: Database["public"]["Enums"]["marital_status"] | null
          medical_registration_number?: string | null
          phone?: string | null
          photos?: string[] | null
          preferred_age_max?: number | null
          preferred_age_min?: number | null
          preferred_location?: string[] | null
          questionnaire_completed?: boolean | null
          specialty?: Database["public"]["Enums"]["medical_specialty"] | null
          state?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string
          user_id?: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      questionnaire_responses: {
        Row: {
          adventure_level: string | null
          career_ambition: string | null
          communication_style: string | null
          conflict_resolution: string | null
          created_at: string
          decision_making: string | null
          dietary_preferences: string | null
          family_importance: string | null
          financial_goals: string | null
          health_fitness: string | null
          id: string
          life_priorities: string[] | null
          religious_practice: string | null
          relocation_willingness: string | null
          social_nature: string | null
          traditional_values: string | null
          updated_at: string
          user_id: string
          work_life_balance: string | null
        }
        Insert: {
          adventure_level?: string | null
          career_ambition?: string | null
          communication_style?: string | null
          conflict_resolution?: string | null
          created_at?: string
          decision_making?: string | null
          dietary_preferences?: string | null
          family_importance?: string | null
          financial_goals?: string | null
          health_fitness?: string | null
          id?: string
          life_priorities?: string[] | null
          religious_practice?: string | null
          relocation_willingness?: string | null
          social_nature?: string | null
          traditional_values?: string | null
          updated_at?: string
          user_id: string
          work_life_balance?: string | null
        }
        Update: {
          adventure_level?: string | null
          career_ambition?: string | null
          communication_style?: string | null
          conflict_resolution?: string | null
          created_at?: string
          decision_making?: string | null
          dietary_preferences?: string | null
          family_importance?: string | null
          financial_goals?: string | null
          health_fitness?: string | null
          id?: string
          life_priorities?: string[] | null
          religious_practice?: string | null
          relocation_willingness?: string | null
          social_nature?: string | null
          traditional_values?: string | null
          updated_at?: string
          user_id?: string
          work_life_balance?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      gender: "male" | "female"
      marital_status: "never_married" | "divorced" | "widowed"
      medical_specialty:
        | "general_medicine"
        | "cardiology"
        | "neurology"
        | "orthopedics"
        | "pediatrics"
        | "psychiatry"
        | "dermatology"
        | "oncology"
        | "surgery"
        | "anesthesiology"
        | "radiology"
        | "pathology"
        | "emergency_medicine"
        | "family_medicine"
        | "internal_medicine"
        | "obstetrics_gynecology"
        | "ophthalmology"
        | "ent"
        | "urology"
        | "nephrology"
        | "gastroenterology"
        | "pulmonology"
        | "endocrinology"
        | "rheumatology"
        | "infectious_disease"
        | "dentistry"
        | "other"
      subscription_tier: "basic" | "gold" | "platinum"
      verification_status: "pending" | "in_review" | "verified" | "rejected"
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
    Enums: {
      gender: ["male", "female"],
      marital_status: ["never_married", "divorced", "widowed"],
      medical_specialty: [
        "general_medicine",
        "cardiology",
        "neurology",
        "orthopedics",
        "pediatrics",
        "psychiatry",
        "dermatology",
        "oncology",
        "surgery",
        "anesthesiology",
        "radiology",
        "pathology",
        "emergency_medicine",
        "family_medicine",
        "internal_medicine",
        "obstetrics_gynecology",
        "ophthalmology",
        "ent",
        "urology",
        "nephrology",
        "gastroenterology",
        "pulmonology",
        "endocrinology",
        "rheumatology",
        "infectious_disease",
        "dentistry",
        "other",
      ],
      subscription_tier: ["basic", "gold", "platinum"],
      verification_status: ["pending", "in_review", "verified", "rejected"],
    },
  },
} as const
