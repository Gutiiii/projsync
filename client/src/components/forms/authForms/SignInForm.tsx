'use client';
import { Button } from '@/components/Button';
import FormError from '@/components/FormError';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { signIn, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { FaGoogle } from 'react-icons/fa';
// import { createUserSchema } from '@/schema/user.schema';
// import { CreateUserFormData } from '@/types/user.types';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { hash } from 'bcrypt';
import { BACKEND_URL, FRONTEND_URL } from '@/lib/constants';
import { signinUserSchema } from '@/schemas/user.schema';
import { SigninUserFormData } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';

const SignInForm = () => {
  const t = useTranslations('Login');
  const toaster = useTranslations('Toaster');

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
    console.log('RESULT: ', result);
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
        window.location.href = '/dashboard';
      }, 2000);
    }
  };

  //   const { data, isLoading, isError } = useQuery({
  //     queryFn: async () => {
  //       const data = await axios.get(
  //         `http://localhost:3000/api/findcustomerbyexportcode`,
  //         { params: { exportcode: exportCode } },
  //       );
  //       return data.data['customer'];
  //     },
  //   });
  //   const queryClient = useQueryClient();
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<CreateUserFormData>({
  //     resolver: zodResolver(createUserSchema),
  //   });

  //   const submitData = async (formData: CreateUserFormData) => {
  //     const username = data?.firstname + ' ' + data?.lastname;
  //     const email = data?.email.replace(/\s/g, '');
  //     const customerId = data?.id;
  //     const password = await hash(formData['password'], 10);
  //     console.log('PASSS', password);
  //     const values = {
  //       username,
  //       email,
  //       customerId,
  //       password,
  //     };
  //     const response = await axios
  //       .post(`http://localhost:3000/api/auth/signup`, values, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //         },
  //       })
  //       .then((response: any) => response)
  //       .catch((error: any) => error.response.data);
  //     if (response['status'] === 200) {
  //       toast.success('Benutzer erfolgreich erstellt', {
  //         position: 'top-center',
  //         autoClose: 2500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         progress: undefined,
  //         theme: 'colored',
  //       });
  //       queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] });
  //       setTimeout(() => {
  //         window.location.href = '/signin';
  //       }, 2800);
  //     } else {
  //       toast.error('Something went wrong, please try again', {
  //         position: 'top-center',
  //         autoClose: 2500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         progress: undefined,
  //         theme: 'colored',
  //       });
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2800);
  //     }
  //   };
  //TODO Replace Logo
  return (
    <main className="font-light">
      <div className="mb-2">Logo.(REPLACE)</div>
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
    </main>
  );
};

export default SignInForm;
