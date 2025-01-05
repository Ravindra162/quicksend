"use client";

import { motion } from "framer-motion";
import { Upload, Key, Download } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sharing files securely is as easy as 1-2-3. No registration required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Upload File",
    description: "Drop your file and set an expiry time. We'll handle the encryption.",
    icon: <Upload className="h-8 w-8 text-primary" />,
  },
  {
    title: "Get Secret Key",
    description: "Receive a unique secret key to share with your recipient.",
    icon: <Key className="h-8 w-8 text-primary" />,
  },
  {
    title: "Download Securely",
    description: "Recipients use the key to securely download the file.",
    icon: <Download className="h-8 w-8 text-primary" />,
  },
];