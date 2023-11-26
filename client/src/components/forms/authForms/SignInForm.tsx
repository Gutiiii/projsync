'use client';
import { sendPasswordEmail, sendPasswordEmailForgot } from '@/app/actions';
import { Button } from '@/components/Button';
import FormError from '@/components/error/FormError';
import ForgotPasswordModal from '@/components/modal/ForgotPasswordModal';
import { Input } from '@/components/ui/input';
import { FRONTEND_URL } from '@/lib/constants';
import { signinUserSchema } from '@/schemas/user.schema';
import { SigninUserFormData } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
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
  const handleGoogleSignin = async () => {
    signIn('google', {
      callbackUrl: FRONTEND_URL + '/dashboard',
      redirect: true,
    });
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

  //TODO Replace Logo
  return (
    <main
      className={
        pathName.includes('/de') ? 'font-light mx-[60px]' : 'font-light'
      }
    >
      <div className="mb-2 ">Logo.(REPLACE)</div>
      <h1 className="text-xl mb-2">{t('header')}</h1>
      <div className="flex text-md">
        <p className="mr-1">{t('isregistered')}</p>
        <div className="text-blue-600 cursor-pointer hover:underline">
          <a href="/signup">{t('register')}.</a>
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
              placeholder={t('email')}
              {...register('email')}
            />
            {errors.email && <FormError error={errors.email.message} />}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="ml-1">{t('password')}</Label>
            <Input
              type="password"
              id="password"
              placeholder={t('password')}
              {...register('password')}
            />
            {errors.password && <FormError error={errors.password.message} />}
          </div>
        </div>
        <p
          className="text-center mt-2 text-blue-600 text-md hover:underline cursor-pointer"
          onClick={() => setModalVisible(true)}
        >
          Forgot Password?
        </p>
        <Button className="w-full h-10 mt-4" type="submit">
          {t('login')}
        </Button>
      </form>
      <div className="flex mt-8">
        <p className="line w-1/2 h-px bg-black" />
        <p className="inline text-sm mx-3 -mt-[10px]">{t('or')}</p>
        <p className="line w-1/2 h-px bg-black" />
      </div>

      <button
        className="w-full h-10 outline outline-1 rounded-md mt-4 hover:bg-gray-100"
        onClick={() => handleGoogleSignin()}
      >
        <div className="flex text-center items-center justify-center">
          <div className="mr-2 mb-0.5">
            <FaGoogle />
          </div>
          <p>{t('googlesignup')}</p>
        </div>
      </button>
      <ForgotPasswordModal
        visible={modalVisible}
        handleOnClose={onModalClose}
        handleOnSubmit={onModalSubmit}
      />
    </main>
  );
};

export default SignInForm;
