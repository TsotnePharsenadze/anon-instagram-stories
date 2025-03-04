import { TermsOfServiceData } from "@/data";

const TermsOfServicePage = () => {
  return (
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto text-gray-800 my-12 bg-white rounded-md">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Please read this document carefully. It contains important information
        regarding your rights and obligations when using our services.
      </p>

      <div className="space-y-6 text-justify">
        {TermsOfServiceData.map((section, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p>
              {section.content}{" "}
              {index == TermsOfServiceData.length - 1 && (
                <a href="/contact" className="underline hover:no-underline">
                  Contact
                </a>
              )}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TermsOfServicePage;
