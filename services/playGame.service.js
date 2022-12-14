const Repo = require("../repositories/room.repository");
const GameRepo = require("../repositories/game.repository");
const UserService = require("../services/user.service");
const GameFuntion = require("../socket/game/game.js");

class Service {
  repo = new Repo();
  gameRepo = new GameRepo();
  game = new GameFuntion();
  userService = new UserService();
    randomTurn=()=>{
        return this.game.randomTurn();
    }
  getRoomInfo = async (roomId) => {
    const getRoom = await this.repo.findRoomId(roomId);
    return getRoom;
  };
  error = (status, msg) => {
    let err = new Error(msg);
    err.status = status;
    return err;
  };
  createGame = async (roomId, turn,owner, guest) => {
    try {
      let ownerInfo = this.game.setPlayer(owner);
      let guestInfo = this.game.setPlayer(guest);
      const createGame = await this.gameRepo.createGame(
        roomId,
        turn,
        ownerInfo,
        guestInfo
      );
      return createGame;
    } catch (error) {
      throw error;
    }
  };

  setBatting = async (gameId, batting) => {
        const getInfo=await this.gameRepo.getGameInfo(gameId);
        if(getInfo.batting===0){
        const setBatting = await this.gameRepo.setBatting(gameId, batting);
        return setBatting;
        }else{
            return;
        }
  };
  setOwnerInfo = async (gameId, owner, turn) => {
    let ownerInfo = this.game.setPlayer(owner);
    const updateOwner = await this.gameRepo.setOwnerInfo(
      gameId,
      ownerInfo,
      turn
    );
    return updateOwner;
  };
  setGuestInfo = async (gameId, guest, turn) => {
    let guestInfo = this.game.setPlayer(guest);
    const updateGuest = await this.gameRepo.setGuestInfo(
      gameId,
      guestInfo,
      turn
    );
    return updateGuest;
  };

  setUseCard = async (gameId, userInfo, card, turn) => {
    this.game.setUseCard(card, userInfo);
    if (turn === "owner") {
      var update = await this.gameRepo.setOwnerInfo(gameId, userInfo);
    } else {
      var update = await this.gameRepo.setGuestInfo(gameId, userInfo);
    }
    return update;
  };

  setResultInfo = async (gameId, round) => {
    const getInfo = await this.gameRepo.getGameInfo(gameId);
    const player=this.game.roundResult(getInfo.owner, getInfo.guest,getInfo.batting,getInfo.round);
    round++;
    const updateResult = await this.gameRepo.setResultInfo(
      gameId,
      round,
      player.p1,
      player.p2
    );
    return updateResult;
  };

  getGameInfo = async (gameId) => {
    try {
      const getInfo = await this.gameRepo.getGameInfo(gameId);
      if (getInfo === null) {
        return null;
      }
      if(getInfo.turn==="owner"){
        getInfo.turn=["owner","guest"]
      }else if(getInfo.turn==="guest"){
        getInfo.turn=["guest","owner"]
      }
      return getInfo;
    } catch (err) {
      throw err;
    }
  };
  EndGameWinLose=async(p1,p2)=>{
    let result = this.game.endGame(p1, p2);
    let total1 = await this.userService.upTotal(p1.userId);
    let total2 = await this.userService.upTotal(p2.userId);
    if (result.winner === p1.nickname) {
      const win1 = await this.userService.upWin(p1.userId);
      const lose2 = await this.userService.uplose(p2.userId);
    } else if(result.winner === p2.nickname){
      const win2 = await this.userService.upWin(p2.userId);
      const lose1 = await this.userService.uplose(p1.userId);
    }
  }

  EndGame = async (p1, p2) => {
    let result = this.game.endGame(p1, p2);
    // await this.userRepo.
    return result;
  };

  surrenderGame=async (surren,p1, p2) => {
    let result = this.game.surrenderGame(surren,p1, p2);
    let total1 = await this.userService.upTotal(p1.userId);
    let total2 = await this.userService.upTotal(p2.userId);
    if (result.winner === p1.nickname) {
      const win1 = await this.userService.upWin(p1.userId);
      const lose2 = await this.userService.uplose(p2.userId);
    } else if(result.winner === p2.nickname){
      const win2 = await this.userService.upWin(p2.userId);
      const lose1 = await this.userService.uplose(p1.userId);
    }
    // await this.userRepo.
    return result;
  };

  checkPw = async (roomId, roomPw) => {
    try {
      const checkPw = await this.gameRepo.checkPw(roomId);
      if (checkPw.roomPw === roomPw) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      throw error;
    }
  };

  //????????????
  turnUpdate=async(gameId)=>{
    //???????????? db
    const update = await this.gameRepo.turnUpdate(gameId);
    const gameInfo=await this.getGameInfo(gameId);
    return gameInfo
  }
}

module.exports = Service;
