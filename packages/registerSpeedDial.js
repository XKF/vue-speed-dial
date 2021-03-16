import Vue from 'vue';

import speedDialComponent from './SpeedDial';

const speedDialConstructor = Vue.extend(speedDialComponent)

function speedDial({
    prizeList = [], 
    nums = 0, 
    speed = 300, 
    maxSpeed = 40, 
	minturns = 4, 
    defaultBgPic = '', 
    activeBgPic = '',
    btnBgPic = '', 
    btnText = '抽奖',
    remainText = '', 
	showRemainNum = true,
	targetContainer = null,
	onRolledStart = () => {},
	onRolledEnd = () => {},
	slotScoped = () => {},
	itemWidth = '32.2%',
	itemHeight = '32.2%',
	itemMarginTop = '1.7%',
	itemMarginRight = '1.7%',
	btnOffsetTop = '33.9%',
	centerDistance = '35.6%'
}={}){
	const speedDialDom = new speedDialConstructor({
        el:document.createElement('div'),
        props: {
			// 需要复制的文本
			prizeList: {
				type: [Array],
				default: () => {
					return prizeList.length ? prizeList : new Array(8).fill({
						icon:require('./img/icon_thanks.png'),
						prize_name:'谢谢参与'
					})
				}
			},
			nums:{
				type: [Number,String],
				default:nums
			},
			//初始速度值, 速度值越大则越慢
			speed:{
				type: [Number,String],
				default: speed
			},
			// 滚动的最大速度
			maxSpeed: {
				type: [Number,String],
				default: maxSpeed
			}, 
			//最小圈数为2
			minturns: {
				type: [Number,String],
				default: minturns
			},
			defaultBgPic:{
				type: [String],
				default: defaultBgPic
			},
			activeBgPic:{
				type: [String],
				default: activeBgPic
			},
			btnBgPic:{
				type: [String],
				default: btnBgPic
			},
			btnText:{
				type: [String],
				default: btnText
			},
			remainText:{
				type:[String],
				default:remainText
			},
			showRemainNum:{
				type:[Boolean],
				default:showRemainNum
			},
			itemWidth:{
				type:[String],
				default:itemWidth
			},
			itemHeight:{
				type:[String],
				default:itemHeight
			},
			itemMarginTop:{
				type:[String],
				default:itemMarginTop
			},
			itemMarginRight:{
				type:[String],
				default:itemMarginRight
			},
			btnOffsetTop:{
				type:[String],
				default:btnOffsetTop
			},
			centerDistance:{
				type:[String],
				default:centerDistance
			}
		},
		methods:{
			slotScoped,
			// 覆盖原函数
			active() {
				this.defaultSpeed = this.speed,
				onRolledStart(this.rolledStart);
			},
			rolling() {
				this.timer = setTimeout(() => {
					this.rolling();
				}, this.defaultSpeed);
				this.runs_now++; // 已跑步数加1
	
				this.amplification_index++; //当前index加1
				// 获取总步数
				var count_num = this.minturns * this.max_number + (this.finalIndex + 1) - (this.last_index + 1);
				// 上升期间
				if (this.runs_now <= (count_num / 3) * 2) {
					this.defaultSpeed -= 20; // 加速
					if (this.defaultSpeed <= this.maxSpeed) {
						this.defaultSpeed = this.maxSpeed;
					}
				}
				// 抽奖结束
				else if (this.runs_now >= count_num) {
					clearInterval(this.timer);
					this.last_index = this.amplification_index;
					onRolledEnd();
					// this.flag = true;
				}
				//下降期间
				else if (count_num - this.runs_now <= 10) {
					this.defaultSpeed += 20;
				}
				//缓冲区间
				else {
					this.defaultSpeed += 10;
					if (this.defaultSpeed >= 100) {
						this.defaultSpeed = 100; //最低速度为100；
					}
				}
				if (this.amplification_index >= this.max_number) {
					//判定！是否大于最大数
					this.amplification_index = 0;
				}
			}
		}
	})
	if(targetContainer){
		targetContainer.appendChild(speedDialDom.$el);
	}else{
		document.body.appendChild(speedDialDom.$el);
	}
	return speedDialDom;
}

// function registryTncode(){
// 	Vue.prototype.$tncodePop = tncodePop;
// }

export default speedDial;