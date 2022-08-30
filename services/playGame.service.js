const Repo=require("../repositories/room.repository")
class Service{
    repo=new Repo();
    getRoomInfo=async(roomId)=>{
        const getRoom=await this.repo.findRoomId(roomId);
        return getRoom;
    }
}

module.exports=Service