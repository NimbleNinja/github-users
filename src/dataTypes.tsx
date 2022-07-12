export type IUser = {
  id: number;
  login: string;
  avatar_url: string;
};

export interface IUserMoreInfo extends IUser {
  name: string;
  email: string | null;
  location: string | null;
  created_at: string;
  followers: number;
  following: number;
  bio: string | null;
  public_repos: number;
}

export type IUserRepo = {
  id: number;
  name: string;
  forks_count: number;
  stargazers_count: number;
  html_url: string;
};
