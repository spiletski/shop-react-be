import {getProductsList} from "@functions/getProductsList/handler";
import ProductService from "../services/productService";
import {APIGatewayProxyEvent} from "aws-lambda";

let mockEvent: APIGatewayProxyEvent;

describe('getProductsList handler',  () => {
    it('verifies successful response', async () => {
        const result = await getProductsList(mockEvent)

        expect(result.statusCode).toEqual(200);
        expect(result.body).toMatchInlineSnapshot(`"{\\"products\\":[{\\"id\\":\\"aaa\\",\\"Name\\":\\"chevrolet camaro\\",\\"Miles_per_Gallon\\":27,\\"Cylinders\\":4,\\"Displacement\\":151,\\"Horsepower\\":90,\\"Weight_in_lbs\\":2950,\\"Acceleration\\":17.3,\\"Year\\":\\"1982-01-01\\",\\"Origin\\":\\"USA\\"},{\\"id\\":\\"bbb\\",\\"Name\\":\\"ford mustang gl\\",\\"Miles_per_Gallon\\":27,\\"Cylinders\\":4,\\"Displacement\\":140,\\"Horsepower\\":86,\\"Weight_in_lbs\\":2790,\\"Acceleration\\":15.6,\\"Year\\":\\"1982-01-01\\",\\"Origin\\":\\"USA\\"},{\\"id\\":\\"ccc\\",\\"Name\\":\\"dodge rampage\\",\\"Miles_per_Gallon\\":32,\\"Cylinders\\":4,\\"Displacement\\":135,\\"Horsepower\\":84,\\"Weight_in_lbs\\":2295,\\"Acceleration\\":11.6,\\"Year\\":\\"1982-01-01\\",\\"Origin\\":\\"USA\\"},{\\"id\\":\\"ddd\\",\\"Name\\":\\"ford ranger\\",\\"Miles_per_Gallon\\":28,\\"Cylinders\\":4,\\"Displacement\\":120,\\"Horsepower\\":79,\\"Weight_in_lbs\\":2625,\\"Acceleration\\":18.6,\\"Year\\":\\"1982-01-01\\",\\"Origin\\":\\"USA\\"},{\\"id\\":\\"eee\\",\\"Name\\":\\"chevy s-10\\",\\"Miles_per_Gallon\\":31,\\"Cylinders\\":4,\\"Displacement\\":119,\\"Horsepower\\":82,\\"Weight_in_lbs\\":2720,\\"Acceleration\\":19.4,\\"Year\\":\\"1982-01-01\\",\\"Origin\\":\\"USA\\"}]}"`);
    });

    it("if error should return response 500 response", async () => {
        const response = { code: 500, message: 'Internal server error' };

        // @ts-ignore
        const retrieveDataSpy = jest.spyOn(ProductService, 'getProductsList').mockResolvedValueOnce(response);
        const actualValue = await getProductsList(mockEvent);
        expect(actualValue).toMatchSnapshot('getProductsList error');
        expect(retrieveDataSpy).toBeCalledWith();
    });
});