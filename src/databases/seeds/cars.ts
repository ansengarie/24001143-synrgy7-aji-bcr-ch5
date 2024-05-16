import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      id: 1,
      name: "Toyota Corolla",
      type: "Sedan",
      price: 300000,
      size: "sedang",
      image:
        "https://cdn.carbuzz.com/gallery-images/1600x900/700000/700000/700000-1.jpg",
      image_public_id: "toyota-corolla",
    },
    {
      id: 2,
      name: "Honda Civic",
      type: "Sedan",
      price: 400000,
      size: "sedang",
      image:
        "https://cdn.carbuzz.com/gallery-images/1600x900/700000/700000/700000-2.jpg",
      image_public_id: "honda-civic",
    },
  ]);
}
