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