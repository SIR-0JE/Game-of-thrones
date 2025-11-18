# Admin Dashboard Layout & Design

## 📐 Layout Overview

The admin dashboard is designed with a modern, clean interface that provides comprehensive tools for managing student registrations.

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    Desktop Layout                            │
├──────────┬──────────────────────────────────────────────────┤
│          │  Header (Mobile Only) / Content Area             │
│ Sidebar  │  ┌──────────────────────────────────────────┐   │
│ (Fixed)  │  │  Stats Cards Row                          │   │
│          │  └──────────────────────────────────────────┘   │
│  - Nav   │  ┌──────────────┬──────────────┐               │
│  - Export│  │  Bar Chart   │  Pie Chart   │               │
│  - Home  │  │              │              │               │
│          │  └──────────────┴──────────────┘               │
└──────────┴──────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Mobile Layout                             │
├──────────────────────────────────────────────────────────────┤
│  Header (Sticky)                                            │
│  ┌─────────────┬─────────────┐                             │
│  │   Title     │    Menu     │                             │
│  └─────────────┴─────────────┘                             │
│  ┌─────────────┬─────────────┐                             │
│  │  Overview   │  Students   │                             │
│  └─────────────┴─────────────┘                             │
├──────────────────────────────────────────────────────────────┤
│  Content Area                                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Stats Cards (Vertical Stack)                          │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Charts (Full Width, Stacked)                          │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 Component Details

### 1. Sidebar Navigation (Desktop)

**Location**: Fixed left sidebar, visible on `lg` breakpoint and above

**Features**:
- **Dashboard Title**: Gradient text (Primary to Secondary)
- **Navigation Items**:
  - Overview (with chart icon)
  - Students (with users icon)
  - Export CSV (with download icon) - Special styling
- **Back to Home**: Bottom of sidebar
- **Active State**: Gradient background matching primary theme
- **Hover State**: Light gray background

**Styling**:
- Background: White with shadow
- Active Tab: `bg-gradient-to-r from-primary-600 to-secondary-600`
- Hover: `hover:bg-gray-100`
- Width: `w-64` (256px)

### 2. Mobile Header (Mobile/Tablet)

**Location**: Sticky top header, visible below `lg` breakpoint

**Features**:
- **Title**: Gradient text matching sidebar
- **Menu Toggle**: Hamburger icon (for future mobile menu expansion)
- **Tab Switcher**: Overview and Students tabs
- **Active Tab Indicator**: Bottom border with primary color

**Styling**:
- Background: White with shadow
- Sticky positioning: `sticky top-0 z-30`
- Tab indicator: `border-b-2 border-primary-600`

### 3. Overview Tab

#### Stats Cards Row

**Layout**: 6-column grid on desktop, vertical stack on mobile

**Cards**:
1. **Total Students Card** (Primary gradient)
   - Large number display
   - "Total Students" label
   - Gradient: `from-primary-500 to-primary-600`

2. **House Cards** (5 cards, one per house)
   - Emoji icon
   - Count number
   - House name
   - Uses house-specific gradient colors

**Styling**:
- Rounded corners: `rounded-xl`
- Shadow: `shadow-lg`
- Text: White (except Baratheon uses dark text)
- Borders: White with 30% opacity for light contrast

#### Charts Section

**Layout**: 2-column grid on desktop (`lg:grid-cols-2`), vertical stack on mobile

##### Bar Chart (Left)

**Features**:
- Title: "Distribution by House"
- For each house:
  - Emoji and name
  - Count number (right-aligned)
  - Horizontal bar showing percentage
  - Bar color matches house color
  - Percentage label inside bar (if > 15% width)
- Animated bars with transition

**Styling**:
- Background: White card with shadow
- Bar background: Gray-200
- Bar fill: House-specific color with gradient
- Bar height: `h-6` (24px)
- Rounded: `rounded-full`

##### Pie Chart (Right)

**Features**:
- SVG-based pie chart visualization
- Each slice represents a house
- Center displays total count
- Legend below showing house colors and counts
- 2-column legend grid

**Styling**:
- SVG viewBox: `0 0 200 200`
- Center circle: 100, 100
- Radius: 80
- Slices: House colors with white borders
- Legend: Small colored squares with house names

### 4. Students Tab

#### Filters and Search Bar

**Layout**: Horizontal on desktop, vertical stack on mobile

**Components**:
1. **Search Input**
   - Icon: Search icon (left side)
   - Placeholder: "Search by name, level, or department..."
   - Full-width on mobile, flex-1 on desktop

2. **Filter Dropdowns**:
   - **House Filter**: All houses + individual houses
   - **Level Filter**: All levels + unique levels from data
   - **Department Filter**: All departments + unique departments from data

3. **Results Count**: Shows filtered count vs total

4. **Export Button**: Success-colored button (green)

**Styling**:
- Background: Gray-50 with border
- Inputs: White background, 2px border, focus ring
- Border radius: `rounded-lg`
- Focus state: Primary color ring

#### Data Table

**Features**:
- **Sortable Columns**: Click header to sort
  - Sort indicator: Arrow icon (up/down)
  - Current sort field: Highlighted
- **Responsive**: Horizontal scroll on small screens
- **Hover Effect**: Row highlight on hover
- **Alternating Rows**: Zebra striping
- **House Badges**: Color-coded with emoji

**Columns**:
1. **Name**: Student's full name
2. **Level**: Badge with level number (primary color)
3. **Department**: Department name
4. **House**: House badge with emoji and name
5. **Registered**: Formatted date

**Table Styling**:
- Header: Gradient background (gray-100 to gray-200)
- Header text: Uppercase, bold, tracked
- Rows: White with gray-50 alternate
- Borders: Gray-200 dividers
- Padding: `px-6 py-4`
- Hover: `hover:bg-gray-50`

**House Badges**:
- Rounded: `rounded-full`
- Border: 2px (white/30% for light, gray-300 for dark)
- Padding: `px-4 py-2`
- Font: Bold
- Contains: Emoji + House name

---

## 📱 Responsive Breakpoints

### Mobile (< 640px)
- Single column layout
- Sidebar hidden
- Mobile header visible
- Stats cards stacked vertically
- Charts full width, stacked
- Table scrolls horizontally
- Filters stacked vertically

### Tablet (640px - 1024px)
- Single column layout
- Sidebar hidden
- Mobile header visible
- Stats cards in 2-column grid
- Charts side-by-side if space allows
- Filters in 2-column grid
- Table full width

### Desktop (≥ 1024px)
- Sidebar visible (fixed)
- Content area offset by sidebar width
- Stats cards in 6-column grid
- Charts side-by-side
- Filters in horizontal row
- Full table visibility

---

## 🎯 User Interactions

### Sorting
- **Click column header** to sort
- **First click**: Ascending
- **Second click**: Descending
- **Visual feedback**: Arrow indicator in header

### Filtering
- **Search**: Real-time filtering as you type
- **Dropdowns**: Filter by house, level, or department
- **Combined**: All filters work together (AND logic)
- **Reset**: Clear filters to show all

### Export
- **Button**: Prominent green button in filters bar and sidebar
- **Action**: Downloads CSV file with current filtered results
- **Filename**: `students-export-YYYY-MM-DD.csv`

### Navigation
- **Tab Switching**: Click to switch between Overview and Students
- **Active State**: Visual indicator (gradient background or bottom border)
- **Mobile**: Tabs in header
- **Desktop**: Tabs in sidebar

---

## 🎨 Color Usage

### Primary Colors (Buttons, Links)
- Primary: Blue 600 (`#2563EB`)
- Hover: Blue 700 (`#1D4ED8`)
- Secondary: Violet 600 (`#7C3AED`)

### Success (Export)
- Success: Green 600 (`#059669`)
- Hover: Green 700 (`#047857`)

### House Colors (Applied Consistently)
- **Stark**: Slate 400 (`#94A3B8`) - Cool gray
- **Baratheon**: Amber 400 (`#FBBF24`) - Golden
- **Greyjoy**: Slate 800 (`#1E293B`) - Dark charcoal
- **Lannister**: Red 600 (`#DC2626`) - Crimson
- **Targaryen**: Rose 500 (`#F43F5E`) - Scarlet

### Text Colors
- Primary Text: Slate 900 (`#0F172A`)
- Secondary Text: Slate 600 (`#475569`)
- Tertiary Text: Slate 500 (`#64748B`)

### Backgrounds
- Page: Gradient (`from-blue-50 via-purple-50 to-pink-50`)
- Cards: White (`#FFFFFF`)
- Alternating Rows: Gray 50 (`#F9FAFB`)

---

## ✨ Special Features

### 1. Real-time Filtering
- All filters update instantly as user interacts
- Search queries filter across name, level, and department
- Combination of filters uses AND logic

### 2. Visual Data Representation
- **Bar Chart**: Shows distribution clearly with percentages
- **Pie Chart**: SVG-based, color-coded by house
- **Stats Cards**: Quick overview at a glance

### 3. Responsive Charts
- Charts resize based on container
- Mobile: Full width, stacked
- Desktop: Side-by-side for comparison

### 4. Sortable Table
- Multi-column sorting
- Visual sort indicators
- Maintains filter state while sorting

### 5. House Color Consistency
- House colors used in:
  - Stats cards
  - Charts (bar and pie)
  - Table badges
  - Filter dropdowns

---

## 🔄 State Management

### Filter States
- `searchQuery`: String for search input
- `filterHouse`: House type or "all"
- `filterLevel`: Level string or "all"
- `filterDepartment`: Department string or "all"

### Sort States
- `sortField`: Current column being sorted
- `sortDirection`: "asc" or "desc"

### UI States
- `activeTab`: "overview" or "students"
- `authenticated`: Login state
- `loadingData`: Data fetching state

---

## 📊 Performance Considerations

1. **Memoized Filtering**: Uses `useMemo` to prevent unnecessary recalculations
2. **Efficient Sorting**: Sorts only when needed
3. **Lazy Rendering**: Charts render only when data is available
4. **Responsive Images**: Charts use CSS for sizing, no image loading delays

---

## 🎯 Accessibility

1. **Keyboard Navigation**: All interactive elements are keyboard accessible
2. **Focus States**: Clear focus indicators on inputs and buttons
3. **Color Contrast**: Meets WCAG AA standards
4. **Semantic HTML**: Proper table structure, headings hierarchy
5. **Screen Reader Support**: ARIA labels where needed, descriptive text

---

## 🚀 Future Enhancements

Potential additions:
- Date range filter
- Export filtered results only
- Print view
- Student detail modal
- Bulk actions
- Advanced search with multiple criteria
- Export to PDF
- Real-time updates via WebSocket
- Dashboard refresh button
- Customizable dashboard layout

