import type { Car } from "@/src/types/car";
import { api } from "./api";

export async function fetchAllCarsFromApi(): Promise<Car[]> {
  const response = await api.get<Car[]>("/api/v1/car");
  return response.data;
}

export async function createOrder(params: {
  carId: number;
  price: number;
  vendorId: number;
  customerName: string;
}) {
  const body = {
    customerName: params.customerName ?? 'teste',
    orderDate: new Date().toISOString(),
    total: params.price ?? 0,
    vendorId: params.vendorId ?? 0,
    items: [
      {
        id: 0,
        carId: params.carId,
        price: params.price,
        discount: 0,
      },
    ],
  };

  const response = await api.put("/api/v1/order", body);
  console.log(body);
  return response.data;
}

export async function createCar(params: {
  new: boolean;
  brand: string;
  model: string;
  year: number;
  price: number;
  color: string;
  km: number;
  description: string;
  images: { url: string }[];
}) {
  const body = {
    new: params.new,
    brand: params.brand,
    model: params.model,
    year: params.year,
    price: params.price,
    color: params.color,
    km: params.km,
    description: params.description,
    images: params.images,
  };

  const response = await api.put("/api/v1/car", body);

  return response.data;
}
