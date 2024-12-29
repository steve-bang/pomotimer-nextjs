import { ArrowRight, ClockAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";
import FeatureCard from "@/components/FeatureCard";

export default function IntroductionPage() {
  return (
    <>
      <Head>
        <title>PomodoroTimer | Boost Your Productivity</title>
        <meta
          name="description"
          content="Boost your productivity with the Pomodoro Technique. Use our timer to work in focused bursts and manage your time effectively."
        />
        <meta
          name="keywords"
          content="Pomodoro Timer, Time Management, Productivity, Focus, Timer App"
        />
        <meta name="author" content="PomodoroTimer Team" />
        <meta
          property="og:title"
          content="PomodoroTimer | Boost Your Productivity"
        />
        <meta
          property="og:description"
          content="Boost your productivity with the Pomodoro Technique. Work smarter, not harder!"
        />
        <meta
          property="og:image"
          content="/wallpaper/background-landing.webp"
        />
        <meta property="og:url" content="https://pomotimer-nextjs.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PomodoroTimer | Boost Your Productivity"
        />
        <meta
          name="twitter:description"
          content="Boost your productivity with the Pomodoro Technique. Try it today!"
        />
        <meta
          name="twitter:image"
          content="/wallpaper/background-landing.webp"
        />
        <link rel="canonical" href="https://pomotimer-nextjs.vercel.app/" />
      </Head>
      <div
        className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col justify-center items-center px-4 py-8"
        style={{
          backgroundImage: `url('/wallpaper/background-landing.webp')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backdropFilter: "blur(10px)",
        }}
      >
        <header className="mb-8">
          <div className="flex items-center space-x-2">
            <ClockAlert className="h-10 w-10 text-red-500" />

            <h1 className="text-3xl font-bold text-gray-800">PomodoroTimer</h1>
          </div>
        </header>
        <main className="max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Boost Your Productivity with the Pomodoro Technique
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            The Pomodoro Technique is a time management method that uses a timer
            to break work into intervals, traditionally 25 minutes in length,
            separated by short breaks.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <FeatureCard
              title="Focus"
              description="Work in short, focused bursts to maximize concentration and minimize distractions."
            />
            <FeatureCard
              title="Rest"
              description="Take regular breaks to recharge your mind and avoid burnout."
            />
            <FeatureCard
              title="Track"
              description="Monitor your productivity and see how many Pomodoros you complete each day."
            />
            <FeatureCard
              title="Improve"
              description="Gradually increase your focus time and accomplish more in less time."
            />
          </div>

          <Link href="/pomodoro">
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Start Your First Pomodoro
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </main>

        <footer className="mt-12 text-gray-600">
          <p>Copyright (c) 2024 Steve Bang</p>
        </footer>
      </div>
    </>
  );
}


