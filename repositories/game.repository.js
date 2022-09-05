const { Games } = require("../models");

module.exports = class GameRepository {

  createGame=async (roomId,owner,guest,turn) => {
    const createRoom = await Games.create({
        roomId:roomId,
        round:0,
        batting:0,
        turn:turn,
        owner:owner,
        guest:guest,
        
    });
    return createRoom;
  }

  setBatting=async(roomId,batting)=>{
    const updateInfo=await Games.update(
        {
            batting:batting
        },
        {
            where:{
                roomId:roomId
            }
        }
    )
    return updateInfo
  }

  setOwnerInfo=async(roomId,owner,turn)=>{
    const updateInfo=await Games.update(
        {
            owner:owner,
            turn:(turn+1)%3,
        },
        {
            where:{
                roomId:roomId
            }
        }
    )
    return updateInfo
  }

  setGuestInfo=async(roomId,guest,turn)=>{
    const updateInfo=await Games.update(
        {
            guest:guest,
            turn:(turn+1)%3,
        },
        {
            where:{
                roomId:roomId
            }
        }
    )
    return updateInfo
  }

  setResultInfo=async(roomId,round,owner,guest)=>{
    const updateInfo=await Games.update(
        {
            round:round,
            batting:0,
            turn:0,
            owner:owner,
            guest:guest,
        }
    )
    return updateInfo
  }

  getGameInfo=async(roomId)=>{
    const info=await Games.findOne({
        where:{
            roomId:roomId
        }
    })
    return info;
  }
};

//turn=0,1:owner or guest 의 차례 , turn=2:결과 생성