import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

import {
signInWithPopup,
signOut,
onAuthStateChanged,
} from "firebase/auth";

import {
auth,
provider,
db,
} from "../firebase";

import {
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp,
} from "firebase/firestore";

const Chat = () => {
const [googleUser, setGoogleUser] =
useState(null);

const [message, setMessage] =
useState("");

const [messages, setMessages] =
useState([]);

// Persist Login
useEffect(() => {
const unsubscribe =
onAuthStateChanged(
auth,
(user) => {
if (user) {
setGoogleUser(user);
}
}
);


return () => unsubscribe();


}, []);

// Realtime Messages
useEffect(() => {
const q = query(
collection(db, "messages"),
orderBy("createdAt")
);


const unsubscribe =
  onSnapshot(q, (snapshot) => {
    setMessages(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });

return () => unsubscribe();


}, []);

// Google Login
const handleGoogleLogin =
async () => {
try {
const result =
await signInWithPopup(
auth,
provider
);


    const email =
      result.user.email;

    const users =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || [];

    const registeredUser =
      users.find(
        (u) =>
          u.email === email
      );

    if (!registeredUser) {
      await signOut(auth);

      toast.error(
        "You are not registered"
      );

      return;
    }

    setGoogleUser(result.user);

    toast.success(
      "Google Login Success"
    );
  } catch (err) {
    console.log(err);
  }
};


// Logout
const handleLogout =
async () => {
await signOut(auth);


  setGoogleUser(null);

  toast.success(
    "Logged Out Successfully"
  );
};


// Send Message
const handleSend =
async () => {
if (!message.trim())
return;


  try {
    await addDoc(
      collection(
        db,
        "messages"
      ),
      {
        text: message,
        name:
          googleUser.displayName,
        email:
          googleUser.email,
        photo:
          googleUser.photoURL,
        createdAt:
          serverTimestamp(),
      }
    );

    setMessage("");
  } catch (err) {
    console.log(err);
  }
};


return (
<> <Navbar />


  <div
    className="container py-4"
    style={{
      minHeight: "100vh",
      background:
        "#f8fafc",
    }}
  >
    {!googleUser ? (
      <div
        className="card border-0 shadow-lg mx-auto text-center p-5"
        style={{
          maxWidth:
            "500px",
          borderRadius:
            "24px",
          marginTop:
            "80px",
        }}
      >
        <h2 className="fw-bold mb-3">
          Team Chat
        </h2>

        <p className="text-muted mb-4">
          Sign in with
          your registered
          Google account
          to join the
          realtime chat.
        </p>

        <button
          className="btn btn-danger btn-lg"
          style={{
            borderRadius:
              "50px",
          }}
          onClick={
            handleGoogleLogin
          }
        >
          Sign In With Google
        </button>
      </div>
    ) : (
      <div
        className="card border-0 shadow-lg"
        style={{
          borderRadius:
            "24px",
          overflow:
            "hidden",
        }}
      >
        {/* Header */}

        <div
          className="d-flex justify-content-between align-items-center p-4"
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
            color:
              "white",
          }}
        >
          <div className="d-flex align-items-center gap-3">

            <img
              src={
                googleUser.photoURL
              }
              alt=""
              width="55"
              height="55"
              style={{
                borderRadius:
                  "50%",
                border:
                  "3px solid white",
                objectFit:
                  "cover",
              }}
            />

            <div>
              <h5 className="mb-0">
                {
                  googleUser.displayName
                }
              </h5>

              <small>
                Online
              </small>
            </div>

          </div>

          <button
            className="btn btn-light"
            onClick={
              handleLogout
            }
          >
            Logout
          </button>
        </div>

        {/* Messages */}

        <div
          style={{
            height:
              "600px",
            overflowY:
              "auto",
            background:
              "#f8fafc",
            padding:
              "20px",
          }}
        >
          {messages.map(
            (msg) => (
              <div
                key={msg.id}
                className={`d-flex mb-3 ${
                  msg.email ===
                  googleUser.email
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div>

                  {msg.email !==
                    googleUser.email && (
                    <div className="d-flex align-items-center gap-2 mb-1">

                      <img
                        src={
                          msg.photo
                        }
                        alt=""
                        width="35"
                        height="35"
                        style={{
                          borderRadius:
                            "50%",
                        }}
                      />

                      <small className="fw-bold">
                        {
                          msg.name
                        }
                      </small>

                    </div>
                  )}

                  <div
                    style={{
                      maxWidth:
                        "350px",
                      padding:
                        "12px 16px",
                      borderRadius:
                        "18px",
                      boxShadow:
                        "0 5px 15px rgba(0,0,0,.05)",
                      background:
                        msg.email ===
                        googleUser.email
                          ? "#2563eb"
                          : "white",
                      color:
                        msg.email ===
                        googleUser.email
                          ? "white"
                          : "black",
                    }}
                  >

                    {msg.email ===
                      googleUser.email && (
                      <div className="fw-semibold mb-1">
                        You
                      </div>
                    )}

                    <div>
                      {
                        msg.text
                      }
                    </div>

                    <div
                      style={{
                        fontSize:
                          "11px",
                        opacity:
                          0.75,
                        marginTop:
                          "6px",
                      }}
                    >
                      {msg.createdAt
                        ?.toDate
                        ? msg.createdAt
                            .toDate()
                            .toLocaleString()
                        : ""}
                    </div>

                  </div>

                </div>
              </div>
            )
          )}
        </div>

        {/* Footer */}

        <div className="p-4 border-top bg-white">

          <div className="d-flex gap-2">

            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={(
                e
              ) => {
                if (
                  e.key ===
                  "Enter"
                ) {
                  handleSend();
                }
              }}
              style={{
                borderRadius:
                  "50px",
                padding:
                  "12px 18px",
              }}
            />

            <button
              className="btn btn-primary px-4"
              style={{
                borderRadius:
                  "50px",
              }}
              onClick={
                handleSend
              }
            >
              Send
            </button>

          </div>

        </div>
      </div>
    )}
  </div>
</>


);
};

export default Chat;
