export type Platform = 'Instagram' | 'Facebook' | 'LinkedIn';

export type Status = 'draft' | 'scheduled' | 'published';

export interface Campaign {
  id: string;
  title: string;
  caption?: string;
  platform: Platform;
  status: Status;
  likes?: number;
  comments?: number;
  budget: number;
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
}
