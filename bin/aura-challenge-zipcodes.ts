#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AuraChallengeZipcodesStack } from '../lib/aura-challenge-zipcodes-stack';

const app = new cdk.App();
new AuraChallengeZipcodesStack(app, 'AuraChallengeZipcodesStack');
