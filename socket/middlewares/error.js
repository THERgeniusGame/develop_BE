const error =async(err,io,socket) => {
  console.log(err)
  await io.to(socket.id).emit("error",{error:err})
};

module.exports = {
  error
};
