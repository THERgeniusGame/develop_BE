const RoomRepository = require("../../repositories/room.repository");
const roomRepository = new RoomRepository();
const { error } = require("../middlewares/error");

module.exports = (io, socket,roomList) => {
    
    socket.on("forceDisconnect", () => {
        socket.disconnect();
    });
    
    socket.on("disconnect", async() => {
        try{

            if(socket.nickname===undefined)return;
            const index=roomList.findIndex(ele=>ele.roomId==socket.room);
            roomList[index].userCount--;
            if(roomList[index].userCount<=0){
                roomList.splice(index,1);
                // const result=await deleteRoom(socket.room)
                // console.log(result)
            }
            console.log("user disconnected: " + socket.nickname);
        }catch(err){
            error(err,socket)
        }
    });
};
