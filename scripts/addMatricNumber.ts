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

async function addMatricNumberField() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log("📝 MongoDB URI:", process.env.MONGODB_URI ? "Set ✓" : "Missing ✗");

    await connectDB();
    console.log("✅ Connected to MongoDB successfully!");

    console.log("\n🔄 Adding matricNumber field to existing documents...");

    // Count documents without matricNumber field
    const documentsWithoutMatric = await Student.countDocuments({
      $or: [
        { matricNumber: { $exists: false } },
        { matricNumber: null },
        { matricNumber: "" },
      ],
    });

    console.log(`📊 Found ${documentsWithoutMatric} documents that need the matricNumber field`);

    if (documentsWithoutMatric > 0) {
      // Update all documents that don't have matricNumber or have null/empty string
      const result = await Student.updateMany(
        {
          $or: [
            { matricNumber: { $exists: false } },
            { matricNumber: null },
            { matricNumber: "" },
          ],
        },
        {
          $set: { matricNumber: null },
        }
      );

      console.log(`✅ Updated ${result.modifiedCount} documents with matricNumber field`);
    } else {
      console.log("✅ All documents already have the matricNumber field");
    }

    // Verify the update
const totalDocuments = await Student.countDocuments({});
const documentsWithField = await Student.countDocuments({
  matricNumber: { $exists: true },
});
const documentsWithValue = await Student.countDocuments({
  matricNumber: { $exists: true, $nin: [null, ""] },
});

console.log("\n📈 Verification Results:");
console.log(`   Total documents: ${totalDocuments}`);
console.log(`   Documents with matricNumber field: ${documentsWithField}`);
console.log(`   Documents with matricNumber value: ${documentsWithValue}`);


    // Show sample documents
    console.log("\n📋 Sample documents:");
    const samples = await Student.find({}).limit(3).lean();
    samples.forEach((student, index) => {
      console.log(`   ${index + 1}. ${student.name}`);
      console.log(`      - matricNumber: ${student.matricNumber || "null"}`);
      console.log(`      - level: ${student.level}`);
      console.log(`      - department: ${student.department}`);
    });

    console.log("\n✅ Migration completed successfully!");
    console.log("🎉 The matricNumber field has been added to all documents in MongoDB!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:");
    console.error(error);
    process.exit(1);
  }
}

addMatricNumberField();

