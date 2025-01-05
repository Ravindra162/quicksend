import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Secure File Share</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Share files securely with automatic expiry. 
              Built with privacy and security in mind.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/upload" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                  Upload
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
          <p>&copy; {new Date().getFullYear()} Secure File Share. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}