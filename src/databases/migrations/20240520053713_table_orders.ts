import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users");
    table.integer("cars_id").unsigned().notNullable();
    table.foreign("cars_id").references("id").inTable("cars");
    table.timestamp("rent_date").defaultTo(knex.fn.now());
    table.timestamp("return_date").notNullable();
    table.integer("total_price").notNullable();
    table.string("status").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
