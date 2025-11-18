import Student, { IStudent } from "@/models/Student";
import { HouseType } from "@/config/houses";

const HOUSES: HouseType[] = ["stark", "baratheon", "greyjoy", "lannister", "targaryen"];

/**
 * Implements balanced randomization:
 * 1. Count students in each house
 * 2. Find houses with smallest count
 * 3. Randomly choose from tied houses
 */
export async function assignHouse(): Promise<HouseType> {
  // Count students in each house
  const houseCounts = await Promise.all(
    HOUSES.map(async (house) => {
      const count = await Student.countDocuments({ house });
      return { house, count };
    })
  );

  // Find the minimum count
  const minCount = Math.min(...houseCounts.map((hc) => hc.count));

  // Get all houses with the minimum count
  const tiedHouses = houseCounts
    .filter((hc) => hc.count === minCount)
    .map((hc) => hc.house);

  // Randomly select from tied houses
  const randomIndex = Math.floor(Math.random() * tiedHouses.length);
  return tiedHouses[randomIndex];
}

