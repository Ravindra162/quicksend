import { NextRequest, NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import FileModel from "@/lib/models/file"; // adjust path as needed
import connectDB from "@/lib/db";

// Azure configuration
const accountName = process.env.ACCOUNT_NAME;
const containerName = process.env.CONTAINER_NAME;
const azureSAS = process.env.AZURE_SAS;

if (!accountName || !containerName || !azureSAS) {
  throw new Error("Azure Blob Storage configuration is missing!");
}

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net/?${azureSAS}`
);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Function to generate and verify unique 6-character secret
async function generateUniqueSecret(): Promise<string> {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const length = 6;
  
  while (true) {
    let secret = '';
    for (let i = 0; i < length; i++) {
      secret += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Check if this secret already exists in the database
    const existingFile = await FileModel.findOne({ secretKey: secret });
    
    // If no existing file found with this secret, return it
    if (!existingFile) {
      return secret;
    }
    // If secret exists, loop will continue and generate a new one
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const expiryHours = formData.get("expiryHours") as string;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate unique secret
    const secretKey = await generateUniqueSecret();

    // Generate unique blob name using the secret
    const blobName = `${secretKey}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Set upload options
    const options = {
      blobHTTPHeaders: {
        blobContentType: file.type,
      },
    };

    // Upload to Azure
    await blockBlobClient.uploadData(buffer, options);

    // Calculate expiry date
    const expiryTime = new Date(Date.now() + parseInt(expiryHours) * 60 * 1000);

    // Create file record in MongoDB
    const fileRecord = await FileModel.create({
      fileName: file.name,
      blobName: blobName,
      containerName: containerName,
      fileUrl: blockBlobClient.url,
      sasToken: azureSAS,
      secretKey: secretKey,
      expiryTime: expiryTime
      // uploadedAt will be set automatically by the schema default
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      secretKey: secretKey
    });

  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file", details: error.message },
      { status: 500 }
    );
  }
}