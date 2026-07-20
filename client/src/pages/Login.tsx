import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/useAuthStore";
import API_PATHS from "@/utils/apiPaths";
import type { LoginForm } from "../types/type";

const Login = () => {
	const setAuth = useAuthStore((state) => state.setAuth);

	const user: LoginForm = {
		email: "",
		password: ""
	};

	const LoginSchema = z.object({
		email: z.email("Enter a valid email").trim(),
		password: z.string().min(8, "Password must be at least 8 characters")
	});

	const form = useForm({
		defaultValues: user,
		validators: {
			onChange: LoginSchema
		},
		onSubmit: ({ value }) => {
			mutate(value);
		}
	});

	const { mutate, isPending, isError } = useMutation({
		mutationFn: async (vals: LoginForm) => {
			return api.post(API_PATHS.AUTH.LOGIN, vals);
		},
		onSuccess: (response) => {
			setAuth(response?.data?.access_token, response?.data?.user);
		},
		onError: (error) => {
			toast(error.message, { position: "bottom-center" });
		}
	});

	return (
		<section className="bg-white h-svh">
			<div className="grid md:grid-cols-2 w-full p-4 h-full gap-4">
				<div className="w-full h-full flex items-center justify-center">
					<form
						className="w-full max-w-md"
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<FieldSet>
								<FieldLegend>Welcome Back!</FieldLegend>
								<FieldDescription>
									Please enter your login details
								</FieldDescription>
							</FieldSet>
							<form.Field
								name="email"
								children={(field) => {
									const _isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const _showError =
										field.state.meta.isTouched &&
										field.state.meta.errors.length > 0;
									return (
										<Field>
											<FieldLabel className="capitalize" htmlFor={field.name}>
												{field.name}
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => {
													field.handleChange(e.target.value);
												}}
												aria-invalid={_isInvalid}
												placeholder="Enter your email"
												disabled={isPending}
												required
											/>
											{_showError && (
												<>
													{field.state.meta.errors.map((error) => {
														return (
															<p className="text-sm text-destructive">
																{error?.message}
															</p>
														);
													})}
												</>
											)}
										</Field>
									);
								}}
							/>
							<form.Field
								name="password"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									const showError =
										field.state.meta.isTouched &&
										field.state.meta.errors.length > 0;
									return (
										<Field>
											<FieldLabel htmlFor={field.name}>Password</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => {
													field.handleChange(e.target.value);
												}}
												aria-invalid={isInvalid}
												placeholder="Enter your password"
												type="password"
												disabled={isPending}
												required
											/>
											{showError && (
												<>
													{field.state.meta.errors.map((error) => {
														return (
															<p className="text-xs text-destructive">
																{error?.message}
															</p>
														);
													})}
												</>
											)}
											<Link
												to="/"
												className="max-w-fit inline-flex self-end text-sm hover:underline transition-all"
											>
												Forgot Password?
											</Link>
										</Field>
									);
								}}
							/>
							<Button type="submit">
								Sign in
								{isPending && <Spinner />}
							</Button>
							<div className="flex items-center justify-center gap-1 text-gray-500 text-sm">
								<span>Don't have an account?</span>
								<Link
									to="/"
									className="text-gray-900 hover:underline transition-all"
								>
									Sign up
								</Link>
							</div>
						</FieldGroup>
					</form>
				</div>
				<div className="hidden md:block h-full w-full bg-black"></div>
			</div>
		</section>
	);
};

export default Login;
