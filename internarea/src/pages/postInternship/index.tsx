"use client";
import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  Tags,
  Info,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const PostInternship = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    aboutCompany: "",
    aboutInternship: "",
    whoCanApply: "",
    perks: "",
    numberOfOpening: "",
    stipend: "",
    startDate: "",
    additionalInfo: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Submitting Internship Form...");
    console.log("📦 Form Data:", formData);

    // check empty fields
    const hasEmptyFields = Object.values(formData).some(
      (val) => !val.toString().trim()
    );
    if (hasEmptyFields) {
      toast.error("Please fill in all details");
      return;
    }

    try {
      setIsLoading(true);
     const API_URL = "http://localhost:5000/api/internship";


      console.log("🌐 Sending POST request to:", API_URL);

      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Internship posted successfully:", res.data);
      toast.success("Job posted successfully");
      router.push("/adminpanel");
    } catch (error: any) {
      console.error("❌ Error posting job:", error);
      if (error.response) {
        console.error("📥 Server response:", error.response.data);
        toast.error(`Error: ${error.response.data.error || "Server Error"}`);
      } else {
        toast.error("Network error, please check backend connection");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Post New Internship
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Create a new internship opportunity for students
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Title*
                  </div>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer Intern"
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <Building2 className="h-4 w-4 mr-1" />
                    Company Name*
                  </div>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Tech Solutions Inc"
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location*
                  </div>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai, India"
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <Tags className="h-4 w-4 mr-1" />
                    Category*
                  </div>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Software Development"
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Company and Internship Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <Info className="h-4 w-4 mr-1" />
                    About Company*
                  </div>
                </label>
                <textarea
                  name="aboutCompany"
                  value={formData.aboutCompany}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your company..."
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <Briefcase className="h-4 w-4 mr-1" />
                    About Internship*
                  </div>
                </label>
                <textarea
                  name="aboutInternship"
                  value={formData.aboutInternship}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the internship role..."
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <Users className="h-4 w-4 mr-1" />
                    Who Can Apply*
                  </div>
                </label>
                <textarea
                  name="whoCanApply"
                  value={formData.whoCanApply}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Eligibility criteria..."
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <Info className="h-4 w-4 mr-1" />
                    Perks*
                  </div>
                </label>
                <textarea
                  name="perks"
                  value={formData.perks}
                  onChange={handleChange}
                  rows={3}
                  placeholder="List the perks..."
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Final Details */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <Users className="h-4 w-4 mr-1" />
                    Number of Openings*
                  </div>
                </label>
                <input
                  type="number"
                  name="numberOfOpening"
                  value={formData.numberOfOpening}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g. 5"
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Stipend*
                  </div>
                </label>
                <input
                  type="text"
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleChange}
                  placeholder="e.g. ₹15,000/month"
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Start Date*
                  </div>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center mb-1">
                    <Info className="h-4 w-4 mr-1" />
                    Additional Information*
                  </div>
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any additional details..."
                  className="text-black mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Posting Internship...
                  </div>
                ) : (
                  "Post Internship"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostInternship;
