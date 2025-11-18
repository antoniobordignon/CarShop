import { db } from "@/src/database/schema";
import type { Car } from "@/src/types/car";

export async function saveCarsToLocalDB(cars: Car[]) {
  await db.execAsync("DELETE FROM car_images;");
  await db.execAsync("DELETE FROM cars;");

  for (const car of cars) {
    await db.runAsync(
      `INSERT INTO cars (id, new, brand, model, year, price, color, km, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        car.id,
        car.new ? 1 : 0,
        car.brand,
        car.model,
        car.year,
        car.price,
        car.color,
        car.km,
        car.description,
      ]
    );

    for (const img of car.images) {
      await db.runAsync(
        `INSERT INTO car_images (id, url, carId, car)
         VALUES (?, ?, ?, ?)`,
        [img.id, img.url, car.id, img.car]
      );
    }
  }
}

export async function getCarsFromLocalDB(): Promise<Car[]> {
  const cars = await db.getAllAsync("SELECT * FROM cars ORDER BY id ASC");
  const images = await db.getAllAsync("SELECT * FROM car_images ORDER BY id ASC");

  return cars.map((car) => {
    const c = car as any;
    return {
      ...c,
      new: Boolean(c.new),
      images: images.filter((img: any) => img.carId === c.id),
    } as Car;
  });
}

export async function getCarByIdFromLocalDB(id: number): Promise<Car | null> {
  const car = await db.getFirstAsync("SELECT * FROM cars WHERE id = ?", [id]);
  if (!car) return null;

  const c = car as any;

  const imgs = await db.getAllAsync(
    "SELECT * FROM car_images WHERE carId = ? ORDER BY id ASC",
    [id]
  );

  return {
    ...c,
    new: Boolean(c.new),
    images: imgs,
  } as Car;
}
