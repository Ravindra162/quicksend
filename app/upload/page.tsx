"use client";

import { FileUpload } from '@/components/FileUpload';

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Upload File</h1>
        <FileUpload />
      </div>
    </div>
  );
}