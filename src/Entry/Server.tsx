import * as cluster from 'cluster';
import * as os from 'os';
import monitoring = require('elastic-apm-node');

const isMulticore: any = !!process.env.MULTI;

import { getConfig, readConfig } from '../Modules/Config';
readConfig();

import * as Log from '../Server/Log';
import * as Server from '../Server/Server';

export function run() {
  if (getConfig().monitoring) monitoring.start(getConfig().monitoring);

  if (!isMulticore) {
    const app = new Server.Server();
    app.start();
  } else {
    if (cluster.isMaster) {
      const numCPUs = os.cpus().length;

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', function(worker, code, signal) {
        Log.logInfo('Thread ' + worker.process.pid + ' died.');
        cluster.fork();
      });

      cluster.on('listening', function(worker, address) {
        Log.logInfo('Thread started with PID ' + worker.process.pid + '.');
      });
    } else {
      const app = new Server.Server();
      app.start();
    }
  }
}