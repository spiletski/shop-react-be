export const GET_ALL_PRODUCTS = "SELECT * FROM products INNER JOIN stocks on products.id = stocks.product_id";
export const GET_PRODUCT_BY_ID = (id) => `SELECT * FROM products INNER JOIN stocks on products.id = stocks.product_id  WHERE products.id = '${id}'`;
export const CREATE_PRODUCT = (title, description, price) => `INSERT INTO products (title, description, price) VALUES ('${title}', '${description}', ${price}) RETURNING ID`;
export const CREATE_PRODUCT_STOCK = (product_id, count) => `INSERT INTO stocks (product_id, count) VALUES ('${product_id}', ${count})`;
