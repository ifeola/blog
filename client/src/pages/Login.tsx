import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
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
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/useAuthStore";
import API_PATHS from "@/utils/apiPaths";
import type { LoginForm } from "../types/type";
// import LoginIcon from "@/components/ui_mine/Icons";
import LoginImage from "@/assets/images/login-image.webp";

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const user: LoginForm = {
    email: "",
    password: "",
  };

  const LoginSchema = z.object({
    email: z.email("Enter a valid email").trim(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const form = useForm({
    defaultValues: user,
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (vals: LoginForm) => {
      return api.post(API_PATHS.AUTH.LOGIN, vals);
    },
    onSuccess: (response) => {
      setAuth(response?.data?.access_token, response?.data?.user);

      const user = response?.data?.user;
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;

        case "user":
          navigate(`/user/${user.id}`);
          break;

        default:
          navigate("/login");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <section className="bg-black h-svh">
      <div className="grid md:grid-cols-2 w-full p-4 h-full gap-4">
        <div className="w-full h-full flex items-center justify-center border border-white/20 bg-gray-900/30">
          <form
            className="w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <FieldSet className="text-secondary">
                <FieldLegend className="font-heading">
                  Welcome Back!
                </FieldLegend>
                <FieldDescription>
                  Please enter your login details
                </FieldDescription>
              </FieldSet>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  const showError =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <Field>
                      <FieldLabel
                        className="capitalize font-heading text-muted"
                        htmlFor={field.name}
                      >
                        {field.name}
                      </FieldLabel>
                      <Input
                        className="border-ring/20"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        aria-invalid={isInvalid}
                        placeholder="Enter your email"
                        disabled={isPending}
                        required
                      />
                      {showError && (
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
                      <FieldLabel
                        htmlFor={field.name}
                        className="capitalize font-heading text-muted"
                      >
                        {field.name}
                      </FieldLabel>
                      <Input
                        className="border-ring/20"
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
                        className="max-w-fit inline-flex self-end text-sm text-muted hover:underline transition-all"
                      >
                        Forgot Password?
                      </Link>
                    </Field>
                  );
                }}
              />
              <Button type="submit" className="">
                Sign in
                {isPending && <Spinner />}
              </Button>
              <div className="flex items-center justify-center gap-1 text-muted text-sm">
                <span>Don't have an account?</span>
                <Link
                  to="/register"
                  className="text-muted hover:underline transition-all font-semibold"
                >
                  Sign up
                </Link>
              </div>
            </FieldGroup>
          </form>
        </div>
        <div className="hidden h-full w-full bg-black md:flex items-center justify-center overflow-hidden">
          <img src={LoginImage} className="min-w-full h-full aspect-auto" />
        </div>
      </div>
    </section>
  );
};

export default Login;
