'use client';
import Logo from '@/components/ui/Logo';
import { registerUser } from '@/hooks/authHooks/useRegisterUser';
import { FRONTEND_URL } from '@/lib/constants';
import { registerUserSchema } from '@/schemas/user.schema';
import { RegisterUserFormData } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Spinner } from '@nextui-org/react';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'sonner';

const SignUpForm = () => {
  const t = useTranslations('Register');
  const toaster = useTranslations('Toaster');
  const mutation = useMutation({ mutationFn: registerUser });
  const router = useRouter();

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl');

  const handleGoogleSignin = async () => {
    if (callbackUrl) {
      signIn('google', {
        callbackUrl: callbackUrl,
        redirect: true,
      });
    } else {
      signIn('google', {
        callbackUrl: FRONTEND_URL + '/dashboard',
        redirect: true,
      });
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserSchema),
  });
  //TODO Check why response is idle

  const submitData = async (formData: RegisterUserFormData) => {
    const name = formData['name'];
    const email = formData['email'];
    const password = formData['password'];
    const values = {
      name,
      email,
      password,
    };
    await mutation.mutateAsync(values, {
      onSuccess: () => {
        toast.success(`${toaster('register')}`, {
          description: `${toaster('registerdescription')}`,
          duration: 2000,
        });
        if (callbackUrl) {
          setTimeout(() => {
            signIn(undefined, { callbackUrl: callbackUrl });
          }, 2000);
        } else {
          setTimeout(() => {
            router.push('/signin');
          }, 2000);
        }
      },
      onError: () => {
        toast.error(`${toaster('error')}`, {
          description: `${toaster('errordescription')}`,
        });
        setTimeout(() => {
          router.refresh();
        }, 2000);
      },
    });
  };
  return (
    <main className="font-light">
      <Logo />
      <h1 className="text-2xl mb-2">{t('header')}</h1>
      <div className="flex text-md">
        <p className="mr-1">{t('isregistered')}</p>
        <div className="text-blue-600 cursor-pointer hover:underline">
          <Link href="/signin">{t('login')}.</Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="mt-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="ml-1" htmlFor="fullname">
              {t('fullname')}
            </Label>
            <Input
              errorMessage={errors.name?.message}
              type="text"
              id="fullname"
              size="sm"
              isRequired
              isInvalid={errors.name?.message !== undefined}
              className={errors.name ? 'border-red-500' : ''}
              label={t('fullname')}
              {...register('name')}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="ml-1" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              errorMessage={errors.email?.message}
              className={errors.email ? 'border-red-500' : ''}
              label={t('email')}
              isRequired
              size="sm"
              isInvalid={errors.email?.message !== undefined}
              {...register('email')}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="ml-1">{t('password')}</Label>
            <Input
              type="password"
              id="password"
              className={errors.password ? 'border-red-500' : ''}
              label={t('password')}
              isRequired
              isInvalid={errors.password?.message !== undefined}
              errorMessage={errors.password?.message}
              size="sm"
              {...register('password')}
            />
          </div>
        </div>
        <Button className="w-full h-10 mt-4" type="submit" color="primary">
          {mutation.isLoading ? (
            <Spinner color="white" className="my-1" />
          ) : (
            t('createaccount')
          )}
        </Button>
      </form>
      <div className="flex mt-8">
        <p className="line w-1/2 h-px bg-black" />
        <p className="inline text-sm mx-3 -mt-[10px]">{t('or')}</p>
        <p className="line w-1/2 h-px bg-black" />
      </div>
      <Button className="w-full h-10 mt-4" onClick={() => handleGoogleSignin()}>
        <div className="flex text-center items-center justify-center">
          <div className="mr-2 mb-0.5">
            <FaGoogle />
          </div>
          <p>{t('googlesignup')}</p>
        </div>
      </Button>
    </main>
  );
};

export default SignUpForm;
