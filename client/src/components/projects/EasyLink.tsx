'use client';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Snippet,
} from '@nextui-org/react';

import React, { useState } from 'react';

const EasyLink = () => {
  return (
    <>
      <Dropdown
        showArrow
        radius="sm"
        classNames={{
          base: 'before:bg-default-200', // change arrow background
          content: 'p-0 border-small border-divider bg-background',
        }}
      >
        <DropdownTrigger>
          <Button variant="ghost" disableRipple>
            Open Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Custom item styles"
          disabledKeys={['profile']}
          className="p-3"
          itemClasses={{
            base: [
              'rounded-md',
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'data-[hover=true]:bg-default-100',
              'dark:data-[hover=true]:bg-default-50',
              'data-[selectable=true]:focus:bg-default-50',
              'data-[pressed=true]:opacity-70',
              'data-[focus-visible=true]:ring-default-500',
            ],
          }}
        >
          <DropdownSection aria-label="Profile & Actions" showDivider>
            <DropdownItem
              isReadOnly
              key="profile"
              className="h-14 gap-2 opacity-100"
            ></DropdownItem>
            <DropdownItem key="dashboard">Dashboard</DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Preferences" showDivider>
            <DropdownItem key="quick_search" shortcut="⌘K">
              Quick search
            </DropdownItem>
            <DropdownItem
              isReadOnly
              key="theme"
              className="cursor-default"
              endContent={
                <select
                  className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                  id="theme"
                  name="theme"
                >
                  <option>System</option>
                  <option>Dark</option>
                  <option>Light</option>
                </select>
              }
            >
              Theme
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Help & Feedback">
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout">Log Out</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default EasyLink;
