import { NextRequest, NextResponse } from "next/server";
import FileModel from "@/lib/models/file";
import connectDB from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { secretKey } = await request.json();

    const fileRecord = await FileModel.findOne({ secretKey });

    if (!fileRecord) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Check if file has expired
    if (new Date() > new Date(fileRecord.expiryTime)) {
      return NextResponse.json(
        { error: "File has expired" },
        { status: 410 }
      );
    }

    const blobUrl = `https://${process.env.ACCOUNT_NAME}.blob.core.windows.net/${fileRecord.containerName}/${fileRecord.blobName}?${fileRecord.sasToken}`;

    try {
      const blobResponse = await fetch(blobUrl);
      
      if (!blobResponse.ok) {
        throw new Error(`Failed to fetch blob: ${blobResponse.statusText}`);
      }

      const responseStream = blobResponse.body;
      if (!responseStream) {
        throw new Error('No readable stream available');
      }

      const headers = new Headers({
        'Content-Type': blobResponse.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Length': blobResponse.headers.get('Content-Length') || '',
        'Content-Disposition': `attachment; filename="${fileRecord.originalName || fileRecord.blobName}"`,
        'Cache-Control': 'no-cache'
      });

      return new Response(responseStream, { headers });

    } catch (error) {
      console.error("Error fetching from Azure:", error);
      return NextResponse.json(
        { error: "Failed to fetch file from storage" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in download API:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}