
export interface Course {
  id: number;
  slug: string;
  category_id: number;
  level_id: number;
  thumbnail: string;
  is_featured: boolean;
  type: "course" | "program"; // or extend as needed
  images: string[];
  available_users_num: number;
  registered_users: number;
  duration_type: "days" | "weeks" | "months"; // optional: union of expected units
  duration_value: number;
  branches: number[];
  brochure: string;
  brief_video: string;
  available_dates: string[]; // e.g., ["2025-04-01", "2025-05-15"]
  gender: "male" | "female" | "both";
  active: boolean;
  created_by: number;

  // Nested data
  category?: {
    id: number;
    active: boolean;
    target: string;
    type: string;
  };

  creator?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    active: boolean;
    verified: boolean;
    created_at: string;
    updated_at: string;
  };

  level?: {
    id: number;
    active: boolean;
  };

  translation?: {
    id: number;
    locale: string;
    title: string;
    short_info: string;
    details: string;
  };

  translations: Array<{
    id: number;
    locale: string;
    title: string;
    short_info: string;
    details: string;
  }>;

  locales: string[];
}