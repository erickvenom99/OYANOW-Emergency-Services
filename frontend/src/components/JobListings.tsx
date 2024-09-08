import React, { useState } from "react";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  urgency: string;
  status: string;
  client: {
    name: string;
    contact: string;
  };
  scheduledTime: string; // Or Date if preferred
  payment: {
    rate: string;
    method: string;
  };
}

interface JobListingsProps {
  jobs: Job[]; // Array of Job objects
  onUpdateStatus: (id: string, status: string) => void; // Function to update job status
}

const JobListings: React.FC<JobListingsProps> = ({ jobs, onUpdateStatus }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="job-listings">
      <h1 className="text-3xl font-bold mb-4">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="job-card bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => handleJobClick(job)}
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Urgency: {job.urgency}</p>
            <p>Status: {job.status}</p>
          </div>
        ))}
      </div>

      {selectedJob && (
        <div className="job-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded shadow-lg relative">
            <span
              className="close absolute top-2 right-2 text-2xl cursor-pointer"
              onClick={handleCloseModal}
            ></span>
            <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
            <p>{selectedJob.description}</p>
            <p>Location: {selectedJob.location}</p>
            <p>Urgency: {selectedJob.urgency}</p>
            <p>Client: {selectedJob.client.name}</p>
            <p>Contact: {selectedJob.client.contact}</p>
            <p>
              Scheduled Time:{" "}
              {new Date(selectedJob.scheduledTime).toLocaleString()}
            </p>
            <p>
              Payment: {selectedJob.payment.rate} {selectedJob.payment.method}
            </p>
            <p>Status: {selectedJob.status}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => onUpdateStatus(selectedJob._id, "In Progress")}
            >
              Accept
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => onUpdateStatus(selectedJob._id, "Completed")}
            >
              Mark as Completed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListings;
