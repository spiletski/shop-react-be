import {getProductById} from "@functions/getProductById/handler";

const event = {
    pathParameters: {
        productId: "aaa",
    },
};

describe('getProductById handler', function () {
    it('verifies successful response', async () => {

        // @ts-ignore
        const result = await getProductById(event)

        expect(result.statusCode).toEqual(200);
        expect(result.body).toMatchSnapshot();
    });

    it("product not found", async () => {
        // @ts-ignore
        const actualValue = await getProductById({
            pathParameters: {
                productId: "aaa-123",
            }
        });
        expect(actualValue).toMatchSnapshot();
    });
});