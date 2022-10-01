const RoomController = require("../controllers/room.controller");
const { Games, Rooms } = require("../models");

module.exports = class GameRepository {
  createGame = async (roomId,turn, owner, guest) => {
    const createGame = await Games.create({
      roomId: roomId,
      turn:turn,
      round: 1,
      batting: 0,
      owner: owner,
      guest: guest,
    });
    return createGame;
  };

  newGame = async (gameId, owner, guest) => {
    const newGame = await Games.update(
      {
        round: 1,
        batting: 0,
        owner: owner,
        guest: guest,
      },
      {
        where: {
          gameId: gameId,
        },
      }
    );
    return newGame;
  };

  setBatting = async (gameId, batting) => {
    const updateInfo = await Games.update(
      {
        batting: batting,
      },
      {
        where: {
          gameId: gameId,
        },
      }
    );
    return updateInfo;
  };

  setOwnerInfo = async (gameId, owner) => {
    const updateInfo = await Games.update(
      {
        owner: owner,
      },
      {
        where: {
          gameId: gameId,
        },
      }
    );
    return updateInfo;
  };

  setGuestInfo = async (gameId, guest) => {
    const updateInfo = await Games.update(
      {
        guest: guest,
      },
      {
        where: {
          gameId: gameId,
        },
      }
    );
    return updateInfo;
  };

  setResultInfo = async (gameId, round, owner, guest) => {
    const updateInfo = await Games.update(
      {
        round: round,
        batting: 0,
        owner: owner,
        guest: guest,
      },
      {
        where: {
          gameId: gameId,
        },
      }
    );
    return updateInfo;
  };

  getGameInfo=async(gameId)=>{
    const info=await Games.findOne({
        where:{
            gameId:gameId
        },
        raw:true
    })
    return info;
  };

  checkPw = async (roomId) => {
    try {
      const checkPw = await Rooms.findOne({
        where: {
          roomId: roomId,
        },
        raw: true,
      });

      return checkPw;
    } catch (error) {
      throw error;
    }
  };

  //턴바꾸기
  turnUpdate=async(gameId)=>{
    const info=await Games.findOne({
        where:{
            gameId:gameId
        },
        raw:true
    })
    let turn="";
    if(info.turn=="owner"){
      turn="guest";
    }else if(info.turn=="guest"){
      turn="owner";
    }
    const updateTurn = await Games.update(
      {
        turn:turn
      },
      {
        where: {
          gameId: gameId,
        },
      }
    );
    return updateTurn;
  };
};

//turn=0,1:owner or guest 의 차례 , turn=2:결과 생성
