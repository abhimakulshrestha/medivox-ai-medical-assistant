"use client";


import { motion } from "motion/react";
import * as React from "react";
import { useTheme } from "next-themes";

import { FeatureGlowingEffect } from "./_components/FeatureGlowingEffect";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { user } = useUser();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
  <div className="relative flex flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-900 md:text-4xl lg:text-7xl dark:text-slate-100">
          {"Revolutionize Medical Assistance With AI Voice Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Deliver instant, accurate medical assistance through natural voice conversations.
          Automate appointment scheduling, prescription generation and symptom triage.
          24/7 availability, follow-up and personalized care.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            asChild
          >
            <Link href={user ? "/dashboard" : "/sign-in"}>
              Get Started
            </Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl bg-neutral-100 p-4 shadow-md dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src="https://github.com/abhimakulshrestha/image/blob/main/Gemini_Generated_Image_9lnkoc9lnkoc9lnk.png?raw=true"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
      <FeatureGlowingEffect />
      <footer className="w-full mt-16 py-8 px-4 text-center text-sm text-neutral-800 border-t border-neutral-200 dark:border-neutral-800 dark:text-neutral-400 bg-white dark:bg-black">
        <div className="max-w-3xl mx-auto">
          <strong>MediVox</strong> &mdash; Revolutionizing medical assistance with AI voice agents.<br />
          Delivering instant, accurate, and personalized healthcare support 24/7.<br />
          &copy; {new Date().getFullYear()} MediVox. All rights reserved.
        </div>
      </footer>
    </div>
  );
}


