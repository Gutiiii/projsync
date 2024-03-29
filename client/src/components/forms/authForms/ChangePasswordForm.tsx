'use client';
import { Button } from '@/components/Button';
import Logo from '@/components/ui/Logo';
import { Skeleton } from '@/components/ui/skeleton';
import { useChangePassword } from '@/hooks/authHooks/useChangePassword';
import { useGetByResetPasswordCode } from '@/hooks/authHooks/useGetByResetPasswordCode';
import { changePasswordSchema } from '@/schemas/user.schema';
import { ChangePasswordFormData } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Spinner } from '@nextui-org/react';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ChangePasswordForm = ({ code }: { code: string }) => {
  const { data: session } = useSession();
  if (session) signOut();
  const t = useTranslations('ChangePassword');
  const toaster = useTranslations('Toaster');
  const pathName = usePathname();

  const router = useRouter();
  const mutation = useMutation({ mutationFn: useChangePassword });

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
    const values = {
      password,
      code,
    };
    mutation.mutateAsync(values, {
      onSuccess: () => {
        toast.success(`${toaster('changepassword')}`, {
          description: `${toaster('registerdescription')}`,
          duration: 2000,
        });
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
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
  if (isLoading) {
    return (
      <main
        className={
          pathName.includes('/de') ? 'font-light mx-[60px] ' : 'font-light '
        }
      >
        <Skeleton className="w-32 h-4 bg-gray-400 mb-3" />
        <Skeleton className="w-36 h-6 bg-gray-400" />
        <div className="mt-4">
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Skeleton className="h-4 w-24 bg-gray-400" />
            <Skeleton className="w-80 h-10 bg-gray-400" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Skeleton className="h-4 w-24 bg-gray-400" />
            <Skeleton className="w-80 h-10 bg-gray-400" />
          </div>
        </div>

        <Skeleton className="w-80 h-10 bg-gray-400 mt-4" />
      </main>
    );
  }
  if (isSuccess) {
    return (
      <main
        className={
          pathName.includes('/de') ? 'font-light mx-[60px]' : 'font-light'
        }
      >
        <Logo />
        <h1 className="text-xl mb-2">{t('header')}</h1>

        <form onSubmit={handleSubmit(submitData)}>
          <div className="mt-4">
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
              <Label className="ml-1" htmlFor="email">
                {t('password')}
              </Label>
              <Input
                size="sm"
                type="password"
                className="w-80"
                id="email"
                placeholder={t('password')}
                {...register('password')}
                isInvalid={errors.password?.message !== undefined}
                errorMessage={errors.password?.message}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
              <Label className="ml-1">{t('passwordconfirmation')}</Label>
              <Input
                size="sm"
                type="password"
                id="password"
                placeholder={t('passwordconfirmation')}
                {...register('passwordConfirmation')}
                className="w-80"
                isInvalid={errors.passwordConfirmation?.message !== undefined}
                errorMessage={errors.passwordConfirmation?.message}
              />
            </div>
          </div>
          <Button className="w-full h-10 mt-4" type="submit">
            {mutation.isLoading ? (
              <Spinner color="white" className="my-1" size="sm" />
            ) : (
              t('submit')
            )}
          </Button>
        </form>
      </main>
    );
  }
};

export default ChangePasswordForm;
