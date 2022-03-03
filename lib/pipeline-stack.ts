import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

      const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: 'cdkPipeline',
        synth: new ShellStep('Synth', {
          input: CodePipelineSource.connection('awsa2ron/cdk-pipeline', 'main',{
						connectionArn:
							"arn:aws:codestar-connections:us-west-2:839607536172:connection/0ff04336-df6f-4ecf-a9f4-951f30cffe9a"
					}),
                              installCommands: [
                        'npm i -g npm && npm ci'
                    ],
          commands: ['npm run build',
                     'npx cdk synth']
        })
      });
  }
}
