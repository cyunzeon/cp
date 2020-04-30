import http from './http'
//注册
export const mobregByGift = p => http.get('/phpu/mobregByGift.phpx',p) 
//登录
export const login = p =>http.post('/phpu/login.phpx',p)
//注册 发送验证码
export const mobregzym = p =>http.post('/phpu/mobregzym.phpx',p)
//检测是否注册
export const checkRegit = p => http.get('/phpu/isMobiles.phpx',p) 
//ssq
export const ssq = p => http.get('/cpdata/game/01/s.json.phpx',p) 
