'use client';
import React, { FC } from 'react';
import { Input } from '../ui/input';

interface SearchProjectsProps {
  onChange: (value: string) => void;
}

const SearchProject: FC<SearchProjectsProps> = ({ onChange }) => {
  return (
    <Input
      className="w-1/4 h-10"
      placeholder="Search Project"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchProject;
