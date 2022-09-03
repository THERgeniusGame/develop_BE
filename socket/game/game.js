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
    constructor(user1,user2,coin,firstTurn){
        this.round=0;
        this.batting=0;
        this.coin=coin;
        this.turn=firstTurn;
        this.player1=this.setPlayer(user1);
        this.player2=this.setPlayer(user2);
        this.lastWinner=""
    }
    //시작 금액
    //플레이어의 기본정보
    setPlayer=(u1)=>{
        return {
            user:u1,
            cards:[0,1,2,3,4,5,6,7,8,9],
            useCards:[],
            coin:this.coin,
            result:[],
            win:0,
        }
    }
    setGame=(maxBattig,minBatting)=>{

    }

    setBatting=(batting)=>{
        if(batting>this.player1.coin){
            this.lastWinner=this.player2.user.nickname
        }else if(batting> this.player2.coin){
            this.lastWinner=this.player1.user.nickname
        }
        this.batting=batting;
    }

    setUseCard=(card,p)=>{
        console.log("card : "+card)
        console.log("p : "+p.user.nickname)
        let index=p.cards.findIndex(ele=>ele==card)
        if(index!==-1){
            p.cards.splice(index,1);
            p.useCards.push(card/1)
        }else{
            const err=new Error("BAD_USECARD");
            throw(err);
        }
    }

    roundResult=(p1,p2)=>{
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
    
    // input:batting=int,card=array(2)
    startGame=(batting,card)=>{
        if(this.round>=10 || this.lastWinner!==""){
           return this.endGame(this.player1,this.player2);
            //최종 승리자
        }

        this.setBatting(10);
        //batting 설정함수
        //input:batting=int
        
        this.setUseCard(card[0],this.player1)
        this.setUseCard(card[1],this.player2)
        //사용하는 카드등록 및 cards에서 제거
        //input: card=array(2)

        this.roundResult(this.player1,this.player2);
        //결과저장 및 승리 횟수 저장

        this.checkPlay(this.player1);
        this.checkPlay(this.player2);
        //패배 조건 확인

        this.batting=0;
        this.round++;
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