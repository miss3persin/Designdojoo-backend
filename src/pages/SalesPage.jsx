import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiUsers, FiBookOpen } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiType, FiGrid, FiFileText, FiTarget } from "react-icons/fi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaPalette } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { HiOutlineRocketLaunch, HiOutlineTrophy } from "react-icons/hi2";
import { FiHome, FiBriefcase, FiShare2, FiAward } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

function SalesPage() {
  return (
    <main className="bg-[#f8f7f5] min-h-screen">

      <Navbar />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Welcome to the Inside,{" "}
          <span className="text-red-600">Alex.</span>
          <br />
          Let’s Get to Work.
        </h1>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
  DesignDojoo is not another course you'll abandon. 
  It is a live <span className="text-red-600 font-medium">bootcamp</span>
  where you learn, pair with peers, and ship real products.
</p>

        <div className="mt-10 flex justify-center">

  <video
    className="rounded-xl shadow-lg max-w-3xl w-full"
    controls
    
  >
    <source src="/sales/hero-video.mp4" type="video/mp4" />
  </video>

</div>

        <p className="text-2xl md:text-3xl font-semibold mt-10 max-w-3xl mx-auto leading-relaxed">
          “You see this your tech career,
          let us give you an{" "}
          <span className="text-red-600">accountable partner</span>
          {" "}to stay on track.”
        </p>

      </section>

      {/* PROGRAM ORDER */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-center">
          Order of Program
        </h2>

        <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto leading-relaxed">
  An 8-week structured journey from design fundamentals
  to portfolio-ready work and
  <br />
  paid gigs.
</p>

        {/* TIMELINE PLACEHOLDER */}
      <div className="mt-12">
        

  {/* TRACK SELECTOR */}
  <div className="border rounded-full px-6 py-3 flex items-center text-sm mb-10">

    <div className="flex items-center gap-2 text-red-600 font-semibold">
      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
      PRODUCT DESIGN
    </div>

   <div className="flex items-center gap-2 text-yellow-500 font-semibold ml-auto mr-40">
      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
      PRODUCT MANAGEMENT
    </div>

  </div>


  {/* WEEK ROW */}
  {/* WEEK ROW */}
<div className="flex flex-col gap-6 relative">

  {/* BIG FADED NUMBER */}
  <div className="relative">

    <div className="text-[110px] font-bold text-gray-200 leading-none">
      01
    </div>

    <div className="absolute top-8 left-3 flex items-center gap-3">

      <span className="font-semibold text-sm tracking-wide">
        WEEK 1
      </span>

      <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
        FOUNDATION
      </span>

    </div>

  </div>

  {/* CONTENT */}
  <div className="flex-1 min-w-0">


      {/* DAY 1 */}
     <div className="relative flex items-start gap-4 bg-gray-100 border border-gray-200 rounded-xl p-6 mb-4">

  <FiUsers className="text-gray-500 text-xl mt-1" />

  <div className="flex-1">

    <p className="text-xs text-gray-400 mb-1">
      Day 1
    </p>

    <p className="font-semibold text-lg">
      Onboarding
    </p>

    <p className="text-sm text-gray-500">
      Design Thinking Process: Empathize → Define → Ideate → Prototype → Test
    </p>

  </div>

  <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
  Joint Session
</span>

</div>


      {/* DAY 2 */}
      <div className="flex items-start gap-4 bg-gray-100 border border-gray-200 rounded-xl p-6 mb-4">

  <FiBookOpen className="text-gray-500 text-xl mt-1" />

  <div className="flex-1">

    <p className="text-xs text-gray-400 mb-1">
      Day 2
    </p>

    <p className="font-semibold text-lg">
      Human-Centered Design
    </p>

    <p className="text-sm text-gray-500">
      Qualitative user interviews, focus groups
    </p>

  </div>

  <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
  Joint Session
</span>

</div>


      {/* DAY 3 */}
      <div className="flex items-start gap-4 bg-gray-100 border border-gray-200 rounded-xl p-6">

  <HiOutlineLightBulb className="text-gray-500 text-xl mt-1" />

  <div className="flex-1">

    <p className="text-xs text-gray-400 mb-1">
      Day 3
    </p>

    <p className="font-semibold text-lg">
      Fundamental Design Principles
    </p>

    <p className="text-sm text-gray-500">
      Design shapes and basics
    </p>

  </div>

  <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
  Joint Session
</span>

</div>

    </div>

  </div>

</div> 

{/* WEEK 2 */}
<div className="mt-24 flex flex-col gap-10">

  {/* WEEK HEADER */}
  <div className="relative">

    <div className="text-[110px] font-bold text-gray-200 leading-none">
      02
    </div>

    <div className="absolute top-8 left-3 flex items-center gap-3">

      <span className="font-semibold text-sm tracking-wide">
        WEEK 2
      </span>

      <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
        CORE SKILLS
      </span>

    </div>

  </div>


  {/* GRID */}
  <div className="grid grid-cols-2 gap-10 relative">

    {/* CENTER TIMELINE */}
    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200"></div>


    {/* LEFT COLUMN */}
    <div className="space-y-6">

      {/* DAY 1 */}
      <div className="flex items-center justify-between bg-white border rounded-xl px-7 py-7">

  <div className="flex items-start gap-4">

    <div className="w-[3px] bg-red-500 h-16 rounded"></div>

    <div>

      <div className="flex items-center gap-2 mb-1">

        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
          UI DESIGN
        </span>

        <span className="text-xs text-gray-400">
          Day 1
        </span>

      </div>

      <p className="font-semibold text-lg">
        Typography + Low Fidelity Design
      </p>

    </div>

  </div>

  <FiType className="text-gray-300 text-3xl" />

</div>

      {/* DAY 2 */}
      <div className="flex items-center justify-between bg-white border rounded-xl px-7 py-7">

  <div className="flex items-start gap-4">

    <div className="w-[3px] bg-red-500 h-16 rounded"></div>

    <div>

      <div className="flex items-center gap-2 mb-1">

        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
          UI DESIGN
        </span>

        <span className="text-xs text-gray-400">
          Day 2
        </span>

      </div>

      <p className="font-semibold text-lg">
        60-30-10 Colour Theory + High Fidelity Design
      </p>

    </div>

  </div>

  <FaPalette className="text-gray-300 text-3xl" />

</div>


      {/* DAY 3 */}
      <div className="flex items-center justify-between bg-white border rounded-xl px-7 py-7">

  <div className="flex items-start gap-4">

    <div className="w-[3px] bg-red-500 h-16 rounded"></div>

    <div>

      <div className="flex items-center gap-2 mb-1">

        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
          UI DESIGN
        </span>

        <span className="text-xs text-gray-400">
          Day 3
        </span>

      </div>

      <p className="font-semibold text-lg">
        Layout & Grids + High Fidelity Design
      </p>

    </div>

  </div>

  <FiGrid className="text-gray-300 text-3xl" />

</div>
    </div>


    {/* RIGHT COLUMN */}
    <div className="space-y-6">

      {/* DAY 1 */}
      <div className="flex items-center justify-between bg-white border rounded-xl px-7 py-7">

  <div className="flex items-start gap-4">

    <div className="w-[3px] bg-yellow-500 h-16 rounded"></div>

    <div>

      <div className="flex items-center gap-2 mb-1">

        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
          PM TRACK
        </span>

        <span className="text-xs text-gray-400">
          Day 1
        </span>

      </div>

      <p className="font-semibold text-lg">
        Agile Framework + Journey Maps
      </p>

    </div>

  </div>

  <AiOutlineLineChart className="text-gray-300 text-3xl" />

</div>


      {/* DAY 2 */}
     <div className="flex items-center justify-between bg-white border rounded-xl px-7 py-7">

  <div className="flex items-start gap-4">

    <div className="w-[3px] bg-yellow-500 h-16 rounded"></div>

    <div>

      <div className="flex items-center gap-2 mb-1">

        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
          PM TRACK
        </span>

        <span className="text-xs text-gray-400">
          Day 2
        </span>

      </div>

      <p className="font-semibold text-lg">
        Writing PRD + MVP
      </p>

    </div>

  </div>

  <FiFileText className="text-gray-300 text-3xl" />

</div>

      {/* DAY 3 */}
      <div className="flex items-center justify-between bg-white border rounded-xl px-7 py-7">

  <div className="flex items-start gap-4">

    <div className="w-[3px] bg-yellow-500 h-16 rounded"></div>

    <div>

      <div className="flex items-center gap-2 mb-1">

        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
          PM TRACK
        </span>

        <span className="text-xs text-gray-400">
          Day 3
        </span>

      </div>

      <p className="font-semibold text-lg">
        OKR + Team Tools
      </p>

    </div>

  </div>

  <FiTarget className="text-gray-300 text-3xl" />

</div>
    </div>

  </div>

</div>

{/* WEEK 3 */}
<div className="mt-24 flex flex-col gap-10">

  {/* WEEK HEADER */}
  <div className="relative">

    <div className="text-[110px] font-bold text-gray-200 leading-none">
      03
    </div>

    <div className="absolute top-8 left-3 flex items-center gap-3">

      <span className="font-semibold text-sm tracking-wide">
        WEEK 3
      </span>

      <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
        BUILD PHASE
      </span>

    </div>

  </div>


  {/* WEEK 3 CARDS */}
  <div className="flex flex-col gap-6 relative">
    {/* DAY 1 */}
    <div className="flex items-center justify-between bg-white border rounded-xl px-7 py-7">

      <div className="flex items-start gap-4">

        <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
          <HiOutlineRocketLaunch className="text-purple-500 text-xl" />
        </div>

        <div>

          <p className="text-xs text-gray-400 mb-1">
            Day 1
          </p>

          <p className="font-semibold text-lg">
            Project 1 Pairing
          </p>

          <p className="text-sm text-gray-500">
            Individual / Business Portfolio
          </p>

        </div>

      </div>

      <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
  Joint Session
</span>

    </div>


    {/* DAY 2 */}
    <div className="flex items-center justify-between bg-white border rounded-xl px-7 py-7">

      <div className="flex items-start gap-4">

        <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
          <FiStar className="text-purple-500 text-xl" />
        </div>

        <div>

          <p className="text-xs text-gray-400 mb-1">
            Day 2
          </p>

          <p className="font-semibold text-lg">
            Project 1 Mentor Review
          </p>

        </div>

      </div>

      <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
  Joint Session
</span>

    </div>


    {/* DAY 3 */}
    <div className="flex items-center justify-between bg-white border rounded-xl px-7 py-7">

      <div className="flex items-start gap-4">

        <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
          <HiOutlineTrophy className="text-purple-500 text-xl" />
        </div>

        <div>

          <p className="text-xs text-gray-400 mb-1">
            Day 3
          </p>

          <p className="font-semibold text-lg">
            Showcase / Feedback
          </p>

        </div>

      </div>

    <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
  Joint Session
</span>

    </div>

  </div>

</div>

{/* WEEK 4 */}
<div className="mt-24 flex flex-col gap-10">

  {/* WEEK HEADER */}
  <div className="relative">

    <div className="text-[110px] font-bold text-gray-200 leading-none">
      04
    </div>

    <div className="absolute top-8 left-3 flex items-center gap-3">

      <span className="font-semibold text-sm tracking-wide">
        WEEK 4
      </span>

      <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
        BUILD PHASE
      </span>

    </div>

  </div>


  {/* GRID */}
  <div className="grid grid-cols-2 gap-10">

    {/* LEFT */}
    <div className="flex items-center justify-between bg-white border rounded-xl p-6">

      <div className="flex items-start gap-4">

        <div className="w-[3px] bg-red-500 h-16 rounded"></div>

        <div>

          <div className="flex items-center gap-2 mb-1">

            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
              UI DESIGN
            </span>

            <span className="text-xs text-gray-400">
              Day 1
            </span>

          </div>

          <p className="font-semibold">
            Project 2 Pairing
          </p>

          <p className="text-sm text-gray-500">
            Edutech / Prize Money
          </p>

        </div>

      </div>

    </div>


    {/* RIGHT */}
    <div className="flex items-center justify-between bg-white border rounded-xl p-6">

      <div className="flex items-start gap-4">

        <div className="w-[3px] bg-yellow-500 h-16 rounded"></div>

        <div>

          <div className="flex items-center gap-2 mb-1">

            <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
              PM TRACK
            </span>

            <span className="text-xs text-gray-400">
              Day 1
            </span>

          </div>

          <p className="font-semibold">
            Project 1 Mentor Review + Showcase / Feedback
          </p>

        </div>

      </div>

    </div>

  </div>

</div>

{/* WEEK 5 */}
<div className="mt-24 flex flex-col gap-10">

  <div className="relative">

    <div className="text-[110px] font-bold text-gray-200 leading-none">
      05
    </div>

    <div className="absolute top-8 left-3 flex items-center gap-3">

      <span className="font-semibold text-sm tracking-wide">
        WEEK 5
      </span>

      <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
        BUILD PHASE
      </span>

    </div>

  </div>


  <div className="grid grid-cols-2 gap-10">

    <div className="flex items-center justify-between bg-white border rounded-xl p-6">

      <div className="flex items-start gap-4">

        <div className="w-[3px] bg-red-500 h-16 rounded"></div>

        <div>

          <div className="flex items-center gap-2 mb-1">

            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
              UI DESIGN
            </span>

            <span className="text-xs text-gray-400">
              Day 1
            </span>

          </div>

          <p className="font-semibold">
            Project 3 Re-Pairing
          </p>

          <p className="text-sm text-gray-500">
            FinTech / Prize Money
          </p>

        </div>

      </div>

    </div>


    <div className="flex items-center justify-between bg-white border rounded-xl p-6">

      <div className="flex items-start gap-4">

        <div className="w-[3px] bg-yellow-500 h-16 rounded"></div>

        <div>

          <div className="flex items-center gap-2 mb-1">

            <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
              PM TRACK
            </span>

            <span className="text-xs text-gray-400">
              Day 1
            </span>

          </div>

          <p className="font-semibold">
            Project 1 Mentor Review + Showcase / Feedback
          </p>

        </div>

      </div>

    </div>

  </div>

</div>

{/* WEEK 6 */}
<div className="mt-24 flex flex-col gap-6">

  <div className="relative">

    <div className="text-[110px] font-bold text-gray-200 leading-none">
      06
    </div>

    <div className="absolute top-8 left-3 flex items-center gap-3">

      <span className="font-semibold text-sm tracking-wide">
        WEEK 6
      </span>

      <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
        LAUNCH
      </span>

    </div>

  </div>


  <div className="flex items-start gap-4 bg-gray-100 border border-gray-200 rounded-xl p-6">

    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
  <FiShare2 className="text-blue-600 text-lg" />
</div>

    <div className="flex-1">

      <p className="text-xs text-gray-400 mb-1">
        Day 1
      </p>

      <p className="font-semibold text-lg">
        Social Media
      </p>

      <p className="text-sm text-gray-500">
        Declaration of Personal Project
      </p>

    </div>

    <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
      Joint Session
    </span>

  </div>

</div>

{/* WEEK 7 */}
<div className="mt-24 flex flex-col gap-6">

  <div className="relative">

    <div className="text-[110px] font-bold text-gray-200 leading-none">
      07
    </div>

    <div className="absolute top-8 left-3 flex items-center gap-3">

      <span className="font-semibold text-sm tracking-wide">
        WEEK 7
      </span>

      <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
        LAUNCH
      </span>

    </div>

  </div>


  <div className="flex items-start gap-4 bg-gray-100 border border-gray-200 rounded-xl p-6">

    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
  <FiBriefcase className="text-blue-600 text-lg" />
</div>
    <div className="flex-1">

      <p className="text-xs text-gray-400 mb-1">
        Day 1
      </p>

      <p className="font-semibold text-lg">
        Portfolio & CV
      </p>

    </div>

    <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
      Joint Session
    </span>

  </div>

</div>
      </section>

     {/* WEEK 8 */}
<div className="mt-24 flex flex-col gap-10">

  <div className="relative">

    <div className="text-[110px] font-bold text-gray-200 leading-none">
      08
    </div>

    <div className="absolute top-8 left-3 flex items-center gap-3">

      <span className="font-semibold text-sm tracking-wide">
        WEEK 8
      </span>

      <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
        MILESTONE
      </span>

    </div>

  </div>

</div>


{/* FINAL MILESTONE */}
{/* FINAL MILESTONE */}
<div className="max-w-4xl mx-auto px-6 py-12">

        <div className="bg-black text-white rounded-xl p-8 text-center">

          <div className="flex items-center justify-center gap-2 text-red-500 text-sm mb-3">

  <FiAward className="text-red-500" />

  <span className="font-semibold tracking-wide">
    FINAL MILESTONE
  </span>

</div>

          <h3 className="text-xl font-semibold">
            Presentation of Personal Project
          </h3>

          <div className="flex justify-center gap-3 mt-6 flex-wrap">

  <span className="text-sm bg-gray-800 px-4 py-2 rounded-full text-gray-300">
    Look for paid gigs
  </span>

  <span className="text-sm bg-gray-800 px-4 py-2 rounded-full text-gray-300">
    Client Acquisition
  </span>

  <span className="text-sm bg-gray-800 px-4 py-2 rounded-full text-gray-300">
    DesignDojoo Agency
  </span>

</div>

        </div>

      </div>

      {/* HOW DESIGNDOJOO WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-2xl font-bold text-center">
          How DesignDojoo Works
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Hear directly from students and instructors.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

  {[1,2,3].map((i) => (
    <div
      key={i}
      className="rounded-xl overflow-hidden shadow-md"
    >
      <video
        className="w-full h-60 object-cover"
        controls
      >
        <source src="/sales/dojo-video.mp4" type="video/mp4" />
      </video>
    </div>
  ))}

</div>

      </section>

      {/* SEAT RESERVED */}
<section className="max-w-5xl mx-auto px-6 py-16 text-center">

  <h2 className="text-3xl font-bold">
    Your Seat is Reserved,{" "}
    <span className="text-red-600">Alex.</span>
  </h2>

  <p className="text-gray-500 mt-2">
    Your scholarship has been applied. Complete your enrollment before the timer expires.
  </p>

</section>


{/* PRICING */}
<section className="max-w-4xl mx-auto px-6 pb-20">

  <div className="border rounded-xl overflow-hidden bg-white shadow-sm">

    {/* HEADER */}
    <div className="bg-black text-white px-6 py-4 font-semibold border-l-4 border-red-500">
      DesignDojoo Product Experience
    </div>


    {/* OPTION 1 */}
    <div className="flex items-center justify-between px-6 py-6 border-b">

      <div>

        <p className="font-semibold">Standard Bootcamp</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">

          <span className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
  <FiHome className="text-sm" />
  Tier 1
</span>

          <span>8 Weeks</span>

          <span className="font-medium text-gray-800">
            ₦41,829
          </span>

          <span className="line-through text-gray-400">
            ₦82,658
          </span>

        </div>

        <p className="text-xs text-red-500 mt-1">
          50% Scholarship Applied
        </p>

      </div>

      <button className="bg-black text-white px-5 py-2 rounded-lg text-sm">
        Apply direct →
      </button>

    </div>


    {/* OPTION 2 */}
    <div className="flex items-center justify-between px-6 py-6 border-b">

      <div>

        <p className="font-semibold">Agency Placement</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">

          <span className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-full text-sm font-medium">
  <FiBriefcase className="text-sm" />
  Tier 2
</span>

          <span>Part-time, 1 Year</span>

          <span className="font-medium text-gray-800">
            ₦49,829
          </span>

          <span className="line-through text-gray-400">
            ₦99,658
          </span>

        </div>

        <p className="text-xs text-red-500 mt-1">
          50% Scholarship Applied • Includes ₦40,000 Placement Fee
        </p>

      </div>

      <button className="bg-black text-white px-5 py-2 rounded-lg text-sm">
        Apply direct →
      </button>

    </div>


    {/* MENTORSHIP HEADER */}
    <div className="bg-red-50 border-l-4 border-red-500 px-6 py-3 font-semibold text-gray-800">
      Mentorship with Placement
    </div>


    {/* OPTION 3 */}
    <div className="flex items-center justify-between px-6 py-6">

      <div>

        <p className="font-semibold">
          Mentorship + Agency Placement
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">

          <span className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
  <FaGraduationCap className="text-sm" />
  All-in-One
</span>
          <span>Full-time, 1 Year</span>

          <span className="font-medium text-gray-800">
            ₦65,829
          </span>

          <span className="line-through text-gray-400">
            ₦131,658
          </span>

        </div>

        <p className="text-xs text-red-500 mt-1">
          50% Scholarship Applied • Includes Placement + Mentorship Fees
        </p>

      </div>

      <button className="bg-black text-white px-5 py-2 rounded-lg text-sm">
        Apply direct →
      </button>

    </div>

  </div>

</section>

      {/* BACKED BY */}
      <section className="text-center py-16">

        <p className="text-gray-500">
          Backed by the Best.
        </p>

        <img
          src="/images/partners/pediforte.svg"
          className="mx-auto mt-4 h-10"
        />

      </section>

      {/* CERTIFICATE + TESTIMONIALS */}
     {/* CERTIFICATE + TESTIMONIALS */}
<section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10 items-start">

  {/* CERTIFICATE IMAGE */}
  <img
    src="/images/certificates/certificates-5.svg"
    className="rounded-xl shadow-sm"
  />

  {/* TESTIMONIALS */}
  <div className="space-y-6">

    {/* CARD 1 */}
    <div className="bg-white border border-[#F3F4F6] rounded-xl p-6">

      <div className="flex items-start gap-4">

        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
          TA
        </div>

        <div>

          <div className="text-red-500 text-sm mb-2">
            ★★★★★
          </div>

          <p className="text-gray-800 text-sm leading-relaxed">
            "I shipped my first product in week 5. DesignDojoo is the real deal."
          </p>

          <p className="text-xs text-gray-500 mt-3">
            <span className="font-semibold text-gray-700">Temi A.</span> — UI Designer, Flutterwave
          </p>

        </div>

      </div>

    </div>


    {/* CARD 2 */}
    <div className="bg-white border border-[#F3F4F6] rounded-xl p-6">

      <div className="flex items-start gap-4">

        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
          KB
        </div>

        <div>

          <div className="text-red-500 text-sm mb-2">
            ★★★★★
          </div>

          <p className="text-gray-800 text-sm leading-relaxed">
            "The PM track gave me a framework I use every single day at work."
          </p>

          <p className="text-xs text-gray-500 mt-3">
            <span className="font-semibold text-gray-700">Kola B.</span> — Product Manager, Paystack
          </p>

        </div>

      </div>

    </div>


    {/* CARD 3 */}
    <div className="bg-white border border-[#F3F4F6] rounded-xl p-6">

      <div className="flex items-start gap-4">

        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
          ZM
        </div>

        <div>

          <div className="text-red-500 text-sm mb-2">
            ★★★★★
          </div>

          <p className="text-gray-800 text-sm leading-relaxed">
            "Best investment I made in my career. The peer pairing is genius."
          </p>

          <p className="text-xs text-gray-500 mt-3">
            <span className="font-semibold text-gray-700">Zara M.</span> — Product Designer, Andela
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

      <Footer />

    </main>
  );
}

export default SalesPage;