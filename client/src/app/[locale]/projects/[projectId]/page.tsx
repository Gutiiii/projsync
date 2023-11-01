import useAuthForProjects from '@/hooks/authHooks/useAuthForProjects';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const projectId = params.projectId;
  await useSigninRequiredServer();
  await useAuthForProjects(projectId);

  return <div>Project: {params.projectId}</div>;
};

export default ProjectPage;
