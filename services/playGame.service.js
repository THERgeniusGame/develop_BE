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
    error=(status,msg)=>{
        let err=new Error(msg);
        err.status=status;
        return err
    }
    createGame=async (roomId,owner,guest) => {
        try {
            let ownerInfo=this.game.setPlayer(owner);
            let guestInfo=this.game.setPlayer(guest);
            let checkGame=await this.getGameInfo(roomId,1);
            console.log(checkGame)
            if(checkGame!==null || checkGame!==undefined){
                const newGame=await this.gameRepo.newGame(roomId,ownerInfo,guestInfo);
                return newGame;    
            }
            const createGame=await this.gameRepo.createGame(roomId,ownerInfo,guestInfo);
            return createGame;
        } catch (error) {
            throw(error)
        }
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
    
    getGameInfo=async(roomId,turn)=>{
        try{
            const getInfo=await this.gameRepo.getGameInfo(roomId);
            if(getInfo===null){
                return;
            }
            getInfo.turn=turn
            return getInfo;
        }catch(err){
            throw(err)
        }
    }

    EndGame=async(p1,p2)=>{
        return this.game.endGame(p1,p2);
    }
}

module.exports=Service