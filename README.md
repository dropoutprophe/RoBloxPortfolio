## this is a complete guide on how to setup and customize the site

A modern, creative, and well-optimized portfolio website for showcasing Roblox development projects.

## Features

- 🚀 **Built with React + Vite** - Fast development and optimized builds
- 🎨 **Modern UI** - Beautiful gradient backgrounds, glassmorphism effects, and smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Performance Optimized** - Code splitting, lazy loading, and optimized images
- 🎬 **Media Support** - Showcase images and videos for each project
- 🎯 **Interactive Carousels** - Smooth carousel navigation for project media
- ✨ **Framer Motion** - Smooth animations and transitions throughout

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Adding Your Content

### Projects

Edit `src/App.tsx` to add or modify projects. Each project has:

- `title` - Project name
- `description` - Project description
- `note` - Optional note (e.g., "In Development")
- `media` - Array of images/videos
- `tags` - Array of tags
- `featured` - Boolean to use carousel (true) or card (false)

### Images and Videos

You can use **external URLs** or **local files**:

#### External URLs (Recommended)
Simply paste the full URL to your image or video:
```typescript
media: [
  { type: 'image', src: 'https://example.com/screenshot.jpg', alt: 'Game Screenshot' },
  { type: 'video', src: 'https://example.com/gameplay.mp4', alt: 'Gameplay Video' },
  { type: 'image', src: 'https://i.imgur.com/abc123.jpg', alt: 'Another Screenshot' },
]
```

#### YouTube Videos
You can embed YouTube videos directly! Just paste the YouTube URL:
```typescript
media: [
  { type: 'video', src: 'https://www.youtube.com/watch?v=pF--uQ3XQYc', alt: 'Gameplay Video' },
  { type: 'video', src: 'https://youtu.be/pF--uQ3XQYc', alt: 'Another Video' },
]
```
The portfolio will automatically detect YouTube URLs and embed them properly. Both `youtube.com/watch?v=` and `youtu.be/` formats are supported.

#### Local Files
1. Create a `public` folder in the root directory
2. Add your images and videos there
3. Update the `media` array with paths starting with `/`:
```typescript
media: [
  { type: 'image', src: '/screenshots/game1.jpg', alt: 'Game Screenshot' },
  { type: 'video', src: '/videos/gameplay.mp4', alt: 'Gameplay Video' },
]
```

**Note:** Empty strings (`''`) will be automatically filtered out and show a placeholder message.

### Contact Information

Update the contact links in:
- `src/components/Hero.tsx` - Email and social links
- `src/components/Footer.tsx` - Footer social links

## Customization

### Colors

Edit `src/index.css` to customize the color scheme. The portfolio uses CSS variables for easy theming.

### Styling

The project uses Tailwind CSS. Modify component files to adjust styling.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Performance Optimizations

- ✅ Code splitting with React.lazy
- ✅ Lazy loading for images and videos
- ✅ Optimized bundle size
- ✅ Smooth animations with Framer Motion
- ✅ Responsive images

## License

MIT

# Roblox-Portfolio-OVO
