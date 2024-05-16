import { table } from "console";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("type").notNullable();
    table.integer("price").notNullable();
    table.enum("size", ["kecil", "sedang", "besar"]).notNullable();
    table.text("image").notNullable();
    table.string("image_public_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
