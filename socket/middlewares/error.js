const error = (err, socket) => {
  socket.emit("error",{
    error:err.msg
  })
  console.log(err)
};

module.exports = {
  error,
};
