'use client';
import { Eye, FileEdit, User2, UserPlus, UserX } from 'lucide-react';
import React from 'react';
import { Button } from '../Button';

type User = {
  name: string;
  // Add other properties if needed
};

type ProjectMember = {
  userId: string;
  role: string;
  createdAt: string;

  user: User;
};

type ProjectsMemberProps = {
  projectMembers: ProjectMember[];
};

const ProjectsMember = ({
  projectMembers,
  role,
}: ProjectsMemberProps & { role: 'VIEWER' | 'EDITOR' | 'CREATOR' }) => {
  const returnDate = (value: string) => {
    const date = new Date(value);
    const dateStr = date.toDateString();
    const dateWithoutWeekday = dateStr.substring(dateStr.indexOf(' ') + 1);
    return dateWithoutWeekday;
  };

  return (
    <div className="grid justify-center">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold text-center mb-4 relative">
          Members
        </p>
        {/* TODO Add Invite Functionality */}
        <Button className="ml-3 -mt-0.5" variant="info" size="sm">
          <p className="text-lg">Invite</p>{' '}
          <UserPlus className="ml-2 mb-0.5" size={19} />
        </Button>
      </div>
      {projectMembers.map((projectMember) => (
        <div
          key={projectMember.userId}
          className=" text-lg border-b-2 border-gray-500 border-opacity-20 mb-2 pb-1 "
        >
          <div className="flex justify-between">
            <div className="flex">
              <div className="pr-2">
                {projectMember.role === 'CREATOR' ? (
                  <User2 size={20} className="mt-1" />
                ) : projectMember.role === 'VIEWER' ? (
                  <Eye className="mt-1" size={20} />
                ) : projectMember.role === 'EDITOR' ? (
                  <FileEdit className="mt-1" size={20} />
                ) : null}
              </div>
              <div>{projectMember.user.name}</div>
            </div>
            {/* TODO Add Remove Member Functionality */}
            {role === 'CREATOR' ? (
              <div className="-mt-1">
                <UserX
                  size="28"
                  className="hover:rounded-full hover:bg-gray-300 active:bg-gray-400 active:Scale-95 cursor-pointer p-1 mt-1"
                />
              </div>
            ) : null}
          </div>
          {/* TODO Look if add this:
          <div>
            <p className="inline">Added: </p>
            <p className="inline font-bold">
              {returnDate(projectMember.createdAt)}
            </p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default ProjectsMember;
