import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import {useNavigate} from "react-router-dom"
const MyProfile = () => {
  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};
      const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    aadhaar: "",
    dob: "",
    education: [{ degree: "", grade: "", year: "" }],
  });

  useEffect(() => {
    if (currentUser.profile) {
      setProfile(currentUser.profile);
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdu = (index, e) => {
    const temp = [...profile.education];
    temp[index][e.target.name] = e.target.value;

    setProfile({
      ...profile,
      education: temp,
    });
  };

  const addEdu = () => {
    if (profile.education.length >= 3) {
      return alert("Maximum 3 Education Entries Allowed");
    }

    setProfile({
      ...profile,
      education: [
        ...profile.education,
        { degree: "", grade: "", year: "" },
      ],
    });
  };

  const saveProfile = () => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        return {
          ...user,
          profile,
        };
      }
      return user;
    });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...currentUser,
        profile,
      })
    );

    alert("Profile Updated Successfully");
  };

  return (
    <div className="card p-4 shadow">

      <h2 className="text-center mb-3">
        My Profile
      </h2>

      <ProgressBar profile={profile} />

      <input
        className="form-control mb-2"
        placeholder="First Name"
        name="firstName"
        value={profile.firstName}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        placeholder="Last Name"
        name="lastName"
        value={profile.lastName}
        onChange={handleChange}
      />

      <select
        className="form-select mb-2"
        name="gender"
        value={profile.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <input
        className="form-control mb-2"
        placeholder="+91 9876543210"
        name="mobile"
        value={profile.mobile}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        placeholder="1234-5678-9012"
        name="aadhaar"
        value={profile.aadhaar}
        onChange={handleChange}
      />

      <input
        type="date"
        className="form-control mb-3"
        name="dob"
        value={profile.dob}
        onChange={handleChange}
      />

      <h5>Education Details</h5>

      {profile.education.map((edu, index) => (
        <div
          key={index}
          className="border p-2 rounded mb-2"
        >
          <input
            className="form-control mb-2"
            placeholder="Degree"
            name="degree"
            value={edu.degree}
            onChange={(e) =>
              handleEdu(index, e)
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Grade"
            name="grade"
            value={edu.grade}
            onChange={(e) =>
              handleEdu(index, e)
            }
          />

          <input
            className="form-control"
            placeholder="Year"
            name="year"
            value={edu.year}
            onChange={(e) =>
              handleEdu(index, e)
            }
          />
        </div>
      ))}

      <button
        className="btn btn-secondary mb-2"
        onClick={addEdu}
      >
        + Add Education
      </button>

      <button
        className="btn btn-primary"
        onClick={saveProfile}
      >
        Update Profile
      </button>
       <br></br>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Back
      </button>

    </div>
  );
};

export default MyProfile;

