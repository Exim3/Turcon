import React from "react";
import { Link } from "react-router-dom";

const Cookie: React.FC = () => {
  return (
    <div className="bg-my-gradient min-h-screen">
      <div className="container mx-auto flex flex-col gap-8 pb-4">
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-3xl text-[#0B0A0A]">
              Cookie Policy
            </h1>
            <div className="text-[10px] md:text-sm text-[#7A7474]">
              <Link to="/">Home / </Link>
              <span className="font-semibold text-[#0B0A0A]">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-4 text-sm md:text-xl">
            <h2 className="text-xl font-semibold md:text-2xl">
              Last Updated: [16/08/2024]
            </h2>
            <p>
              This Cookie Policy explains how Turcon ("we," "us," or "our") uses
              cookies and similar technologies on our website ("Website"). By
              using our Website, you agree to the use of cookies as described in
              this policy.
            </p>
          </section>

          <section className="flex flex-col gap-4 text-sm md:text-xl">
            <h2 className="text-xl font-semibold md:text-2xl">
              What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are placed on your device when
              you visit a website. They are widely used to make websites work
              more efficiently and to provide information to the website owners.
            </p>
          </section>

          <section className="flex flex-col gap-4 text-sm md:text-xl">
            <h2 className="text-xl font-semibold md:text-2xl">
              Types of Cookies We Use
            </h2>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold md:text-xl">
                Essential Cookies:
              </h3>
              <p>
                These cookies are necessary for the Website to function
                properly. They enable core functionalities such as security,
                network management, and accessibility.
              </p>
              <h3 className="text-lg font-semibold md:text-xl">
                Performance Cookies:
              </h3>
              <p>
                These cookies collect information about how you use our Website,
                such as which pages you visit most often. This data helps us
                improve the performance of the Website.
              </p>
              <h3 className="text-lg font-semibold md:text-xl">
                Functional Cookies:
              </h3>
              <p>
                These cookies allow the Website to remember choices you make
                (such as your username, language, or region) and provide
                enhanced features.
              </p>
              <h3 className="text-lg font-semibold md:text-xl">
                Targeting Cookies:
              </h3>
              <p>
                These cookies are used to deliver advertisements relevant to you
                and your interests. They are also used to limit the number of
                times you see an advertisement and to measure the effectiveness
                of advertising campaigns.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-4 text-sm md:text-xl">
            <h2 className="text-xl font-semibold md:text-2xl">
              How We Use Cookies
            </h2>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold md:text-xl">
                To Improve User Experience:
              </h3>
              <p>
                We use cookies to remember your preferences and settings,
                enhancing your experience on our Website.
              </p>
              <h3 className="text-lg font-semibold md:text-xl">
                To Analyze and Improve Our Website:
              </h3>
              <p>
                Cookies help us understand how our Website is being used and how
                we can improve it.
              </p>
              <h3 className="text-lg font-semibold md:text-xl">
                To Serve Relevant Advertisements:
              </h3>
              <p>
                We use cookies to deliver ads that are relevant to your
                interests.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-4 text-sm md:text-xl">
            <h2 className="text-xl font-semibold md:text-2xl">
              Third-Party Cookies
            </h2>
            <p>
              We may allow third-party service providers to place cookies on
              your device for the purposes mentioned above. These third parties
              include advertising networks and analytics providers. Each of
              these providers has its own privacy policy regarding the
              collection and use of your data.
            </p>
          </section>

          <section className="flex flex-col gap-4 text-sm md:text-xl">
            <h2 className="text-xl font-semibold md:text-2xl">
              Managing Cookies
            </h2>
            <p>
              You can control and manage cookies in various ways. Please note
              that removing or blocking cookies can impact your user experience
              and some functionality may no longer be available.
            </p>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold md:text-xl">
                Browser Settings:
              </h3>
              <p>
                Most browsers allow you to manage cookies through their
                settings. You can choose to block or delete cookies.
              </p>
              <h3 className="text-lg font-semibold md:text-xl">
                Opt-Out Tools:
              </h3>
              <p>
                Some third-party service providers offer tools to opt-out of
                data collection through cookies.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-4 text-sm md:text-xl">
            <h2 className="text-xl font-semibold md:text-2xl">
              Changes to This Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or relevant laws. We encourage you to
              review this policy periodically to stay informed about how we use
              cookies.
            </p>
          </section>

          <section className="flex flex-col gap-4 text-sm md:text-xl">
            <h2 className="text-2xl md:text-4xl">Contact Us</h2>
            <h3 className="text-lg font-semibold md:text-xl">
              If you have any questions about this Cookie Policy, please contact
              us at:
            </h3>
          </section>

          <div className="flex gap-4 text-sm md:text-xl font-semibold">
            <p>Email:</p>
            <p className="font-normal text-secondary underline">
              <a href="mailto:sales@turcon.in">sales@turcon.in</a>
            </p>
          </div>

          <div className="flex gap-4 text-sm md:text-xl font-semibold w-2/3">
            <p>Address:</p>
            <p className="font-normal">
              SM – OFFICE – B1 – CENTER F002, OPPOSITE TO AJMAN PORT AND CUSTOMS
              AJMAN, UNITED ARAB EMIRATES
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookie;
