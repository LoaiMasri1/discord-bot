interface HttpData {
  api_key: string;
  language?: string;
  sort_by?: string;
  with_genres?: string;
  Authorization?: string;
}

export interface HttpParam extends HttpData {}
