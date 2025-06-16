import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          About Us
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl">
          We connect talented professionals with their dream jobs and empower companies to build outstanding teams.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="bg-blue-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To provide a seamless platform for job seekers and employers to find the perfect match with transparency, efficiency, and care.
          </p>
        </div>
        <div className="bg-blue-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To become the most trusted and innovative job portal, bridging talent and opportunity across industries worldwide.
          </p>
        </div>
      </section>


      {/* Values Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
          Our Core Values
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Integrity</h3>
            <p className="text-gray-700">We uphold honesty and transparency in everything we do.</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-700">Constantly improving and embracing new ideas and technology.</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-gray-700">Building a supportive network for job seekers and employers alike.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
