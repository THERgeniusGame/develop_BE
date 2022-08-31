const { CostExplorer } = require("aws-sdk");

const error404 = (socket, next) => {
  const error = new Error(`${socket.request} ${socket.request.method} 존재하지 않습니다.`);
  error.status = 404;
  next(error);
};

const error = (err, socket, next) => {
    console.log(socket)
//   socket.response.locals.message = err.message;
//   socket.res.locals.error = err;
//   console.log(err)
//   res.status(err.status || 500).send(err.message);
};

module.exports = {
  error404,
  error,
};
