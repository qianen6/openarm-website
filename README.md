# OpenArm — Next-Gen Intelligent Robotics Platform

Marketing website for OpenArm featuring an interactive 3D exploded-view of the
robot arm rendered with Three.js / React Three Fiber.

Built with [Next.js 16](https://nextjs.org), Tailwind CSS v4, GSAP, and
Framer Motion.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build for production

```bash
npm run build
npm run start
```

## Project layout

```
src/
├── app/                  # Next.js App Router (layout + page)
└── components/
    ├── Navbar.tsx
    ├── HeroSection.tsx
    ├── FeaturesSection.tsx
    ├── ProductSection.tsx
    ├── RobotExplode.tsx  # 3D exploded view
    ├── MetricsSection.tsx
    ├── PricingSection.tsx
    ├── CTASection.tsx
    └── Footer.tsx
public/
└── models/
    └── robot-model.glb   # Source GLB exported from STEP CAD assembly
```

## 3D model

The robot model lives at `public/models/robot-model.glb`. Component labels in
`RobotExplode.tsx` are mapped from the GLB's NAUO node IDs to friendly names
(see `PART_BY_NAUO`). To use a new GLB, re-run `inspect-arm.mjs` to discover
the new node IDs and update the mapping.

## Deploy

Optimized for [Vercel](https://vercel.com). Push to `main` and Vercel will
auto-deploy on every commit.
