import { BlobServiceClient } from '@azure/storage-blob';

const accountName = process.env.ACCOUNT_NAME;
const accountKey = process.env.AZURE_KEY;
const containerName : any = process.env.CONTAINER_NAME;

if (!accountName || !accountKey || !containerName) {
  throw new Error('Azure Storage credentials are not properly configured in environment variables');
}

const connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`;

export async function deleteBlob(blobName: string): Promise<void> {
  if (!blobName) {
    throw new Error('Blob name is required');
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    
    await blobClient.delete();
    console.log(`Successfully deleted blob: ${blobName}`);
  } catch (error) {
    console.error(`Error deleting blob ${blobName}:`, error);
    throw error;
  }
}