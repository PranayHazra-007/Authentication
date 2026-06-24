import React from "react";

export const calculateProgress = (profile = {}) => {
  let progress = 0;

  if (profile.firstName) progress += 5;
  if (profile.lastName) progress += 5;
  if (profile.gender) progress += 10;
  if (profile.mobile) progress += 10;
  if (profile.aadhaar) progress += 20;
  if (profile.dob) progress += 20;

  (profile.education || []).forEach((edu) => {
    if (edu.degree && edu.grade && edu.year) {
      progress += 10;
    }
  });

  return progress;
};


const ProgressBar = ({ profile }) => {
 

  const progress = calculateProgress(profile);

  return (
    <div className="mb-4">
      <h5>Profile Completion</h5>

      <div className="progress" style={{ height: "25px" }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;