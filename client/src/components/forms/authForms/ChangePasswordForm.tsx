'use client';
import { Button } from '@/components/Button';
import FormError from '@/components/error/FormError';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetByResetPasswordCode } from '@/hooks/authHooks/useGetByResetPasswordCode';
import { changePasswordSchema } from '@/schemas/user.schema';
import { ChangePasswordFormData } from '@/types/user.types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const ChangePasswordForm = ({ code }: { code: string }) => {
  const { data: session } = useSession();
  if (session) signOut();
  const t = useTranslations('ChangePassword');
  const toaster = useTranslations('Toaster');
  const pathName = usePathname();
  const router = useRouter();

  const { isLoading, isError, isSuccess } = useGetByResetPasswordCode(code);

  if (isError) router.push('/signin');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const submitData = async (formData: ChangePasswordFormData) => {
    const password = formData['password'];
    console.log(password);
  };
  if (isLoading) {
    return (
      <main
        className={
          pathName.includes('/de') ? 'font-light mx-[60px] ' : 'font-light '
        }
      >
        <Skeleton className="w-32 h-4 bg-gray-300 mb-3" />
        <Skeleton className="w-36 h-6 bg-gray-300" />
        <div className="mt-4">
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Skeleton className="h-4 w-24 bg-gray-300" />
            <Skeleton className="w-80 h-10 bg-gray-300" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Skeleton className="h-4 w-24 bg-gray-300" />
            <Skeleton className="w-80 h-10 bg-gray-300" />
          </div>
        </div>

        <Skeleton className="w-80 h-10 bg-gray-300 mt-4" />
      </main>
    );
  }
  //TODO Replace Logo
  if (isSuccess) {
    return (
      <main
        className={
          pathName.includes('/de') ? 'font-light mx-[60px]' : 'font-light'
        }
      >
        <div className="mb-2 ">Logo.(REPLACE)</div>
        <h1 className="text-xl mb-2">{t('header')}</h1>

        <form onSubmit={handleSubmit(submitData)}>
          <div className="mt-4">
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
              <Label className="ml-1" htmlFor="email">
                {t('password')}
              </Label>
              <Input
                type="password"
                className="w-80"
                id="email"
                placeholder={t('password')}
                {...register('password')}
              />
              {errors.password && (
                <FormError
                  error={errors.password.message}
                  className="rounded-b-lg -mt-3"
                />
              )}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
              <Label className="ml-1">{t('passwordconfirmation')}</Label>
              <Input
                type="password"
                id="password"
                placeholder={t('passwordconfirmation')}
                {...register('passwordConfirmation')}
                className="w-80"
              />
              {errors.passwordConfirmation && (
                <FormError
                  error={errors.passwordConfirmation.message}
                  className="rounded-b-lg -mt-3"
                />
              )}
            </div>
          </div>
          <Button className="w-full h-10 mt-4" type="submit">
            {t('submit')}
          </Button>
        </form>
      </main>
    );
  }
};

export default ChangePasswordForm;
