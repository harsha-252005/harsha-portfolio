# Modern Portfolio Website - Next.js + Tailwind CSS

A professional, responsive portfolio website built with Next.js and Tailwind CSS.

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📝 Customization Guide

### 1. Personal Information

**File: `app/components/Hero.js`**
- Line 8: Replace "YN" with your initials
- Line 12: Replace "Your Name" with your actual name
- Line 16: Replace "Full Stack Developer" with your role
- Line 20-22: Update your bio/introduction
- Lines 34-46: Update social media links

**File: `app/layout.js`**
- Line 7: Update page title
- Line 8: Update meta description

### 2. Profile Image

**Option A: Use your photo**
Replace lines 7-9 in `app/components/Hero.js` with:
```jsx
<img 
  src="/profile.jpg" 
  alt="Your Name" 
  className="w-32 h-32 mx-auto mb-8 rounded-full object-cover"
/>
```
Then add your photo as `public/profile.jpg`

**Option B: Keep initials**
Update line 8 with your initials

### 3. About Section

**File: `app/components/About.js`**
- Lines 11-14: Update education details
- Lines 18-30: Update achievements
- Lines 36-48: Update bio paragraphs

### 4. Projects

**File: `app/components/Projects.js`**
- Lines 1-38: Update the projects array with your actual projects
- For each project, update:
  - `title`: Project name
  - `description`: Brief description
  - `tech`: Array of technologies used
  - `image`: Project screenshot URL
  - `github`: GitHub repository link
  - `demo`: Live demo link

**Add project images:**
1. Add images to `public/projects/` folder
2. Update image path: `image: '/projects/project1.png'`

### 5. Skills

**File: `app/components/Skills.js`**
- Lines 1-7: Update skills by category
- Add/remove categories as needed
- Add/remove individual skills

### 6. Contact Information

**File: `app/components/Contact.js`**
- Line 18: Update email address
- Line 28: Update LinkedIn URL
- Line 38: Update GitHub URL
- Line 45: Update email link

### 7. Colors & Branding

**File: `tailwind.config.js`**
```js
colors: {
  primary: '#3b82f6',    // Change to your brand color
  secondary: '#8b5cf6',  // Change to your secondary color
}
```

**File: `app/components/Header.js`**
- Line 11: Update logo/initials

### 8. Footer

**File: `app/components/Footer.js`**
- Line 6: Update your name in copyright

## 📁 Project Structure

```
Portfolio/
├── app/
│   ├── components/
│   │   ├── Header.js      # Navigation bar
│   │   ├── Hero.js        # Hero section with intro
│   │   ├── About.js       # About section
│   │   ├── Projects.js    # Projects showcase
│   │   ├── Skills.js      # Skills & technologies
│   │   ├── Contact.js     # Contact information
│   │   └── Footer.js      # Footer
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Main page
├── public/                # Static files (images, etc.)
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
```

## 🌐 Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

Your site will be live at `https://your-project.vercel.app`

## 📱 Features

✅ Fully responsive design
✅ Smooth scroll navigation
✅ Modern animations
✅ SEO optimized
✅ Fast performance
✅ Easy to customize
✅ Mobile-friendly menu

## 🛠️ Technologies Used

- **Next.js 14** - React framework
- **Tailwind CSS** - Utility-first CSS
- **React** - UI library

## 📄 License

Free to use for personal projects.

---

**Need help?** Check the customization guide above or refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
