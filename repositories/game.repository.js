const { Games } = require("../models");

module.exports = class GameRepository {

  createGame=async (roomId,owner,guest) => {
    const createGame = await Games.create({
        roomId:roomId,
        round:1,
        batting:0,
        owner:owner,
        guest:guest,
        
    });
    return createGame;
  }

  newGame=async(gameId,owner,guest)=>{
    const newGame = await Games.update({
        round:1,
        batting:0,
        owner:owner,
        guest:guest,
        },
        {
            where:{
                gameId:gameId
            }
        }
    );
    return newGame
  }

  setBatting=async(gameId,batting)=>{
    const updateInfo=await Games.update(
        {
            batting:batting
        },
        {
            where:{
                gameId:gameId
            }
        }
    )
    return updateInfo
  }

  setOwnerInfo=async(gameId,owner)=>{
    const updateInfo=await Games.update(
        {
            owner:owner,
        },
        {
            where:{
                gameId:gameId
            }
        }
    )
    return updateInfo
  }

  setGuestInfo=async(gameId,guest)=>{
    const updateInfo=await Games.update(
        {
            guest:guest,
        },
        {
            where:{
                gameId:gameId
            }
        }
    )
    return updateInfo
  }

  setResultInfo=async(gameId,round,owner,guest)=>{
    const updateInfo=await Games.update(
        {
            round:round,
            batting:0,
            owner:owner,
            guest:guest,
        },
        {
            where:{
                gameId:gameId,
            }
        }
    )
    return updateInfo
  }

  getGameInfo=async(gameId)=>{
    const info=await Games.findOne({
        where:{
            gameId:gameId
        },
        raw:true
    })
    console.log(info)
    return info;
  }
};

//turn=0,1:owner or guest 의 차례 , turn=2:결과 생성