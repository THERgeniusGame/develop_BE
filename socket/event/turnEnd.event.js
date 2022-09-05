const { error } = require("../middlewares/error");

module.exports = (io, socket,) => {
    socket.on("turnEnd", async(data) => {
        try{
            console.log("room : "+socket.room+"/ gamestart");
            io.to(socket.room).emit("gamestart",socket.game);
        }catch(err){
            error(err,socket)
        }
    });
};
