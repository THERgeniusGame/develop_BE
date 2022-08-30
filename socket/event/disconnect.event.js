const RoomRepository = require("../../repositories/room.repository");
const roomRepository = new RoomRepository();

const deleteRoom=async(roomId)=>{
    return await roomRepository.deleteRoom(roomId);
}

module.exports = (io, socket,roomList) => {
    socket.on("forceDisconnect", () => {
        socket.disconnect();
    });

    socket.on("disconnect", async() => {
        if(socket.nickname===undefined)return;
        const index=roomList.findIndex(ele=>ele.roomId==socket.room);
        roomList[index].userCount--;
        if(roomList[index].userCount<=0){
            roomList.splice(index,1);
            // const result=await deleteRoom(socket.room)
            // console.log(result)
        }
        console.log("user disconnected: " + socket.nickname);
    });
};
