import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  blobName: {
    type: String,
    required: true,
    unique: true,
  },
  containerName: {
    type: String,
    required: true,
  },
  sasToken: {
    type: String,
    required: true,
  },
  secretKey: {
    type: String,
    required: true,
    unique: true,
  },
  fileUrl: {
    type: String,
    required:true,
    unique:true
  },
  expiryTime: {
    type: Date,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.File || mongoose.model('File', FileSchema);