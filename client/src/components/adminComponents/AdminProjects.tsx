import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { BACKEND_URL } from '@/lib/constants';
import { ProjectCardType } from '@/types/project.types';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import ProjectCard from '../card/ProjectCard';
import FetchError from '../error/FetchError';
import AdminNavbar from '../navbar/admin/AdminNavbar';
import CreateProjectButton from '../projects/CreateProjectButton';
import ShowClosedProjects from '../projects/ShowClosedProjects';

const AdminProjects = async () => {
  const session = await getServerSession(authOptions);
  const res = await axios.get(BACKEND_URL + '/project/all', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + session?.backendTokens.accessToken,
    },
  });
  if (res.status === 200) {
    const projects = res.data;
    const projectsArray = [];

    for (const key in projects) {
      if (projects.hasOwnProperty(key)) {
        projectsArray.push(projects[key]);
      }
    }
    return (
      <>
        <AdminNavbar />
        <div className="flex justify-evenly mt-20 mb-8">
          <CreateProjectButton />
          <ShowClosedProjects />
        </div>
        <div className="flex justify-center">
          {res.status !== 200 ? (
            <FetchError />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1">
              {projectsArray.map((project: ProjectCardType) => (
                <ProjectCard
                  status={project.status}
                  title={project.title}
                  description={project.description}
                  key={project.id}
                />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
};

export default AdminProjects;
