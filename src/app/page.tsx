
'use client'

import Clock from "@/components/Clock";
import NavbarMenu from "@/components/NavbarMenu";
import { useEffect, useState } from "react";
import StoreProvider from "./StoreProvider";

export default function Home() {

   const timePomodoro : number = 15;


   const [imageUrl, setImageUrl] = useState('');

   useEffect(() => {
     // Call the API to fetch the image
     const fetchImage = async () => {
       try {
         const response = await fetch('/api/images');
         const data = await response.json();
         setImageUrl(data.imageUrl);  // Set the image URL from the response
       } catch (error) {
         console.error('Error fetching image:', error);
       }
     };
 
     fetchImage();
   }, []);  // Empty dependency array means this effect runs once when the component mounts

  return (
    <StoreProvider>
      <main className="min-h-screen" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}>
        <NavbarMenu />
        <div className="flex items-center justify-center flex-col p-8 pt-20 gap-2">
          <p className="text-2xl text-white">PomoTimer</p>
          <div className="clock region-center-clock">
            <Clock initTimeSecond={timePomodoro} status="in-progress" type="clock" />
          </div>
        </div>
      </main>
    </StoreProvider>
  );
}
