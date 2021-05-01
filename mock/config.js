module.exports = {
  host: '0.0.0.0',
  port: 4320,
  directory: './',
  cors: true,
  watch: true,
  proxy: 'www.pandateacher.com',
  to: '127.0.0.1:8080',
  wechatConfig: {
    appId: 'wxe4e7b9b1082e1394',
    secret: '2f0b82dde418cdf57ee9dfa6ef021f5f',
    // debug: true,
    // timestamp: '',
    // nonceStr: '',
    url: 'http://www.pandateacher.com/test.html',
    jsApiList: ['chooseImage', 'previewImage']
  }
};
 