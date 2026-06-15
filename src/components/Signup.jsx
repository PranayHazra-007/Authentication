import React, { useRef } from "react";

const Signup = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const SignupUser = () => {
    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("User data saved successfully!");
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div>
      <input type="text" placeholder="Username" ref={usernameRef} />
      <br />
      <br/>

      <input type="email" placeholder="Email" ref={emailRef} />
      <br />
      <br/>

      <input type="password" placeholder="Password" ref={passwordRef} />
      <br /><br/>

      <button onClick={SignupUser}>Signup</button>
    </div>
  );
};

export default Signup;