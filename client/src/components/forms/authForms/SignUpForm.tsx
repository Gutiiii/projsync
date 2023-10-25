'use client';
import { Button } from '@/components/Button';
import FormError from '@/components/FormError';
import { Input } from '@/components/ui/input';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import { FRONTEND_URL } from '@/lib/constants';
import { registerUserSchema } from '@/schemas/user.schema';
import { RegisterUserFormData } from '@/types/user.types';
import { Spinner } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'sonner';

const SignUpForm = () => {
  const t = useTranslations('Register');
  const toaster = useTranslations('Toaster');
  const pathName = usePathname();

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
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserSchema),
  });
  //TODO Check why response is idle

  // const submitData = async (formData: RegisterUserFormData) => {
  //   const name = formData['name'];
  //   const email = formData['email'];
  //   const password = formData['password'];
  //   const values = {
  //     name,
  //     email,
  //     password,
  //   };
  //   const response = await axios
  //     .post(BACKEND_URL + '/auth/signup', values, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     })
  //     .then((response: any) => response)
  //     .catch((error: any) => error.response.data);
  //   if (response['status'] === 201) {
  //     toast.success(`${toaster('register')}`, {
  //       description: `${toaster('registerdescription')}`,
  //       duration: 2000,
  //     });
  //     setTimeout(() => {
  //       window.location.href = '/signin';
  //     }, 2000);
  //   } else {
  //     toast.error(`${toaster('error')}`, {
  //       description: `${toaster('errordescription')}`,
  //     });
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 2000);
  //   }
  // };
  const { mutateAsync, isSuccess, isError, isLoading } = useRegisterUser();
  const submitData = async (formData: RegisterUserFormData) => {
    const name = formData['name'];
    const email = formData['email'];
    const password = formData['password'];
    const values = {
      name,
      email,
      password,
    };
    mutateAsync(values);
    console.log('SUC: ', isSuccess);
    // const response = await axios
    //   .post(BACKEND_URL + '/auth/signup', values, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //   })
    //   .then((response: any) => response)
    //   .catch((error: any) => error.response.data);
    if (isSuccess) {
      toast.success(`${toaster('register')}`, {
        description: `${toaster('registerdescription')}`,
        duration: 2000,
      });
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    } else if (isError) {
      toast.error(`${toaster('error')}`, {
        description: `${toaster('errordescription')}`,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  //TODO Replace Logo
  return (
    <main className="font-light">
      <div className="mb-2">Logo.(REPLACE)</div>
      <h1 className="text-2xl mb-2">{t('header')}</h1>
      <div className="flex text-md">
        <p className="mr-1">{t('isregistered')}</p>
        <div className="text-blue-600 cursor-pointer hover:underline">
          <a href="/signin">{t('login')}.</a>
        </div>
      </div>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="mt-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="ml-1" htmlFor="fullname">
              {t('fullname')}
            </Label>
            <Input
              type="text"
              id="fullname"
              className={errors.name ? 'border-red-500' : ''}
              placeholder={t('fullname')}
              {...register('name')}
            />
            {errors.name && <FormError error={errors.name.message} />}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="ml-1" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              className={errors.email ? 'border-red-500' : ''}
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
              className={errors.password ? 'border-red-500' : ''}
              placeholder={t('password')}
              {...register('password')}
            />
            {errors.password && <FormError error={errors.password.message} />}
          </div>
        </div>
        <Button className="w-full h-10 mt-4" type="submit">
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="black"
              size="md"
              className="my-1"
            />
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
    </main>
  );
};

export default SignUpForm;
