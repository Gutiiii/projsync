'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useTranslations } from 'next-intl';
// import { createUserSchema } from '@/schema/user.schema';
// import { CreateUserFormData } from '@/types/user.types';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { FC } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';

const SignUpForm = () => {
  const t = useTranslations('Register');
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
      <h1 className="text-2xl mb-2">{t('header')}</h1>
      <div className="flex text-md">
        <p className="mr-1">{t('isregistered')}</p>
        <div className="text-blue-600 cursor-pointer hover:underline">
          <a href="/signin">{t('login')}.</a>
        </div>
      </div>
      <div className="mt-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="ml-1">Email</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
          <Label className="ml-1">Email</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
          <Label className="ml-1">Email</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
          <Label className="ml-1">Email</Label>
          <Input type="email" placeholder="Email" />
        </div>
      </div>
      <Button className="w-full h-10 mt-4">{t('createaccount')}</Button>
      <div className="flex mt-8">
        <p className="line w-1/2 h-px bg-black" />
        <p className="inline text-sm mx-3 -mt-[10px]">{t('or')}</p>
        <p className="line w-1/2 h-px bg-black" />
      </div>
    </main>
  );
};

export default SignUpForm;
