"use client";
import * as React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

export function Navbar() {
  const { user } = useUser();
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="font-bold text-lg text-slate-900 dark:text-slate-100">⛨ MediVox</div>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <UserButton />
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </>
        ) : (
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
