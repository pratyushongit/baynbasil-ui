# Bay'n Basil - Pure Flavour. Modern Craft.

Artisanal spice blends website built with modern web technologies.

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd baynbasil-ui

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies

This project is built with:

- **Next.js** - React framework with SSR and App Router
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Beautifully designed components
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **CSS Modules** - Component-scoped styling
- **Lucide Icons** - Icon library
- **React Query** - Data fetching and caching

## Development

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
baynbasil-ui/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── not-found.tsx        # 404 page
│   ├── globals.css          # Global styles
│   └── providers.tsx        # Client-side providers
├── src/
│   ├── components/          # React components
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── OurStory/
│   │   ├── ProductShowcase/
│   │   ├── WhyUs/
│   │   ├── Footer/
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── assets/             # Images and static assets
├── public/                 # Public static files
└── next.config.mjs        # Next.js configuration
```

## Features

- 🎨 Beautiful pastel color palette inspired by Bay 'n Basil branding
- ✨ Smooth animations and transitions with Framer Motion
- 📱 Fully responsive design
- ♿ Accessible components from Radix UI
- 🎯 Type-safe with TypeScript
- 🚀 Optimized performance with Next.js
- 🎭 CSS Modules for scoped styling
