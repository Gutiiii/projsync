'use client';
import { sendPasswordEmail } from '@/app/actions';
import { Spinner } from '@chakra-ui/react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import LoadingSpinner from '../ui/LoadingSpinner';
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

  const [toastDisplayed, setToastDisplayed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);

    if (state?.status === 200 && !toastDisplayed) {
      toast.success(`${t('passwordchangecredentials')}`, {
        description: `${t('passwordchangecredentialsdescription')}`,
        duration: 3000,
      });
      setToastDisplayed(true);
    } else if (state?.status === 400 && !toastDisplayed) {
      toast.error(`${t('passwordchangeerror')}`, {
        duration: 3000,
      });
      setToastDisplayed(true);
    }

    if (state?.status !== undefined) {
      setLoading(false);
    }
  }, [state, toastDisplayed, t]);

  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar name={session?.user.name} color="black " round size="40" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setToastDisplayed(false);
              setLoading(true); // Set loading state to true when action starts
              formAction();
            }}
          >
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
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default UserAvatar;
