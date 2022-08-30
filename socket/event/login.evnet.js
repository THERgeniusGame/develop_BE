module.exports=(io,socket)=>{
    socket.on("login", async(data) => {
        //room 검사
      //   const room=data.room
      //   if(roomList.filter((ele)=>(ele.roomId==room).length===0)){
      //     let currentID=await this.getRoomId(room);
      //     if(currentID===null || currentID===undefined ){
      //       console.log("room: "+room+" is WRONG_URL");
      //       socket.disconnect();
      //       return;
      //     }else{
      //       roomList.push({roomId:room})
      //     }
      //   } 
        console.log(
          "Client logged-in:\n nickname:" +
            data.nickname +
            "\n userid: " +
            data.userid +
            "\n this room: " +
            data.room
        );
        // socket에 클라이언트 정보를 저장한다
        socket.nickname = data.nickname;
        socket.userid = data.userid;
        socket.room=data.room;

        socket.join(socket.room);
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        io.to(data.room).emit("login", data.nickname);
      });
}