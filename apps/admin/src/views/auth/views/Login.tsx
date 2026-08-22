import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input, Label } from "@my-monorepo/ui";

const loginSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log("Create account", values);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full  bg-white h-full rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
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
              Create your account
            </h1>
            <p className="text-neutral-500 text-left mt-2 mb-8">
              Start with your details and join the platform in under a minute.
            </p>

            <Label htmlFor="fullName" className="mb-1.5">
              Full name
            </Label>
            <Input
              id="fullName"
              size="lg"
              placeholder="Enter your full name"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}

            <Label htmlFor="email" className="mb-1.5 mt-5">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              size="lg"
              placeholder="Enter your email"
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
                placeholder="Create a password"
                className="pr-12"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}

            <button
              type="button"
              onClick={() => void handleSubmit(onSubmit)()}
              disabled={isSubmitting}
              className="mt-6 w-full rounded-lg bg-neutral-900 hover:bg-neutral-800 active:bg-black transition text-white font-medium py-2.5 disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-sm text-neutral-500 mt-6 ">
              Already have an account?{" "}
              <a
                href="#"
                className="font-semibold text-neutral-900 underline underline-offset-2"
              >
                Sign in
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
            <button
              type="button"
              aria-label="Next"
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition"
            >
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              aria-label="Previous"
              className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition"
            >
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
