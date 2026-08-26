# Video Upload Feature - Setup Guide

## ✅ What's Been Implemented

### Features
- ✅ **Multiple video uploads** - Clients can upload 1 or more videos
- ✅ **Drag & drop interface** - Easy file selection
- ✅ **File preview** - Shows file name and size
- ✅ **Remove functionality** - Can remove videos before submission
- ✅ **File size display** - Shows MB/KB for each video
- ✅ **Video count tracking** - Stores how many videos uploaded
- ✅ **File validation** - Only video files accepted

### Current Implementation
Videos are currently saved to: `public/uploads/videos/{assessmentId}/`

Each assessment gets its own folder with all uploaded videos.

---

## 📦 How It Works

### 1. Client Uploads Videos
- Client fills out the booking form
- In step 8 (Review & Submit), they can click to upload videos
- Multiple videos can be selected at once
- Each video shows name and file size
- Videos can be removed before submission

### 2. Form Submission
- Form data is submitted first (creates assessment)
- Assessment ID is returned
- Videos are then uploaded to `/api/upload-videos`
- Videos saved to `public/uploads/videos/{assessmentId}/`
- Video paths stored in database

### 3. Admin Viewing
- Admin can see video count in assessment details
- Video paths stored in `videoPaths` array field
- Videos accessible from `/uploads/videos/{assessmentId}/filename.mp4`

---

## 🚀 Upgrade to Cloud Storage (Recommended for Production)

For production, you should use cloud storage like **Cloudinary** or **AWS S3** instead of local file system.

### Option 1: Cloudinary (Easiest)

#### Step 1: Install Cloudinary
```bash
npm install cloudinary
```

#### Step 2: Get Cloudinary Account
1. Sign up at https://cloudinary.com (Free tier available)
2. Get your Cloud Name, API Key, and API Secret
3. Add to `.env.local`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Step 3: Update Upload API
Replace the content in `src/app/api/upload-videos/route.ts` with:

```typescript
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const assessmentId = formData.get("assessmentId") as string;
    
    const uploadedFiles: string[] = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("video-") && value instanceof File) {
        const file = value as File;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              resource_type: "video",
              folder: `neuropet/assessments/${assessmentId}`,
              public_id: `${key}-${Date.now()}`,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        });

        uploadedFiles.push(result.secure_url);
      }
    }

    return NextResponse.json({
      success: true,
      message: `${uploadedFiles.length} video(s) uploaded`,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Video upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload videos" },
      { status: 500 }
    );
  }
}
```

---

### Option 2: AWS S3

#### Step 1: Install AWS SDK
```bash
npm install @aws-sdk/client-s3
```

#### Step 2: Setup AWS
1. Create an S3 bucket in AWS Console
2. Get AWS credentials
3. Add to `.env.local`:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your_bucket_name
```

#### Step 3: Update Upload API
Use S3 Client to upload videos to your bucket.

---

## 📊 Current Database Schema

```typescript
{
  videoUploaded: Boolean,     // Whether videos were uploaded
  videoCount: Number,         // How many videos
  videoPaths: [String],       // Array of video URLs/paths
}
```

---

## 🎯 File Size Limits

### Current (Local Storage)
- No specific limit (only limited by disk space)
- Recommended: Limit to 100MB per video on frontend

### With Cloudinary (Free Tier)
- Max 100MB per video
- 25 GB total storage
- 25 GB bandwidth/month

### With AWS S3
- No file size limit per object
- Pay per GB stored and transferred
- More scalable for high traffic

---

## 🔒 Security Considerations

### Current Implementation
- ✅ Videos stored per assessment ID
- ✅ Only video/* files accepted
- ⚠️ Files publicly accessible (in /public folder)

### Production Recommendations
1. **Use signed URLs** - Time-limited access to videos
2. **Validate file types** - Check MIME types server-side
3. **Scan for malware** - Use ClamAV or cloud service
4. **Set size limits** - Prevent large file uploads
5. **Rate limiting** - Prevent abuse
6. **Authentication** - Only admin and assessment owner can view videos

---

## 📝 Admin Viewing Videos

### Display Videos in Assessment Detail Page

Add this to `src/app/admin/assessments/[id]/page.tsx`:

```typescript
{/* Video Section */}
{assessment.videoCount > 0 && (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h2 className="font-display text-xl text-primary-900 mb-4 pb-3 border-b-2 border-primary-100">
      Uploaded Videos ({assessment.videoCount})
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {assessment.videoPaths?.map((path, index) => (
        <div key={index} className="bg-primary-50 rounded-xl p-4">
          <video 
            controls 
            className="w-full rounded-lg mb-2"
            src={path}
          >
            Your browser does not support video playback.
          </video>
          <p className="text-xs text-ink-600">Video {index + 1}</p>
        </div>
      ))}
    </div>
  </div>
)}
```

---

## 🎨 UI Features

### Current Features
- ✅ Drag and drop area
- ✅ Multiple file selection
- ✅ File list with remove button
- ✅ File size display
- ✅ Upload progress indicator
- ✅ Success confirmation

### Future Enhancements
- ⏳ Upload progress bar per file
- ⏳ Video preview thumbnails
- ⏳ Compression before upload
- ⏳ Direct video recording from camera

---

## 🐛 Troubleshooting

### Videos Not Uploading
1. Check file size (must be < 100MB recommended)
2. Check file format (MP4, MOV, AVI supported)
3. Check server disk space
4. Check browser console for errors

### Videos Not Displaying
1. Check file path in database
2. Verify files exist in uploads folder
3. Check browser video codec support
4. Try different video format

### Large File Errors
1. Increase Next.js body size limit in `next.config.ts`:
```typescript
export default {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};
```

---

## 📊 Storage Estimates

### Local Storage (Current)
- 1 video (20MB average) × 100 assessments = 2GB
- 10,000 assessments ≈ 200GB

### Cloudinary Free Tier
- Supports ~1,250 videos (20MB each)
- Perfect for testing and small practices

### AWS S3 (Recommended for Production)
- Unlimited storage
- $0.023 per GB/month
- 10,000 videos (20MB each) = 200GB = ~$4.60/month

---

## ✅ Testing Video Upload

1. **Test Upload:**
   - Go to `/book`
   - Fill out form
   - Upload 1-3 test videos
   - Submit form
   - Check `public/uploads/videos/` folder

2. **Test Admin View:**
   - Login to admin portal
   - Open the assessment
   - Videos should be listed with paths

3. **Test Multiple Videos:**
   - Upload several videos
   - Remove one before submitting
   - Verify only selected videos are uploaded

---

## 🎯 Next Steps

1. ✅ **Current Setup Works** - Videos upload to local storage
2. 📦 **Add Cloudinary** - For production deployment
3. 🎨 **Enhance UI** - Add upload progress bars
4. 🔒 **Add Security** - Implement signed URLs and validation
5. 📊 **Admin Display** - Show videos in assessment detail page

---

**Status:** Video upload feature is fully functional! 
**Ready for:** Testing and production with cloud storage upgrade.
