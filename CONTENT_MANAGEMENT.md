# Client Content Management Guide

## Overview
Your website has two types of content:
1. **Dynamic Content** - Managed through WooCommerce (products, categories, orders)
2. **Static Content** - Homepage banners and images (requires file upload)

---

## 📦 Managing Products (Easy - No Technical Skills Needed)

### Adding New Products
1. Login to WordPress Admin: `yourdomain.com/wp-admin`
2. Navigate to: **Products → Add New**
3. Fill in product details:
   - Product name
   - Description
   - Price
   - Categories
   - Upload images (drag & drop)
4. Click **Publish**

**These automatically appear on your website:**
- Shop page
- Category pages  
- Featured Products section (if marked as featured)
- New in Store section (shows latest products)

---

## 🖼️ Managing Homepage Banner Images

### Current Banner Sections Needing Images:
1. **Summer Deals** banner
2. **New in Store** banner
3. **New Bags** banner
4. **Hot Deals** banner

### Upload Method (Choose One):

#### **Option A: Bluehost File Manager** (Recommended)
1. Login to Bluehost
2. Go to: Advanced → File Manager
3. Navigate to: `public_html/public/images/banners/`
4. Click Upload
5. Upload these 4 images:
   - `summer-deals.jpg`
   - `new-in-store.jpg`
   - `new-bags.jpg`
   - `hot-deals.jpg`

#### **Option B: FTP (FileZilla)**
1. Install FileZilla (free)
2. Connect using FTP credentials
3. Upload to: `/public/images/banners/`

### Image Requirements:
- **Size:** 500x600 pixels (portrait)
- **Format:** JPG or PNG
- **File size:** Under 500KB
- **Quality:** High resolution, compressed

**✅ Tip:** Compress images at https://tinypng.com/ before uploading

---

## 🔄 Changing Banner Text/Labels

If you want to change the banner titles (e.g., "Summer Deals" → "Winter Sale"), you'll need developer help as these are in the code.

**What you CAN change:** The images
**What needs developer:** Text, colors, number of banners

---

## 🎨 Logo Updates

Your current logo: `/public/forvipwomen-logo.png`

To change:
1. Upload new logo to `/public/` folder
2. Name it exactly: `forvipwomen-logo.png` (or ask developer to update code)
3. Recommended: 200x50px, transparent background PNG

---

## 📱 Best Practices

### Image Optimization
- Always compress images before uploading
- Use appropriate dimensions (don't upload 5000x5000px images!)
- JPG for photos, PNG for graphics/logos

### File Naming
- Use lowercase
- Use hyphens instead of spaces
- Be descriptive: `summer-collection-banner.jpg` ✅
- Avoid: `IMG_1234.jpg` ❌

### Backup Strategy
- Keep original files on your computer
- Before replacing images, download the old ones first
- Test changes in a browser incognito window

---

## 🚀 For Developers/Advanced Users

### Image Directory Structure
```
/public
  /images
    /banners          # Homepage horizontal scroll banners
    /hero             # Hero section images (future use)
    /products         # Additional product images
  /forvipwomen-logo.png  # Site logo
```

### Component Locations
- Banner images: `components/HorizontalScrollGallery.tsx`
- Logo: `components/Header.tsx`
- Products: Fetched from WooCommerce API

### Adding More Banner Slides
Edit `/components/HorizontalScrollGallery.tsx` and add to the `items` array:

```typescript
{
  id: 5,
  color: "#E5E4E2",
  label: "New Collection",
  subtitle: "Spring 2026",
  image: "/images/banners/spring-collection.jpg",
  icon: Sparkles,
}
```

---

## ❓ Common Questions

**Q: Why don't my new products show on homepage?**
A: Make sure to mark them as "Featured" in WooCommerce

**Q: Banner image not showing?**
A: Check file name matches exactly (case-sensitive), and file is in `/public/images/banners/`

**Q: How do I change category dropdown items?**
A: Contact developer - these are hardcoded for now

**Q: Can I add more than 4 banners?**
A: Yes, but requires developer to add to the code

---

## 📞 Need Technical Help?

For code changes, contact your developer for:
- Adding/removing banner sections
- Changing text/titles
- Modifying colors/styles
- Adding new features
- Integration issues

For simple image updates: Follow this guide! 👆
