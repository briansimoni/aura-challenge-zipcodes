import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class AuraChallengeZipcodesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const zipsFunction = new lambda.Function(this, 'zipsFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('src'),
      handler: 'zips.handler'
    })

    const docsFunction = new lambda.Function(this, 'docs', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('src'),
      handler: 'docs.handler'
    })

    const apiGateway = new apigw.RestApi(this, 'Zipcodes')

    const zips = apiGateway.root.addResource('zips')
    zips.addMethod('GET', new apigw.LambdaIntegration(zipsFunction))

    const docs = apiGateway.root.addResource('docs')
    docs.addMethod('GET', new apigw.LambdaIntegration(docsFunction))
  }
}
