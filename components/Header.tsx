const Header = () => {
  return (
    <div className="text-center mb-8 mt-6">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
        Instagram Story Viewer
      </h1>
      <h1 className="hidden">Made by Tsotne Pharsenadze</h1>
      <p className="text-gray-600 max-w-lg mx-auto">
        Enter any username to view their stories anonymously
      </p>
    </div>
  );
};

export default Header;
