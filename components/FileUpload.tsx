"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import axios from "axios"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const formSchema = z.object({
  expiryHours: z.string().transform((val) => parseInt(val, 10)).refine((val) => val > 0 && val <= 168, {
    message: 'Expiry time must be between 1 and 168 hours',
  }),
});

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expiryHours: 24,
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      console.log(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('expiryHours', values.expiryHours.toString());

    try {
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      const response = await axios.post("/api/upload",formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })

      // if (!response.ok) throw new Error('Upload failed');
      console.log(response)
      if(response.data.message==="File uploaded successfully"){
      setSecretKey(response.data.secretKey);
      setShowSuccessDialog(true);}
      else {
        toast({
          title: "Error",
          description: "Failed to upload file. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              {file ? (
                <p className="text-sm font-medium">{file.name}</p>
              ) : (
                <p className="text-muted-foreground">
                  Drag & drop a file here, or click to select
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="expiryHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Time (hours)</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input type="number" min={0} max="5" {...field} />
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!file || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </Button>
          </form>
        </Form>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File Uploaded Successfully</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your file has been uploaded successfully. Share this secret key with the recipient:
            </p>
            <div className="p-4 bg-muted rounded-md">
              <code className="text-sm font-mono break-all">{secretKey}</code>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(secretKey);
                toast({
                  title: "Copied!",
                  description: "Secret key copied to clipboard",
                });
              }}
            >
              Copy Secret Key
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}