// src/SucculentApp.js
import React, { useState, useEffect } from "react";
import * as api from "./api/api"; // CRUD API helper
import { loginUser, registerUser } from "./api/auth"; // Auth API helper
import { useNavigate } from "react-router-dom";
import Background from "./assets/background.jpeg";

// Succulent images
import Aloe from "./assets/succulents/aloe.svg";
import AloeWatered from "./assets/succulents/aloe_watered.svg";
import Cactus from "./assets/succulents/cactus.svg";
import CactusWatered from "./assets/succulents/cactus_watered.svg";
import Echeveria from "./assets/succulents/echeveria.svg";
import EcheveriaWatered from "./assets/succulents/echeveria_watered.svg";
import Jade from "./assets/succulents/jade.svg";
import JadeWatered from "./assets/succulents/jade_watered.svg";
import Haworthia from "./assets/succulents/haworthia.svg";
import HaworthiaWatered from "./assets/succulents/haworthia_watered.svg";
import Paddle from "./assets/succulents/paddle.svg";
import PaddleWatered from "./assets/succulents/paddle_watered.svg";

// Optional: succulent water sound
import waterSound from "./assets//sounds/click.mp3";

const succulentsData = [
  { name: "Aloe", normal: Aloe, watered: AloeWatered, waterDays: 14 },
  { name: "Cactus", normal: Cactus, watered: CactusWatered, waterDays: 21 },
  {
    name: "Echeveria",
    normal: Echeveria,
    watered: EcheveriaWatered,
    waterDays: 10,
  },
  { name: "Jade", normal: Jade, watered: JadeWatered, waterDays: 12 },
  {
    name: "Haworthia",
    normal: Haworthia,
    watered: HaworthiaWatered,
    waterDays: 16,
  },
  { name: "Paddle", normal: Paddle, watered: PaddleWatered, waterDays: 18 },
];

export default function SucculentApp() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null); // "login" | "register" | null
  const [authData, setAuthData] = useState({ email: "", password: "" });

  const [succulents, setSucculents] = useState(succulentsData);
  const [selectedSucculent, setSelectedSucculent] = useState(null);
  const [isWatering, setIsWatering] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const navigate = useNavigate();

  const sound = new Audio(waterSound);

  // Auth submit handler
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    sound.play();
    try {
      const data =
        authMode === "login"
          ? await loginUser(authData)
          : await registerUser(authData);

      setUser(data.user);
      alert(`${authMode} successful!`);
      setAuthMode(null);
    } catch (err) {
      console.error("Auth error:", err);
      alert(err.message || "Authentication failed");
    }
  };

  // Water succulent animation
  const handleWater = (suc) => {
    sound.play();
    setIsWatering(true);
    let toggle = false;
    const interval = setInterval(() => {
      setCurrentImage(toggle ? suc.normal : suc.watered);
      toggle = !toggle;
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setIsWatering(false);
      setCurrentImage(suc.normal);

      // Save last watered
      localStorage.setItem(`${suc.name}_lastWatered`, Date.now());
    }, 3000);
  };

  const handleSelectSucculent = (suc) => {
    setSelectedSucculent(suc);
    setCurrentImage(suc.normal);
  };

  const handleBack = () => {
    setSelectedSucculent(null);
  };

  // --- RENDER ---

  // LOGIN / REGISTER PAGE
  if (!user) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!authMode ? (
          <div className="flex flex-col gap-4 bg-white/10 p-6 rounded-lg items-center">
            <h1 className="text-3xl font-bold text-green-800">Welcome 🌿</h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setAuthMode("login")}
            >
              Login
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setAuthMode("register")}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="border p-4 rounded-lg bg-white/10 flex flex-col gap-3 items-center">
            <h2 className="text-2xl font-semibold mb-3">
              {authMode === "login" ? "Login" : "Register"}
            </h2>
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                value={authData.email}
                onChange={(e) =>
                  setAuthData({ ...authData, email: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={authData.password}
                onChange={(e) =>
                  setAuthData({ ...authData, password: e.target.value })
                }
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {authMode === "login" ? "Login" : "Register"}
              </button>
            </form>
            <p className="mt-2 text-sm text-gray-600">
              {authMode === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    className="text-green-500"
                    onClick={() => setAuthMode("register")}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="text-blue-500"
                    onClick={() => setAuthMode("login")}
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    );
  }

  // SELECTED SUCCULENT PAGE
  if (selectedSucculent) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="flex justify-between p-4">
          <button
            className="bg-white p-2 rounded border-2 border-green-800 font-bold"
            onClick={handleBack}
          >
            ← BACK
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-2xl font-bold text-green-800 mb-4">
            {selectedSucculent.name}
          </h1>
          <img
            src={currentImage}
            alt={selectedSucculent.name}
            style={{ width: "130px", height: "130px", marginBottom: "16px" }}
          />
          <button
            onClick={() => handleWater(selectedSucculent)}
            disabled={isWatering}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isWatering ? "WATERING..." : "WATER 💧"}
          </button>
        </div>
      </div>
    );
  }

  // MAIN SUCCULENT GRID PAGE
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "24px",
      }}
    >
      <h1 className="text-3xl font-bold mb-4 text-green-800">
        Hello, {user.name} 🌵
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {succulents.map((s) => (
          <div
            key={s.name}
            className="border p-2 rounded flex flex-col items-center cursor-pointer"
            onClick={() => handleSelectSucculent(s)}
          >
            <img
              src={s.normal}
              alt={s.name}
              style={{ width: "100px", height: "100px", marginBottom: "8px" }}
            />
            <span className="font-bold text-green-800">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
