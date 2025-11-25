import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-900 px-6 md:px-20 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">
          Terms of Service
        </h1>

        <div className="text-justify leading-relaxed space-y-6 text-base">
          <p>
            Welcome to BALC. These Terms of Service ("Terms") govern your access and use of our website, courses, and services.
            By accessing or using our Services, you agree to comply with these Terms. If you do not agree, please do not use our
            website or related services.
          </p>

          <p>
            You must use the BALC website and services only for lawful purposes. You agree not to misuse the Services, attempt
            unauthorized access, or engage in any activity that disrupts our systems or networks.
          </p>

          <p>
            When you register with BALC, you agree to provide accurate and complete information. You are responsible for maintaining
            the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <p>
            All content on this site, including logos, course materials, graphics, and text, is the intellectual property of BALC and
            protected by copyright laws. You may not copy, modify, or distribute content without written permission.
          </p>

          <p>
            Payments for our services are non-refundable unless otherwise stated. BALC reserves the right to change pricing and
            payment terms at any time with prior notice.
          </p>

          <p>
            BALC reserves the right to suspend or terminate your access to services if you violate these Terms, engage in illegal
            activity, or misuse our resources. Termination may occur without prior notice.
          </p>

          <p>
            BALC shall not be liable for any indirect, incidental, or consequential damages resulting from your use of our website or
            services. Our total liability shall not exceed the amount paid for the service in question.
          </p>

          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be resolved in the
            courts located in Bengaluru, Karnataka.
          </p>

          <p>
            For any questions regarding these Terms, please contact us at:
            <br />
            Email: support@balc.com <br />
            Address: BALC CADD, No.1762/2, Opp. Navarang Theatre, Dr. Rajkumar Road, Rajajinagar, Bengaluru - 560010
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
