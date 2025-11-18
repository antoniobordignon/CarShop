import type { Car } from "@/src/types/car";
import { api } from "./api";

export async function fetchAllCarsFromApi(): Promise<Car[]> {
  const response = await api.get<Car[]>("/api/v1/car");
  return response.data;
}
