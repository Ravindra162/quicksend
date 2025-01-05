import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import FileModel from '@/lib/models/file';
import { deleteBlob } from '@/lib/azure-storage';

export async function POST(request: Request) {
  try {
    await connectDB();

    const expiredFiles = await FileModel.find({
      expiryTime: { $lt: new Date() }
    });

    for (const file of expiredFiles) {
      await deleteBlob(file.blobName);
      await FileModel.deleteOne({ _id: file._id });
    }

    return NextResponse.json({
      message: `Cleaned up ${expiredFiles.length} expired files`
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: 'Failed to clean up expired files' },
      { status: 500 }
    );
  }
}