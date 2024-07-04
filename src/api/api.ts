import superagent from "superagent";
import { IUser, IRes } from "../types/types";

const array: Record<string, string | number>[] = [
  { rabbit: 7 },
  { cat: 11 },
  { dog: 19 },
  { kitten: "meow" },
  { kvakvakvakva: "kvakvakvakva" },
];

const newArray: IUser[] = [];

const meowFacts = "https://meowfacts.herokuapp.com/";

const factsApi = async () => {
  try {
    const res: IRes = await superagent.get(`${meowFacts}?count=5`);

    array.map((a: Record<string, string | number>, index: number) => {
      return newArray.push({
        text: res.body.data[index],
        keyValue: a,
      });
    });

    return newArray;
  } catch (err) {
    console.error(err);
  }
};

export const resultFactsApi = async () => {
  await factsApi();
  return newArray;
};
