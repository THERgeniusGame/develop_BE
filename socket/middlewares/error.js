const error =async(err,io,socket) => {
  console.log(err)
  console.log(socket.id)
  await io.to(socket.id).emit("error",{error:err})
};

module.exports = {
  error
};
