const RoomRepository = require("../../repositories/room.repository");
const { error } = require("../middlewares/error");
const roomRepository = new RoomRepository();

module.exports = (io, socket,roomList,msg) => {
    
    socket.on("forceDisconnect", () => {
        socket.disconnect();
    });
    console.log()
    socket.on("disconnect", async() => {
        try{
            if(socket.nickname===undefined)return;
            const index=roomList.findIndex(ele=>ele.roomId==socket.room);
            if(index!==-1){
                roomList[index].userCount--;
                if(roomList[index].userCount<=0){
                    // roomList.splice(index,1);
                    // const result=await roomRepository.deleteRoom(socket.room)
                    console.log(result)
                }
            }
            console.log("user disconnected: " + socket.nickname);
        }catch(err){
            error(err,socket)
        }
    });
    
    socket.on('kick', (socketid)=> {
        try{
            socket.to(socketId).emit('kick');
        } catch(err){
            error(err, socket)
    }
    });
};
