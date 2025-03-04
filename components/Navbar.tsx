const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg"></div>
          <span className="font-bold text-xl">InstaViewer</span>
        </div>
        <div className="text-sm text-gray-600">
          <a href="/contact" className="underline hover:no-underline">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
