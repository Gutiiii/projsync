'use client';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import { Input } from '../ui/input';

interface SearchProjectsProps {
  onChange: (value: string) => void;
}

const SearchProject: FC<SearchProjectsProps> = ({ onChange }) => {
  const t = useTranslations('Project');
  return (
    <Input
      className="w-1/4 h-10"
      placeholder={t('searchproject')}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchProject;
