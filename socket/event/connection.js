const Login=require("./login.evnet")
const Chat=require('./chat.event');
const Disconnect=require("./disconnect.event")
const RoomRepository = require("../../repositories/room.repository");

const roomRepository = new RoomRepository();
getRoomList = () => {
    const list = roomRepository.getRoomList();
    return list;
};

getRoomId=(room)=>{
    const roomId = roomRepository.findRoomId(room);
    return roomId;
}
module.exports=async(io)=>{
    let roomList=await getRoomList();
    roomList.map(room=>room.userCount=0);
    io.on("connection", async(socket) => {
        console.log(roomList);
        // console.log(socket)
        // 접속한 클라이언트의 정보가 수신되면
        Login(io,socket,roomList);
        
        // 클라이언트로부터의 메시지가 수신되면
        Chat(io,socket);
        // force client disconnect from server
        Disconnect(io,socket,roomList)
    })
}