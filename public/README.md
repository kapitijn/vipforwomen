# Upload Your Logo Here

## 📁 How to Add Your Logo

### Option 1: Upload via VS Code (Easiest)
1. In the file explorer on the left, find the `public` folder
2. Right-click on the `public` folder
3. Click "Upload..."
4. Select your logo file from your computer
5. Recommended filename: `logo.png` or `logo.svg`

### Option 2: Drag & Drop
1. Locate this `public` folder in VS Code file explorer
2. Drag your logo file from your computer
3. Drop it into the `public` folder

### Option 3: Terminal Upload
If you're using GitHub Codespaces, you can:
1. Click the hamburger menu (☰) in top-left
2. Go to "File" → "Upload Files"
3. Upload to the `public` folder

## 📝 Logo File Requirements

**Recommended Formats:**
- **SVG** (best - scales perfectly, smallest file size)
- **PNG** with transparent background
- **WebP** (modern, smaller size)

**Naming Options:**
- `logo.svg` or `logo.png` (main logo)
- `logo-white.svg` (if you want a white version for dark backgrounds)
- `favicon.ico` (browser tab icon)

**Dimensions:**
- **Height:** 40-60px recommended for header
- **Width:** Auto (depends on your logo shape)
- Keep aspect ratio intact

**File Size:**
- Try to keep under 100KB
- Optimize images before uploading using tools like:
  - TinyPNG (https://tinypng.com)
  - SVGOMG (https://jakearchibald.github.io/svgomg/)

## 🎨 After Uploading

Once you upload your logo as `logo.png` or `logo.svg`, it will automatically appear in:
- Website header/navigation
- Favicon (browser tab)
- Mobile menu

The code has been updated to use `/logo.png` by default (change extension if using .svg).

## 📂 Other Files You Can Add Here

The `public` folder is for all static files:
- `logo.png` - Your main logo
- `favicon.ico` - Browser tab icon (16x16 or 32x32)
- `og-image.jpg` - Social media preview image (1200x630)
- `product-placeholder.png` - Default product image
- Any other images you want to access directly

## 🔗 How to Reference Files

Files in `public` are accessed from the root:
```
/logo.png
/favicon.ico
/images/banner.jpg
```

No need to include "public" in the path!
