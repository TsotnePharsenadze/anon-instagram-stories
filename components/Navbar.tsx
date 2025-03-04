import { MessageCirclePlus } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="relative overflow-hidden group">
              <div className="flex gap-x-2 items-center font-bold">
                <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg"></div>
                <span className="font-bold text-xl">InstaViewer</span>
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                  translate-x-[-150%] rotate-45 group-hover:translate-x-[150%] 
                  transition-transform duration-500 ease-in-out"
              ></div>
            </div>
          </Link>
        </div>
        <div className="text-sm text-gray-600">
          <a
            href="/contact"
            className={
              "border-1 border-black text-black p-2 rounded-md flex items-center gap-1 no-underline hover:opacity-90 hover:bg-gray-100"
            }
          >
            Contact <MessageCirclePlus className="h-4 w-4" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
