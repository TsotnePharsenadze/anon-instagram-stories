"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/");
      }}
    >
      <ArrowLeft /> Go back
    </Button>
  );
};

export default BackButton;
