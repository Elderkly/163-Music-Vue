
const state = {
    user:{
      userId:null
    },    //用户信息
    login:false,     //登录状态
    listId:null,  // 歌单ID
    playId:null, //  播放歌曲ID
    playIng:false, //  是否正在播放
    playType:'list', // 播放模式
    fullScreen:false, // 是否张开播放页
    // playItem:{},  //  当前播放信息
    playList:[],  //  播放列表
    sequenceList:[], //  用于存储原playList
    playIndex:-1  // 播放索引

}


export default state