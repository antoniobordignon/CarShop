import type { CarImage } from "./carImage";

export type Car = {
  id: number;
  new: boolean;
  brand: string;
  model: string;
  year: number;
  price: number;
  color: string;
  km: number;
  description: string;
  images: CarImage[];
};
