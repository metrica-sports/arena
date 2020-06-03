const express = require('express');
const path = require('path');
const Arena = require('./src/server/app');
const routes = require('./src/server/views/routes');

// Production by default.
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

function run(config, listenOpts = {}) {
  const {app, Queues} = Arena();

  if (config) Queues.setConfig(config);
  Queues.useCdn = typeof listenOpts.useCdn !== 'undefined' ? listenOpts.useCdn : true;

  app.locals.appBasePath = listenOpts.basePath || app.locals.appBasePath;

  if (process.env.NODE_ENV === 'production') {
    app.use(app.locals.appBasePath, express.static(path.join(__dirname, 'public')));
    app.use(app.locals.appBasePath, routes);
  } else {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(routes);
  }

  const port = listenOpts.port || 4567;
  const host= listenOpts.host || 'localhost'; // Default: listen to all network interfaces.
  if (!listenOpts.disableListen) {
    app.listen(port, host, () => console.log(`Arena is running on port ${port} at host ${host}`));
  }

  return app;
}

if (require.main === module) run();

module.exports = run;
