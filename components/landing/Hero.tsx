"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Lock, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            Secure File Sharing
            <span className="text-primary block mt-2 sm:inline sm:mt-0 sm:ml-2"> Made Simple</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Share files securely with automatic expiry. No registration required.
            Just upload, share, and stay in control.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link href="/upload">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Start Sharing <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/download">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Start Downloading <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn more
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "End-to-End Security",
    description: "Your files are encrypted in transit and at rest",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: "Auto-Expiry",
    description: "Files automatically delete after your chosen time",
    icon: <Clock className="h-6 w-6 text-primary" />,
  },
  {
    title: "Private Access",
    description: "Share files using secure, one-time access keys",
    icon: <Lock className="h-6 w-6 text-primary" />,
  },
];