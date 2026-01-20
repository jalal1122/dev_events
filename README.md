# 🎉 Dev Events - Your Ultimate Developer Events Hub

<div align="center">

![Dev Events Banner](public/images/banner.png)

**The Hub for Every Dev Event You Can't Miss**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 About The Project

**Dev Events** is a modern, full-stack web application built with Next.js 16 that serves as a centralized platform for discovering and booking developer events including hackathons, meetups, and conferences. The project showcases cutting-edge Next.js features including App Router, Server Actions, and advanced caching strategies.

### ✨ Why Dev Events?

- 🎯 **Centralized Discovery**: Find all developer events in one place
- 🚀 **Lightning Fast**: Leverages Next.js 16's PPR and advanced caching
- 🎨 **Beautiful UI**: Stunning animations with custom light ray effects
- 📱 **Responsive**: Seamless experience across all devices
- 🔒 **Type-Safe**: Built entirely with TypeScript
- 🗄️ **Scalable**: MongoDB Atlas for robust data management

---

## 🎯 Features

### 🌟 Core Functionality

- **Event Discovery**
  - Browse featured developer events
  - Filter by tags, location, and mode (online/offline/hybrid)
  - Similar events recommendation system
- **Event Details**
  - Comprehensive event information
  - Interactive booking interface
  - Real-time availability tracking
  - Detailed agenda and organizer information

- **Event Management**
  - Create new events with rich details
  - Image upload via Cloudinary integration
  - Automatic slug generation
  - Tag-based categorization

### 🎨 UI/UX Features

- **Custom Light Ray Animation**: Dynamic, mouse-following light effects
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Smooth Transitions**: Polished user interactions
- **Modern Typography**: Custom Google Fonts (Schibsted Grotesk & Martian Mono)

### ⚡ Technical Highlights

- **Next.js 16 Features**:
  - `use cache` directive for granular caching
  - `cacheLife` and `cacheTag` for cache control
  - Server Actions for seamless data mutations
  - App Router with nested layouts
- **Performance Optimizations**:
  - Static generation for event pages
  - Database query optimization with lean queries
  - Image optimization with Next.js Image component
  - Automatic code splitting

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: TailwindCSS + PostCSS
- **Fonts**: Google Fonts (Schibsted Grotesk, Martian Mono)
- **UI Components**: Custom React Components

### Backend

- **Runtime**: Node.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **API**: Next.js API Routes + Server Actions

### DevOps & Tools

- **Analytics**: PostHog
- **Media Storage**: Cloudinary
- **Version Control**: Git
- **Linting**: ESLint (v9)
- **Package Manager**: npm/yarn/pnpm

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB Atlas account
- Cloudinary account (for image uploads)

### Step-by-Step Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/dev-events.git
cd dev-events
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Configuration**

Create a `.env` file in the root directory:

```env
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MongoDB Connection
MONGO_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/Dev_Events?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_URL=cloudinary://your_cloudinary_credentials
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
dev-events/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   └── events/          # Event-related endpoints
│   ├── create-event/        # Event creation page
│   ├── events/              # Event listing & details
│   ├── layout.tsx           # Root layout with fonts & theme
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
│
├── Components/              # React Components
│   ├── BookEvent.tsx        # Event booking form
│   ├── CreateEvent.tsx      # Event creation form
│   ├── DetailPage.tsx       # Event details page
│   ├── EventCard.tsx        # Event card component
│   ├── ExploreBtn.tsx       # CTA button
│   ├── Header.jsx           # Navigation header
│   └── LightRays.tsx        # Custom light animation
│
├── database/                # Database Layer
│   ├── event.model.ts       # Event schema & model
│   ├── booking.model.ts     # Booking schema & model
│   └── index.ts             # Database exports
│
├── lib/                     # Utility Functions
│   ├── actions/             # Server Actions
│   ├── constants.ts         # App constants
│   └── mongodb.ts           # MongoDB connection
│
├── public/                  # Static Assets
│   ├── icons/               # SVG icons
│   └── images/              # Event images
│
└── Configuration Files
    ├── next.config.ts       # Next.js configuration
    ├── tsconfig.json        # TypeScript configuration
    ├── tailwind.config.ts   # TailwindCSS configuration
    ├── eslint.config.mjs    # ESLint configuration
    └── postcss.config.mjs   # PostCSS configuration
```

---

## 🎓 Key Learnings & Implementations

### Next.js 16 Advanced Features

1. **Cache Management**

```typescript
"use cache";
cacheLife("hours");
cacheTag("home-page");
```

2. **Server-Side Database Queries**

```typescript
await connectDB();
const events = await Event.find().sort({ date: 1 }).lean();
```

3. **Dynamic Params Handling**

```typescript
const { slug } = await params;
```

### MongoDB Schema Design

- **Automatic Slug Generation**: Pre-save hooks for SEO-friendly URLs
- **Data Validation**: Schema-level validation for data integrity
- **Indexing**: Unique indexes on slug for fast lookups

### Performance Optimizations

- Lean queries for faster data retrieval
- Static generation with fallback handling
- Image optimization with Next.js Image
- Font optimization with next/font

---

## 📸 Screenshots

<div align="center">

### Homepage

![Homepage](public/images/screenshot-home.png)

### Event Details

![Event Details](public/images/screenshot-details.png)

### Create Event

![Create Event](public/images/screenshot-create.png)

</div>

---

## 🔮 Future Enhancements

- [ ] User authentication & authorization
- [ ] Event capacity management
- [ ] Email notifications for bookings
- [ ] Calendar integration (Google Calendar, iCal)
- [ ] Advanced search & filtering
- [ ] Event reviews & ratings
- [ ] Social sharing features
- [ ] Admin dashboard for event management
- [ ] Payment integration for paid events
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [TailwindCSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com) for amazing deployment platform
- The entire Next.js community for continuous inspiration

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Made with ❤️ and Next.js 16**

[Report Bug](https://github.com/yourusername/dev-events/issues) • [Request Feature](https://github.com/yourusername/dev-events/issues)

</div>
