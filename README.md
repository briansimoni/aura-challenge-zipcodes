# Things to talk about
Since this is mainly an exercise to demonstrate knowledge and considering the time constraints, there are many components of this API implementation that are lacking.
In preparation for interview questions, I'm making an attempt to create high level topics about the components that make an API good or bad and how I approached each topic.

* Does it meet business requirements?
* API interface
* Code
* Developer workflow
* Documentation
* CI/CD
* Cloud infrastructure and scalability
* Testing
* Security
* Cost
* Operational Support
* Data layer

## Business Requirements
It fulfils most of the acceptance criteria listed in the original README. There are some attributes
that you still cannot search by, and there are probably edge cases that will break it. I think this
implementation should serve well for interview discussion purposes.

## API Interface
I attempted to create a typical-looking REST API implementation where you can use query parameters
to search and filter results on a particular resource. The only resource in this instance is zips.
I think however, an OData interface or maybe graphql might actually be really nice for this problem.
Both of those types of interfaces give developers standard ways to write interesting queries - which
is most of what we're trying to do here. A different approach that I found after I wrote half of this
was https://www.zipcodeapi.com/API. It looks like a pretty easy to use interface as well.

## Code
Perhaps the most important aspect of this challenge is the code. Since Aura uses TypeScript and
serverless heavily in their products, I thought I would do the same. I haven't used much TypeScript
in the past year, and it is a language with an intense amount of features. I think a more knowledegable
TypeScript developer would've applied more clever patterns, but I got the job done and I think it looks nice.
I have a light set of unit tests which proved to be very helpful in verifying functionality. They of course,
could be much more robust. I would like to find a better way to do input validation. There are quite a few
`if (thing !== undefined)` expressions in my code. I could also be a little bit better and stricter about the
types that are in use. I think using the @types/aws-lambda-event or something would've been better than
definining it myself. I also assumed the Earth was flat. I'm pretty sure I need to use Haversine function
to calculate the distance between two pairs of coordinates.

## Developer Workflow
I think this topic is undervalued. I personally can get frustrated going into a project with little to no
documentation on how to get up and running writing code. Ideally it should be extremely easy. Clone the
repository. Run a command or two. Then it works on any platform. I think this isn't too far off. For this
I'm trying out AWS Cloud CDK - a tool which I have never used. I actually find it pretty nice. Writing
infrastructure as code with TypeScript I think is *much* nicer than writing YAML. A developer with
an AWS account could run the `cdk bootstrap` command and then be up and running with this project
very quickly.

## Documentation
Swagger UI seems to be fairly well known and easy to use both from an API developer perspective
and from the perspective of a developer consuming the API. I provided a very basic one. Additionally
I think that documentation should generally live with the code. It makes to more convenient to maintain
and then can follow the same scrutiny of change control that is placed on the code itself. In many
organizations, documentation sadly is a very undisciplined area of work even though it is critically important.

## CI/CD
I'm quickly becoming a fan of GitHub actions. Anything that isn't Jenkins tends to be at least good. If I
had more time that I wanted to dedicate to this project, I might give a shot at creating my own GitHub action
to automatically test and deploy to one or ideally multiple AWS accounts (dev/prod) or something along those lines.

## Cloud infrastructure and scalability
I'm using Lambda which by itself allows for performance and scale that is tough to compete with when just using
typical servers. I think the likely performance bottlenneck is going to be performing disk reads of the entire
JSON file and computing functions across the entire dataset. I think in a real life scenario, we may want to update
our dataset as new zip codes get added as the United States inevitably conquers more of the Earth or starts to
disintegrate or shrink as social media rips us apart. A flat file in this case is rather inconenvient. My go-to
would be Dynamo, but there are perhaps others that could be useful here too. If we're trying to find closest
neighbors to zipcodes, relationships betwen zip codes, or paths from one zip code to another, it starts to sound
like perhaps a graph database migtht be useful. Finally, there are some features of API gateway that might
be worth turning on like rate limiting.

## Testing
The tests that I have written were more to actually help me deliver something that works faster rather than
show of my skills. I would consider myself somewhat of a novice at the Jest framework, and I have a lot more
to learn about testing in general. I would like to see the tests get more condensed. I think there is too much
code. Perhaps that can be achieved and at the same time make them more focused and robust using Jest's ability
to mock things combined with the TypeScript type checks. Perhaps we could better simulate the cloud environment
using a docker container. Maybe Docker isn't worth using at all when it is pretty easy to create a dedicated
testing account. Maybe creating an entire stack in a testing account and running a test suite against that could
be implemented in the GitHub actions pipeline before going to production.

## Security
My main concern right now is someone invoking millions of requests such that my credit card gets billed.
I haven't used the feature before, but I think that I can have API gateway do rate limiting. If not,
I would be interesting in implementing my own rate limiting feature. I feel like it probably wouldn't
be that hard.

# Aura Code Challenge

This challenge will allow you to demonstrate your knowledge and understanding of node.js.
It is intended to be familiar, much like a development story that could come up on the job.
After you submit the completed project, we will schedule a follow-up code-review.

## The Story

**Create a lambda-like handler function that can query zip code data in various ways**

- handler function is already bootstrapped in `src/index.js`
- handler is invoked with events (see below) as would come from API Gateway
- it is `async` and should return an array or throw an error
- the dataset to be searched is included in the `src/data.json` file
- look at the data and decide how best to utilize it

### Acceptance Criteria

- design and define zipcode api
- implement zipcode api handler
- search by full or partial zipcode
- search by full or partial city name
- search by closest latitude/longitude
- filter by additional attributes

### Sample Zipcode Object

```json
{
  "zip": "01230",
  "type": "STANDARD",
  "primary_city": "Great Barrington",
  "acceptable_cities": "Egremont, Gt Barrington, N Egremont, New Marlboro, New Marlborou, New Marlborough, North Egremont, Simons Rock",
  "unacceptable_cities": "Alford, Berkshire Heights, Hartsville, Risingdale, Van Deusenville",
  "state": "MA",
  "county": "Berkshire County",
  "timezone": "America/New_York",
  "area_codes": "413",
  "latitude": "42.19",
  "longitude": "-73.35",
  "country": "US",
  "estimated_population": "5873"
}
```

### Sample Events

```json
{
  "httpMethod": "GET",
  "path": "/resource",
  "headers": {},
  "queryStringParameters": {
    "date": "2020-11-13"
  }
}
```

```json
{
  "httpMethod": "POST",
  "path": "/resource",
  "headers": {
    "content-type": "application/json"
  },
  "body": "{\"title\":\"hello world\"}"
}
```

## Suggestions

- Spend as much or as little time as you wish on this challenge.
- Many implementation details are up to you, be prepared to explain your decisions.
- Details matter, but you should strive to provide a complete feature.
- Use any node packages you want, just remember we want to know what _you_ can do.
- Consider how you can show how your feature should work, and prove that it does work.

## Getting started

- this bundle contains a git repository
- work locally, commit changes
- push to your own git service
- share the repository link with us

## Package Scripts

| command              | description                  |
| :------------------- | :--------------------------- |
| `npm run format:fix` | format files with "prettier" |
| `npm run test`       | execute tests with "jest"    |



# This uses the AWS cloud CDK

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


### notes
`p2o 'C:\Users\Brian\Downloads\Aura Interview.postman_collection.json' -f .\Downloads\api.yml`

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/aws-lambda/trigger/api-gateway-proxy.d.ts

https://docs.aws.amazon.com/cdk/api/v1/docs/aws-apigateway-readme.html

https://aws.amazon.com/blogs/compute/best-practices-for-organizing-larger-serverless-applications/