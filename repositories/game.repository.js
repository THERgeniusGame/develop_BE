const { Games } = require("../models");

module.exports = class GameRepository {

  createGame=async (roomId,owner,guest) => {
    const createRoom = await Games.create({
        roomId:roomId,
        round:1,
        batting:0,
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

  setOwnerInfo=async(roomId,owner)=>{
    const updateInfo=await Games.update(
        {
            owner:owner,
        },
        {
            where:{
                roomId:roomId
            }
        }
    )
    return updateInfo
  }

  setGuestInfo=async(roomId,guest)=>{
    const updateInfo=await Games.update(
        {
            guest:guest,
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
            owner:owner,
            guest:guest,
        },
        {
            where:{
                roomId:roomId,
            }
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