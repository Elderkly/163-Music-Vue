# 163-Music

一款基于Vue的仿网易云音乐App的音乐播放器

[预览地址](http://139.180.209.64)


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

- Vue2

- Vuex

- Vue-router

- Axios

- Stylus

- Better-scroll

## 注意事项

- 项目需要搭建后端接口才能正常访问 [Api来源](https://github.com/Binaryify/NeteaseCloudMusicApi)
- 默认接口地址是3000端口 如有更改请到 src/common/js/config.js 修改HOST地址
- 登录接口需使用真实的网易云账号登录

## 功能介绍

- 用户登录、注销
- 首页 (轮播，排行榜，推荐歌单，最新单曲)
- 搜索 (热搜词汇，搜索记录，搜索结果)
- 歌单，歌单作者，我的音乐，用户信息等
- 音乐播放功能（切歌，播放列表，播放进度显示，切换播放模式）


**由于部分接口无法使用所以有些功能还有待完善**


## 项目预览

**登录/注销**

![登录/注销](https://github.com/Elderkly/ImgRepository/blob/master/163-music/login.gif)

**首页**

![首页](https://github.com/Elderkly/ImgRepository/blob/master/163-music/home.gif)

**我的音乐**

![我的音乐](https://github.com/Elderkly/ImgRepository/blob/master/163-music/my-music.gif)

**搜索**

![搜索](https://github.com/Elderkly/ImgRepository/blob/master/163-music/seasrch.gif)

**歌单作者**

![歌单作者](https://github.com/Elderkly/ImgRepository/blob/master/163-music/author.gif)

**播放**

![播放](https://github.com/Elderkly/ImgRepository/blob/master/163-music/player.gif)
