import { useDeleteCard } from '@/hooks/projectHooks/useDeleteCard';
import { useEditCard } from '@/hooks/projectHooks/useEditCard';
import { getDateColor } from '@/utilities/getDateColor';
import {
  AlignLeftOutlined,
  ClockCircleOutlined,
  EditTwoTone,
  UploadOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, Divider, Spinner, Textarea } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DatePicker,
  Input,
  Modal,
  Select,
  Tag,
  Tooltip,
  Upload,
  UploadProps,
  Button as AntdButton,
} from 'antd';
import Link from 'antd/es/typography/Link';
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import Avatar from 'react-avatar';
import { toast } from 'sonner';
import BoardComments from '../boardComponents/BoardComments';
import { sendAssignedCard } from '@/app/actions';

interface User {
  name: string;
}

interface UserProject {
  id: string;
  user: User;
}

interface Project {
  title: string;
  userProject: UserProject[];
}

interface List {
  project: Project;
}

interface ProjectCardAssignee {
  userProject: UserProject[];
}

interface Card {
  id: string;
  title: string;
  description: string;
  position: number;
  listId: string;
  dueDate: string;
  updatedAt: string;
  list: List;
  projectCardAssignee: any[];
}

interface EditProjectMemberModalProps {
  visible: boolean;
  handleOnClose: () => void;
  card: Card;
  userRole: string;
  projectId: string;
}

const EditBoardCardModal: FC<EditProjectMemberModalProps> = ({
  visible,
  handleOnClose,
  card,
  userRole,
  projectId,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(card.title);
  const [description, setDescription] = useState<string>(card.description);
  const [dueDate, setDueDate] = useState<string>(card.dueDate);
  const [assignees, setAssignees] = useState<any[]>(card.projectCardAssignee);
  const [activeSection, setActiveSection] = useState<
    'DESCRIPTION' | 'DUEDATE' | 'ASSIGN' | ''
  >('');
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const editMutation = useMutation({ mutationFn: useEditCard });

  const deleteMutation = useMutation({ mutationFn: useDeleteCard });

  const date = new Date(dueDate);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  const hour12 = hour % 12 || 12;

  const dateWithoutWeekday = `${day} ${month} ${year} - ${hour12}:${minute
    .toString()
    .padStart(2, '0')} ${ampm}`;
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.matches('#title')) {
      setEditTitle(false);
    }
  };
  const dueDateOptions = useMemo(() => {
    if (!dueDate) return null;

    const date = dayjs(dueDate);

    return {
      color: getDateColor({ date: dueDate }) as string,
      text: date.format('MMM D'),
    };
  }, [dueDate]);

  const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    if (editTitle) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [editTitle]);
  const handleEdit = () => {
    let assigneeValues = assignees.map((assignee: any) => {
      if (typeof assignee === 'string') {
        let newAssignee = assignee;
        card.list.project.userProject.map((user: any) => {
          if (user.user.name === assignee) {
            newAssignee = user.id;
          }
        });
        return newAssignee;
      } else if (assignee.hasOwnProperty('userProjectId')) {
        let newAssignee = assignee;
        card.list.project.userProject.map((user: any) => {
          if (user.user.name === assignee.userProject.user.name) {
            newAssignee = user.id;
          } else {
            return;
          }
        });
        return newAssignee;
      }
    });

    const values = {
      id: card.id,
      listId: card.listId,
      projectId,
      title,
      description,
      assignees: assigneeValues,
      dueDate: dueDate ? new Date(dueDate).toISOString() : dueDate,
      token: session?.backendTokens.accessToken,
    };

    editMutation.mutateAsync(values, {
      onSuccess: (data: any) => {
        setAssignees(data.data.projectCardAssignee);
        toast.success('Card has been updated');
        setActiveSection('');
        queryClient.invalidateQueries({ queryKey: ['getCards'] });
        const emails = data.data.projectCardAssignee.map(
          (item: any) => item.userProject.user.email,
        );
        if (emails.length > 0) {
          sendAssignedCard(
            projectId,
            card.list.project.title,
            card.title,
            emails,
            card.id,
          );
        }
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });
  };

  const selectOptions = card.list.project.userProject.map((user: any) => ({
    value: user.user.name,
    label: user.user.name,
  }));

  const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        setUploadLoading(true);
      }
      if (info.file.status === 'done') {
        toast.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        toast.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Modal
      open={visible}
      onCancel={() => {
        handleOnClose();
        setEditTitle(false);
        setActiveSection('');
      }}
      title={
        editTitle ? (
          <Input
            value={title}
            id="title"
            onChange={(e: any) => setTitle(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter') {
                setEditTitle(false);
                handleEdit();
              }
            }}
          />
        ) : (
          <div>
            {title}
            <Tooltip title="Edit">
              <EditTwoTone
                className="ml-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditTitle(true);
                }}
              />
            </Tooltip>
          </div>
        )
      }
      footer={null}
    >
      <Divider className="" />
      <form>
        {/* Description */}
        <div
          className={
            activeSection === 'DESCRIPTION'
              ? 'cursor-pointer items-center my-3'
              : 'cursor-pointer flex items-center my-3'
          }
          onClick={() => {
            if (userRole !== 'VIEWER') setActiveSection('DESCRIPTION');
          }}
        >
          <AlignLeftOutlined className="mr-2 inline" size={15} />
          {activeSection === 'DESCRIPTION' ? (
            <>
              <p className="font-bold text-sm inline">Description</p>
              <div className="justify-between ml-6 mt-4">
                <div className="w-full ">
                  <Textarea
                    defaultValue={description}
                    label="Description"
                    onChange={(e: any) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-4 ">
                  <Button size="sm" onClick={() => setActiveSection('')}>
                    Cancel
                  </Button>
                  <Button size="sm" color="primary" onClick={handleEdit}>
                    {editMutation.isLoading ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      'Save'
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div>
              {description ? (
                <p>{description}</p>
              ) : (
                <Link className="text-md">Add task description</Link>
              )}
            </div>
          )}
        </div>
        <Divider />
        {/* Due Date */}
        <div
          className={
            activeSection === 'DUEDATE'
              ? 'cursor-pointer items-center my-3'
              : 'cursor-pointer flex items-center my-3'
          }
          onClick={() => {
            if (userRole !== 'VIEWER') setActiveSection('DUEDATE');
          }}
        >
          <ClockCircleOutlined className="mr-2 inline" size={15} />
          {activeSection === 'DUEDATE' ? (
            <>
              <p className="font-bold text-sm inline">Due Date</p>
              <div className="flex justify-between mt-4 ml-6">
                <DatePicker
                  showTime={{ showSecond: false }}
                  defaultValue={dueDate ? dayjs(dueDate) : undefined}
                  onChange={(date: any, dateString: any) =>
                    setDueDate(dateString)
                  }
                />
                <div className="space-x-2">
                  <Button size="sm" onClick={() => setActiveSection('')}>
                    Cancel
                  </Button>
                  <Button size="sm" color="primary" onClick={handleEdit}>
                    {editMutation.isLoading ? (
                      <Spinner
                        size="sm"
                        color="white"
                        className="items-center text-center p-0"
                      />
                    ) : (
                      'Save'
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div>
              {dueDate && dueDateOptions ? (
                <div className="flex space-x-4">
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
                  <p>{dateWithoutWeekday}</p>
                </div>
              ) : (
                <Link className="text-md">Add due date</Link>
              )}
            </div>
          )}
        </div>
        <Divider />
        {/* Assign */}
        <div
          className={
            activeSection === 'ASSIGN'
              ? 'cursor-pointer items-center my-3'
              : 'cursor-pointer flex items-center my-3'
          }
          onClick={() => {
            if (userRole !== 'VIEWER') setActiveSection('ASSIGN');
          }}
        >
          <UsergroupAddOutlined className="mr-2 inline" size={15} />
          {activeSection === 'ASSIGN' ? (
            <>
              <p className="font-bold text-sm inline">Users</p>
              <div className="flex justify-between mt-4 ml-6">
                <Select
                  mode="multiple"
                  className="w-1/2 sm:w-2/3"
                  onChange={(value: any[]) => setAssignees(value)}
                  options={selectOptions}
                  defaultValue={assignees.map(
                    (user) => user.userProject?.user?.name,
                  )}
                  onDeselect={(value: any[]) => {
                    setAssignees(
                      assignees.filter(
                        (user) => user.userProject.user.name !== value,
                      ),
                    );
                  }}
                />
                <div className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setAssignees(card.projectCardAssignee);
                      setActiveSection('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" color="primary" onClick={handleEdit}>
                    {editMutation.isLoading ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      'Save'
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div>
              {!isEmpty(assignees) ? (
                <div className="flex">
                  {assignees.map((user) => {
                    return (
                      <Tag
                        key={user.userProject?.user?.id}
                        className="rounded-full p-1 pr-2 flex items-center flex-wrap space-x-2"
                      >
                        <Avatar
                          name={
                            user.userProject?.user?.name
                              ? user.userProject?.user?.name
                              : ''
                          }
                          round
                          color="black"
                          size="25"
                        />
                        <p>{user.userProject?.user?.name}</p>
                      </Tag>
                    );
                  })}
                </div>
              ) : (
                <Link className="text-md">Assign to users</Link>
              )}
            </div>
          )}
        </div>
        <Divider />
        <div className="flex items-center justify-between max-h-[300px] overflow-y-auto overflow-x-hidden">
          <Upload {...props} listType="picture" multiple className="mt-1">
            {' '}
            <AntdButton icon={<UploadOutlined />} className="my-2">
              Click to Upload
            </AntdButton>
          </Upload>
        </div>
        <Divider />

        <footer className="flex justify-end mx-6 mt-4">
          <div
            className="flex items-center text-red-500 cursor-pointer hover:text-opacity-80 transition-opacity duration-200"
            onClick={() => {
              const values = {
                id: card.id,
                projectId,
                token: session?.backendTokens.accessToken,
              };
              deleteMutation.mutateAsync(values, {
                onSuccess: () => {
                  toast.success('Card has been deleted');
                  handleOnClose();
                  queryClient.invalidateQueries({ queryKey: ['getCards'] });
                },
                onError: () => {
                  toast.error('Something went wrong');
                },
              });
            }}
          >
            {deleteMutation.isLoading ? (
              <Spinner size="sm" />
            ) : (
              <>
                {' '}
                <Trash2 size={15} className="mr-2" />
                <p className="text-sm">Delete card</p>
              </>
            )}
          </div>
        </footer>
      </form>
      <Divider className="my-3" />
      <BoardComments
        key={card.id}
        projectId={projectId}
        cardId={card.id}
        userRole={userRole}
      />
    </Modal>
  );
};

export default EditBoardCardModal;
