// const devURL = "http://localhost:3000"; // 开发环境，需要开启mock server（执行：gulp mock）

const devURL = 'https://www.easy-mock.com/mock/5cc59123ad97307c95f389b4/api'
const prodURL = 'TODO' // 生产环境，线上服务器

const BASE_URL = process.env.NODE_ENV === 'development' ? devURL : prodURL

export default BASE_URL
