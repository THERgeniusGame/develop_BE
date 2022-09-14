class GameRule{
    constructor(){
        this.coin=100;
    }
    /*
    user1,user2={
        userId
        nickname
        socketId
    }
    coin=Int
    firstTurn=0or1
     */
    //시작 금액

    randomTurn=()=>{
        if(Math.round(Math.random())===1){
            return ["guest","owner"];
        }else{
            return ["owner","guest"];
        }
    }

    //플레이어의 기본정보
    setPlayer=(u1)=>{
        return {
            userId:u1.userId,
            nickname:u1.nickname,
            socketId:u1.socketId,
            cards:(u1.cards===null||u1.cards===undefined)?[0,1,2,3,4,5,6,7,8,9]:u1.cards,
            battingCards:(u1.battingCards===null||u1.battingCards===undefined)?[]:u1.battingCards,
            coin:(u1.coin===null||u1.coin===undefined)?100:u1.coin,
            result:(u1.result===null||u1.result===undefined)?[]:u1.result,
            win:(u1.win===null||u1.win===undefined)?0:u1.win,
        }
    }

    //사용하는 카드등록 및 cards에서 제거
    //input: card=array(2)
    setUseCard=(card,p)=>{
        console.log(p)
        let index=p.cards.findIndex(ele=>ele==card)
        if(index!==-1){
            p.cards.splice(index,1);
            p.battingCards.push(card/1);
        }else{
            const err=new Error("BAD_USECARD");
            throw(err);
        }
    }

    roundResult=(p1,p2,batting,round)=>{
        console.log(p1.battingCards.at(round-1))
        console.log(p2.battingCards.at(round-1))
        if(p1.battingCards.at(round-1)<p2.battingCards.at(round-1)){
            p1.result.push("lose")
            p1.coin-=batting;
            p2.result.push("win")
            p2.coin+=batting;
            p2.win++;
        }else if(p1.battingCards.at(round-1)===p2.battingCards.at(round-1)){
            p1.result.push("draw")
            p1.coin-=batting;
            p2.result.push("draw")
            p2.coin-=batting;
        }else if(p1.battingCards.at(round-1)>p2.battingCards.at(round-1)){
            p1.result.push("win")
            p1.coin+=batting;
            p2.result.push("lose")
            p2.coin-=batting;
            p1.win++;
        }
        return {
            p1:p1,p2:p2
        }
    }

    checkPlay=(p)=>{
        if(p.coin<=0){
            this.endGame(this.player1,this.player2);
        }
    }
    
    endGame=(p1,p2)=>{
        if(p1.coin<p2.coin){
            return {
                winner:p2.nickname,
                loser:p1.nickname,
                };
        }else if(p1.coin==p2.coin){
            let p1Win=p1.result.filter(ele=>{
                ele==="win"
            }).length
            let p2Win=p2.result.filter(ele=>{
                ele==="win"
            }).length
            if(p1Win>p2Win){
                return {
                    winner:p1.nickname,
                    loser:p2.nickname,
                };
            }else if(p1Win<p2Win){
                return {
                    winner:p1.nickname,
                    loser:p2.nickname,
                };
            }else{
                return {
                    winner:"draw",
                    loser:"draw",
                };
            }
        }else if(p1.coin>p2.coin){
            return {
                winner:p1.nickname,
                loser:p2.nickname,
            };
        }
    }
}

// let userList=[{userId: 1, nickname: '은나무', socketId: 'fEC1BWKzOAEk16hlAAAD'},
// {userId: 2, nickname: '금나무', socketId: 'fEC1BWKzOAEk16hlAAAD'}]
// let game=new GameRule(userList[0],userList[1],89);
// console.log(game.player1)
// console.log(game.player2)
// console.log("----------------------")
// while(game.round<10 && game.lastWinner===""){
//     game.startGame(0,[]);
//     console.log(game.round)
//     console.log(game.player1)
//     console.log(game.player2)
//     console.log("----------------------")
// }
// console.log("lastWinner : "+game.lastWinner)

module.exports=GameRule;