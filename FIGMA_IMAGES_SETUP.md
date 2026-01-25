# How to Use Your Actual Figma Images in Production

## ✅ Quick Fix Applied

I've added a Vite plugin to your `vite.config.ts` that resolves `figma:asset` imports during builds. This fixes the Vercel deployment error **without changing your code**.

### What the Plugin Does:
- Intercepts `figma:asset/` imports during build
- Provides a transparent placeholder so the build succeeds
- Your original `figma:asset` imports remain unchanged in your code

## 🚀 Deploy Now (Works Immediately)

Your app will now build and deploy successfully:

```bash
npm run build  # Should succeed now
git push       # Deploy to Vercel
```

The app will work, but images using `figma:asset` will show as transparent/missing.

## 📸 To Show Your Actual Images in Production

You have 3 options:

---

### **Option 1: Export Images to `/public/images/` (Recommended)**

#### Step 1: Export from Figma
1. Open your Figma file
2. Select the image/frame you want to export
3. Right panel → Export → PNG (or JPG for photos)
4. Export at 2x or 3x for retina displays

#### Step 2: Add to Project
Create `/public/images/` folder and add your images:
```
/public/
  /images/
    hero-welcome.png
    logo-plan-built.png
    doughnut-3d.png
```

#### Step 3: Update Import (One-time change)
In your component, replace the figma:asset import:

**Before:**
```typescript
import heroImage from "figma:asset/900c01723b11c15f5044d4a3e9bde07381387f3a.png";
```

**After:**
```typescript
const heroImage = "/survey/images/hero-welcome.png";
```

> **Note:** Use `/survey/` prefix because of your `base: '/survey/'` in vite.config.ts

#### Files to Update:
1. **WelcomeScreen.tsx** - Line 3
2. **PlanBuiltScreen.tsx** - Line 4  
3. **WeeklyFeedbackScreen.tsx** - Line 4

---

### **Option 2: Use ImageWithFallback Component**

This component already exists in your project and gracefully handles missing images.

**Before:**
```typescript
import heroImage from "figma:asset/900c01723b11c15f5044d4a3e9bde07381387f3a.png";

<img src={heroImage} alt="Hero" />
```

**After:**
```typescript
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import heroImage from "figma:asset/900c01723b11c15f5044d4a3e9bde07381387f3a.png";

<ImageWithFallback src={heroImage} alt="Hero" />
```

The `ImageWithFallback` component shows a placeholder if the image fails to load, providing a better UX.

---

### **Option 3: Upload to CDN (Best for Production)**

For optimal performance, host images on a CDN:

#### Popular CDN Options:
- **Cloudflare Images** (Free tier available)
- **Vercel Blob Storage** (Built-in with Vercel)
- **AWS S3 + CloudFront**
- **Imgix**

#### Process:
1. Export images from Figma (2x or 3x resolution)
2. Upload to your CDN
3. Get the CDN URLs
4. Update imports:

```typescript
const heroImage = "https://your-cdn.com/images/hero-welcome.png";
```

---

## 🎯 Recommended Approach

**For your quiz app at sugar.no/survey:**

1. **Now:** Deploy with the Vite plugin (builds will succeed)
2. **Next:** Export your 3 images from Figma:
   - Welcome screen hero image
   - Plan Built screen logo
   - Weekly Feedback screen doughnut 3D

3. **Then:** Place in `/public/images/` and update 3 lines of code

---

## 📝 Current Files Using figma:asset

### Active Components (Need images):
1. **`/src/app/components/WelcomeScreen.tsx`**
   - Import: `figma:asset/900c01723b11c15f5044d4a3e9bde07381387f3a.png`
   - Usage: Hero image at top of welcome screen
   - Recommended size: 800x600px @ 2x (1600x1200)

2. **`/src/app/components/PlanBuiltScreen.tsx`**
   - Import: `figma:asset/165b9628374c2afe18a87818797525922cc22a7b.png`
   - Usage: Logo/branding
   - Recommended size: 200x200px @ 2x (400x400)

3. **`/src/app/components/WeeklyFeedbackScreen.tsx`**
   - Import: `figma:asset/05b032611d53a344beb07d44c76066a4c74f4bf5.png`
   - Usage: 3D doughnut illustration
   - Recommended size: 400x400px @ 2x (800x800)

### Inactive Files (No changes needed):
These files have `figma:asset` imports but aren't used in your app:
- `/src/imports/FirstScreen.tsx`
- `/src/imports/List.tsx`
- `/src/imports/Progress.tsx`
- Other files in `/src/imports/`

---

## 🔧 Example: Complete Update for WelcomeScreen

### Step 1: Export from Figma
- Find your welcome screen hero image in Figma
- Export as PNG at 2x resolution
- Save as `hero-welcome.png`

### Step 2: Add to Project
```bash
mkdir -p public/images
# Copy hero-welcome.png to public/images/
```

### Step 3: Update WelcomeScreen.tsx

**Change line 3 from:**
```typescript
import heroImage from "figma:asset/900c01723b11c15f5044d4a3e9bde07381387f3a.png";
```

**To:**
```typescript
const heroImage = "/survey/images/hero-welcome.png";
```

That's it! The rest of your code stays the same.

---

## ✨ Benefits of This Approach

1. **Your code imports stay clean** - No random image URLs in your components
2. **Easy to update** - Just replace files in `/public/images/`
3. **Fast loading** - Images served directly from your domain
4. **Works offline** - Images are part of your build
5. **Version controlled** - Images in your git repo (optional)

---

## 🚀 Quick Start

```bash
# 1. Test the build (should work now with the plugin)
npm run build
npm run preview

# 2. Deploy to Vercel
git add vite.config.ts
git commit -m "Add figma:asset resolver plugin"
git push

# 3. Export your images from Figma (when ready)
# 4. Add to /public/images/
# 5. Update 3 import lines
# 6. Commit and push again
```

Your app will work immediately with the plugin. Add real images when you have time!
