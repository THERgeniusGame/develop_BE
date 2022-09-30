const Joi = require("joi");

module.exports = async (req, res, next) => {
  const body = req.body;
  const schema = Joi.object().keys({
    
    email: Joi.string().email({minDomainSegments: 2,tlds: { allow: ['com', 'net'] }}), //이메일 정규식
    emailConfirm: Joi.string(),
    nickname: Joi.string().min(2).max(10).required(), //특수문자 제외 2~10자
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,16}$')), // 8~16자 영문 숫자
    confirmPw: Joi.ref('password'),
  });

  try {
    // 검사시작
    await schema.validateAsync(body);
  } catch (err) {
    // 유효성 검사 에러
    const problem = err.message.split('"')[1];
    const message = problem + " 형식이 올바르지 않습니다. ";
    return res.status(400).json({ message });
  }
  next();
};