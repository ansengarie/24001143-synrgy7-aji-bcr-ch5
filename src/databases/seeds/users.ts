import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      name: "asep ujang",
      email: "asep@gmail.com",
      phone_number: "08123456789",
      password: "password",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
