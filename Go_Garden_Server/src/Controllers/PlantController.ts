import { Request, Response } from "express";
import Configuration from "openai";
import OpenAIApi from "openai";
import * as PlantService from "../Services/PlantService";
import { Plant } from "../Schemas/Plant";
import { Region } from "../Schemas/Region";

export const PostRecommendationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const client = new OpenAIApi({
      apiKey: process.env["OPENAI_API_KEY"],
    });
    const { region }: { region: Region } = req.body;
    const plants: Plant[] = await PlantService.ParseFoodsJson();
    const plantNames: string[] = plants.map((plant: Plant) => plant.name);

    if (!region.country) {
      res.status(500).json({
        error:
          "An error occurred while communicating with OpenAI API. No Country Selected",
      });
      return;
    }
    const AMOUNT = 5;
    const currentDate = new Date().toLocaleDateString();
    let message: string;

    if (!region.state) {
      message = `I Am From ${
        region.country
      }. Today is ${currentDate}, use this info to assume the season. Tell me the top ${AMOUNT} best plants to plant in my personal outdoor garden from this list: ${plantNames.join(
        ", "
      )}. Answer By listing the ${AMOUNT}  best food plants comma seperated from greatest to least. If I live in a place where a garden is not possible, respond with just 'no'`;
    } else if (!region.city) {
      message = `I Am From ${region.country} in the state of ${
        region.state
      }. Today is ${currentDate}, use this info to assume the season. Tell me the top ${AMOUNT} best plants to plant in my personal outdoor garden from this list: ${plantNames.join(
        ", "
      )}. Answer By listing the  ${AMOUNT}  best food plants comma seperated from greatest to least. If I live in a place where a garden is not possible, respond with just 'no'`;
    } else {
      message = `I Am From ${region.country} in the state of ${
        region.state
      } and I live in the city of ${
        region.city
      }. Today is ${currentDate}, use this info to assume the season. Tell me the top ${AMOUNT} best plants to plant in my personal outdoor garden from this list: ${plantNames.join(
        ", "
      )}. Answer By listing the ${AMOUNT} best food plants comma seperated from greatest to least. If I live in a place where a garden is not possible, respond with just 'no'`;
    }

    try {
      const response: Configuration.Chat.Completions.ChatCompletion =
        await client.chat.completions.create({
          messages: [{ role: "user", content: message }],
          model: "gpt-3.5-turbo",
        });
      if (response.choices[0].message.content) {
        if (response.choices[0].message.content == "no") {
          res.status(200).json({});
        }
        console.log(response.choices[0].message.content);
        let selectedPlantNames2: string[] = response.choices[0].message.content
          .split(",")
          .map((name) => name.trim());
        let selectedPlantNames = selectedPlantNames2.filter((item, index) => {
          return selectedPlantNames2.indexOf(item) === index;
        });
        const results: Plant[] = [];

        for (let i = 0; i < selectedPlantNames.length; i++) {
          let plant: Plant | undefined = plants.find(
            (plant) => plant.name === selectedPlantNames[i]
          );

          console.log(plant + " h " + selectedPlantNames[i]);
          if (plant !== undefined) {
            results.push(plant);
          }
        }

        res.status(200).json(results);
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      res.status(500).json({
        error: "An error occurred while communicating with OpenAI API",
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      console.error("Stack:", error.stack);

      res.status(400).json({
        message: error.message,
        stack: error.stack,
      });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
};
