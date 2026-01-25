# Exact Images to Export from Figma

You only need to export **3 images** from your Figma file to complete the production setup.

---

## 1️⃣ Welcome Screen Hero Image

**File:** `/src/app/components/WelcomeScreen.tsx` (line 3)

**Current Import:**
```typescript
import heroImage from "figma:asset/900c01723b11c15f5044d4a3e9bde07381387f3a.png";
```

**What it is:**
- The main hero image shown on your welcome screen
- Shows before/after transformation with testimonial
- Currently displays: "Before and after transformation with testimonial"

**How to export from Figma:**
1. Find the frame/image used in your WelcomeScreen design
2. Select it in Figma
3. Export as PNG @ 2x resolution
4. Recommended size: 800px wide (will export as 1600px @ 2x)

**Save as:** `hero-welcome.png`

**Update code to:**
```typescript
const heroImage = "/survey/images/hero-welcome.png";
```

---

## 2️⃣ Plan Built Screen Logo

**File:** `/src/app/components/PlanBuiltScreen.tsx` (line 4)

**Current Import:**
```typescript
import logoImage from 'figma:asset/165b9628374c2afe18a87818797525922cc22a7b.png';
```

**What it is:**
- Logo or branding image shown on the "Plan Built" screen
- Appears after analysis is complete

**How to export from Figma:**
1. Find the logo/brand image in your PlanBuiltScreen design
2. Select it in Figma
3. Export as PNG @ 2x resolution (with transparency if needed)
4. Recommended size: 200px × 200px (will export as 400px @ 2x)

**Save as:** `logo-plan-built.png`

**Update code to:**
```typescript
const logoImage = "/survey/images/logo-plan-built.png";
```

---

## 3️⃣ Doughnut 3D Illustration

**File:** `/src/app/components/WeeklyFeedbackScreen.tsx` (line 4)

**Current Import:**
```typescript
import imgDoughnut3D from "figma:asset/05b032611d53a344beb07d44c76066a4c74f4bf5.png";
```

**What it is:**
- 3D doughnut illustration shown in the "Weekly Impact" card
- Visual representation of sugar/carb intake
- Size: 58px × 58px in the UI

**How to export from Figma:**
1. Find the 3D doughnut illustration in your design
2. Select it in Figma
3. Export as PNG @ 2x or 3x resolution (for crisp display)
4. Recommended size: 58px (will export as 116px or 174px)

**Save as:** `doughnut-3d.png`

**Update code to:**
```typescript
const imgDoughnut3D = "/survey/images/doughnut-3d.png";
```

---

## 📂 Project Structure

After exporting, your project should look like this:

```
/public/
  /images/
    hero-welcome.png       (1600×1200 or similar)
    logo-plan-built.png    (400×400 or similar)
    doughnut-3d.png        (116×116 or similar)
/src/
  /app/
    /components/
      WelcomeScreen.tsx    (update line 3)
      PlanBuiltScreen.tsx  (update line 4)
      WeeklyFeedbackScreen.tsx (update line 4)
```

---

## ✅ Quick Checklist

- [ ] Export hero image from Figma → Save as `hero-welcome.png`
- [ ] Export logo from Figma → Save as `logo-plan-built.png`
- [ ] Export doughnut from Figma → Save as `doughnut-3d.png`
- [ ] Create folder: `mkdir public/images`
- [ ] Copy all 3 images to `public/images/`
- [ ] Update WelcomeScreen.tsx line 3
- [ ] Update PlanBuiltScreen.tsx line 4
- [ ] Update WeeklyFeedbackScreen.tsx line 4
- [ ] Test: `npm run build && npm run preview`
- [ ] Commit and push to Vercel

---

## 🎯 TL;DR

**3 images. 3 lines of code. That's it.**

1. Export 3 images from Figma
2. Put in `/public/images/`
3. Change 3 import lines from `figma:asset/...` to `/survey/images/...`
4. Done!

---

## 💡 Alternative: Use ImageWithFallback (No exports needed)

If you want to deploy NOW without exporting images, just wrap your `<img>` tags:

```typescript
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// Keep the original import (with figma:asset)
<ImageWithFallback src={heroImage} alt="..." />
```

The component will show a placeholder for missing images. You can add real images later.
