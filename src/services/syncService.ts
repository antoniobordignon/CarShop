import { saveCarsToLocalDB } from "@/src/repositories/carRepository";
import { fetchAllCarsFromApi } from "./carService";

export async function syncCars() {
  const cars = await fetchAllCarsFromApi();
  await saveCarsToLocalDB(cars);
  return cars;
}
