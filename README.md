# NeuroPet — Pet Behaviour Consultation Website

Professional pet behaviour consultation website built with **Next.js 15**, **MongoDB**, **Tailwind CSS**, and **Framer Motion**.

Design follows the [Pet X Vet Figma template](https://www.figma.com/design/P7utzbKWevSdPG5zqR95Bi/Pet-X---Vet-Figma-Template--Preview-?node-id=11501-404) and [United Pets theme](http://preview.themeforest.net/item/united-pets-veterinary-wordpress-theme/full_screen_preview/23944969) — warm teal/terracotta palette, Fraunces + Inter typography, rounded cards, and subtle scroll animations.

See `DESIGN-SYSTEM.md` for the full design specification.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and set:

```
MONGODB_URI=mongodb://localhost:27017/neuropet
ADMIN_PASSWORD=your-secure-password
```

### 3. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin

Visit `/admin/login` with your `ADMIN_PASSWORD` to manage appointments and messages.
