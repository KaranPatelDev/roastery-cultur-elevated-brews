

# Roastery Cultur – Premium Coffee Website

## Design System
- **Colors**: Espresso Brown (#3B2F2F), Coffee Cream (#F5E6D3), Roasted Bean (#6F4E37), Gold Accent (#C6A969), Matte Black (#121212)
- **Typography**: Playfair Display (headings), Inter (body) via Google Fonts
- **Style**: Dark luxury aesthetic, Apple-level minimalism, smooth scroll animations

## Pages & Routing

### 1. Home Page (`/`)
- **Hero Section**: Full-screen dark background with 3D floating coffee beans (React Three Fiber), headline "Experience Coffee Like Never Before", CTA buttons for Menu & Reserve Table
- **About Preview**: Brief intro with 3D rotating coffee bean model, link to full About page
- **Featured Menu Items**: Highlight 4-6 items with hover animations
- **Reviews Carousel**: Animated testimonial cards with star ratings
- **CTA Banner**: Reserve a table call-to-action

### 2. About Page (`/about`)
- Story of Roastery Cultur: locally sourced beans, artisan roasting, community vibe
- 3D rotating coffee bean model
- Parallax scroll sections with fade-in animations

### 3. Menu Page (`/menu`)
- Tabbed categories: Coffee, Desserts, Meals
- Styled cards with icons, descriptions, prices
- Hover animations and micro-interactions on each card

### 4. Gallery Page (`/gallery`)
- Pinterest-style masonry grid with placeholder images
- Hover zoom effects on each image
- Categories: brewing, latte art, desserts, terrace, interior

### 5. Reservations Page (`/reserve`)
- Beautiful form: Name, Phone, Guests, Date, Time
- Form validation with Zod
- **Supabase backend**: Save reservations to database table
- Success confirmation with animation

### 6. Contact Page (`/contact`)
- Embedded Google Maps with café location
- Address, phone, directions button, call button
- Opening hours

## Shared Components
- **Sticky Navbar**: Dark transparent, logo + nav links, mobile hamburger menu, gold accent highlights
- **Footer**: Social media icons, opening hours, location summary, newsletter signup
- **Smooth scroll** and scroll-triggered fade-in animations throughout
- **Custom cursor hover effects** on interactive elements

## 3D & Animations
- React Three Fiber for floating coffee beans (hero) and rotating bean (about)
- CSS/JS particle steam animation on coffee cup
- Scroll-triggered fade-in/slide-in animations via CSS keyframes
- Hover micro-interactions on menu cards and gallery items

## Backend (Lovable Cloud + Supabase)
- `reservations` table: id, name, phone, guests, date, time, created_at
- RLS policy for insert-only from anonymous/authenticated users

## Responsive Design
- Mobile-first approach, fully responsive across all breakpoints
- Mobile hamburger navigation with slide-in menu

