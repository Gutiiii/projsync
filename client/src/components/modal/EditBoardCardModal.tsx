import { Card } from '@/types/project.types';
import { getDateColor } from '@/utilities/getDateColor';
import {
  AlignLeftOutlined,
  ClockCircleOutlined,
  EditTwoTone,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, Divider, Textarea } from '@nextui-org/react';
import { DatePicker, Input, Modal, Select, Tag, Tooltip } from 'antd';
import Link from 'antd/es/typography/Link';
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { FC, useEffect, useMemo, useState } from 'react';

interface EditProjectMemberModalProps {
  visible: boolean;
  handleOnClose: () => void;
  handleOnDelete: (cardId: string) => void;
  card: Card;
  userRole: string;
}

const EditBoardCardModal: FC<EditProjectMemberModalProps> = ({
  visible,
  handleOnClose,
  handleOnDelete,
  card,
  userRole,
}) => {
  const t = useTranslations('EditMemberModal');

  const date = new Date(card.dueDate);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  const hour12 = hour % 12 || 12; // Convert 0 to 12

  const dateWithoutWeekday = `${day} ${month} ${year} - ${hour12}:${minute
    .toString()
    .padStart(2, '0')} ${ampm}`;

  const [role, setRole] = useState<string>(userRole);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [isRoleChanged, setIsRoleChanged] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<
    'DESCRIPTION' | 'DUEDATE' | 'ASSIGN' | ''
  >('');

  useEffect(() => {
    setIsRoleChanged(role !== userRole);
  }, [role, userRole]);

  // Function to handle click outside of title input
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.matches('#title')) {
      setEditTitle(false);
    }
  };

  const dueDateOptions = useMemo(() => {
    if (!card.dueDate) return null;

    const date = dayjs(card.dueDate);

    return {
      color: getDateColor({ date: card.dueDate }) as string,
      text: date.format('MMM D'),
    };
  }, [card.dueDate]);

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
          <Input value={card.title} id="title" />
        ) : (
          <div>
            {card.title}
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
      <form onSubmit={() => console.log('SUBMIT')}>
        <div
          className={
            activeSection === 'DESCRIPTION'
              ? 'cursor-pointer items-center my-3'
              : 'cursor-pointer flex items-center my-3'
          }
          onClick={() => setActiveSection('DESCRIPTION')}
        >
          <AlignLeftOutlined className="mr-2 inline" size={15} />
          {activeSection === 'DESCRIPTION' ? (
            <>
              <p className="font-bold text-sm inline">Description</p>
              <div className="justify-between ml-6 mt-4">
                <div className="w-full ">
                  <Textarea
                    defaultValue={card.description}
                    label="Description"
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-4 ">
                  <Button size="sm" onClick={() => setActiveSection('')}>
                    Cancel
                  </Button>
                  <Button size="sm" color="primary">
                    Save
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div>
              {card.description ? (
                <p>{card.description}</p>
              ) : (
                <Link className="text-md">Add task description</Link>
              )}
            </div>
          )}
        </div>
        {/* <div
          className={
            activeSection === 'DESCRIPTION'
              ? 'cursor-pointer items-center my-3'
              : 'cursor-pointer flex items-center my-3'
          }
          onClick={() => setActiveSection('DESCRIPTION')}
        >
          <AlignLeftOutlined className="mr-2" size={15} />
          {activeSection === 'DESCRIPTION' ? (
            <>
              <p className="font-bold text-sm ">Description</p>
              <Textarea defaultValue={card.description} label="Description" />
              <div className="space-x-2 flex justify-end mt-4">
                <Button size="sm" onClick={() => setActiveSection('')}>
                  Cancel
                </Button>
                <Button size="sm" color="primary">
                  Save
                </Button>
              </div>
            </>
          ) : (
            <div>
              {card.description ? (
                <p>{card.description}</p>
              ) : (
                <Link className="text-md">Add task description</Link>
              )}
            </div>
          )}
        </div> */}
        <Divider />
        <div
          className={
            activeSection === 'DUEDATE'
              ? 'cursor-pointer items-center my-3'
              : 'cursor-pointer flex items-center my-3'
          }
          onClick={() => setActiveSection('DUEDATE')}
        >
          <ClockCircleOutlined className="mr-2 inline" size={15} />
          {activeSection === 'DUEDATE' ? (
            <>
              <p className="font-bold text-sm inline">Due Date</p>
              <div className="flex justify-between mt-4 ml-6">
                <DatePicker
                  showTime
                  showSecond={false}
                  defaultValue={dayjs(card.dueDate)}
                />
                <div className="space-x-2">
                  <Button size="sm" onClick={() => setActiveSection('')}>
                    Cancel
                  </Button>
                  <Button size="sm" color="primary">
                    Save
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div>
              {card.dueDate && dueDateOptions ? (
                <div className="flex">
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
                      margin: '0 px',
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
        <div
          className={
            activeSection === 'ASSIGN'
              ? 'cursor-pointer items-center my-3'
              : 'cursor-pointer flex items-center my-3'
          }
          onClick={() => setActiveSection('ASSIGN')}
        >
          <UsergroupAddOutlined className="mr-2 inline" size={15} />
          {activeSection === 'ASSIGN' ? (
            <>
              <p className="font-bold text-sm inline">Users</p>
              <div className="flex justify-between mt-4 ml-6">
                <Select
                  mode="multiple"
                  className="w-2/3"
                  onChange={() => console.log('CHANGE')}
                />
                <div className="space-x-2">
                  <Button size="sm" onClick={() => setActiveSection('')}>
                    Cancel
                  </Button>
                  <Button size="sm" color="primary">
                    Save
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div>
              {false ? (
                <p>{card.description}</p>
              ) : (
                <Link className="text-md">Add due date</Link>
              )}
            </div>
          )}
        </div>
        {/* <div
          className="flex items-center my-3"
          onClick={() => setActiveSection('ASSIGN')}
        >
          <UsergroupAddOutlined className="mr-2" size={15} />
          {activeSection === 'ASSIGN' ? (
            <div>
              {true ? (
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  onChange={() => console.log('CHANGE')}
                />
              ) : (
                <Link className="text-md">Assign to users</Link>
              )}
            </div>
          ) : (
            <Link className="text-md">Assign to users</Link>
          )}
        </div> */}
        <Divider />

        <footer className="flex justify-end mx-6 mt-4">
          <div className="flex items-center text-red-500 cursor-pointer hover:text-opacity-80 transition-opacity duration-200">
            <Trash2 size={15} className="mr-2" />
            <p className="text-sm">Delete card</p>
            {/* {isRoleChanged && (
                <Button color="primary" className="mr-3" type="submit">
                  {t('safe')}
                </Button>
              )}
              <Button onClick={handleOnClose}>{t('cancel')}</Button> */}
          </div>
        </footer>
      </form>
    </Modal>
  );
};

export default EditBoardCardModal;
