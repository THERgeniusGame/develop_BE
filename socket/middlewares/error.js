const error = (err, socket) => {
  socket.emit("error",{
    error:err
  })
  console.log(err)
};

module.exports = {
  error,
};
