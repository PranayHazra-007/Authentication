import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import toast from "react-hot-toast";
const MyProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    aadhaar: "",
    dob: "",
    education: [
      {
        degree: "",
        grade: "",
        year: "",
      },
    ],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser && currentUser.profile) {
      setProfile(currentUser.profile);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEducation = (index, e) => {
    const { name, value } = e.target;

    const temp = [...profile.education];
    temp[index][name] = value;

    setProfile({
      ...profile,
      education: temp,
    });
  };

  const addEducation = () => {
  if(profile.education.length < 3) {
    setProfile({
      ...profile,
      education: [
        ...profile.education,
        {
          degree: "",
          grade: "",
          year: "",
        },
      ],
    });
  }else{
    toast.error("You can only add up to 3 education entries.");
  }
  };

  const removeEducation = (index) => {
    const temp = [...profile.education];
    temp.splice(index, 1);

    setProfile({
      ...profile,
      education: temp,
    });
  };

  const validate = () => {
    const err = {};

    if (!profile.firstName.trim())
      err.firstName = "First Name Required";

    if (!profile.lastName.trim())
      err.lastName = "Last Name Required";

    if (!profile.gender)
      err.gender = "Select Gender";

    if (!/^\+\d{1,3}\s\d{10}$/.test(profile.mobile))
      err.mobile = "Example: +91 9876543210";

    if (
      !/^\d{4}-\d{4}-\d{4}$/.test(profile.aadhaar)
    )
      err.aadhaar = "Example: 1234-5678-9012";

    if (!profile.dob)
      err.dob = "Select DOB";

    profile.education.forEach((item, index) => {
      if (!item.degree)
        err[`degree${index}`] = "Required";

      if (!item.grade)
        err[`grade${index}`] = "Required";

      if (!/^\d{4}$/.test(item.year))
        err[`year${index}`] = "Invalid Year";
    });

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const updateProfile = () => {
    if (!validate()) return;

    const updatedCurrent = {
      ...currentUser,
      profile,
    };
    console.log("Updated Current User:", updatedCurrent);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedCurrent)
    );

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === currentUser.email
        ? { ...u, profile }
        : u
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    toast.success("Profile Updated Successfully");
  };

  return (
    <div className="container mt-5 mb-5">

      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "700px" }}
      >
        <h2 className="text-center mb-4">
          Manage Profile
        </h2>

        <ProgressBar profile={profile} />

        <div className="mb-3">
          <input
            className="form-control"
            placeholder="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />
          <small className="text-danger">
            {errors.firstName}
          </small>
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
          />
          <small className="text-danger">
            {errors.lastName}
          </small>
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
          >
            <option value="">
              Select Gender
            </option>

            <option>Male</option>
            <option>Female</option>
            <option>Other</option>

          </select>

          <small className="text-danger">
            {errors.gender}
          </small>

        </div>

        <div className="mb-3">

          <input
            className="form-control"
            placeholder="+91 9876543210"
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
          />

          <small className="text-danger">
            {errors.mobile}
          </small>

        </div>

        <div className="mb-3">

          <input
            className="form-control"
            placeholder="1234-5678-9012"
            name="aadhaar"
            value={profile.aadhaar}
            onChange={handleChange}
          />

          <small className="text-danger">
            {errors.aadhaar}
          </small>

        </div>

        <div className="mb-3">

          <input
            type="date"
            className="form-control"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
          />

          <small className="text-danger">
            {errors.dob}
          </small>

        </div>

        <h4 className="mt-4">
          Education Details
        </h4>

        {profile.education.map((item, index) => (

          <div
            key={index}
            className="border p-3 rounded mb-3"
          >

            <input
              className="form-control mb-2"
              placeholder="Degree"
              name="degree"
              value={item.degree}
              onChange={(e) =>
                handleEducation(index, e)
              }
            />

            <small className="text-danger">
              {errors[`degree${index}`]}
            </small>

            <input
              className="form-control mb-2"
              placeholder="Grade"
              name="grade"
              value={item.grade}
              onChange={(e) =>
                handleEducation(index, e)
              }
            />

            <small className="text-danger">
              {errors[`grade${index}`]}
            </small>

            <input
              className="form-control mb-2"
              placeholder="Year"
              name="year"
              value={item.year}
              onChange={(e) =>
                handleEducation(index, e)
              }
            />

            <small className="text-danger">
              {errors[`year${index}`]}
            </small>


            {profile.education.length > 1 && (
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() =>
                  removeEducation(index)
                }
              >
                Remove
              </button>
            )}

          </div>

        ))}

        <button
          className="btn btn-secondary mb-3"
          onClick={addEducation}
        >
          + Add Education
        </button>

        <button
          className="btn btn-primary"
          onClick={updateProfile}
        >
          Update Profile
        </button>

      </div>

     <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};
export default MyProfile;

