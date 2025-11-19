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

export type OrderItem = {
  id: number;
  carId: number;
  price: number;
  discount: number;
};

export type Order = {
  id: number;
  customerName: string;
  orderDate: string;
  total: number;
  vendorId: number;
  items: OrderItem[];
};