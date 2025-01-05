"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Clock, 
  Lock, 
  Upload, 
  Download, 
  Trash2,
  FileText,
  Share2,
  Key
} from "lucide-react";

export function Features() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need for Secure File Sharing
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform provides all the essential features for secure and efficient file sharing,
            with automatic cleanup and expiry management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Drag & Drop Upload",
    description: "Simply drag your files into the upload area or click to select them from your device.",
    icon: <Upload className="h-6 w-6 text-primary" />,
  },
  {
    title: "Secure Downloads",
    description: "Files are accessed through secure, time-limited links that expire automatically.",
    icon: <Download className="h-6 w-6 text-primary" />,
  },
  {
    title: "Auto Cleanup",
    description: "Expired files are automatically removed from our servers to maintain security.",
    icon: <Trash2 className="h-6 w-6 text-primary" />,
  },
  {
    title: "File Preview",
    description: "Preview supported file types directly in your browser before downloading.",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: "Easy Sharing",
    description: "Share files using a simple secret key that can be sent via any messaging platform.",
    icon: <Share2 className="h-6 w-6 text-primary" />,
  },
  {
    title: "Access Control",
    description: "Control who can access your files with secure secret keys and expiry times.",
    icon: <Key className="h-6 w-6 text-primary" />,
  },
];