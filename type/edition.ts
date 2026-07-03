export interface Edition {
  id: string;

  user_id: string;

  issue_number: number;

  week_key: string;

  start_date: string;

  end_date: string;

  display_month: number;

  display_year: number;

  captured_days: number;

  memory_count: number;

  title: string | null;

  summary: string | null;

  cover_image: string | null;

  pdf_url: string | null;

  status: string;

  created_at: string;
}
