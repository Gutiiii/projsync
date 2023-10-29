import { Info } from 'lucide-react';
import { FC } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  status: 'OPEN' | 'CLOSED';
}

const ProjectCard: FC<ProjectCardProps> = ({ title, description, status }) => {
  return (
    <div
      className={
        status === 'OPEN'
          ? 'px-4 border-2 pt-4  rounded-xl shadow-xl w-80 h-80 cursor-pointer hover:bg-gray-300 transition-background duration-200 border-black'
          : 'px-4 border-2 pt-4  rounded-xl shadow-xl w-80 h-80 cursor-pointer hover:bg-gray-300 transition-background duration-200 border-red-700'
      }
    >
      <div className="flex justify-between ">
        <p className="text-xl font-bold">{title}</p>
        <Info
          color="blue"
          size={25}
          width={25}
          className="text-end mt-0.5 cursor-pointer hover:opacity-60 transition-opacity duration-200"
        />
      </div>
      <p className="text-lg mt-12">{description}</p>
    </div>
  );
};

export default ProjectCard;
