import { z } from "zod";

export const userSchema = z.object({
	first_name: z.string().min(2).max(100).trim().toLowerCase(),
	middle_name: z.string().min(2).max(100).trim().toLowerCase().optional(),
	last_name: z.string().min(2).max(100).trim().toLowerCase(),
	date_of_birth: z.date(),
	email: z.email().trim().toLowerCase(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[a-z]/, "Must contain a lowercase letter")
		.regex(/[A-Z]/, "Must contain an uppercase letter")
		.regex(/\d/, "Must contain a number")
		.regex(/[@$!%*?&#]/, "Must contain a special character")
});

export type UserSchema = z.infer<typeof userSchema>;

export const loginSchema = z.object({
	email: z.email().trim().toLowerCase(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[a-z]/, "Must contain a lowercase letter")
		.regex(/[A-Z]/, "Must contain an uppercase letter")
		.regex(/\d/, "Must contain a number")
		.regex(/[@$!%*?&#]/, "Must contain a special character")
});

export type LoginInput = z.infer<typeof loginSchema>;
