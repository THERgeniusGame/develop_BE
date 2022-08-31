const error404 = (socket) => {
  const error = new Error(`${socket.url} ${socket.method} 존재하지 않습니다.`);
  error.status = 404;
};

const error = (err, socket) => {
  console.log(err)
};

module.exports = {
  error404,
  error,
};
