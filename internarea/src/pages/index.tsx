import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowUpRight,
  Banknote,
  Calendar,
  ChevronRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function SvgSlider() {
  const categories = [
    "Big Brands",
    "Work From Home",
    "Part-time",
    "MBA",
    "Engineering",
    "Media",
    "Design",
    "Data Science",
  ];

  // Slider cards with better visuals and working links
 const slides = [
  {
    bgColor: "bg-gradient-to-r from-cyan-500 to-blue-600",
    badge: "VIDEO",
    title: (
      <>
        Watch our <span className="text-yellow-300 font-semibold">Internship Program</span> Overview
      </>
    ),
    description:
      "Get a complete walkthrough of our placement and training journey. Learn how we help students grow with real projects.",
    buttonText: "Watch Now",
    buttonLink: "https://www.youtube.com/watch?v=fQFvmBV3oOs&t=114s",
    illustration: (
      <svg
        width="140"
        height="140"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="55" stroke="white" strokeWidth="4" />
        <polygon points="50,40 85,60 50,80" fill="white" />
      </svg>
    ),
  },
  {
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-500",
    badge: "PROJECT",
    title: (
      <>
        Build Real-World <span className="text-yellow-300 font-semibold">Intern Projects</span>
      </>
    ),
    description:
      "Work on exciting internship projects and boost your resume with practical, hands-on coding experience.",
    buttonText: "Explore Project",
    buttonLink: "https://www.nullclass.com/projects/areaintern",
    illustration: (
      <svg
        width="140"
        height="140"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="55" stroke="white" strokeWidth="4" />
        <path
          d="M40 75 H80 L60 40 Z"
          fill="white"
        />
        <rect x="55" y="80" width="10" height="10" fill="white" />
      </svg>
    ),
  },
];


  const stats = [
    { number: "300K+", label: "companies hiring" },
    { number: "10K+", label: "new openings everyday" },
    { number: "21Mn+", label: "active students" },
    { number: "600K+", label: "learners" },
  ];

  const [internships, setInternship] = useState<any[]>([]);
  const [jobs, setJob] = useState<any[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const [internshipres, jobres] = await Promise.all([
          axios.get("http://localhost:5000/api/internship"),
          axios.get("http://localhost:5000/api/job"),
        ]);
        console.log("🎯 Internships from backend:", internshipres.data);
        setInternship(internshipres.data);
        setJob(jobres.data);
      } catch (error) {
        console.log("❌ Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredInternships = internships.filter(
    (item) => !selectedCategory || item.category === selectedCategory
  );
  const filteredJobs = jobs.filter(
    (item) => !selectedCategory || item.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Make your dream career a reality
        </h1>
        <p className="text-xl text-gray-600">Trending on InternArea 🔥</p>
      </div>

      {/* Swiper Section */}
      <div className="mb-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          className="rounded-xl"
          style={{ minHeight: 200 }}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`relative rounded-xl flex items-center justify-between p-8 gap-8 shadow-lg overflow-hidden ${slide.bgColor} text-white`}
                style={{ minHeight: 220 }}
              >
                {/* Left text content */}
                <div className="flex flex-col max-w-[60%]">
                  <span className="bg-white bg-opacity-20 rounded-md px-3 py-1 text-xs font-medium mb-2 max-w-max uppercase tracking-wide">
                    {slide.badge}
                  </span>
                  <h2 className="text-3xl font-bold leading-snug mb-2">
                    {slide.title}
                  </h2>
                  {slide.description && (
                    <p className="text-white/90 text-sm mb-5">
                      {slide.description}
                    </p>
                  )}
                  <Link
                    href={slide.buttonLink}
                    className="inline-block bg-white text-gray-900 font-semibold rounded-md px-6 py-2 hover:bg-gray-100 transition-all shadow-sm select-none"
                  >
                    {slide.buttonText}
                  </Link>
                </div>

                {/* Right image/illustration */}
                <div className="w-[35%] flex justify-center items-center select-none">
                  {slide.illustration}
                </div>

                {/* Decorative corner shapes */}
                <div className="pointer-events-none absolute top-0 left-0 w-20 h-20 rounded-tr-[32px] bg-white/10" />
                <div className="pointer-events-none absolute bottom-0 right-0 w-20 h-20 rounded-bl-[32px] bg-white/10" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Rest of your code (internships, jobs, stats) stays same */}
      {/* Category section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Latest internships on Intern Area
        </h2>
        <div className="flex flex-wrap gap-4">
          <span className="text-gray-700 font-medium">POPULAR CATEGORIES:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Internship grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredInternships.map((internship, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105"
          >
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <ArrowUpRight size={20} />
              <span className="font-medium">Actively Hiring</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {internship.title}
            </h3>
            <p className="text-gray-500 mb-4">{internship.company}</p>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote size={18} />
                <span>{internship.stipend || "Not specified"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>
                  {internship.startDate
                    ? `Start: ${internship.startDate.slice(0, 10)}`
                    : "Date not available"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                Internship
              </span>
              <Link
                href={`/detailiternship/${internship._id}`}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View details
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Jobs grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105"
            >
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <ArrowUpRight size={20} />
                <span className="font-medium">Actively Hiring</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-500 mb-4">{job.company}</p>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Banknote size={18} />
                  <span>{job.CTC}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{job.Experience}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  Jobs
                </span>
                <Link
                  href={`/detailjob/${job._id}`}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  View details
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
