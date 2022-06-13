import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager"
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as route53 from 'aws-cdk-lib/aws-route53'

export class AuraChallengeZipcodesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const zipsFunction = new lambda.Function(this, "zipsFunction", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("src"),
      handler: "zips.handler",
    });

    const docsFunction = new lambda.Function(this, "docs", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("src"),
      handler: "docs.handler",
    });

    const certificateArn = 'arn:aws:acm:us-east-1:502859415194:certificate/f8d29ee7-fb97-4e72-92a0-7267fff33979'
    const certificate = Certificate.fromCertificateArn(this, 'zips', certificateArn)

    const apiGateway = new apigw.RestApi(this, "Zipcodes", {
      domainName: {
        domainName: "zips.stereodose.app",
        certificate,
      },
    });

    // const hostedZoneForStereodose = new route53.HostedZone(this, 'ZipsHostedZone', { zoneName: "stereodose.app" });
    const hostedZoneForStereodose = route53.HostedZone.fromHostedZoneAttributes(this, 'ZipsHostedZone', {
      hostedZoneId: 'Z2H4061PKUZ16H',
      zoneName: 'stereodose.app',
    })

    new route53.ARecord(this, 'CustomDomainAliasRecord', {
      zone: hostedZoneForStereodose,
      recordName: 'zips',
      target: route53.RecordTarget.fromAlias(new targets.ApiGateway(apiGateway))
    });

    const zips = apiGateway.root.addResource("zips");
    zips.addMethod("GET", new apigw.LambdaIntegration(zipsFunction));

    const zip = zips.addResource("{zip}");
    zip.addMethod("GET", new apigw.LambdaIntegration(zipsFunction));

    const docs = apiGateway.root.addResource("docs");
    docs.addMethod("GET", new apigw.LambdaIntegration(docsFunction));
  }
}
