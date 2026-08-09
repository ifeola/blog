type UserResponse = {
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string;
  id: string;
  role: "user" | "admin";
  access_token: string;
};

type RegisterForm = {
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string;
  password: string;
};

type LoginForm = {
  email: string;
  password: string;
};

interface Post {
  author_id: string;
  excerpt: string;
  cover_image_url: string;
  content: string;
  deleted_at: string | null;
  id: string;
  published_at: string;
  slug: string;
  status: string;
  title: string;
  updated_at: string | null;
}

export type { LoginForm, RegisterForm, UserResponse, Post };
