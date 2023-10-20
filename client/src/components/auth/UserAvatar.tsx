'use client';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Avatar from 'react-avatar';
import { toast } from 'sonner';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const UserAvatar: FC = ({}) => {
  const t = useTranslations('Toaster');
  const avatar = useTranslations('Avatar');
  const { data: session } = useSession();

  const onPasswordChange = () => {
    if (session?.user.provider === 'GOOGLE') {
      toast.error(`${t('passwordchangegoogle')}`, {
        description: `${t('passwordchangegoogledescription')}`,
        duration: 6000,
      });
    }
    if (session?.user.provider === 'CREDENTIALS') {
      toast.success(`${t('passwordchangecredentials')}`, {
        description: `${t('passwordchangecredentialsdescription')}`,
        duration: 6000,
      });
    }
  };

  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar name={session?.user.name} color="black " round size="40" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onPasswordChange()}
          >
            {avatar('changepassword')}
          </DropdownMenuItem>
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
