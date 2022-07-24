import type {AWS} from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductById from "@functions/getProductById";
import createProduct from "@functions/createProduct";

const serverlessConfiguration: AWS = {
    service: 'product-service-task-4',
    frameworkVersion: '3',
    useDotenv: true,
    plugins: [ 'serverless-dotenv-plugin', 'serverless-webpack', 'serverless-offline'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'us-east-1',
        stage: 'dev',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
    },
    // import the function via paths
    functions: {getProductsList, getProductById, createProduct},
    package: {individually: true},
    custom: {
        webpack: {
            webpackConfig: "webpack.config.js",
            includeModules: true,
            packager: "yarn",
            excludeFiles: "src/**/*.test.js",
        },
    }
};

module.exports = serverlessConfiguration;
