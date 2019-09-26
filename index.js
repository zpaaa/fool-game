class Swiper {
  constructor(trigger) {
    this.activeIndex = 0;
    this.tabs = document.querySelectorAll('.chosen-btn li')
    this.imgNodes = document.querySelectorAll('.swiper-con .show li')
    this.imgCon = document.querySelector('.swiper-con .show ul')
    this.init();
    this.timer;
    this.timeStamp;
    this.trigger = trigger;
  }

  init() {
    this.switchTab()
    this.cloneNode()
    this.autoAnimation()
  }

  // 注册按钮点击切换事件
  switchTab() {
    const _this = this
    this.tabs.forEach((v, i) => {
        v.addEventListener('click', function() {
          _this.tabs.forEach(item => {item.className = ""})
          this.className="active"
          _this.activeIndex = i
          console.log(i)
          _this.verticalSwitch(i)
          clearInterval(_this.timer)
        }, false)
    })
  }

  changeTabIndex() {
    this.tabs.forEach((item, i) => {i === this.activeIndex ? item.className = "active" : item.className = ""})
  }

  //copy node 方便无缝衔接
  cloneNode() {
    this.imgCon.style.cssText="transition: top 1s ease-out; top: 0"
    this.imgNodes.forEach(v => {this.imgCon.appendChild( v.cloneNode(true))})
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
        this.imgCon.style.top = -i*200 + 'px'
      }, 10) 
    }
  } 

  // fade
  fadeSwitch(i) {
    console.log(i)
  }

  // AutoScroll
  autoAnimation() {
    this.timer = setInterval(() => {
      this.activeIndex ++
      if (this.trigger === 'vertical') { this.verticalSwitch(this.activeIndex) }
      if (this.activeIndex === this.tabs.length) this.activeIndex = 0
      this.changeTabIndex(this.activeIndex)
    }, 2000);
  }
}

const a = new Swiper('vertical')

class StarPoint {
  constructor(pointArr) {
    this.points = pointArr
    this.starNodes = document.querySelectorAll('.star-con .star-wrap')
    this.init()
  }
  init() {
    this.starNodes.forEach((v, i) => {
      const starWidth = v.offsetWidth
      const count =  parseInt(this.points[i] / 5 * starWidth)
      v.style.width = count + 'px'
    })
  }

}

const b = new StarPoint([5, 3.5, 4.6])