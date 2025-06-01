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

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-12">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Team Member */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Jane Doe"
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Jane Doe</h3>
            <p className="text-blue-600 font-medium">CEO & Founder</p>
            <p className="text-gray-600 mt-2 text-sm">
              Passionate about creating opportunities and building a community of professionals.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="John Smith"
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">John Smith</h3>
            <p className="text-blue-600 font-medium">CTO</p>
            <p className="text-gray-600 mt-2 text-sm">
              Driving innovation and ensuring a smooth, secure user experience.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Emma Lee"
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Emma Lee</h3>
            <p className="text-blue-600 font-medium">Head of Marketing</p>
            <p className="text-gray-600 mt-2 text-sm">
              Spreading the word and building lasting relationships with our users.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Michael Brown"
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Michael Brown</h3>
            <p className="text-blue-600 font-medium">Lead Developer</p>
            <p className="text-gray-600 mt-2 text-sm">
              Building features that make the job search easy and efficient.
            </p>
          </div>
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
