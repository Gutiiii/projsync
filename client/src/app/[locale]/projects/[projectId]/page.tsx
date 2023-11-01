import useAuthForProjects from '@/hooks/authHooks/useAuthForProjects';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  await useSigninRequiredServer();
  await useAuthForProjects(params.projectId);

  return <div>Project: {params.projectId}</div>;
};

export default ProjectPage;
