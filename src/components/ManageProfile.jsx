import React, { useState } from "react";

const ManageProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    aadhaar: "",
    dob: "",
    education: [{ degree: "", grade: "", year: "" }],
  });

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleEdu = (i, e) => {
    const temp = [...profile.education];
    temp[i][e.target.name] = e.target.value;
    setProfile({ ...profile, education: temp });
  };

  const addEdu = () =>
    setProfile({
      ...profile,
      education: [...profile.education, { degree: "", grade: "", year: "" }],
    });

  const save = () => {
    if (
      !profile.firstName ||
      !profile.lastName ||
      !profile.gender ||
      !profile.mobile ||
      !profile.aadhaar ||
      !profile.dob
    ) {
      return alert("Fill all fields");
    }

    if (!/^\+\d{1,3}\s\d{10}$/.test(profile.mobile))
      return alert("Mobile: +91 9876543210");

    if (!/^\d{4}-\d{4}-\d{4}$/.test(profile.aadhaar))
      return alert("Aadhaar: 1234-5678-9012");

    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile Saved");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto shadow" style={{ maxWidth: 700 }}>
        <h3 className="text-center mb-3">Manage Profile</h3>

        <input className="form-control mb-2" name="firstName" placeholder="First Name" onChange={handleChange} />
        <input className="form-control mb-2" name="lastName" placeholder="Last Name" onChange={handleChange} />

        <select className="form-select mb-2" name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input className="form-control mb-2" name="mobile" placeholder="+91 9876543210" onChange={handleChange} />
        <input className="form-control mb-2" name="aadhaar" placeholder="1234-5678-9012" onChange={handleChange} />
        <input className="form-control mb-3" type="date" name="dob" onChange={handleChange} />

        <h5>Education</h5>

        {profile.education.map((edu, i) => (
          <div key={i} className="border p-2 mb-2">
            <input className="form-control mb-2" name="degree" placeholder="Degree" onChange={(e) => handleEdu(i, e)} />
            <input className="form-control mb-2" name="grade" placeholder="Grade" onChange={(e) => handleEdu(i, e)} />
            <input className="form-control" name="year" placeholder="Year" onChange={(e) => handleEdu(i, e)} />
          </div>
        ))}

        <button className="btn btn-secondary mb-2" onClick={addEdu}>
          + Add Education
        </button>

        <button className="btn btn-primary" onClick={save}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ManageProfile;

