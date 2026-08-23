import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Input, Label } from '@my-monorepo/ui';
import { Login as login } from '@my-monorepo/api-client/services/auth.service';
import { SetCookie } from '@my-monorepo/utils';
import { LoginImageCarousel } from '../components/LoginImageCarousel';

const loginSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
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
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      SetCookie('accessToken', data.token);
      SetCookie('refreshToken', data.refresh_token);
      toast.success('Login successful');
      navigate('/dashboard');
    },
    onError: () => {
      toast.error('Unable to login. Check your email and password.');
    },
  });

  const onSubmit = (values: LoginFormValues) =>
    loginMutation.mutate({ username: values.email, password: values.password });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-full flex-col overflow-hidden shadow-xl md:flex-row">
        {/* Left: form panel */}
        <div className="flex w-full flex-col px-8 py-10 sm:px-16 md:w-1/2">
          <div className="mb-24 flex items-center gap-2">
            <span className="-skew-x-12 select-none text-xl font-black leading-none tracking-tighter">
              ///
            </span>
            <span className="text-lg font-semibold text-neutral-900">Untitled UI</span>
          </div>

          <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
            <h1 className="text-left text-2xl font-semibold text-neutral-900">
              Login to your account
            </h1>
            <p className="mb-8 mt-2 text-left text-neutral-500">
              Enter your details to access your account.
            </p>

            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="email" className="mb-1.5 text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  size="lg"
                  error={Boolean(errors.email)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="mb-1.5 text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    size="lg"
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(errors.password)}
                    placeholder="Create a password"
                    autoComplete="current-password"
                    className="pr-12"
                    {...register('password')}
                  />

                  <Button
                    variant="ghost"
                    tone="neutral"
                    size="icon"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute',
                      right: '0.25rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <Button
                variant="solid"
                tone="brand"
                size="lg"
                type="submit"
                disabled={loginMutation.isPending}
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                {loginMutation.isPending && (
                  <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
                )}
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Don't have an account?{' '}
              <a href="#" className="font-semibold text-neutral-900 underline underline-offset-2">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Right: image carousel */}
        <div className="relative h-96 w-full overflow-hidden bg-neutral-200 md:h-full md:min-h-0 md:w-1/2">
          <LoginImageCarousel />
        </div>
      </div>
    </div>
  );
}
