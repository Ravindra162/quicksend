"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Download, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Create a custom progress component instead of using shadcn/ui Progress
const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
    <div
      className="bg-primary h-2 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

const formSchema = z.object({
  secretKey: z.string().min(1, "Secret key is required"),
});

export default function DownloadPage() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleDownload = async (values: z.infer<typeof formSchema>) => {
    try {
      setDownloading(true);
      setProgress(0);

      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secretKey: values.secretKey }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const contentLength = response.headers.get('content-length');
      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const contentDisposition = response.headers.get('content-disposition');
      const fileName = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || 'downloaded-file';

      if (!reader) {
        throw new Error('No reader available');
      }

      // Read the stream
      const chunks: Uint8Array[] = [];
      let receivedLength = 0;
      const totalLength = Number(contentLength);

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;

        // Calculate progress
        if (totalLength) {
          const percentComplete = (receivedLength / totalLength) * 100;
          setProgress(Math.round(percentComplete));
        }
      }

      // Combine chunks into a single Uint8Array
      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      // Create and download the blob
      const blob = new Blob([chunksAll], { type: contentType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "File downloaded successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download file or file may be expired",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <Key className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Download File</h1>
          <p className="text-muted-foreground">
            Enter your secret key to download the file
          </p>
        </div>

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleDownload)} className="space-y-6">
              <FormField
                control={form.control}
                name="secretKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secret Key</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your secret key" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {downloading && (
                <div className="mb-4">
                  <ProgressBar value={progress} />
                  <p className="text-sm text-center mt-2">{progress}%</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={downloading}
              >
                <Download className="mr-2 h-4 w-4" />
                {downloading ? 'Downloading...' : 'Download File'}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}