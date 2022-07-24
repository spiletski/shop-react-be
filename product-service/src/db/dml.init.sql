CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

create table products (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text not null,
    description text,
    price integer
)

create table stocks (
 	product_id uuid,
    count integer,
    foreign key ("product_id") references "products" ("id")
)