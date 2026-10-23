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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      admin_feedback: {
        Row: {
          created_at: string
          id: string
          message: string
          researcher_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          researcher_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          researcher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_feedback_researcher_id_fkey"
            columns: ["researcher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      adverse_experiences_responses: {
        Row: {
          answers: string[] | null
          id: string
          is_completed: boolean | null
          updated_at: string | null
        }
        Insert: {
          answers?: string[] | null
          id: string
          is_completed?: boolean | null
          updated_at?: string | null
        }
        Update: {
          answers?: string[] | null
          id?: string
          is_completed?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      anxiety_inventory_responses: {
        Row: {
          id: string
          is_completed: boolean | null
          is_completed_final: boolean | null
          state_answers: number[] | null
          state_answers_final: number[] | null
          trait_answers: number[] | null
          trait_answers_final: number[] | null
          updated_at: string | null
        }
        Insert: {
          id: string
          is_completed?: boolean | null
          is_completed_final?: boolean | null
          state_answers?: number[] | null
          state_answers_final?: number[] | null
          trait_answers?: number[] | null
          trait_answers_final?: number[] | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          is_completed?: boolean | null
          is_completed_final?: boolean | null
          state_answers?: number[] | null
          state_answers_final?: number[] | null
          trait_answers?: number[] | null
          trait_answers_final?: number[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      apoi_test: {
        Row: {
          answers: string | null
          created_at: string
          id: string
          is_completed: boolean | null
          user_id: string | null
        }
        Insert: {
          answers?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          user_id?: string | null
        }
        Update: {
          answers?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      assertiveness_scale_responses: {
        Row: {
          answers: number[] | null
          id: string
          is_completed: boolean | null
          updated_at: string | null
        }
        Insert: {
          answers?: number[] | null
          id: string
          is_completed?: boolean | null
          updated_at?: string | null
        }
        Update: {
          answers?: number[] | null
          id?: string
          is_completed?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      final_evaluations: {
        Row: {
          id: string
          is_completed: boolean | null
          test_1_results: Json | null
          test_2_results: Json | null
          test_3_results: Json | null
          updated_at: string | null
        }
        Insert: {
          id: string
          is_completed?: boolean | null
          test_1_results?: Json | null
          test_2_results?: Json | null
          test_3_results?: Json | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          is_completed?: boolean | null
          test_1_results?: Json | null
          test_2_results?: Json | null
          test_3_results?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      general_health_responses: {
        Row: {
          ghq_answers: number[] | null
          id: string
          is_completed: boolean | null
          mini_answers: string[] | null
          sent_to_derivation: boolean | null
          updated_at: string | null
        }
        Insert: {
          ghq_answers?: number[] | null
          id: string
          is_completed?: boolean | null
          mini_answers?: string[] | null
          sent_to_derivation?: boolean | null
          updated_at?: string | null
        }
        Update: {
          ghq_answers?: number[] | null
          id?: string
          is_completed?: boolean | null
          mini_answers?: string[] | null
          sent_to_derivation?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      initial_test_responses: {
        Row: {
          actividad_salud: string | null
          afromexicana: string | null
          areas_salud: string | null
          autos: string | null
          banos: string | null
          consulta_gine: string | null
          cual_lengua: string | null
          cuartos: string | null
          edad: number | null
          estado: string | null
          estudios: string | null
          estudios_jefe: string | null
          estudios_salud: string | null
          genero: string | null
          id: string
          indigena: string | null
          internet: string | null
          is_completed: boolean | null
          lengua_indigena: string | null
          orientacion: string | null
          orientacion_otra: string | null
          sexo_nacer: string | null
          trabajadores: string | null
          trabajo_salud: string | null
          trasfondo: string | null
          updated_at: string | null
        }
        Insert: {
          actividad_salud?: string | null
          afromexicana?: string | null
          areas_salud?: string | null
          autos?: string | null
          banos?: string | null
          consulta_gine?: string | null
          cual_lengua?: string | null
          cuartos?: string | null
          edad?: number | null
          estado?: string | null
          estudios?: string | null
          estudios_jefe?: string | null
          estudios_salud?: string | null
          genero?: string | null
          id: string
          indigena?: string | null
          internet?: string | null
          is_completed?: boolean | null
          lengua_indigena?: string | null
          orientacion?: string | null
          orientacion_otra?: string | null
          sexo_nacer?: string | null
          trabajadores?: string | null
          trabajo_salud?: string | null
          trasfondo?: string | null
          updated_at?: string | null
        }
        Update: {
          actividad_salud?: string | null
          afromexicana?: string | null
          areas_salud?: string | null
          autos?: string | null
          banos?: string | null
          consulta_gine?: string | null
          cual_lengua?: string | null
          cuartos?: string | null
          edad?: number | null
          estado?: string | null
          estudios?: string | null
          estudios_jefe?: string | null
          estudios_salud?: string | null
          genero?: string | null
          id?: string
          indigena?: string | null
          internet?: string | null
          is_completed?: boolean | null
          lengua_indigena?: string | null
          orientacion?: string | null
          orientacion_otra?: string | null
          sexo_nacer?: string | null
          trabajadores?: string | null
          trabajo_salud?: string | null
          trasfondo?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      module_1_responses: {
        Row: {
          closure_answers: Json | null
          feedback_text: string | null
          game_score: number | null
          id: string
          intro_phrases: Json | null
          is_completed: boolean | null
          quiz_answers: Json | null
          updated_at: string | null
          visit_answers: Json | null
        }
        Insert: {
          closure_answers?: Json | null
          feedback_text?: string | null
          game_score?: number | null
          id: string
          intro_phrases?: Json | null
          is_completed?: boolean | null
          quiz_answers?: Json | null
          updated_at?: string | null
          visit_answers?: Json | null
        }
        Update: {
          closure_answers?: Json | null
          feedback_text?: string | null
          game_score?: number | null
          id?: string
          intro_phrases?: Json | null
          is_completed?: boolean | null
          quiz_answers?: Json | null
          updated_at?: string | null
          visit_answers?: Json | null
        }
        Relationships: []
      }
      module_2_responses: {
        Row: {
          closure_answers: Json | null
          game_score: number | null
          id: string
          is_completed: boolean | null
          quiz1_answers: Json | null
          quiz2_answers: Json | null
          quiz2_score: number | null
          updated_at: string | null
        }
        Insert: {
          closure_answers?: Json | null
          game_score?: number | null
          id: string
          is_completed?: boolean | null
          quiz1_answers?: Json | null
          quiz2_answers?: Json | null
          quiz2_score?: number | null
          updated_at?: string | null
        }
        Update: {
          closure_answers?: Json | null
          game_score?: number | null
          id?: string
          is_completed?: boolean | null
          quiz1_answers?: Json | null
          quiz2_answers?: Json | null
          quiz2_score?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      module_3_responses: {
        Row: {
          feedback_responses: Json | null
          game_score: number | null
          id: string
          quiz_answers: Json | null
          updated_at: string | null
        }
        Insert: {
          feedback_responses?: Json | null
          game_score?: number | null
          id: string
          quiz_answers?: Json | null
          updated_at?: string | null
        }
        Update: {
          feedback_responses?: Json | null
          game_score?: number | null
          id?: string
          quiz_answers?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      module_4_responses: {
        Row: {
          closure_answers: Json | null
          game_score: number | null
          id: string
          quiz_answers: Json | null
          updated_at: string | null
        }
        Insert: {
          closure_answers?: Json | null
          game_score?: number | null
          id: string
          quiz_answers?: Json | null
          updated_at?: string | null
        }
        Update: {
          closure_answers?: Json | null
          game_score?: number | null
          id?: string
          quiz_answers?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          has_experience: boolean | null
          id: string
          nationality: string | null
          role: string | null
          tutor_email_1: string | null
          tutor_email_2: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          has_experience?: boolean | null
          id: string
          nationality?: string | null
          role?: string | null
          tutor_email_1?: string | null
          tutor_email_2?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          has_experience?: boolean | null
          id?: string
          nationality?: string | null
          role?: string | null
          tutor_email_1?: string | null
          tutor_email_2?: string | null
          username?: string | null
        }
        Relationships: []
      }
      semantic_network_responses: {
        Row: {
          ex1_final: string[] | null
          ex1_initial: string[] | null
          ex2_final: string[] | null
          ex2_initial: string[] | null
          id: string
          is_completed: boolean | null
          is_completed_1f: boolean | null
          is_completed_2f: boolean | null
          updated_at: string | null
        }
        Insert: {
          ex1_final?: string[] | null
          ex1_initial?: string[] | null
          ex2_final?: string[] | null
          ex2_initial?: string[] | null
          id: string
          is_completed?: boolean | null
          is_completed_1f?: boolean | null
          is_completed_2f?: boolean | null
          updated_at?: string | null
        }
        Update: {
          ex1_final?: string[] | null
          ex1_initial?: string[] | null
          ex2_final?: string[] | null
          ex2_initial?: string[] | null
          id?: string
          is_completed?: boolean | null
          is_completed_1f?: boolean | null
          is_completed_2f?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      suggestions: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "suggestions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      test_attempts: {
        Row: {
          attempts_count: number | null
          test_id: string
          user_id: string
        }
        Insert: {
          attempts_count?: number | null
          test_id: string
          user_id: string
        }
        Update: {
          attempts_count?: number | null
          test_id?: string
          user_id?: string
        }
        Relationships: []
      }
      test_sus_responses: {
        Row: {
          id: string
          q1: number | null
          q10: number | null
          q2: number | null
          q3: number | null
          q4: number | null
          q5: number | null
          q6: number | null
          q7: number | null
          q8: number | null
          q9: number | null
          total_score: number | null
          updated_at: string | null
        }
        Insert: {
          id: string
          q1?: number | null
          q10?: number | null
          q2?: number | null
          q3?: number | null
          q4?: number | null
          q5?: number | null
          q6?: number | null
          q7?: number | null
          q8?: number | null
          q9?: number | null
          total_score?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          q1?: number | null
          q10?: number | null
          q2?: number | null
          q3?: number | null
          q4?: number | null
          q5?: number | null
          q6?: number | null
          q7?: number | null
          q8?: number | null
          q9?: number | null
          total_score?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      test_usability_responses: {
        Row: {
          asi_1: number | null
          asi_2: number | null
          asi_3: number | null
          asi_help: number | null
          asi_satisfaction: number | null
          asq_1: number | null
          asq_2: number | null
          asq_3: number | null
          asq_4: number | null
          id: string
          suitability_1: number | null
          suitability_2: number | null
          suitability_modifications: string | null
          updated_at: string | null
        }
        Insert: {
          asi_1?: number | null
          asi_2?: number | null
          asi_3?: number | null
          asi_help?: number | null
          asi_satisfaction?: number | null
          asq_1?: number | null
          asq_2?: number | null
          asq_3?: number | null
          asq_4?: number | null
          id: string
          suitability_1?: number | null
          suitability_2?: number | null
          suitability_modifications?: string | null
          updated_at?: string | null
        }
        Update: {
          asi_1?: number | null
          asi_2?: number | null
          asi_3?: number | null
          asi_help?: number | null
          asi_satisfaction?: number | null
          asq_1?: number | null
          asq_2?: number | null
          asq_3?: number | null
          asq_4?: number | null
          id?: string
          suitability_1?: number | null
          suitability_2?: number | null
          suitability_modifications?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          final_tests_unlocked: boolean | null
          id: string
          m1_closure: boolean | null
          m1_feedback: boolean | null
          m1_game: boolean | null
          m1_intro: boolean | null
          m1_quiz: boolean | null
          m1_story: boolean | null
          m1_visit: boolean | null
          m2_closure: boolean | null
          m2_feedback: boolean | null
          m2_game: boolean | null
          m2_intro: boolean | null
          m2_quiz1: boolean | null
          m2_quiz2: boolean | null
          m2_story: boolean | null
          m2_visit: boolean | null
          m3_closure: boolean | null
          m3_feedback: boolean | null
          m3_game: boolean | null
          m3_intro: boolean | null
          m3_quiz: boolean | null
          m3_representation: boolean | null
          m3_story: boolean | null
          m3_visit: boolean | null
          m4_closure: boolean | null
          m4_feedback: boolean | null
          m4_game: boolean | null
          m4_intro: boolean | null
          m4_quiz: boolean | null
          m4_story: boolean | null
          m4_visit: boolean | null
          progress_percentage: number | null
          test_sus: boolean | null
          test_usability: boolean | null
          updated_at: string | null
        }
        Insert: {
          final_tests_unlocked?: boolean | null
          id: string
          m1_closure?: boolean | null
          m1_feedback?: boolean | null
          m1_game?: boolean | null
          m1_intro?: boolean | null
          m1_quiz?: boolean | null
          m1_story?: boolean | null
          m1_visit?: boolean | null
          m2_closure?: boolean | null
          m2_feedback?: boolean | null
          m2_game?: boolean | null
          m2_intro?: boolean | null
          m2_quiz1?: boolean | null
          m2_quiz2?: boolean | null
          m2_story?: boolean | null
          m2_visit?: boolean | null
          m3_closure?: boolean | null
          m3_feedback?: boolean | null
          m3_game?: boolean | null
          m3_intro?: boolean | null
          m3_quiz?: boolean | null
          m3_representation?: boolean | null
          m3_story?: boolean | null
          m3_visit?: boolean | null
          m4_closure?: boolean | null
          m4_feedback?: boolean | null
          m4_game?: boolean | null
          m4_intro?: boolean | null
          m4_quiz?: boolean | null
          m4_story?: boolean | null
          m4_visit?: boolean | null
          progress_percentage?: number | null
          test_sus?: boolean | null
          test_usability?: boolean | null
          updated_at?: string | null
        }
        Update: {
          final_tests_unlocked?: boolean | null
          id?: string
          m1_closure?: boolean | null
          m1_feedback?: boolean | null
          m1_game?: boolean | null
          m1_intro?: boolean | null
          m1_quiz?: boolean | null
          m1_story?: boolean | null
          m1_visit?: boolean | null
          m2_closure?: boolean | null
          m2_feedback?: boolean | null
          m2_game?: boolean | null
          m2_intro?: boolean | null
          m2_quiz1?: boolean | null
          m2_quiz2?: boolean | null
          m2_story?: boolean | null
          m2_visit?: boolean | null
          m3_closure?: boolean | null
          m3_feedback?: boolean | null
          m3_game?: boolean | null
          m3_intro?: boolean | null
          m3_quiz?: boolean | null
          m3_representation?: boolean | null
          m3_story?: boolean | null
          m3_visit?: boolean | null
          m4_closure?: boolean | null
          m4_feedback?: boolean | null
          m4_game?: boolean | null
          m4_intro?: boolean | null
          m4_quiz?: boolean | null
          m4_story?: boolean | null
          m4_visit?: boolean | null
          progress_percentage?: number | null
          test_sus?: boolean | null
          test_usability?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_create_researcher:
        | {
            Args: {
              email_input: string
              password_input: string
              username_input: string
            }
            Returns: undefined
          }
        | {
            Args: { email_input: string; username_input: string }
            Returns: undefined
          }
      check_is_admin: { Args: never; Returns: boolean }
      check_is_researcher: { Args: never; Returns: boolean }
      is_admin_secure: { Args: never; Returns: boolean }
      is_researcher: { Args: never; Returns: boolean }
      is_researcher_secure: { Args: never; Returns: boolean }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
