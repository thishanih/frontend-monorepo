import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Input, Label } from "@my-monorepo/ui";
import { Login as login } from "@my-monorepo/api-client/services/auth.service";
import { SetCookie } from "@my-monorepo/utils";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

type LoginFormValues = yup.InferType<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      SetCookie("accessToken", data.token);
      SetCookie("refreshToken", data.refresh_token);
      toast.success("Login successful");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Unable to login. Check your email and password.");
    },
  });

  const onSubmit = (values: LoginFormValues) =>
    loginMutation.mutate({ username: values.email, password: values.password });

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full  h-full  shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: form panel */}
        <div className="w-full md:w-1/2 flex flex-col px-8 sm:px-16 py-10">
          <div className="flex items-center gap-2 mb-24">
            <span className="text-xl leading-none font-black tracking-tighter -skew-x-12 select-none">
              ///
            </span>
            <span className="font-semibold text-lg text-neutral-900">
              Untitled UI
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <h1 className="text-2xl font-semibold text-neutral-900 text-left">
              Login to your account
            </h1>
            <p className="text-neutral-500 text-left mt-2 mb-8">
              Enter your details to access your account.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="email" className="mb-1.5 mt-5">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                size="lg"
                error={Boolean(errors.email)}
                placeholder="Enter your email"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}

              <Label htmlFor="password" className="mb-1.5 mt-5">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  size="lg"
                  type={showPassword ? "text" : "password"}
                  error={Boolean(errors.password)}
                  placeholder="Create a password"
                  autoComplete="current-password"
                  className="pr-12"
                  {...register("password")}
                />
                <Button
                  variant="ghost"
                  tone="neutral"
                  size="icon"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: "0.25rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}

              <Button
                variant="solid"
                tone="brand"
                size="lg"
                type="submit"
                disabled={loginMutation.isPending}
                style={{ marginTop: "1.5rem", width: "100%" }}
              >
                {loginMutation.isPending && (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                )}
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>

            <p className="text-center text-sm text-neutral-500 mt-6 ">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-semibold text-neutral-900 underline underline-offset-2"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Right: image panel with a scalloped cutout on the left side */}
        <div className="relative w-full md:w-1/2  md:min-h-0 overflow-hidden bg-neutral-200">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&h=1400&fit=crop&auto=format"
            alt="Team members collaborating around a laptop in a bright workspace"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/0 to-black/0" />

          {/* testimonial card */}
          <div className="absolute left-6 right-20 bottom-6 rounded-2xl bg-black/30 backdrop-blur-md p-5 text-white">
            <p className="text-[15px] leading-snug font-medium">
              Signing up took less than two minutes, and the onboarding flow
              made it easy to get my profile ready for my first client call.
            </p>
            <p className="mt-4 font-semibold text-sm">Janelle Carter</p>
            <p className="text-white/70 text-sm">
              Product Designer | Austin, Texas
            </p>
          </div>

          {/* nav arrows */}
          <div className="absolute right-6 bottom-6 flex flex-col gap-3">
            <Button
              variant="ghost"
              tone="neutral"
              size="icon"
              type="button"
              aria-label="Next"
              style={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(4px)",
              }}
            >
              <ArrowRight size={18} />
            </Button>
            <Button
              variant="ghost"
              tone="neutral"
              size="icon"
              type="button"
              aria-label="Previous"
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(4px)",
              }}
            >
              <ArrowLeft size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
