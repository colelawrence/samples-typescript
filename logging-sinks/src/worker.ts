// @@@SNIPSTART typescript-logger-sink-worker
import { defaultSinks, InjectedSinks, Worker } from '@temporalio/worker';
import { LoggerSinks } from './workflows';

async function main() {
  const sinks: InjectedSinks<LoggerSinks> = {
    ...defaultSinks(),
    logger: {
      info: {
        fn(workflowInfo, message) {
          console.log('workflow: ', workflowInfo.runId, 'message: ', message);
        },
        callDuringReplay: false, // The default
      },
    },
  };
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    taskQueue: 'logging-sinks',
    sinks,
  });
  await worker.run();
  console.log('Worker gracefully shutdown');
}

main().then(
  () => void process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
// @@@SNIPEND
