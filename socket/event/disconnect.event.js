const RoomRepository = require("../../repositories/room.repository");
const { error } = require("../middlewares/error");
const roomRepository = new RoomRepository();

module.exports = (io, socket,roomList,msg) => {
    
    socket.on("forceDisconnect", () => {
        socket.disconnect();
    });
    socket.on("disconnect", async() => {
        try{
            if(socket.nickname===undefined){
                throw("None-User")   
            }
            // chat emit
            let chat={
                nickname: socket.nickname,
                msg: "님이 퇴장하셨습니다.",
            }
            io.to(socket.room).emit("chat",chat)
            const index=roomList.findIndex(ele=>ele.roomId==socket.room);
            if(index!==-1){
                roomList[index].userCount--;
                await roomRepository.downCurrentUsers(socket.room);
                if(roomList[index].userCount<=0 || roomList[index].ownerId==socket.userId){
                    roomList.splice(index,1);
                    const result=await roomRepository.deleteRoom(socket.room)
                }
            }
            console.log("user disconnected: " + socket.nickname);
        }catch(err){
            error(err,io,socket)
        }
    });
    
    socket.on('kick', (data)=> {
        try{
            socket.to(data.socketId).emit('kick',{success:true});
        } catch(err){
            error(err,io,socket)
    }
    });
};
