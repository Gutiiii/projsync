'use client';
import { Button } from '@/components/Button';
import FormError from '@/components/error/FormError';
import { Input } from '@/components/ui/input';
import { changePasswordSchema } from '@/schemas/user.schema';
import { ChangePasswordFormData } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const ChangePasswordForm = () => {
  const { data: session } = useSession();
  if (session) signOut();
  const t = useTranslations('ChangePassword');
  const toaster = useTranslations('Toaster');
  const pathName = usePathname();
  const router = useRouter();

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

  //TODO Replace Logo
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
              placeholder={t('passwordConfirmation')}
              {...register('passwordConfirmation')}
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
};

export default ChangePasswordForm;
