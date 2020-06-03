function handler(req, res) {
  const {Queues} = req.app.locals;
  const queues = Queues.list();
  const basePath = process.env.NODE_ENV === 'production' ? req.baseUrl : '/arena';

  return res.render('dashboard/templates/queueList', { basePath, queues });
}

module.exports = handler;
