import React from "react";
import { Link } from "react-router-dom";

const TermsAndCondition: React.FC = () => {
  return (
    <>
      <div className="bg-my-gradient pb-4">
        <div className="container mx-auto flex flex-col gap-8 ">
          <div className="flex justify-between items-center mt-4">
            <div className=" flex flex-col gap-2">
              <div className="text-xl md:text-3xl text-[#0B0A0A] ">
                Terms And Condition
              </div>
              <div className="text-[10px] md:text-sm text-[#7A7474]">
                <Link to={"/"}>Home / </Link>
                <span className="font-semibold text-[#0B0A0A]">
                  Terms And Condition
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-lg font-semibold md:text-3xl text-center">
                User Terms and Conditions{" "}
              </h2>
            </section>

            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                1. Acceptance of Terms{" "}
              </h2>
              <p>
                By accessing and using this website, you agree to comply with
                these Terms of Use. The Company reserves the right to update
                these terms at any time without prior notice. Continued use of
                the site implies acceptance of the revised terms.
              </p>
            </section>
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                2. Eligibility{" "}
              </h2>
              <p>
                You must be at least 18 years old to use this site. By using the
                site, you confirm that you meet this age requirement.
              </p>
            </section>
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                3. Account Registration and Security{" "}
              </h2>
              <p>
                To access certain features, you may need to register and create
                an account. You agree to provide accurate information and to
                update it as necessary. You are responsible for maintaining the
                confidentiality of your account and password.
              </p>
            </section>
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                4. Authorized Use{" "}
              </h2>
              <p>
                You agree to use the site only for lawful purposes. Unauthorized
                access or attempts to access the site’s systems, misuse of
                information, or any illegal activities are strictly prohibited.
              </p>
            </section>
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                5. Intellectual Property{" "}
              </h2>
              <p>
                All content on this site, including text, graphics, logos, and
                software, is the property of Turcon Maritime FZE or its
                licensors and is protected by copyright laws. Unauthorized use
                of this content is prohibited.
              </p>
            </section>
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                6. Third-Party Links{" "}
              </h2>
              <p>
                The site may contain links to third-party websites. Turcon
                Maritime FZE is not responsible for the content or privacy
                practices of these sites.
              </p>
            </section>
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                7. Privacy Policy{" "}
              </h2>
              <p>
                Your use of the site is also governed by our Privacy Policy,
                which is incorporated into these Terms by reference.
              </p>
            </section>
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                8. Limitation of Liability{" "}
              </h2>
              <p>
                Turcon Maritime FZE is not liable for any direct, indirect,
                incidental, or consequential damages arising from your use of
                the site or the information contained on it.
              </p>
            </section>
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                9. Indemnification{" "}
              </h2>
              <p>
                You agree to use the site only for lawful purposes. Unauthorized
                access or attempts to access the site’s systems, misuse of
                information, or any illegal activities are strictly prohibited.
              </p>
            </section>
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                10. Termination{" "}
              </h2>
              <p>
                Turcon Maritime FZE reserves the right to terminate your access
                to the site at any time, without notice, for any reason.
              </p>
            </section>
            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-[16px] font-semibold md:text-2xl">
                11. Governing Law{" "}
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the
                laws of the United Arab Emirates. Any disputes arising from
                these Terms shall be resolved in the courts of the UAE.
              </p>
            </section>

            <section className="flex flex-col gap-4 text-sm md:text-xl">
              <h2 className="text-2xl md:text-4xl">Contact Us</h2>
              <h3 className="text-lg font-semibold md:text-xl">
                If you have any questions about this Cookie Policy, please
                contact us at:
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
                SM – OFFICE – B1 – CENTER F002, OPPOSITE TO AJMAN PORT AND
                CUSTOMS AJMAN, UNITED ARAB EMIRATES
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndCondition;
