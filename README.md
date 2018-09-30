# Vue网易云音乐播放器

一款基于Vue的仿网易云音乐App的音乐播放器

## 使用说明

``` bash
# 克隆项目
git clone https://github.com/Elderkly/163_music.git

# 安装依赖
npm install

# 本地开发环境
npm run dev

# 构建生产
npm run build
```

## 技术栈

**Vue2** 

**Vuex** 

**Vue-router** 

**Axios** 

**Stylus** 

**Better-scroll** 

**ESlint**

## 注意事项

- 项目需要搭建后端接口才能正常访问 [api来源](https://github.com/Binaryify/NeteaseCloudMusicApi)
- 默认接口地址是3000端口 如有更改请到src/common/js/config.js 修改HOST地址
- 登录接口需使用真实的网易云账号登录

## 功能介绍

- 用户登录、注销
- 首页 (轮播，排行榜，推荐歌单，最新单曲)
- 搜索 (热搜词汇，搜索记录，搜索结果)
- 歌单，歌单作者，我的音乐，用户信息等
- 音乐播放功能（切歌，播放列表，播放进度显示，切换播放模式）