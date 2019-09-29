## 本地运行  

```bush
npm start  // http://localhost:3000/index.html
```


## 页面路径

- /index.html 项目首页  点击2345 logo 跳转至swiper.html

- /swiper.html 项目轮播图展示页面


## 轮播图模块
### 实例化类
```bush
const swiper = new Swiper('sw1','vertical', true, 3)
```
### 参数说明
- 所插入的目标dom id     :string
- 轮播切换方式 支持 'vertical' 'fade'    :string
- 是否自动滚动     :boolean
- 初始index, 从0开始   :number



## 星级模块
### 实例化类
```bush
const starLevel = new StarPoint([5, 3.5, 4.6])
```
### 参数说明
- 星级数组, 0~5数字数组     :number[]




