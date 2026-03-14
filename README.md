# Hardal OG Image Asset Studio

A high-performance automated system for generating branded Open Graph (OG) images in bulk. Built for Case Study #5 to streamline the creation of social sharing assets for the Hardal blog ecosystem.

## 🚀 Live Demo
- **URL:** [https://hardal-og-production.vercel.app/](https://hardal-og-production.vercel.app/)
- **API Endpoint:** `/api/og`

## ✨ Features
- **Bulk CSV Processing:** Upload a CSV and preview 1,000+ assets instantly.
- **Hardal Branding:** Automated color cycling (gradients), category badges, and logo integration.
- **ZIP Export:** Client-side bundling using `JSZip` to download all assets in a single click.
- **Dynamic API:** RESTful endpoint for programmatic image generation.

## 🛠 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Image Generation:** `@vercel/og` (Satori engine)
- **Deployment:** Vercel (Edge Runtime)
- **Libraries:** `jszip` for bulk bundling.

## 🔌 API Integration Guide
Developers can generate images on the fly by passing parameters to the `/api/og` endpoint.

**Base URL:** `https://hardal-og-production.vercel.app/api/og`

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `title` | string | The headline of the blog post |
| `category` | string | The badge text (e.g., Developer Guide) |
| `author` | string | The name of the author |
| `i` | number | (Optional) Index to cycle background gradients |

**Example Request:**
`https://hardal-og-production.vercel.app/api/og?title=How%20to%20Scale%20Data&category=Engineering&author=Hardal%20Team&i=2`

## 📦 Local Setup
1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. Place your logo in `/public/hardal-logo.png`