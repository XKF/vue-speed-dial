
import { use } from './_utils/use'

let _use = use('speeddial'),
    bem = _use[0];

export default {
    name: 'fgo-speeddial',
    props: {
        // 需要复制的文本
        prizeList: {
            type: [Array],
            default: () => {
                return new Array(8).fill({
                    icon:require('./img/icon_thanks.png'),
                    prize_name:'谢谢参与'
                })
            }
        },
        nums:{
            type: [Number,String],
            default:0
        },
        //初始速度值, 速度值越大则越慢
        speed:{
            type: [Number,String],
            default: 300
        },
        // 滚动的最大速度
        maxSpeed: {
            type: [Number,String],
            default: 40
        }, 
        //最小圈数为4
        minturns: {
            type: [Number,String],
            default: 4
        },
        defaultBgPic:{
            type: [String],
            default: ''
        },
        activeBgPic:{
            type: [String],
            default: ''
        },
        btnBgPic:{
            type: [String],
            default: ''
        },
        btnText:{
            type: [String],
            default: '抽奖'
        },
        remainText:{
            type:[String],
            default:''
        },
        showRemainNum:{
            type:[Boolean],
            default:true
        },
        itemWidth:{
            type:[String],
            default:'32.2%'
        },
        itemHeight:{
            type:[String],
            default:'32.2%'
        },
        itemMarginTop:{
            type:[String],
            default:'1.7%'
        },
        itemMarginRight:{
            type:[String],
            default:'1.7%'
        },
        btnOffsetTop:{
            type:[String],
            default:'33.9%'
        },
        centerDistance:{
            type:[String],
            default:'35.6%'
        }
    },
    data() {
        return {
            // flag: true, // 是否允许滚动
            last_index: 0, //上一回滚动的位置
            max_number: 8, //轮盘全部数量
            timer: '', //定时器
            runs_now: 0, // 当前已跑步数
            amplification_index: 0, //轮盘的当前滚动位置
            finalIndex:null,
            rolled: false,
            defaultSpeed:300,
            defaultIcon:require('./img/icon_thanks.png'),
            placeList:{
                0:0,
                1:1,
                2:2,
                3:4,
                4:7,
                5:6,
                6:5,
                7:3
            },
            placePrize:{
                0:0,
                1:1,
                2:2,
                3:7,
                4:3,
                5:6,
                6:5,
                7:4
            },
        };
    },
    methods: {
        slotScoped(){
            return {};
        },
        // 获取插槽元素
        getSlot() {
            return this.slotScoped && typeof this.slotScoped === 'function' && this.slotScoped()
        },
        active() {
            this.defaultSpeed = this.speed,
            this.$emit('rolledStart', this.rolledStart);
        },
        rolledStart(finalIndex) {
            if (finalIndex == null) {
                this.$toast({
                    message:'网络出错',
                    position:'bottom'
                });
                return;
            }
            this.finalIndex = finalIndex;
            this.rolled = true; // 未转动页面时不显示激活样式
            this.runs_now = 0; // 初始化步数
            this.rolling();
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
                this.$emit('rolledEnd');
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
    },
    render(h) {
        // 判断是否有defalut
        return h('div', {
            "class": bem("")
        }, [
            this.$slots.default || this.getSlot(),
            h('ul',{
                "class": bem("box"),
            },[
                this.prizeList.map((item,index)=>{
                    return h('li',{
                        "class":[
                            bem("item"),
                            (!this.activeBgPic || !this.defaultBgPic)
                            ?(this.rolled && index == this.placeList[this.amplification_index]
                            ?bem("item",{active:true})
                            :bem("item",{default:true})):''],
                        "style":Object.assign(
                            this.activeBgPic && this.defaultBgPic?{backgroundImage:"url("+(this.rolled && index == this.placeList[this.amplification_index]?this.activeBgPic:this.defaultBgPic)+")"}:{},{
                            paddingTop:this.itemHeight,
                            width:this.itemHeight,
                            marginTop:index > 3 ? this.itemMarginTop : 0,
                            marginRight:index == 3 ? this.centerDistance : [2,4,7].includes(index) ? '0px' : this.itemMarginRight
                        }),
                        "attrs":{
                            "ref": 'li' + index
                        }
                    },[
                        h('p',{},[
                            h('img',{
                                attrs:{
                                    "src": this.prizeList[this.placePrize[index]].icon?this.prizeList[this.placePrize[index]].icon.replace('http','https'):this.defaultIcon
                                }
                            }),
                            h('span',{},this.prizeList[this.placePrize[index]].prize_name)
                        ])
                    ])
                }),
                h('li',{
                    "class":bem('btn'),
                    "style":Object.assign(
                        this.btnBgPic?{
                            backgroundImage:"url("+this.btnBgPic+")"
                        }:{},
                        {
                            top:this.btnOffsetTop,
                            paddingTop:this.itemHeight,
                            width:this.itemHeight,
                        }
                    ),
                    "on":{
                        "click": ()=>{
                            this.active()
                        }
                    }
                },[
                    h('p',{},[
                        h('span',{
                            "class" : bem('text')
                        },this.btnText),
                        this.showRemainNum && h('span',{
                            "class" : bem('remain')
                        },this.remainText?this.remainText:'(可抽'+this.nums+'次)')
                    ])
                ])
            ])
        ])
    }
}