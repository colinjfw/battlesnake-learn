# A simple [Battlesnake](http://play.battlesnake.com) written in Javascript for NodeJS

This is a basic implementation of the [Battlesnake API](https://docs.battlesnake.com/snake-api). It's a great starting point for anyone wanting to program their first Battlesnake using Javascript. It comes ready to deploy to [AWS Lambda](https://aws.amazon.com/lambda/).

### Technologies

This Battlesnake uses [Javascript](https://www.javascript.com/), [NodeJS](https://nodejs.dev/), and [AWS Lambda](https://aws.amazon.com/lambda/). You will also need [npm](https://docs.npmjs.com/getting-started/) to assist with Javascript dependency management.

### Prerequisites

* [GitHub Account](https://github.com/) and [Git Command Line](https://www.atlassian.com/git/tutorials/install-git)
* [AWS Account](https://aws.amazon.com/)
* [Battlesnake Account](https://play.battlesnake.com)

### Deploying

Before starting ensure that you have access to your AWS account. You can run the
below command to make sure that you credentials are configured:

    aws sts get-caller-identity

Install the following command line tools before getting started:

1. Install the [AWS CLI](https://aws.amazon.com/cli/).
1. Install the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html).

Now to deploy your code, we'll simply invoke the `sam` cli tool:

    sam deploy --stack-name Battlesnake --guided

Your code is now deployed! To find the endpoint where your snake exists run the
below command to inspect your cloudformation stack:

    aws cloudformation describe-stack-resources --stack-name Battlesnake

The resource id of your api gateway is what we need to find to build the url for
your snake. The resource will look similar to this:

```json
{
    "StackName": "Battlesnake",
    "StackId": "arn:aws:cloudformation:us-west-2:414904551680:stack/Battlesnake/909d56f0-76ff-11ea-a413-02eb596faf62",
    "LogicalResourceId": "ServerlessRestApi",
    "PhysicalResourceId": "dmgqc630fe",
    "ResourceType": "AWS::ApiGateway::RestApi",
    ...
},
```

Once you've found the ID of your Api Gateway you can reach your snake at the
following endpoint:

    https://<id>.execute-api.us-west-2.amazonaws.com/Prod/move

Congratulations! You've deployed a snake to AWS Lambda.
