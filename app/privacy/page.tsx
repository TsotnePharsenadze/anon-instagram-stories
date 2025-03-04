import BackButton from "@/components/BackButton";
import { PrivacyPolicy } from "@/data";

const PrivacyPage = () => {
  return (
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto text-gray-800 my-12 bg-white rounded-md">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Please read this document carefully. It contains important information
        that you should know before using the website or services.
      </p>

      <div className="space-y-6 text-justify">
        {PrivacyPolicy.map((policy, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold mb-2">{policy.title}</h2>
            <p>
              {policy.content}{" "}
              {index == PrivacyPolicy.length - 1 && (
                <a href="/contact" className="underline hover:no-underline">
                  Contact
                </a>
              )}{" "}
            </p>
          </section>
        ))}
      </div>
      <h1 className="hidden">Made by Tsotne Pharsenadze</h1>
    </div>
  );
};

export default PrivacyPage;
