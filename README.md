# SpeedDial 九宫格抽奖 

## 介绍

插入九宫格抽奖控件

组件支持函数调用和组件调用 


## 注意

为了css能够被px2rem识别到并进行rem转换，这里将css提取了出来，请务必记得手动载入样式


## 组件调用

`SpeedDial`组件可添加props属性后直接插入使用，可自己在组件上添加自定义类名覆盖样式
```js
import '@kafan/vue-speed-dial/lib/index.css'

import SpeedDial from '@kafan/vue-speed-dial'

// 全局注册
Vue.use(SpeedDial)
// 使用
<template>
    <v-speeddial class="diyClassName" @rolledStart="start" @rolledEnd="end">
        <!-- <slot>可选插槽插入自定义内容</slot> -->
        <p style="paddingBottom:10px;color:#333">可选插槽插入自定义内容</p>
    </v-speeddial>
</template> 

<script>
export default {
    methods:{
        start(fn){
            fn(2)
        },
        end(){
            alert('isEnd');
        }
    }
}
</script>
```
## props

组件调用时， 支持传入以下 `props`：

| 参数 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| prize-list | 九宫格的奖品列表 | `Array` | 全部是谢谢参与 | `[{prize_name:'奖品名称',icon:'奖品图标'}]` |
| nums | 抽奖次数 | `[Number, String]` | 0 | - |
| speed | 初始速度值 | `[Number, String]` | 300 | 速度值越大则越慢 |
| max-speed | 转动的最大速度 | `[Number, String]` | 40 | - |
| minturns | 转动的最小圈数 | `[Number, String]` | 4 | - |
| default-bg-pic | 默认宫格背景图 | `String` | 默认图片 | 请和active图片成套配置，否则不生效 |
| active-bg-pic | 宫格活跃背景图 | `String` | 默认图片 | 请和default图片成套配置，否则不生效 |
| btn-bg-pic | 抽奖按钮背景图 | `String` | 默认图片 | - |
| btn-text | 抽奖按钮文案 | `String` | 抽奖 | - |
| remain-text | 剩余次数文案 | `String` | (剩余N次) | - |
| show-remain-num | 是否显示剩余次数 | `Boolean` | true | - |
| item-width | 宫格宽度 | `String` | 32.2% | - |
| item-height | 宫格高度 | `String` | 32.2% | - |
| item-margin-top | 宫格顶部间距 | `String` | 1.7% | - |
| item-margin-right | 宫格右边间距 | `String` | 1.7% | - |
| btn-offset-top | 抽奖按钮顶部偏移 | `String` | 33.9% | - |
| center-distance | 中间按钮底部间距 | `String` | 35.6% | - | 

## 事件监听

组件调用时， 会触发以下事件，可供监听回调：

| 事件 | 说明 | 备注 |
|------|------|------|
| rolledStart | 九宫格开始转动 | - |
| rolledEnd | 九宫格结束转动 | - |
 


## 函数调用

`SpeedDial`函数会返回自身实例对象，可以赋值给一个变量借以调用该实例的内置函数

```js
import '@kafan/vue-speed-dial/lib/index.css'

import SpeedDial from '@kafan/vue-speed-dial'

const speedObj = SpeedDial({
    nums:3,
    btnText:'test',
    targetContainer:document.querySelectorAll('.line')[1],
    onRolledStart:(fn)=>{
        fn(2)
    },
    onRolledEnd:()=>{
        alert('isEnd');
    },
    slotScoped:()=>{
        return {tag:'p', data:{style: {color: '#333', paddingBottom: '10px'}}, text:'可选插槽插入自定义内容'}
    }
})

内置函数调用，如
speedObj.active();
speedObj.rolledStart(finalIndex);...等等

``` 

## options

函数调用时， 支持传入以下 `options`：

| 参数 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| prizeList | 九宫格的奖品列表 | `Array` | 全部是谢谢参与 | `[{prize_name:'奖品名称',icon:'奖品图标'}]` |
| nums | 抽奖次数 | `[Number, String]` | 0 | - |
| speed | 初始速度值 | `[Number, String]` | 300 | 速度值越大则越慢 |
| maxSpeed | 转动的最大速度 | `[Number, String]` | 40 | - |
| minturns | 转动的最小圈数 | `[Number, String]` | 4 | - |
| defaultBgPic | 默认宫格背景图 | `String` | 默认图片 | 请和active图片成套配置，否则不生效 |
| activeBgPic | 宫格活跃背景图 | `String` | 默认图片 | 请和default图片成套配置，否则不生效 |
| btnBgPic | 抽奖按钮背景图 | `String` | 默认图片 | - |
| btnText | 抽奖按钮文案 | `String` | 抽奖 | - |
| remainText | 剩余次数文案 | `String` | (剩余N次) | - |
| showRemainNum | 是否显示剩余次数 | `Boolean` | true | - |
| targetContainer | 插入的容器 | `Object` | document.body | - |
| onRolledStart | 开始抽奖监听函数 | `Function` | (fn) => {} | fn为开始抽奖函数rolledStart，需传入最终奖品位置如fn(2) |
| onRolledEnd | 转动结束回调函数 | `Function` | () => {} | - |
| slotScoped | 插槽函数 | `Function` | () => {} | `[() => VNode]` |
| itemWidth | 宫格宽度 | `String` | 32.2% | - |
| itemHeight | 宫格高度 | `String` | 32.2% | - |
| itemMarginTop | 宫格顶部间距 | `String` | 1.7% | - |
| itemMarginRight | 宫格右边间距 | `String` | 1.7% | - |
| btnOffsetTop | 抽奖按钮顶部偏移 | `String` | 33.9% | - |
| centerDistance | 中间按钮底部间距 | `String` | 35.6% | - |