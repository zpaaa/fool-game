const imgList = ['./images/swiper01.jpg', './images/swiper02.jpg', './images/swiper03.jpg', './images/swiper04.jpg']
class Swiper {
  constructor(dom,trigger, isAuto, activeIndex = 0) {
    this.imgList = imgList
    this.activeIndex = activeIndex >= this.imgList.length ? this.imgList.length - 1 : activeIndex;
    this.dom = '#' + dom
    this.root = document.querySelector(this.dom)
    this.showCon
    this.imgCon 
    this.tabCon
    this.tabs
    this.imgNodes
    this.timer;
    this.timeStamp;
    this.trigger = trigger;
    this.isAuto = isAuto;
    this.init();
  }

  init() {
    this.initDom()
    this.switchTab()
    if (this.isAuto) {this.autoAnimation()}
  }


  // 生成Dom 
  initDom() {
    this.root.innerHTML = `<div class="swiper-con">
                            <div class="swiper-con-show">
                              <ul></ul>
                            </div>
                            <ul class="chosen-btn">
                            </ul>
                          </div>`
    this.showCon = this.root.querySelector('.swiper-con .swiper-con-show')
    this.imgCon = this.root.querySelector('.swiper-con .swiper-con-show ul')
    this.tabCon = this.root.querySelector('.chosen-btn')
    const domArr = this.imgList.reduce((prev, curr, index) => {
      prev[0]+= `<li><img src="${curr}" alt=""></li>`
      prev[1]+= index === this.activeIndex ? `<li class="active"><img src="${curr}" alt=""></li>` :`<li><img src="${curr}" alt=""></li>`
      return prev
    },['', ''])
    this.tabCon.innerHTML = domArr[1]
    this.tabs = this.root.querySelectorAll('.chosen-btn li')
    if (this.trigger === 'vertical') {
      this.imgCon.innerHTML = domArr[0]
      this.imgNodes = this.root.querySelectorAll('.swiper-con .swiper-con-show li')
      this.cloneNode()
    }
    if (this.trigger === 'fade') { this.initfadeNode() }
  }


  //copy node 方便无缝衔接
  cloneNode() {
    const top = -this.activeIndex * 200
    this.imgCon.style.cssText="transition: top 1s ease-out; top: " + top + 'px'
    this.imgNodes.forEach(v => {this.imgCon.appendChild( v.cloneNode(true))})
  }

  // fade 插入一个wrap 显示层
  initfadeNode () {
    const wrapDom = document.createElement('div')
    wrapDom.className = 'swiper-con-wrap'
    wrapDom.style.cssText = `background-image: url(${imgList[this.activeIndex]}); transition: opacity .5s ease-out; opacity: 1`
    this.root.querySelector('.swiper-con .swiper-con-show').appendChild(wrapDom)
    this.fadeWrap = this.root.querySelector('.swiper-con .swiper-con-show .swiper-con-wrap')
  }

  // 注册按钮点击切换事件
  switchTab() {
    const _this = this
    this.tabs.forEach((v, i) => {
        v.addEventListener('click', function() {
          _this.tabs.forEach(item => {item.className = ""})
          this.className="active"
          _this.activeIndex = i
          if (_this.trigger === 'vertical') { _this.verticalSwitch(i) }
          if (_this.trigger === 'fade') { _this.fadeSwitch(i) }
          clearInterval(_this.timer)
        }, false)
    })
  }

  changeTabIndex() {
    this.tabs.forEach((item, i) => {i === this.activeIndex ? item.className = "active" : item.className = ""})
  }

  // 上下切换
  verticalSwitch(i) {
    clearTimeout(this.timeStamp)
    this.imgCon.style.cssText="transition: top 1s ease-out;"
    this.imgCon.style.top = -i*200 + 'px'
    const { offsetHeight, offsetTop } = this.imgCon
    if (-offsetTop === offsetHeight / 2) {
      console.log('top-0')
      // top - 0
      this.imgCon.style.cssText="top: 0"
      this.timeStamp = setTimeout(()=>{
        // 位移
        this.imgCon.style.cssText="transition: top 1s ease-out;"
        this.imgCon.style.top = -i * 200 + 'px'
      }, 10)
    }
  } 

  // fade 切换
  fadeSwitch(i) {
    clearTimeout(this.timeStamp)
    this.fadeWrap.style.opacity = 0
    this.showCon.style.cssText = `background-image: url(${i === imgList.length ? imgList[0] : imgList[i]});`
    this.timeStamp = setTimeout(()=>{
      this.fadeWrap.style.cssText = `background-image: url(${imgList[this.activeIndex]}); transition: opacity 1s ease-out; opacity: 1`
    }, 1000)
  }

  // AutoScroll
  autoAnimation() {
    this.timer = setInterval(() => {
      this.activeIndex ++
      if (this.trigger === 'vertical') { this.verticalSwitch(this.activeIndex) }
      if (this.trigger === 'fade') { this.fadeSwitch(this.activeIndex) }
      if (this.activeIndex === this.tabs.length) this.activeIndex = 0
      this.changeTabIndex(this.activeIndex)
    }, 2000);
  }
}

class StarPoint {
  constructor(pointArr) {
    this.points = pointArr
    this.starNodes = document.querySelectorAll('.star-con .star-wrap')
    this.init()
  }
  init() {
    this.starNodes.forEach((v, i) => {
      const count =  this.points[i] / 5
      v.style.width = count.toFixed(2) * 100 +'%'
    })
  }
}