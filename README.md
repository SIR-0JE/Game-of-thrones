# Sports House Randomizer

A Next.js 14 application for randomly assigning students to houses for a school sports event. Features balanced randomization to ensure fair distribution across all houses.

## 🏠 Houses

- **House Stark** 🐺
- **House Baratheon** 🦌
- **House Greyjoy** 🐙
- **House Lannister** 🦁
- **House Targaryen** 🐉

## ✨ Features

- **Student Registration**: Register students with name, level, and department
- **Balanced Randomization**: Automatically assigns students to houses ensuring equal distribution
- **Duplicate Prevention**: Prevents duplicate registrations for the same student
- **WhatsApp Integration**: Each house has a WhatsApp group link for students to join
- **Admin Dashboard**: Password-protected admin panel to view all registrations
- **CSV Export**: Export all student data as CSV
- **Statistics**: View counts per house and total registrations

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **MongoDB** (Mongoose)
- **Server Actions & API Routes**

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)

## 🚀 Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sports-house-randomizer
ADMIN_PASSWORD=your-secure-admin-password-here
```

You can copy from `.env.example`:
```bash
cp .env.example .env.local
```

### 3. Configure WhatsApp Links

Edit `config/houses.ts` and update the WhatsApp links for each house:

```typescript
export const HOUSE_CONFIG = {
  stark: {
    name: "House Stark",
    whatsapp: "https://chat.whatsapp.com/YOUR_ACTUAL_LINK", // Update this
    // ...
  },
  // Update other houses too...
};
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Create a Vercel account** (if you don't have one)
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login

3. **Import your project**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

4. **Set Environment Variables**
   - In your Vercel project settings, go to "Environment Variables"
   - Add:
     - `MONGODB_URI`: Your MongoDB connection string
     - `ADMIN_PASSWORD`: Your admin password

5. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes!

### MongoDB Atlas Setup

1. **Create an account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a cluster**
   - Choose the free tier (M0)
   - Select a cloud provider and region

3. **Create a database user**
   - Go to "Database Access"
   - Add a new user with username and password
   - Set privileges to "Read and write to any database"

4. **Configure network access**
   - Go to "Network Access"
   - Add IP address: `0.0.0.0/0` (allows all IPs)
   - Or add your specific IP addresses

5. **Get connection string**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `sports-house-randomizer`)

6. **Use the connection string in your `.env.local`**

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── register/        # Student registration endpoint
│   │   ├── student/         # Get student by ID
│   │   └── admin/           # Admin endpoints (stats, export, students)
│   ├── admin/               # Admin dashboard page
│   ├── result/              # Result page showing assigned house
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page with registration form
│   └── globals.css          # Global styles
├── config/
│   └── houses.ts            # House configuration (WhatsApp links, etc.)
├── lib/
│   ├── mongodb.ts           # MongoDB connection
│   └── houseAssignment.ts   # Balanced randomization logic
├── models/
│   └── Student.ts           # Mongoose Student model
└── package.json
```

## 🔑 API Endpoints

### POST `/api/register`
Register a new student.

**Request Body:**
```json
{
  "name": "John Doe",
  "level": "200",
  "department": "Computer Science"
}
```

**Response:**
```json
{
  "message": "Student registered successfully",
  "student": {
    "_id": "...",
    "name": "John Doe",
    "level": "200",
    "department": "Computer Science",
    "house": "stark",
    "createdAt": "..."
  }
}
```

### GET `/api/student?id=xxxx`
Get student by ID.

### GET `/api/admin/stats`
Get statistics (requires admin authentication).

### GET `/api/admin/students`
Get all students (requires admin authentication).

### GET `/api/admin/export`
Export all students as CSV (requires admin authentication).

## 🎯 How Balanced Randomization Works

1. Counts the number of students in each house
2. Finds the house(s) with the smallest count
3. Randomly selects from those tied houses
4. This ensures fair distribution across all houses

## 🔒 Security Notes

- Admin password is stored in environment variables
- Duplicate registrations are prevented using database indexes
- Input validation on all forms

## 📝 License

This project is open source and available for educational purposes.

## 🆘 Troubleshooting

**MongoDB Connection Error:**
- Verify your `MONGODB_URI` is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure database user credentials are correct

**Build Errors:**
- Make sure all environment variables are set
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (should be 18+)

**Admin Login Not Working:**
- Verify `ADMIN_PASSWORD` is set in environment variables
- Restart your development server after changing env variables

