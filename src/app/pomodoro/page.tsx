"use client";

import Clock from "@/components/Clock";
import NavbarMenu from "@/components/NavbarMenu";
import { useEffect, useState } from "react";
import StoreProvider from "../StoreProvider";
import StateTimer from "@/components/StateTimer";
import Link from "next/link";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Call the API to fetch the image
    const fetchImage = async () => {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        setImageUrl(data.imageUrl); // Set the image URL from the response
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <StoreProvider>
      <main
        className="min-h-screen"
        style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover" }}
      >
        <NavbarMenu />
        <div className="w-[100%] flex justify-center">
          <div className="flex justify-center items-center w-fit flex-col gap-2 bg-black/70 rounded-2xl p-2">
            <StateTimer />
            <div className="clock region-center-clock">
              <Clock status="in-progress" type="pomodoro-timer" />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-[100%] flex-col gap-2 mt-10">
          <Link
            href={"/pomodoro"}
            className="bg-red-800 h-40 w-40 rounded-full border-white border-4 shadow-black shadow-lg hover:bg-red-950 hover:border-black duration-500 text-white hover:text-gray-400 text-center flex justify-center items-center"
          >
            Go to pomodoro
          </Link>
        </div>
      </main>
    </StoreProvider>
  );
}
