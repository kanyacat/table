import { SetStateAction } from "react";

export enum Property {
  NAME = "name",
  VALUE = "value",
  FACT = "fact",
}

export interface IUser {
  text: string;
  keyValue: Record<string, string | number>;
}

export interface IRes {
  body: {
    data: string[];
  };
}

export interface IHeader {
  name: string;
  sort?: () => SetStateAction<IUser[]>;
}
