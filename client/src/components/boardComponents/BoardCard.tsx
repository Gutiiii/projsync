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
import { Card as CardType } from '@/types/project.types';
import { UserPayload } from '@/types/user.types';
import { getDateColor } from '@/utilities/getDateColor';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { TextIcon, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { FC, useMemo, useState } from 'react';
import Avatar from 'react-avatar';
import { toast } from 'sonner';
import EditBoardCardModal from '../modal/EditBoardCardModal';

interface User {
  name: string;
}

interface UserProject {
  id: string;
  user: User;
}

interface Project {
  userProject: UserProject[];
}

interface List {
  project: Project;
}

interface CardTypeProps extends CardType {
  list: List;
  projectCardAssignee: any[];
}

interface CardProps {
  id: string;
  user: UserPayload;
  projectId: string;
  card: CardTypeProps;
  setModalVisible: () => void;
}

const BoardCard: FC<CardProps> = ({
  id,
  user,
  projectId,
  card,
  setModalVisible,
}) => {
  const queryClient = useQueryClient();
  const [editBoardCardModalVisible, setEditBoardCardModalVisible] =
    useState<boolean>(false);
  const deleteCardMutation = useMutation({ mutationFn: useDeleteCard });
  const { data: session } = useSession();
  const { token } = theme.useToken();

  const dropdownItems = useMemo(() => {
    if (user.role === 'VIEWER') {
      const dropdownItems: MenuProps['items'] = [
        {
          label: 'View card',
          key: '1',
          icon: <EyeOutlined />,
          onClick: () => {
            setEditBoardCardModalVisible(true);
            setModalVisible();
          },
        },
      ];
      return dropdownItems;
    } else {
      const dropdownItems: MenuProps['items'] = [
        {
          label: 'View card',
          key: '1',
          icon: <EyeOutlined />,
          onClick: () => {
            setEditBoardCardModalVisible(true);
            setModalVisible();
          },
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
    if (!card.dueDate) return null;

    const date = dayjs(card.dueDate);

    return {
      color: getDateColor({ date: card.dueDate }) as string,
      text: date.format('MMM D'),
    };
  }, [card.dueDate]);

  return (
    <>
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
          onClick={() => {
            setEditBoardCardModalVisible(true);
            setModalVisible();
          }}
          size="small"
          title={<Text ellipsis={{ tooltip: card.title }}>{card.title}</Text>}
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
                    dueDateOptions.color === 'default'
                      ? 'transparent'
                      : 'unset',
                }}
                color={dueDateOptions.color}
                bordered={dueDateOptions.color !== 'default'}
              >
                {dueDateOptions.text}
              </Tag>
            )}
            {card.projectCardAssignee.map((assignee) => {
              return (
                <Avatar
                  key={assignee.userProject.id}
                  name={assignee.userProject.user.name}
                  color="black"
                  round
                  size="23"
                />
              );
            })}
          </div>
        </Card>
      </ConfigProvider>
      {editBoardCardModalVisible && (
        <EditBoardCardModal
          visible={editBoardCardModalVisible}
          projectId={projectId}
          card={card}
          handleOnClose={() => setEditBoardCardModalVisible(false)}
          userRole={user.role}
        />
      )}
    </>
  );
};

export default BoardCard;
