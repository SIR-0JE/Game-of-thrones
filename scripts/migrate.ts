// Load environment variables FIRST before any other imports
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
const envResult = config({ path: resolve(process.cwd(), ".env.local") });

if (envResult.error) {
  console.warn("⚠️  Warning: Could not load .env.local file");
}

// Verify MONGODB_URI is loaded
if (!process.env.MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI is not set in .env.local");
  console.error("Please update .env.local with your MongoDB connection string");
  process.exit(1);
}

// Now import other modules (after env vars are loaded)
import connectDB from "../lib/mongodb";
import Student from "../models/Student";

async function migrate() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log("📝 MongoDB URI:", process.env.MONGODB_URI ? "Set ✓" : "Missing ✗");
    
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in .env.local");
    }

    await connectDB();
    console.log("✅ Connected to MongoDB successfully!");

    console.log("🔄 Setting up Student schema and indexes...");
    
    // Ensure indexes are created (this will create the unique compound index)
    await Student.createIndexes();
    console.log("✅ Student indexes created successfully!");

    // Get index information
    const indexes = await Student.collection.getIndexes();
    console.log("\n📊 Current indexes:");
    console.log(JSON.stringify(indexes, null, 2));

    // Get schema information
    const sampleStudent = await Student.findOne();
    if (sampleStudent) {
      console.log("\n📋 Sample student schema fields:");
      console.log(JSON.stringify(Object.keys(sampleStudent.toObject()), null, 2));
    }

    // Check if collection exists and show stats
    const count = await Student.countDocuments();
    console.log(`\n📈 Current student count: ${count}`);

    // Check matric number field
    const studentsWithMatric = await Student.countDocuments({ matricNumber: { $exists: true, $ne: null } });
    console.log(`\n🎓 Students with matric number: ${studentsWithMatric}`);

    console.log("\n✅ Migration completed successfully!");
    console.log("🎉 Your database is ready to use!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:");
    console.error(error);
    process.exit(1);
  }
}

migrate();

