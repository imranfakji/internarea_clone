import axios from "axios";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  DollarSign,
  Filter,
  Pin,
  PlayCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const JobsPage = () => {
  const [filteredJobs, setFilteredJobs] = useState<any>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filter, setFilter] = useState({
    category: "",
    location: "",
    experience: "",
    workFromHome: false,
    partTime: false,
    salary: 0,
  });
  const [allJobs, setAllJobs] = useState<any>([]);

  // ✅ Fetch only backend data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/job"); // Change this to your API URL
        console.log("Job API Response:", res.data);
        if (res.data && res.data.length > 0) {
          setAllJobs(res.data);
          setFilteredJobs(res.data);
        } else {
          setAllJobs([]);
          setFilteredJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setAllJobs([]);
        setFilteredJobs([]);
      }
    };
    fetchData();
  }, []);

  // ✅ Filter logic
  useEffect(() => {
    const filtered = allJobs.filter((job: any) => {
      const matchesCategory =
        !filter.category ||
        job.category?.toLowerCase().includes(filter.category.toLowerCase()) ||
        job.title?.toLowerCase().includes(filter.category.toLowerCase());
      const matchesLocation =
        !filter.location ||
        job.location?.toLowerCase().includes(filter.location.toLowerCase());
      const matchesExperience =
        !filter.experience ||
        job.experience?.toLowerCase().includes(filter.experience.toLowerCase());

      const matchesWorkFromHome =
        !filter.workFromHome || job.workFromHome === true;
      const matchesPartTime = !filter.partTime || job.partTime === true;

      const salaryValue = parseInt(job.CTC?.replace(/[^\d]/g, "")) || 0;
      const matchesSalary = salaryValue >= filter.salary * 1000;

      return (
        matchesCategory &&
        matchesLocation &&
        matchesExperience &&
        matchesWorkFromHome &&
        matchesPartTime &&
        matchesSalary
      );
    });
    setFilteredJobs(filtered);
  }, [filter, allJobs]);

  const handleFilterChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const clearFilters = () => {
    setFilter({
      category: "",
      location: "",
      experience: "",
      workFromHome: false,
      partTime: false,
      salary: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="hidden md:block w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-black">Filters</span>
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={filter.category}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
                  placeholder="e.g. Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={filter.location}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
                  placeholder="e.g. Mumbai"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={filter.experience}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
                  placeholder="e.g. 2 years"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="workFromHome"
                    checked={filter.workFromHome}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">Work from home</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="partTime"
                    checked={filter.partTime}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">Part-time</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Salary (₹ in thousands)
                </label>
                <input
                  type="range"
                  name="salary"
                  min="0"
                  max="100"
                  value={filter.salary}
                  onChange={handleFilterChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹0K</span>
                  <span>₹50K</span>
                  <span>₹100K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <p className="text-center font-medium text-black">
                {filteredJobs.length} Jobs found
              </p>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job: any) => (
                <div
                  key={job._id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-2 text-blue-600 mb-4">
                    <ArrowUpRight className="h-5 w-5" />
                    <span className="font-medium">Actively Hiring</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{job.company}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <PlayCircle className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">Category</p>
                        <p className="text-sm">{job.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Pin className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm">{job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">CTC</p>
                        <p className="text-sm">{job.CTC}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        Job
                      </span>
                      <div className="flex items-center space-x-1 text-green-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Posted recently</span>
                      </div>
                    </div>

                    {/* ✅ Link to detail job page */}
                    <Link
                      href={`/detailjob/${job._id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
