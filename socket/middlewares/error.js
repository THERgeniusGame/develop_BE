const error =(err,io,socket) => {
  console.log(err)
  io.to(socket.id).emit("error",{error:err.message})
  if(err.message==="Wrong-Url"){
    socket.disconnect();
  }
};

module.exports = {
  error
};
