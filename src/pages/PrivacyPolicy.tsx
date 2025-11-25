import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
          Privacy Policy & Terms of Service
        </h1>

        <div className="prose max-w-none leading-relaxed text-justify">
          <h2 className="text-2xl font-semibold mb-4">ABOUT THIS POLICY</h2>
          <p>
            This notice describes the privacy policy of BALC, operated by
            Bharatiya Academy of Linguistic Communication Ltd. (“BALC”, “we” and
            “us”). This notice is intended for all users of our website(s),
            products, services, and applications (hereinafter collectively
            referred to as the “Services”). This Privacy Policy describes how
            your personal information is collected, used, and shared when you
            use the Services.
          </p>

          <p>
            Welcome to BALC. We know and understand that you care how
            information about you is used and shared and we appreciate your
            trust in us to do that carefully and sensibly. By using or accessing
            the Services in any manner, you acknowledge that you accept the
            practices and policies outlined in this Privacy Policy, and you
            hereby consent that we will collect, use, and share your information
            in the following ways.
          </p>

          <p>
            When you visit the Site, we automatically collect certain
            information about your device, including information about your web
            browser, IP address, time zone, and some of the cookies that are
            installed on your device. Additionally, as you browse the Site, we
            collect information about the individual web pages or products that
            you view, what websites or search terms referred you to the Site,
            and information about how you interact with the Site. We refer to
            this automatically collected information as “Device Information”.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">
            USE OF YOUR PERSONAL INFORMATION
          </h3>
          <p>
            We use the Order Information that we collect generally to fulfill
            any orders placed through the Site (including processing your
            payment information, arranging for shipping, and providing you with
            invoices and/or order confirmations). Additionally, we use this
            Order Information to communicate with you; share with our partners
            (such as authorized third-party agents including delivery and
            coordination partners), screen our orders for potential risk or
            fraud; and when in line with the preferences you have shared with
            us, provide you with information or advertising relating to our
            products or services.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">
            SHARING YOUR PERSONAL INFORMATION
          </h3>
          <p>
            We share your Personal Information with third parties to help us use
            your Personal Information, as described above. For example, we also
            use Google Analytics to help us understand how our customers use the
            Site — you can read more about how Google uses your Personal
            Information here:{" "}
            <a
              href="https://www.google.com/intl/en/policies/privacy/"
              target="_blank"
              className="text-blue-600 underline"
            >
              Google Privacy Policy
            </a>
            .
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">YOUR RIGHTS</h3>
          <p>
            If you are a European resident, you have the right to access
            personal information we hold about you and to ask that your personal
            information be corrected, updated, or deleted.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">DATA RETENTION</h3>
          <p>
            When you place an order through the Site, we will maintain your
            Order Information for our records unless and until you ask us to
            delete this information.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">CHANGES</h3>
          <p>
            We may update this privacy policy from time to time in order to
            reflect changes to our practices or for other operational, legal or
            regulatory reasons.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">CHILDREN AND MINORS</h3>
          <p>The Site is not intended for individuals under the age of 18.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">TERMS OF SERVICE</h2>
          <p>
            Welcome to personalised location URLs, www.BALC.com. Our location
            URL service (the "Service"), located at www.BALC.in, is owned and
            operated by Bharatiya Academy of Linguistic Communication Ltd.
          </p>

          <p>
            Subscriber agrees not to impersonate any person or use a name that
            he/she is not authorised to use. Subscriber holds the responsibility
            to update complete location addresses along with accurate landmarks.
            BALC helps in customising the location link to simpler and fancier
            custom links but does not hold responsibility for the distribution
            of these BALCs.
          </p>

          <p>
            BALC collects subscriber’s personal data when he/she sign-ups on our
            website - www.BALC.com. By submitting the information to us,
            subscriber agrees to allow BALC to process the submitted data in
            line with this Privacy Policy.
          </p>

          <p>
            Pornography and sex-related merchandising are strictly prohibited.
            This includes sites that may infer sexual content or link to adult
            content elsewhere.
          </p>

          <p>
            Under no circumstances BALC shall have any liability to the
            subscriber for any direct, indirect, incidental, lost profits or
            consequential damages, including damages for goodwill or anticipated
            earnings.
          </p>

          <p>
            BALC reserves the right to suspend, deactivate or delete a
            subscriber/account holder from the BALC.com platform without
            assigning any reason to the subscriber.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">CONTACT INFORMATION</h3>
          <p>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e-mail at{" "}
            <a
              href="mailto:support@BALC.com"
              className="text-blue-600 underline"
            >
              support@BALC.com
            </a>{" "}
            or by mail using the details provided below:
          </p>

          <p className="font-semibold">
            BALC CADD, No.1762/2, Opp. Navarang Theatre, Dr.Rajkumar Road,
            Rajajinagara Bengaluru - 560010
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
