const error =(err,io,socket) => {
  console.log(err)
  io.to(socket.id).emit("error",{error:err.message})
};

module.exports = {
  error
};
