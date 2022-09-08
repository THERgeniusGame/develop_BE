const MypageRepository = require("../repositories/mypage.repository");

class MypageService {
    mypageRepository = new MypageRepository();

    mypage = async ( userId ) => {
        const my = await this.mypageRepository.mypage( userId )
        if(!my){
            return {status:400, message:"mypage가 존재 하지 않는다."}
        }
        my.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        const mypage = my.map(post => {
            return { mypage:{
                userId:userId,
                nickname: nickname,
                win:0,
                total:0,
                }
            }
        });
        return {status:200, mypage }
    };

    Withdrawal = async ( userId ) => {
        try {
            const data = await this.mypageRepository.myinfo( userId )
            if(!data){
                return {status:400, message:"이미 없는 아이디 입니다."}
            }
        } catch {
            return {status:400, message:"db에서 회원정보 조회중 오류"}
        }
        await this.mypageRepository.Withdrawal( userId )
        return {status:200, message:"회원 가입 탈퇴"}
    }
}

module.exports = MypageService;