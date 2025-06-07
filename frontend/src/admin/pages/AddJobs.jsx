import React, { useState } from 'react';

const AddJobs = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    jobType: '',
    position: '',
    companyId: '',
    requirements: '',
    experienceLevel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can post this data to your API here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Title', name: 'title' },
          { label: 'Description', name: 'description', type: 'textarea' },
          { label: 'Salary', name: 'salary' },
          { label: 'Location', name: 'location' },
          { label: 'Job Type', name: 'jobType' },
          { label: 'Position', name: 'position' },
          { label: 'Company ID', name: 'companyId' },
          { label: 'Requirements', name: 'requirements', type: 'textarea' },
          { label: 'Experience Level', name: 'experienceLevel' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={4}
              />
            ) : (
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default AddJobs;
