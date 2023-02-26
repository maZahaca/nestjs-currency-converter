import { Callback, Context, Handler } from 'aws-lambda';

import { bootstrap } from './bootstrap';

let server: Handler;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

export const handler: Handler = async (
  event: any, // TODO: properly define this, any on tutorial
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());

  try {
    console.time('#perf handler time');
    return server(event, context, callback);
  } finally {
    console.timeEnd('#perf handler time');
  }
};
