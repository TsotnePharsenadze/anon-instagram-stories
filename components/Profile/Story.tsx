import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock } from "lucide-react";
import Image from "next/image";

interface StoryProps {
  id: string;
  image: string;
  takenAt: number;
  alt: string;
}

const Story = ({ id, image, takenAt, alt }: StoryProps) => {
  const formattedDate = new Date(takenAt * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      id={id}
      className="w-full max-w-xs shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden"
    >
      <CardContent className="p-0">
        <Dialog>
          <DialogTrigger className="w-full">
            <div className="relative w-[80%] mx-auto pt-[100%]">
              <Image
                src={image}
                alt={alt ?? `Fallback alt ${id}`}
                fill
                className="absolute top-0 left-0 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg max-w-md w-full">
            <DialogHeader className="text-center">
              <DialogTitle className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>{formattedDate}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <Image
                src={image}
                alt={alt}
                width={300}
                height={300}
                className="rounded-lg max-h-[500px] object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <p className="text-sm text-gray-700">{formattedDate}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Story;
