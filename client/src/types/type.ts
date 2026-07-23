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

export type { LoginForm, RegisterForm, UserResponse };
