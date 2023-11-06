export type ClubItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
};

export type ClubOwner = {
  id: string;
  email: string;
  full_name: string;
};

export type Club = {
  id: number;
  title: string;
  description: string;
  image: string;
  owner: ClubOwner | null;
  created_at: string;
  updated_at: string;
};
