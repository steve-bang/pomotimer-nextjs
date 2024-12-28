import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pomodoro Timer - Boost Productivity with Time Management",
  description: "A simple Pomodoro Timer app that works on a desktop & mobile browser. Pomotimer will help you manage your time and let you focus on any tasks such as study, writing, or coding. The Pomodoro Technique is widely used for tasks that require deep focus, such as studying, coding, writing, or working on a project. There are many apps and timers available that can help you implement the Pomodoro Technique. Try it now!",
  keywords: "Pomodoro, Pomodoro Technique, productivity, time management, focus, work intervals, time tracking, productivity tool, Pomodoro timer, study with me, focus with me, study",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

        {/* Open Graph */}
        <meta property="og:title" content={"Pomodoro Timer - Boost Productivity with Time Management"} />
        <meta property="og:description" content={"A simple Pomodoro Timer app that works on a desktop & mobile browser. Pomotimer will help you manage your time and let you focus on any tasks such as study, writing, or coding. The Pomodoro Technique is widely used for tasks that require deep focus, such as studying, coding, writing, or working on a project. There are many apps and timers available that can help you implement the Pomodoro Technique. Try it now!"} />
        <meta property="og:image" content="https://yourdomain.com/pomodoro-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Pomodoro Timer - Boost Productivity with Time Management"} />
        <meta name="twitter:description" content={"A simple Pomodoro Timer app that works on a desktop & mobile browser. Pomotimer will help you manage your time and let you focus on any tasks such as study, writing, or coding. The Pomodoro Technique is widely used for tasks that require deep focus, such as studying, coding, writing, or working on a project. There are many apps and timers available that can help you implement the Pomodoro Technique. Try it now!"} />
        <meta name="twitter:image" content="https://yourdomain.com/pomodoro-image.jpg" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
