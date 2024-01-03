import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import { getServerSession } from 'next-auth';

import UserNavbar from '../navbar/user/UserNavbar';
import Projects from '../projects/Projects';

const UserProjects = async () => {
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
      <div className="min-h-screen">
        <UserNavbar />
        <Projects projects={projectsArray} />
      </div>
    );
  }
};

export default UserProjects;
