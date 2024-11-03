import { Plant } from "../Schemas/Plant";
import * as fs from "fs";
import * as path from "path";
export const ParseFoodsJson = async (): Promise<Plant[]> => {
  try {
    const filePath = path.resolve(__dirname, "food.json");
    const data: string = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    throw error;
  }
};
