'use client';
import { sendPasswordEmailForgot } from '@/app/actions';
import ForgotPasswordModal from '@/components/modal/ForgotPasswordModal';
import { Button } from '@nextui-org/react';

import Logo from '@/components/ui/Logo';
import { FRONTEND_URL } from '@/lib/constants';
import { signinUserSchema } from '@/schemas/user.schema';
import { SigninUserFormData } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/react';
import { Label } from '@radix-ui/react-label';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'sonner';

const SignInForm = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const t = useTranslations('Login');
  const toaster = useTranslations('Toaster');
  const pathName = usePathname();
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
  } = useForm<SigninUserFormData>({
    resolver: zodResolver(signinUserSchema),
  });

  const submitData = async (formData: SigninUserFormData) => {
    const email = formData['email'];
    const password = formData['password'];

    if (callbackUrl) {
      const result = await signIn('credentials', {
        callbackUrl: callbackUrl,
        email,
        password,
      });
      if (result?.error) {
        toast.error(`${toaster('error')}`, {
          description: `${toaster('errordescription')}`,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.success(`${toaster('login')}`, {
          description: `${toaster('logindescription')}`,
          duration: 2000,
        });
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        toast.error(`${toaster('error')}`, {
          description: `${toaster('errordescription')}`,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.success(`${toaster('login')}`, {
          description: `${toaster('logindescription')}`,
          duration: 2000,
        });
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    }
  };

  const onModalClose = () => {
    setModalVisible(false);
  };

  const onModalSubmit = async (email: string) => {
    setModalVisible(false);
    await sendPasswordEmailForgot(email);
    toast(
      "If there's a User that exists with this E-Mail. An E-Mail has been sent!",
    );
  };

  return (
    <main
      className={
        pathName.includes('/de') ? 'font-light mx-[60px]' : 'font-light'
      }
    >
      <Logo />
      <h1 className="text-xl mb-2">{t('header')}</h1>
      <div className="flex text-md">
        <p className="mr-1">{t('isregistered')}</p>
        <div className="text-blue-600 cursor-pointer hover:underline">
          <Link
            href={
              callbackUrl
                ? { pathname: '/signup', query: { callbackUrl: callbackUrl } }
                : { pathname: '/signup' }
            }
          >
            {t('register')}.
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="mt-4">
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="ml-1" htmlFor="email">
              {t('email')}
            </Label>
            <Input
              type="text"
              id="email"
              label="Email"
              size="sm"
              isRequired
              {...register('email')}
              isInvalid={errors.email?.message !== undefined}
              errorMessage={errors.email?.message}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="ml-1">{t('password')}</Label>
            <Input
              size="sm"
              isRequired
              type="password"
              id="password"
              label={t('password')}
              {...register('password')}
              isInvalid={errors.password?.message !== undefined}
              errorMessage={errors.password?.message}
            />
          </div>
        </div>
        <p
          className="text-center mt-2 text-blue-600 text-md hover:underline cursor-pointer"
          onClick={() => setModalVisible(true)}
        >
          Forgot Password?
        </p>
        <Button className="w-full h-10 mt-4" type="submit" color="primary">
          {t('login')}
        </Button>
      </form>
      <div className="flex mt-8">
        <p className="line w-1/2 h-px bg-black" />
        <p className="inline text-sm mx-3 -mt-[10px]">{t('or')}</p>
        <p className="line w-1/2 h-px bg-black" />
      </div>

      <Button
        className="w-full h-10  rounded-md mt-4"
        onClick={() => handleGoogleSignin()}
      >
        <div className="flex text-center items-center justify-center">
          <div className="mr-2 mb-0.5">
            <FaGoogle />
          </div>
          <p>{t('googlesignup')}</p>
        </div>
      </Button>
      <ForgotPasswordModal
        visible={modalVisible}
        handleOnClose={onModalClose}
        handleOnSubmit={onModalSubmit}
      />
    </main>
  );
};

export default SignInForm;
