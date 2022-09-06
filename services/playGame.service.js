const Repo=require("../repositories/room.repository")
const GameRepo=require("../repositories/game.repository")
const GameFuntion=require("../socket/game/game.js")

class Service{
    repo=new Repo();
    gameRepo=new GameRepo();
    game=new GameFuntion();
    getRoomInfo=async(roomId)=>{
        const getRoom=await this.repo.findRoomId(roomId);
        return getRoom;
    }

    createGame=async (roomId,owner,guest) => {
        let ownerInfo=this.game.setPlayer(owner);
        let guestInfo=this.game.setPlayer(guest);
        const createGame=await this.gameRepo.createGame(roomId,ownerInfo,guestInfo);
        return createGame;
    }
    
    setBatting=async(roomId,batting)=>{
        const setBatting=await this.gameRepo.setBatting(roomId,batting);
        return setBatting;
    }
    setOwnerInfo=async(roomId,owner,turn)=>{
        let ownerInfo=this.game.setPlayer(owner);
        const updateOwner=await this.gameRepo.setOwnerInfo(roomId,ownerInfo,turn);
        return updateOwner;
    }
    setGuestInfo=async(roomId,guest,turn)=>{
        let guestInfo=this.game.setPlayer(guest);
        const updateGuest=await this.gameRepo.setGuestInfo(roomId,guestInfo,turn);
        return updateGuest;
    }
    
    setUseCard=async(roomId,userInfo,card,turn)=>{
        this.game.setUseCard(card,userInfo);
        if(turn==="owner"){
            var update=await this.gameRepo.setOwnerInfo(roomId,userInfo,turn);
        }else{
            var update=await this.gameRepo.setGuestInfo(roomId,userInfo,turn);
        }
        return update;
    }

    setResultInfo=async(roomId,round,owner,guest)=>{
        this.game.roundResult(owner,guest)
        round++;
        const updateResult=await this.gameRepo.setResultInfo(roomId,round,owner,guest);
        return updateResult;
    }
    
    getGameInfo=async(roomId)=>{
        const getInfo=await this.gameRepo.getGameInfo(roomId);
        return getInfo;
    }

    EndGame=async(p1,p2)=>{
        return this.game.endGame(p1,p2);
    }
}

module.exports=Service