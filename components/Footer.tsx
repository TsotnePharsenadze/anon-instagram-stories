import { FooterHrefs } from "@/data";

const Footer = () => {
  return (
    <footer className="bg-white py-4 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
        <div className="flex gap-x-2 items-center justify-center text-black ">
          {FooterHrefs.map((link) => (
            <a href={link.href} className="underline hover:no-underline">
              {link.title}
            </a>
          ))}
        </div>
        <p className="mt-2">© 2025 InstaViewer.</p>
      </div>
    </footer>
  );
};

export default Footer;
