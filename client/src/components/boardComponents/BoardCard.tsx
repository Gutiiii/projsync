import {
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  MenuProps,
  Skeleton,
  Space,
  Tag,
  theme,
  Tooltip,
} from 'antd';

import { Text } from '../text';

import {
  ClockCircleOutlined,
  EyeOutlined,
  MoreOutlined,
} from '@ant-design/icons';

import { useDeleteCard } from '@/hooks/projectHooks/useDeleteCard';
import { UserPayload } from '@/types/user.types';
import { getDateColor } from '@/utilities/getDateColor';
import { Input } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { TextIcon, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { FC, useMemo, useState } from 'react';
import Avatar from 'react-avatar';
import { toast } from 'sonner';
import UserAvatar from '../auth/UserAvatar';

interface CardProps {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  dueDate?: string;
  user: UserPayload;
  createdCardId?: string;
  projectId: string;
}

const BoardCard: FC<CardProps> = ({
  id,
  title,
  description,
  updatedAt,
  dueDate,
  createdCardId,
  user,
  projectId,
}) => {
  const [titleEdit, setTitleEdit] = useState<boolean>(createdCardId === id);
  const [titleChange, setTitleChange] = useState<string>(title);
  const queryClient = useQueryClient();
  const deleteCardMutation = useMutation({ mutationFn: useDeleteCard });
  const { data: session } = useSession();
  const { token } = theme.useToken();

  const handleTitleEdit = () => {
    if (user.role === 'VIEWER') return;
    handleCardEdit();
  };

  const handleCardEdit = () => {
    setTitleEdit(false);
  };

  const dropdownItems = useMemo(() => {
    if (user.role === 'VIEWER') {
      const dropdownItems: MenuProps['items'] = [
        {
          label: 'View card',
          key: '1',
          icon: <EyeOutlined />,
          // onClick: () => {
          //   edit('tasks', id, 'replace');
          // },
        },
      ];
      return dropdownItems;
    } else {
      const dropdownItems: MenuProps['items'] = [
        {
          label: 'View card',
          key: '1',
          icon: <EyeOutlined />,
          // onClick: () => {
          //   edit('tasks', id, 'replace');
          // },
        },
        {
          danger: true,
          label: 'Delete card',
          key: '2',
          icon: <Trash2 size={12} />,
          onClick: () => {
            const token = session?.backendTokens.accessToken;
            const values = {
              id,
              projectId,
              token,
            };
            deleteCardMutation.mutateAsync(values, {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getCards'] });
                toast.success('Card has been Deleted');
              },
              onError: () => {
                toast.error('Something went wrong');
              },
            });
          },
        },
      ];
      return dropdownItems;
    }
  }, []);

  const dueDateOptions = useMemo(() => {
    if (!dueDate) return null;

    const date = dayjs(dueDate);

    return {
      color: getDateColor({ date: dueDate }) as string,
      text: date.format('MMM D'),
    };
  }, [dueDate]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: 'transparent',
          },
        },
      }}
    >
      <Card
        size="small"
        title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
        // onClick={() => {
        //   edit('tasks', id, 'replace');
        // }}
        extra={
          <Dropdown
            trigger={['click']}
            menu={{
              items: dropdownItems,
              onPointerDown: (e) => {
                e.stopPropagation();
              },
              onClick: (e) => {
                e.domEvent.stopPropagation();
              },
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              shape="circle"
              icon={
                <MoreOutlined
                  style={{
                    transform: 'rotate(90deg)',
                  }}
                />
              }
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Dropdown>
        }
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <TextIcon
            width={15}
            style={{
              marginRight: '4px',
            }}
          />
          {dueDateOptions && (
            <Tag
              icon={
                <ClockCircleOutlined
                  style={{
                    fontSize: '12px',
                  }}
                />
              }
              style={{
                padding: '0 4px',
                marginInlineEnd: '0',
                backgroundColor:
                  dueDateOptions.color === 'default' ? 'transparent' : 'unset',
              }}
              color={dueDateOptions.color}
              bordered={dueDateOptions.color !== 'default'}
            >
              {dueDateOptions.text}
            </Tag>
          )}
          <Avatar name={'Samuel Gutmans'} color="black " round size="30" />
          {/* {!!users?.length && (
            <Space
              size={4}
              wrap
              direction="horizontal"
              align="center"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginLeft: 'auto',
                marginRight: '0',
              }}
            >
              {users.map((user) => {
                return (
                  <Tooltip key={user.id} title={user.name}>
                    <CustomAvatar name={user.name} src={user.avatarUrl} />
                  </Tooltip>
                );
              })}
            </Space>
          )} */}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default BoardCard;
