const Joi = require("joi");

module.exports = async (req, res, next) => {
  const body = req.body;
  const schema = Joi.object().keys({
    
    email: Joi.string().pattern(new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)), //이메일 정규식
    nickname: Joi.string().pattern(new RegExp(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/)), //특수문자 제외 2~10자
    password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/)), // 8~16자 영문 숫자
    confirmPw: Joi.string(),
  });
  
  try {
    // 검사시작
    await schema.validateAsync(body);
  } catch (err) {
    // 유효성 검사 에러
    console.log(schema.password)
    const problem = err.message.split('"')[1];
    const message = problem + " 형식이 올바르지 않습니다. ";
    return res.status(400).json({ message });
  }
  next();
};