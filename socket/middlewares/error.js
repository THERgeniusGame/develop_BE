const error =async(err,io,socket) => {
  console.log(err)
  await io.to(socket.id).emit("error",{error:err})
};
const errorRoom =async(err,io,socket) => {
  console.log(err)
  await io.to(socket.room).emit("error",{error:err})
};

module.exports = {
  error,
  errorRoom
};
