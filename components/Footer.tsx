import { FooterHrefs } from "@/data";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white py-4 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
        <div className="flex gap-y-2 sm:gap-x-2 flex-col sm:flex-row items-center justify-center text-black ">
          {FooterHrefs.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.title == "Github" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`hover:no-underline ${
                link.title == "Github"
                  ? "bg-black text-white p-2 rounded-md flex items-center gap-1 no-underline hover:opacity-90"
                  : "underline"
              }`}
            >
              {link.title}
              {link.title == "Github" && <Github size={14} />}
            </a>
          ))}
        </div>
        <p className="mt-2">
          © 2025 InstaViewer. Mini-project by{" "}
          <span className="font-black">TP</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
