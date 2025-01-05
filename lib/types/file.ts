export interface FileUploadOptions {
  contentType?: string;
  maxSize?: number;
  allowedTypes?: string[];
}

export interface UploadResponse {
  url: string;
  blobName: string;
}