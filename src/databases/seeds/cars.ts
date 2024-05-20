import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  const mobil = [
    {
      id: 1,
      plate: "OSL-4224",
      manufacture: "Lincoln",
      model: "MKZ",
      image: "./images/car03.min.jpg",
      image_public_id: "car03",
      rent_per_day: 10000,
      capacity: 6,
      description:
        " Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
      available_at: "2022-03-23T15:49:05.563Z",
      transmission: "manual",
      available: true,
      type: "Sedan",
      year: 2021,
      options: [
        "Bucket Seats",
        "Airbag: Passenger",
        "Airbag: Driver",
        "Power Seats",
        "Airbag: Side",
        "Antilock Brakes",
        "CD (Multi Disc)",
      ],
      specs: [
        "Driver & front passenger map pockets",
        "Direct-type tire pressure monitor system",
        "Cargo area lamp",
        "Glove box lamp",
        "Silver finish interior door handles",
        "Driver & front passenger advanced multistage airbags w/occupant sensors",
        "Silver accent IP trim finisher -inc: silver shifter finisher",
        "Fasten seat belt warning light/chime",
      ],
    },
  ];
  // Inserts seed entries
  await knex("cars").insert(
    mobil.map(({ id, ...restData }) => {
      return {
        ...restData,
        specs: JSON.stringify(restData.specs),
        options: JSON.stringify(restData.options),
      };
    })
  );
}
