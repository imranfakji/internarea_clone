import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeGenerator = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const resumeRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    const element = resumeRef.current;
    if (!element) return;

    try {
      // Capture the element as canvas with options to avoid color issues
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false, // Disable logging to avoid console errors
      });
      const imgData = canvas.toDataURL("image/png");

      // Create PDF in A4 size
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate image dimensions to fit the PDF width
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Save the PDF - this triggers download
      pdf.save(`${name || "resume"}.pdf`);
      alert("PDF generated and downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    }
  };

  // Helper function to format skills as bullet points
  const formatSkills = (skills: string) => {
    if (!skills) return "Your skills will appear here.";
    return skills.split(',').map(skill => `• ${skill.trim()}`).join('\n');
  };

  // Helper function to format experience as bullet points
  const formatExperience = (experience: string) => {
    if (!experience) return "Your experience details will appear here.";
    return experience.split('\n').map(exp => `• ${exp.trim()}`).filter(exp => exp.trim()).join('\n');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Professional Resume Generator</h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
          <textarea
            placeholder="Enter a brief professional summary"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
          <textarea
            placeholder="Enter your education details (e.g., Degree, University, Year)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
          <textarea
            placeholder="Enter your skills (comma separated)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
          <textarea
            placeholder="Enter your experience details (one per line)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <button
          onClick={generatePDF}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Generate and Download Resume PDF
        </button>
      </div>

      {/* PDF Preview Section - Professional Resume Format with Inline Styles Only */}
      <div
        ref={resumeRef}
        style={{
          maxWidth: '512px', // equivalent to max-w-2xl
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '32px', // equivalent to p-8
          borderRadius: '12px', // equivalent to rounded-xl
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // equivalent to shadow-lg
          border: '1px solid #e5e7eb', // equivalent to border border-gray-200
          fontFamily: 'Arial, sans-serif',
          color: 'black',
          lineHeight: '1.6',
          fontSize: '14px'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid black', paddingBottom: '16px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'black', marginBottom: '8px' }}>{name || "Your Name"}</h2>
          <div style={{ fontSize: '18px', color: 'black' }}>
            {email && <span>{email}</span>}
            {email && phone && <span> | </span>}
            {phone && <span>{phone}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        {summary && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Professional Summary</h3>
            <p style={{ color: 'black', lineHeight: '1.6' }}>{summary}</p>
          </div>
        )}

        {/* Education */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Education</h3>
          <div style={{ color: 'black', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{education || "Your education details will appear here."}</div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Skills</h3>
          <div style={{ color: 'black', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{formatSkills(skills)}</div>
        </div>

        {/* Experience */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience</h3>
          <div style={{ color: 'black', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{formatExperience(experience)}</div>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
