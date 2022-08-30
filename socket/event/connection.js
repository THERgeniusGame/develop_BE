const Login=require("./login.evnet")
const Chat=require('./chat.event');
const Disconnect=require("./disconnect.event")


getRoomList = () => {
    const list = this.roomRepository.getRoomList();
    return list;
};

getRoomId=(room)=>{
    const roomId = this.roomRepository.findRoomId(room);
    return roomId;
}
module.exports=(io)=>{
    let nsp = io.on("connection", (socket) => {
        // console.log(socket)
        // 접속한 클라이언트의 정보가 수신되면
        Login(io,socket)
  
        // 클라이언트로부터의 메시지가 수신되면
        Chat(io,socket);
        // force client disconnect from server
        Disconnect(io,socket)
    })

}