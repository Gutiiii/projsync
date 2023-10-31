import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  await useSigninRequiredServer();

  return <div>Project: {params.projectId}</div>;
};

export default ProjectPage;
