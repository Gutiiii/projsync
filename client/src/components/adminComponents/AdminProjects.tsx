'use client';
import { useState } from 'react';
import { Button } from '../Button';
import ProjectCard from '../card/ProjectCard';
import CreateProjectModal from '../modal/CreateProjectModal';
import AdminNavbar from '../navbar/admin/AdminNavbar';

const AdminProjects = () => {
  const [createProjectModalVisible, setCreateProjectModalVisible] =
    useState<boolean>(false);

  const createProject = (title: string, description: string) => {
    setCreateProjectModalVisible(false);
    console.log('CREATE PROJECT');
  };
  return (
    <>
      <AdminNavbar />
      <div className="flex justify-evenly mt-20 mb-8">
        <Button
          variant={'info'}
          className=""
          onClick={() => setCreateProjectModalVisible(true)}
        >
          New Project
        </Button>
        <Button className="">Sort</Button>
      </div>
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1">
          <ProjectCard
            status="Open"
            title="Title"
            description="Lorem Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
          />
          <ProjectCard
            status="Open"
            title="Title"
            description="Lorem Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
          />
          <ProjectCard
            status="Closed"
            title="Title"
            description="Lorem Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
          />
          <ProjectCard
            status="Open"
            title="Title"
            description="Lorem Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
          />
          <ProjectCard
            status="Closed"
            title="Title"
            description="Lorem Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
          />
          <ProjectCard
            status="Closed"
            title="Title"
            description="Lorem Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
          />
        </div>
      </div>
      <CreateProjectModal
        visible={createProjectModalVisible}
        handleOnSubmit={createProject}
        handleOnClose={() => setCreateProjectModalVisible(false)}
      />
    </>
  );
};

export default AdminProjects;
