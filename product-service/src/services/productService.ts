import {CREATE_PRODUCT, CREATE_PRODUCT_STOCK, GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID} from "../db/queries";
import {createConnection} from "../db/connection";

const ProductService =  {
    async getProductsList() {
        let connection;

        try {
            connection = await createConnection();
            const autos = await connection.query(GET_ALL_PRODUCTS);

            return autos.rows;
        } catch (e) {
            console.log('error ', e);
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },

    async getProductById(id : string) {
        let connection;

        try {
            connection = await createConnection();
            const auto = await connection.query(GET_PRODUCT_BY_ID(id));
            return auto.rows[0];
        } catch (e){
            console.log('error ', e);
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },

    async createProduct(title, description, price, count) {
        let connection;

        try {
            connection = await createConnection();

            await connection.query('BEGIN')

            const auto = await connection.query(CREATE_PRODUCT(title, description, price));

            const product_id = auto.rows[0].id;

            await connection.query(CREATE_PRODUCT_STOCK(product_id, count));

            await connection.query('COMMIT');

            return auto.rows;
        } catch (e){
            await connection.query('ROLLBACK');
            console.log('error ', e);
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },

}

export default ProductService;