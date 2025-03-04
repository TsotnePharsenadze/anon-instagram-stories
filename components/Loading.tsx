import { Loader } from "lucide-react";

interface LoadingProps {
  text: string;
}

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <Loader className="animate-spin h-14 w-14 text-gray-300 " />
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
};

export default Loading;
