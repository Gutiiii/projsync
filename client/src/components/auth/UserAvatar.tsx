'use client';
import { sendPasswordEmail } from '@/app/actions';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Avatar from 'react-avatar';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const UserAvatar: FC = ({}) => {
  const [state, formAction] = useFormState(sendPasswordEmail, null);
  const t = useTranslations('Toaster');
  const avatar = useTranslations('Avatar');
  const { data: session } = useSession();

  if (state?.status === 200) {
    toast.success(`${t('passwordchangecredentials')}`, {
      description: `${t('passwordchangecredentialsdescription')}`,
      duration: 6000,
    });
  } else if (state?.status === 400) {
    toast.error(`${t('passwordchangeerror')}`, {
      duration: 6000,
    });
  }

  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar name={session?.user.name} color="black " round size="40" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <form action={() => formAction()}>
            <DropdownMenuItem className="cursor-pointer">
              <button type="submit">{avatar('changepassword')}</button>
            </DropdownMenuItem>
          </form>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut()}
          >
            {avatar('signout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAvatar;
