class GameRule{
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
    //플레이어의 기본정보
    setPlayer=(u1,turn)=>{
        return {
            userId:u1.userId,
            nickname:u1.nickname,
            socketId:u1.socketId,
            cards:[0,1,2,3,4,5,6,7,8,9],
            battingCards:[],
            coin:this.coin,
            result:[],
            win:0,
            turn:turn
        }

    }

    //사용하는 카드등록 및 cards에서 제거
    //input: card=array(2)
    setUseCard=(card,p)=>{
        let index=p.cards.findIndex(ele=>ele==card)
        if(index!==-1){
            p.cards.splice(index,1);
            p.useCards.push(card/1)
            p.turn=false
        }else{
            const err=new Error("BAD_USECARD");
            throw(err);
        }
    }

    roundResult=(p1,p2)=>{
        p1.turn=true;
        p2.turn=true;
        if(p1.useCards.at(this.round)<p2.useCards.at(this.round)){
            p1.result.push("lose")
            p1.coin-=this.batting;
            p2.result.push("win")
            p2.coin+=this.batting;
            p2.win++;
        }else if(p1.useCards.at(this.round)===p2.useCards.at(this.round)){
            let result1=[p1.useCards.at(this.round),p2.useCards.at(this.round),"draw"];
            p1.result.push(result1)
            p1.coin-=this.batting;
            p2.result.push("draw")
            p2.coin-=this.batting;
        }else{
            this.roundResult(p2,p1);
        }
    }

    checkPlay=(p)=>{
        if(p.coin<=0){
            this.endGame(this.player1,this.player2);
        }
    }
    
    endGame=(p1,p2)=>{
        if(this.lastWinner!==""){
            return;
        }
        if(p1.coin<p2.coin){
            this.lastWinner=p2.user.nickname
        }else if(p1.coin==p2.coin){
            this.lastWinner="";
        }else{
            this.endGame(p2,p1);
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