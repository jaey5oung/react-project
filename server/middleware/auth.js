const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리를 하는곳
  //클라이언트 쿠키에서 토큰을 가져온다
  let token = req.cookies.x_auth; //cookie-parser를 이용
  //토큰을 복호화 한후 유저를 찾는다
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next(); //미들웨어에서 계속 진행될 수 있게

    //유저가 있으면 인증 Okay

    //유저가 없으면 인증 No!
  });
};

module.exports = { auth };