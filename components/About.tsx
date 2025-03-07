import { FAQ } from "@/data";
import { MessageCircleQuestion } from "lucide-react";

const About = () => {
  return (
    <div className="w-full rounded-xl bg-gray-50 shadow-md p-5 sm:px-[70px] mb-8 mx-auto mt-[50px]">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 flex items-center gap-2 justify-center">
        Frequently Asked Questions{" "}
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2 text-xs rounded-sm">
          FAQ
        </span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FAQ.map((item, index) => (
          <div className="flex items-start space-x-3" key={index}>
            <div className="text-green-500 mt-0.5">
              <MessageCircleQuestion size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">{item.question}</h4>
              <p className="text-sm text-gray-600">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5 text-sm text-gray-500">
        <p>InstaViewer is not affiliated with Instagram or Meta Platforms.</p>
      </div>
    </div>
  );
};

export default About;
