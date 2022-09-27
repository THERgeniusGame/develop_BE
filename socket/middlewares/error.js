const error =(err,io,socket) => {
  console.log(err)
  io.to(socket.id).emit("error",{error:err.message}).then((success)=>{
    if(success){
      console.log("error catch")
    }
  })
  if(err.message==="Wrong-Url"){
    socket.disconnect();
  }
};

module.exports = {
  error
};
