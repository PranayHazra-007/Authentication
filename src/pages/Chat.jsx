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
      if (!message.trim()) return;

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
    <>
      <Navbar />

      <div className="container mt-4">

        {!googleUser ? (
          <div className="text-center">

            <button
              className="btn btn-danger"
              onClick={
                handleGoogleLogin
              }
            >
              Sign In With Google
            </button>

          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">

              <div className="d-flex align-items-center gap-3">

                <img
                  src={
                    googleUser.photoURL
                  }
                  alt=""
                  width="50"
                  height="50"
                  style={{
                    borderRadius:
                      "50%",
                  }}
                />

                <h4 className="mb-0">
                  {
                    googleUser.displayName
                  }
                </h4>

              </div>

              <button
                className="btn btn-danger"
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>

            </div>

            <div
              className="border rounded p-3 mb-3"
              style={{
                height: "500px",
                overflowY: "auto",
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
                    <div
                      className="d-flex gap-2 align-items-start"
                    >
                      {msg.email !==
                        googleUser.email && (
                        <img
                          src={msg.photo}
                          alt=""
                          width="40"
                          height="40"
                          style={{
                            borderRadius:
                              "50%",
                          }}
                        />
                      )}

                      <div
                        className="p-2 rounded"
                        style={{
                          maxWidth:
                            "300px",
                          backgroundColor:
                            msg.email ===
                            googleUser.email
                              ? "#0d6efd"
                              : "#e9ecef",
                          color:
                            msg.email ===
                            googleUser.email
                              ? "white"
                              : "black",
                        }}
                      >
                        <strong>
                          {msg.name}
                        </strong>

                        <br />

                        <small>
                          {msg.createdAt
                            ?.toDate
                            ? msg.createdAt
                                .toDate()
                                .toLocaleString()
                            : ""}
                        </small>

                        <br />

                        {msg.text}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="d-flex">

              <input
                type="text"
                className="form-control"
                placeholder="Type Message..."
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    "Enter"
                  ) {
                    handleSend();
                  }
                }}
              />

              <button
                className="btn btn-primary ms-2"
                onClick={
                  handleSend
                }
              >
                Send
              </button>

            </div>
          </>
        )}

      </div>
    </>
  );
};

export default Chat;