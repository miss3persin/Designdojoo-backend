import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  BookOpen,
  ShieldCheck,
  CreditCard,
  Ban,
  Briefcase,
  User,
  Award
} from "lucide-react";

function Terms() {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-100 min-h-screen">

      {/* Navbar */}
      <Navbar />

      <div className="px-4 py-16 flex justify-center">
        <div className="w-full max-w-3xl">

          {/* BLACK HEADER CARD */}
          <div className="bg-[#0B0F14] text-white rounded-xl p-8 mb-8">

            {/* Back button INSIDE header */}
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-300 hover:text-white mb-4"
            >
              ← Back to Enrollment
            </button>

            <div className="flex gap-4 items-start">
              <div className="w-1.5 bg-red-500 h-16 mt-1"></div>

              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">
                  Terms & Conditions
                </h1>

                <p className="text-gray-300 text-sm mt-2">
                  Please review the following terms carefully before enrolling in any
                  DesignDojoo Institiute program.
                </p>
              </div>
            </div>
          </div>

          {/* GREY INTRO BOX */}
          <div className="bg-gray-100 rounded-xl p-6 mb-12 border border-gray-200">
            <div className="flex gap-4">
              <div className="w-1 bg-red-600"></div>

              <div className="text-sm text-gray-700 leading-relaxed space-y-4">

                <p>
                  Welcome to DesignDojoo Institute ("DesignDojoo", "we", "our", or "us").
                  By enrolling in any of our programs, bootcamps, mentorship tracks,
                  or agency placement pathways, you ("Student", "Member", or "Participant") agree to be legally bound by
                  the following Terms and Conditions.
                </p>

                <p className="font-medium">
                  Please read them carefully.
                </p>

              </div>
            </div>
          </div>

          {/* CONTENT GRID */}
          <div className="space-y-12">

{/* 1 */}
<TermsItem
  icon={<BookOpen size={18} />}
  number="1"
  title="Acceptance of Terms"
>
  <p>
    By enrolling in any DesignDojoo program, you agree to comply with these
    Terms and Conditions.
  </p>

  <ul className="list-disc pl-5 space-y-1">
    <li>Securing your scholarship</li>
    <li>Making payment of tuition or placement fees</li>
    <li>Accessing our materials</li>
    <li>Participating in live sessions, sprints, or mentorship</li>
  </ul>

  <p> 
    you acknowledge that you have read, understood, and agreed to these Terms and Conditions in the full. 
    If you do not agree, you must not enroll or make payment.

  </p>
</TermsItem>


{/* 2 */}
<TermsItem
  icon={<ShieldCheck size={18} />}
  number="2"
  title="Intellectual Property & Use of Materials"
>
  <p>
    All DesignDojoo materials including but not limited to: Course slides, Recorded Sessions, Templates, Frameworks, PRD samples,
    UI kits, Sprint documents, Playbook, Certificates, Branding assets and internal documents are the exclusive intellectual
    property of DesignDojoo Institute.
  </p>

  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <p className="text-red-900 font-semibold mb-2">
      Strict Prohibitions:
    </p>
    <p className= "text-red-800">
      Members are strictly prohibited from:
    </p>

    <ul className="list-disc pl-5 text-red-800 space-y-1">
      <li>Copying materials for resale</li>
      <li>Selling, sublicensing, or redistributing any DesignDojoo resources</li>
      <li>Sharing paid content publicly or privately with non-members</li>
      <li>Uploading materials to third-party platforms</li>
      <li>Reproducing our curriculum for personal commercial use</li>
      <li>Creating derivating bootcamps based on our structure</li>
    </ul> 
    
  </div>
  <p> 
      Any violation may result in: Immediate termination of enrollment, Revocations of Certificate, Permanent ban from the ecosystem, Legal action where applicable. Access is granted for personal educational use only. 
    </p>
</TermsItem>


{/* 3 */}
<TermsItem
  icon={<CreditCard size={18} />}
  number="3"
  title="Payment Terms"
>

<p>
  All tuition fees, scholarship payments, and placement fees must be paid in full before the stated deadline. 
</p>

<p> 
  Your Scholarship discount is:
</p>

  <ul className="list-disc pl-5 space-y-1">
    <li>Conditional</li>
    <li>Non-transferable</li>
    <li>Valid only within the Stated 72-hour window (where applicable)</li>
  </ul>

<p>
  Failure to complete payment within the deadline may result in forfeiture of your reserved seat.
</p>
</TermsItem>


{/* 4 */}
<TermsItem
  icon={<Ban size={18} />}
  number="4"
  title="No Refund Policy"
>
  <div className="bg-black text-red-500 px-4 py-2 rounded-md font-semibold">
    All payments made to DesignDojoo are final and non-refundable.
  </div>

  <p>
   This includes but not limited to:
  </p>
   
 <ul className="list-disc pl-5 space-y-1">
  <li>Scholarship discounted tuition fees</li>
  <li>Full tuition payments</li>
  <li>Agency placement fees</li>
  <li>Special sprint access fees</li>
  <li>Any administration fees</li>
  </ul>  

  <p>
    No refunds will be issued under aby circumstances including:
  </p>

  <ul className="list-disc pl-5 space-y-1">
  <li>Change of Mind</li>
  <li>Schedule conflicts</li>
  <li>Personal commitments</li>
  <li>Reloctaion</li>
  <li>Failure to complete the program</li>
  <li>Dissatisfaction due to lack of personal effort</li>
  </ul>
  
  <p className= "text-black-400 font-bold mb-2">
    By making payment, you agree that you understand and accept this No Refund Policy
  </p>

</TermsItem>


{/* 5 */}
<TermsItem
  icon={<Briefcase size={18} />}
  number="5"
  title="Agency Placement & Eligibility Requirements"
>
  <p>
    Agency placement is not automatic. Members must meet performance
    benchmarks and demonstrate readiness for professional work.
  </p>

  {/* IMPORTANT CONDITIONS */}
  <div className="bg-black text-white px-4 py-3 rounded-md">
    <p className="font-semibold mb-2">
      Important Conditions
    </p>

    <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
      <li>Agency placement is not automatic</li>
      <li>Members must meet predefined performance and competancy requirements</li>
    </ul>
  </div>

  <p>
    Requirements may include:
  </p>

  <ul className="list-disc pl-5 space-y-1">
  <li>Portfolio quality</li>
  <li>Sprint Performance</li>
  <li>Attendance record</li>
  <li>Professional conduct</li>
  <li>Skill assessment</li>
  <li>Team collaboration</li>
  </ul>

  {/* FINAL BLACK BAR */}
  <div className="bg-black text-white px-4 py-3 rounded-md">
    <p className="font-semibold mb-2">
      Placement Fee Policy
    </p>
    If a member pays a placement fee but: Fails to meet the required standards, Fails evaluation assessments, is deemed not
    ready for client work, or Violates professional conduct rules - the placement fee will not be refunded or rewarded
     
    

  </div>
</TermsItem>


{/* 6 */}
<TermsItem
  icon={<User size={18} />}
  number="6"
  title="Code of Conduct"
>
  <p>
    All members must:
  </p>

  <ul className="list-disc pl-5 space-y-1">
    <li>Maintain respectful communication</li>
    <li>Participate actively in sprints</li>
    <li>Meet deadlines</li>
    <li>Avoid plagiarism</li>
    <li>Maintain professional behavior in all live sessions</li>
  </ul>

  <p>
    DeseignDojoo reserves the right to remove any participant who:
  </p>

  <ul className="list-disc pl-5 space-y-1">
    <li>Engages in misconduct</li>
    <li>Harasses others</li>
    <li>Disputes live sessions</li>
    <li>Acts in bad faith</li>
    <li>Violates intellectual property rights</li>
  </ul>

   <p className= "text-black-400 font-bold mb-2">
    Removal does not entitle the members to any refund.
  </p>
</TermsItem>


{/* 7 */}
<TermsItem
  icon={<Award size={18} />}
  number="7"
  title="Certification"
>
  <p>
    Certificates are awarded only to members who:
  </p>

  <ul className="list-disc pl-5 space-y-1">
    <li>Complete required sprints</li>
    <li>Attend required sessions</li>
    <li>Submit required projects</li>
    <li>Meet minimum performance standards</li>
  </ul>

  <p>
    DesignDojoo reserves the right to withhold certification where standards are not met.
  </p>
</TermsItem>

</div>
 
{/* FINAL CTA */}
<div className="bg-black text-white rounded-xl p-8 mt-12 text-center">

  <p className="text-sm text-gray-300 mb-6">
    Finished reading? Head back to complete your enrollment
  </p>

  <button
    onClick={() => navigate(-1)}
    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
  >
     ← Back to Enrollment
  </button>

</div>

        </div>
      </div>

      {/* Footer */}
      <Footer />

    </main>
  );
}


/* ================= TERMS ITEM ================= */

function TermsItem({ icon, number, title, children }) {
  return (
    <div className="flex gap-4 items-start">

      {/* red icon box */}
      <div className="bg-red-600 text-white p-2 rounded-md flex items-center justify-center">
        {icon}
      </div>

      {/* number */}
      <span className="font-semibold text-gray-700 mt-1">
        {number}.
      </span>

      <div>
        <h3 className="font-semibold text-gray-900 mb-2">
          {title}
        </h3>

        <div className="text-sm text-gray-700 leading-relaxed space-y-3">
          {children}
        </div>
      </div>

    </div>
  );
}

export default Terms;