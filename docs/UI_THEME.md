# Sports House Randomizer - UI Theme Guide

## 🎨 Color Palette

### Primary Colors
- **Primary**: `#2563EB` (Blue 600) - Main actions, CTAs, primary buttons
- **Primary Dark**: `#1D4ED8` (Blue 700) - Hover states, active states
- **Primary Light**: `#3B82F6` (Blue 500) - Secondary actions, links

### Secondary Colors
- **Secondary**: `#7C3AED` (Violet 600) - Accents, gradients, secondary buttons
- **Secondary Dark**: `#6D28D9` (Violet 700) - Hover states
- **Secondary Light**: `#8B5CF6` (Violet 500) - Light accents

### Accent Colors
- **Success**: `#10B981` (Green 600) - Success messages, export buttons
- **Warning**: `#F59E0B` (Amber 500) - Warnings, alerts
- **Error**: `#EF4444` (Red 500) - Errors, delete actions
- **Info**: `#3B82F6` (Blue 500) - Information, notifications

### Background Colors
- **Background**: `#F8FAFC` (Slate 50) - Main page background
- **Background Gradient**: `from-blue-50 via-purple-50 to-pink-50`
- **Card Background**: `#FFFFFF` (White) - Cards, panels
- **Card Hover**: `#F9FAFB` (Gray 50) - Card hover states

### Text Colors
- **Primary Text**: `#0F172A` (Slate 900) - Headings, important text
- **Secondary Text**: `#475569` (Slate 600) - Body text, descriptions
- **Tertiary Text**: `#64748B` (Slate 500) - Placeholders, hints
- **Inverse Text**: `#FFFFFF` (White) - Text on dark backgrounds

### House Colors

#### House Stark 🐺
- **Primary**: `#94A3B8` (Slate 400) - Cool gray/silver
- **Dark**: `#64748B` (Slate 500)
- **Light**: `#CBD5E1` (Slate 300)
- **Hex**: `#94A3B8`
- **Theme**: Winter, cold, noble

#### House Baratheon 🦌
- **Primary**: `#FBBF24` (Amber 400) - Golden yellow
- **Dark**: `#F59E0B` (Amber 500)
- **Light**: `#FCD34D` (Amber 300)
- **Hex**: `#FBBF24`
- **Theme**: Royal, golden, powerful

#### House Greyjoy 🐙
- **Primary**: `#1E293B` (Slate 800) - Deep black/charcoal
- **Dark**: `#0F172A` (Slate 900)
- **Light**: `#334155` (Slate 700)
- **Hex**: `#1E293B`
- **Theme**: Dark, mysterious, maritime

#### House Lannister 🦁
- **Primary**: `#DC2626` (Red 600) - Crimson red
- **Dark**: `#B91C1C` (Red 700)
- **Light**: `#EF4444` (Red 500)
- **Hex**: `#DC2626`
- **Theme**: Bold, regal, fierce

#### House Targaryen 🐉
- **Primary**: `#F43F5E` (Rose 500) - Scarlet red
- **Dark**: `#E11D48` (Rose 600)
- **Light**: `#FB7185` (Rose 400)
- **Hex**: `#F43F5E`
- **Theme**: Fire, dragon, intense

---

## 📐 Usage Guide

### Buttons

#### Primary Button
```tsx
className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-lg hover:shadow-xl"
```

#### Secondary Button
```tsx
className="bg-secondary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-all"
```

#### Success Button (Export)
```tsx
className="bg-success-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-success-700 focus:outline-none focus:ring-2 focus:ring-success-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
```

### Headings

#### H1 (Page Title)
```tsx
className="text-4xl font-bold text-primary-text"
```

#### H2 (Section Title)
```tsx
className="text-2xl font-bold text-primary-text mb-6"
```

#### H3 (Card Title)
```tsx
className="text-xl font-semibold text-primary-text"
```

### Body Text

#### Regular Text
```tsx
className="text-base text-secondary-text"
```

#### Small Text
```tsx
className="text-sm text-tertiary-text"
```

### Cards

#### Standard Card
```tsx
className="bg-card-bg rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
```

#### Gradient Card
```tsx
className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white rounded-xl shadow-lg p-6"
```

### Backgrounds

#### Page Background
```tsx
className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
```

#### Card Background
```tsx
className="bg-white rounded-2xl shadow-2xl overflow-hidden"
```

### Alerts/Banners

#### Success Alert
```tsx
className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-lg"
```

#### Error Alert
```tsx
className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg"
```

#### Warning Alert
```tsx
className="bg-amber-50 border-2 border-amber-200 text-amber-800 px-4 py-3 rounded-lg"
```

#### Info Alert
```tsx
className="bg-blue-50 border-2 border-blue-200 text-blue-800 px-4 py-3 rounded-lg"
```

### House Badges

```tsx
// Stark
className="bg-slate-400 text-white px-4 py-2 rounded-full font-semibold border-2 border-slate-500"

// Baratheon
className="bg-amber-400 text-gray-900 px-4 py-2 rounded-full font-semibold border-2 border-amber-500"

// Greyjoy
className="bg-slate-800 text-white px-4 py-2 rounded-full font-semibold border-2 border-slate-900"

// Lannister
className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold border-2 border-red-700"

// Targaryen
className="bg-rose-500 text-white px-4 py-2 rounded-full font-semibold border-2 border-rose-600"
```

---

## 🎯 Design Principles

1. **Energetic & Competitive**: Use vibrant gradients and bold colors
2. **Clean & Readable**: Maintain high contrast for text
3. **Consistent**: Use house colors consistently throughout
4. **Responsive**: Design mobile-first with graceful desktop scaling
5. **Accessible**: Maintain WCAG AA contrast ratios

---

## 📱 Responsive Breakpoints

- **Mobile**: `sm` (640px) and below
- **Tablet**: `md` (768px) to `lg` (1024px)
- **Desktop**: `lg` (1024px) and above
- **Large Desktop**: `xl` (1280px) and above

