'use client';
import { Eye, FileEdit, User2, UserPlus } from 'lucide-react';
import React from 'react';
import { Button } from '../Button';

type User = {
  email: string;
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

const ProjectsMember = ({ projectMembers }: ProjectsMemberProps) => {
  return (
    <div className="grid justify-center">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold text-center mb-4 relative">
          Members
        </p>
        <Button className="ml-3 -mt-0.5" variant="info" size="sm">
          <p className="text-lg">Invite</p>{' '}
          <UserPlus className="ml-2 mb-0.5" size={19} />
        </Button>
      </div>
      {projectMembers.map((projectMember) => (
        <div
          key={projectMember.userId}
          className="flex text-lg border-b-2 border-gray-500 border-opacity-20 mb-2 pb-1"
        >
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
      ))}
    </div>
  );
};

export default ProjectsMember;
