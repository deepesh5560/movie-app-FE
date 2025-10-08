'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { useState } from 'react';
import { authService } from '@/services/auth/authService'; // ✅ optional integration


const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});


type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      

      const res = await authService.login({
        email: data.email,
        password: data.password,
      });

     
      router.push('/movies'); // redirect after login
    } catch (error: any) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#093545] font-montserrat">
      <div className="w-full max-w-sm p-8 rounded-lg">
        <h1 className="text-[64px] font-semibold text-center text-white mb-8">
          Sign in
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className={`w-full px-4 py-3 rounded-[10px] text-[14px] placeholder-gray-400 transition-all duration-200
              ${
                errors.email
                  ? 'border border-red-400 bg-[#23404c] text-white focus:border-red-400'
                  : 'border border-transparent bg-[#23404c] text-white focus:bg-white focus:text-[#23404c] focus:border-[#23404c]'
              } focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
              className={`w-full px-4 py-3 rounded-[10px] text-[14px] placeholder-gray-400 transition-all duration-200
              ${
                errors.password
                  ? 'border border-red-400 bg-[#23404c] text-white focus:border-red-400'
                  : 'border border-transparent bg-[#23404c] text-white focus:bg-white focus:text-[#23404c] focus:border-[#23404c]'
              } focus:outline-none`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-center space-x-3 mt-2">
            <label
              htmlFor="remember"
              className="relative flex items-center cursor-pointer"
            >
              <input
                id="remember"
                type="checkbox"
                {...register('remember')}
                className="peer appearance-none w-5 h-5 rounded-md bg-[#23404c] border-none cursor-pointer checked:bg-[#23404c] focus:outline-none"
              />
              <span className="absolute text-[#2BD17E] text-[18px] left-[3px] top-[-1px] opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                ✓
              </span>
            </label>
            <span className="text-white text-[16px] select-none">
              Remember me
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-[15px] mt-2 text-white font-semibold rounded-[10px] transition-colors duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#2BD17E] hover:bg-green-500'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {/* Background */}
      <Image
        src="/bg-wave.png"
        alt="wave background"
        width={1920}
        height={300}
        className="absolute bottom-0 w-full"
        priority
      />
    </div>
  );
}
