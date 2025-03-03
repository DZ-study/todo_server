const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const getOpenId = async (code) => {
  const { WECHAT_APPID, WECHAT_SECRET, WECHAT_TOKEN } = process.env
  if (!WECHAT_APPID || !WECHAT_SECRET) {
    throw new Error('请先配置微信小程序的appId和appSecret')
  }
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${WECHAT_APPID}&secret=${WECHAT_SECRET}&grant_type=authorization_code`
  const response = await axios.get(url)
  return response.data
}

/**
 * /wechat是微信服务器配置的校验接口
 * 本来是要做微信授权登录功能，但是那个个人做不了，只能企业做
 * 这个功能主要用于公众号内的授权登录
 */
// app.get('/wechat', (req, res) => {
//   console.log(111);

//   const { signature, timestamp, nonce, echostr } = req.query;
//   console.log(signature, timestamp, nonce, echostr);

//   // 1. 将 token、timestamp、nonce 组合并排序
//   const TOKEN = 'nextup'
//   const str = [TOKEN, timestamp, nonce].sort().join('');
//   const hash = crypto.createHash('sha1').update(str).digest('hex');

//   // 2. 验证 hash 是否与 signature 相同
//   if (hash === signature) {
//       res.send(echostr); // 验证成功，返回 echostr
//   } else {
//       res.send('error'); // 验证失败
//   }
// });

module.exports = {
  getOpenId
}
