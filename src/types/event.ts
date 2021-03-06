export interface HttpRequestEvent {
    body: string;
    resource: string;
    path: string;
    httpMethod: string;
    isBase64Encoded: boolean;
    queryStringParameters: QueryStringParameters;
    pathParameters: PathParameters | null;
    stageVariables?: StageVariables;
    headers: Headers;
    multiValueHeaders?: MultiValueHeaders;
    requestContext: RequestContext;
  }
  export interface QueryStringParameters {
    [key:string]: string
  }
  export interface PathParameters {
    zip: string
  }
  export interface StageVariables {
    [key:string]: string;
  }
  export interface Headers {
    Accept: string;
    "Accept-Encoding": string;
    "Accept-Language": string;
    "Cache-Control": string;
    "CloudFront-Forwarded-Proto": string;
    "CloudFront-Is-Desktop-Viewer": string;
    "CloudFront-Is-Mobile-Viewer": string;
    "CloudFront-Is-SmartTV-Viewer": string;
    "CloudFront-Is-Tablet-Viewer": string;
    'CloudFront-Viewer-Country': string;
    Host: string;
    'Upgrade-Insecure-Requests': string;
    'User-Agent': string;
    'Via': string;
    'X-Amz-Cf-Id': string;
    'X-Forwarded-For': string;
    'X-Forwarded-Port': string;
    'X-Forwarded-Proto': string;
  }
  export interface MultiValueHeaders {
    Accept?: string[] | null;
    'Accept-Encoding'?: (string)[] | null;
    'Accept-Language'?: (string)[] | null;
    'Cache-Control'?: (string)[] | null;
    'CloudFront-Forwarded-Proto'?: (string)[] | null;
    'CloudFront-Is-Desktop-Viewer'?: (string)[] | null;
    'CloudFront-Is-Mobile-Viewer'?: (string)[] | null;
    'CloudFront-Is-SmartTV-Viewer'?: (string)[] | null;
    'CloudFront-Is-Tablet-Viewer'?: (string)[] | null;
    'CloudFront-Viewer-Country'?: (string)[] | null;
    'Host'?: (string)[] | null;
    'Upgrade-Insecure-Requests'?: (string)[] | null;
    'User-Agent'?: (string)[] | null;
    'Via'?: (string)[] | null;
    'X-Amz-Cf-Id'?: (string)[] | null;
    'X-Forwarded-For'?: (string)[] | null;
    'X-Forwarded-Port'?: (string)[] | null;
    'X-Forwarded-Proto'?: (string)[] | null;
  }
  export interface RequestContext {
    accountId: string;
    resourceId: string;
    stage: string;
    requestId: string;
    requestTime: string;
    requestTimeEpoch: number;
    identity: Identity;
    path: string;
    resourcePath: string;
    httpMethod: string;
    apiId: string;
    protocol: string;
  }
  export interface Identity {
    cognitoIdentityPoolId?: null;
    accountId?: null;
    cognitoIdentityId?: null;
    caller?: null;
    accessKey?: null;
    sourceIp: string;
    cognitoAuthenticationType?: null;
    cognitoAuthenticationProvider?: null;
    userArn?: null;
    userAgent: string;
    user?: null;
  }