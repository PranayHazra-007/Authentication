import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slices/cartSlice";
const MyProfile = () => {
  const user = useSelector((state) => state.cart.user);
  const currentUser =user || JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        subjects: [""],
      },
    ],
  });

  useEffect(() => {
  if (currentUser && currentUser.profile) {
    const updatedEducation =
      currentUser.profile.education.map((edu) => ({
        ...edu,
        subjects: edu.subjects || [""],
      }));

    setProfile({
      ...currentUser.profile,
      education: updatedEducation,
    });
  }
}, []);
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
          subjects: [""],
        },
      ],
    });
  }else{
    toast.error("You can only add up to 3 education entries.");
  }
  };
  const handleSubjectChange = (eduIndex, subIndex, value) => {
  const temp = [...profile.education];
  if (!temp[eduIndex].subjects) {
    temp[eduIndex].subjects = [""];
  }

  temp[eduIndex].subjects[subIndex] = value;

  setProfile({
    ...profile,
    education: temp,
  });
  };
  const addSubject = (eduIndex) => {
  const temp = [...profile.education];

  if (!temp[eduIndex].subjects) {
    temp[eduIndex].subjects = [""];
  }

  temp[eduIndex].subjects.push("");

  setProfile({
    ...profile,
    education: temp,
  });
  };
  const removeSubject = (eduIndex, subIndex) => {
  const temp = [...profile.education];

  if (temp[eduIndex].subjects) {
    temp[eduIndex].subjects.splice(subIndex, 1);
  }

  setProfile({
    ...profile,
    education: temp,
  });
  };
  const removeEducation = (index) => {
    const temp = [...profile.education];
    temp.splice(index, 1);

    setProfile({
      ...profile,
      education: temp,
    });
  };
  // const validate = () => {
  //   const err = {};

  //   if (!profile.firstName.trim())
  //     err.firstName = "First Name Required";

  //   if (!profile.lastName.trim())
  //     err.lastName = "Last Name Required";

  //   if (!profile.gender)
  //     err.gender = "Select Gender";

  //   if (!/^\+\d{1,3}\s\d{10}$/.test(profile.mobile))
  //     err.mobile = "Example: +91 9876543210";

  //   if (
  //     !/^\d{4}-\d{4}-\d{4}$/.test(profile.aadhaar)
  //   )
  //     err.aadhaar = "Example: 1234-5678-9012";

  //   if (!profile.dob)
  //     err.dob = "Select DOB";

  //   profile.education.forEach((item, index) => {
  //     if (!item.degree)
  //       err[`degree${index}`] = "Required";

  //     if (!item.grade)
  //       err[`grade${index}`] = "Required";

  //     if (!/^\d{4}$/.test(item.year))
  //       err[`year${index}`] = "Invalid Year";
  //   });

  //   setErrors(err);

  //   return Object.keys(err).length === 0;
  // };
  const updateProfile = () => {
    // if (!validate()) return;

    const updatedCurrent = {
      ...currentUser,
      profile,
    };
    console.log("Updated Current User:", updatedCurrent);

    localStorage.setItem("currentUser", JSON.stringify(updatedCurrent));
    dispatch(setUser(updatedCurrent));

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
  <>
    <Navbar />

    <div
      className="container py-5"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card border-0 shadow-lg mx-auto overflow-hidden"
        style={{
          maxWidth: "950px",
          borderRadius: "24px",
        }}
      >
        {/* Header */}
        <div
          className="text-center text-white py-5"
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
          }}
        >
          <h2 className="fw-bold mb-2">
            My Profile
          </h2>

          <p className="mb-0 opacity-75">
            Manage your personal information
          </p>
        </div>

        <div className="p-4 p-md-5">

          <div className="mb-4">
            {
              currentUser && <ProgressBar profile={profile} />
            }
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                First Name
              </label>

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

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                Last Name
              </label>

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
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Gender
            </label>

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

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                Mobile Number
              </label>

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

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                Aadhaar Number
              </label>

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

          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Date Of Birth
            </label>

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

          <hr className="my-5" />

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">
              🎓 Education Details
            </h4>

            <span className="badge bg-primary">
              {profile.education.length}/3
            </span>
          </div>

          {profile.education.map(
            (item, index) => (
              <div
                key={index}
                className="bg-light border-0 shadow-sm p-4 mb-4"
                style={{
                  borderRadius: "18px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">
                    Education #{index + 1}
                  </h5>

                  {profile.education.length >
                    1 && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        removeEducation(
                          index
                        )
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  className="form-control mb-3"
                  placeholder="Degree"
                  name="degree"
                  value={item.degree}
                  onChange={(e) =>
                    handleEducation(
                      index,
                      e
                    )
                  }
                />

                <input
                  className="form-control mb-3"
                  placeholder="Grade"
                  name="grade"
                  value={item.grade}
                  onChange={(e) =>
                    handleEducation(
                      index,
                      e
                    )
                  }
                />

                <input
                  className="form-control mb-3"
                  placeholder="Year"
                  name="year"
                  value={item.year}
                  onChange={(e) =>
                    handleEducation(
                      index,
                      e
                    )
                  }
                />

                <h6 className="fw-bold mt-4 mb-3">
                  📚 Subjects
                </h6>

                {(item.subjects || [""]).map(
                  (
                    subject,
                    subIndex
                  ) => (
                    <div
                      key={subIndex}
                      className="d-flex gap-2 mb-2"
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject Name"
                        value={subject}
                        onChange={(e) =>
                          handleSubjectChange(
                            index,
                            subIndex,
                            e.target.value
                          )
                        }
                      />

                      {(item.subjects ||
                        [""])
                        .length > 0 && (
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() =>
                            removeSubject(
                              index,
                              subIndex
                            )
                          }
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )
                )}

                <button
                  type="button"
                  className="btn btn-outline-success btn-sm mt-3"
                  onClick={() =>
                    addSubject(index)
                  }
                >
                  + Add Subject
                </button>
              </div>
            )
          )}

          <button
            className="btn btn-outline-primary w-100 py-2 mb-4"
            onClick={addEducation}
          >
            + Add Education
          </button>

          <button
            className="btn btn-primary w-100 py-3 fw-bold"
            style={{
              borderRadius: "14px",
            }}
            onClick={updateProfile}
          >
            {currentUser?.profile
              ? "Update Profile"
              : "Create Profile"}
          </button>

        </div>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-outline-dark px-4"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

    </div>
  </>
);
};
export default MyProfile;

