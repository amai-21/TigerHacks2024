import { Plant } from "./Plant";
import { Region } from "./Region";

export interface Garden {
  plant: Plant;
  region: Region;
  dateCreated: Date;
  guide: string;
}
