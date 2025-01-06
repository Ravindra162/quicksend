# 🔒 Secure File Share

A secure, user-friendly file sharing platform built with Next.js 13, TypeScript, and Azure Blob Storage. Share files securely with automatic expiry and no registration required.

## 🌟 Features

- **Drag & Drop Upload**: Easy file uploading with progress tracking
- **Secure File Storage**: End-to-end encryption using Azure Blob Storage
- **Automatic File Expiry**: Files automatically delete after a set time
- **No Registration Required**: Share files instantly with secure access keys
- **Automated Cleanup**: Cron jobs ensure expired files are removed
- **Responsive Design**: Works seamlessly on all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 13, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Storage**: Azure Blob Storage
- **File Management**: Cron Jobs for automated cleanup

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- MongoDB instance
- Azure Storage Account
- npm or yarn package manager

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with:

```bash
MONGODB_URI=your_mongodb_connection_string
AZURE_STORAGE_CONNECTION_STRING=your_azure_storage_connection_string
ACCOUNT_NAME=your_azure_account_name
CONTAINER_NAME=your_container_name
AZURE_KEY=your_azure_key
```

## 🛠️ Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/secure-file-share.git
    cd secure-file-share
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```plaintext
secure-file-share/
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   ├── upload/           # Upload page
│   └── download/         # Download page
├── components/            # React components
├── lib/                   # Utility functions and configurations
│   ├── models/           # MongoDB models
│   └── utils/            # Helper functions
└── public/               # Static assets
```

## 🔑 Usage

1. **Uploading Files**:

    - Navigate to the upload page
    - Drag & drop your file or click to select
    - Set expiry time
    - Receive a secure access key

2. **Downloading Files**:

    - Navigate to the download page
    - Enter the access key
    - Download your file securely

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your_feature`)
3. Commit your changes (`git commit -m 'Add some your_feature'`)
4. Push to the branch (`git push origin feature/your_feature`)
5. Open a Pull Request


