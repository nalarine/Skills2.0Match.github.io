import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import adminBg from "../../../assets/admin_bg.png"; // Import the image

export default function Auth() {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${adminBg})`, // Use the imported image
            }}
          ></div>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Routes>
          {/* Footer component */}
        </section>
      </main>
    </>
  );
}