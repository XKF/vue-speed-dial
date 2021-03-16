<template>
    <div>
        <div class="line">
            <fgo-speeddial class="test" @rolledStart="start" @rolledEnd="end" :use-self-pic="true">
                <p style="paddingBottom:10px;color:#333">可选插槽插入自定义内容</p>
            </fgo-speeddial>
        </div>
        <div class="line">
            <p class='title'>函数调用</p>
            <button 
                type='primary'
                @click='add'>函数添加组件</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'test-speeddial',
    data: () => ({
        value: '',
        activePic: require('../assets/logo.png'),
        defaultPic: require('../assets/logo.png')
    }),
    methods: {
        add() {
            this.$SpeedDial({
                nums:3,
                btnText:'Test',
                targetContainer:document.querySelectorAll('.line')[1],
                onRolledStart:(fn)=>{
                    fn(2)
                },
                onRolledEnd:()=>{
                    setTimeout(()=>{
                        alert('isEnd')
                    },1000)
                },
                slotScoped:()=>{
                    return {tag:'p', data:{style: {color: '#333', paddingBottom: '10px'}}, text:'可选插槽插入自定义内容'}
                }
            })
        },
        start(fn){
            fn(2)
        },
        end(){
            setTimeout(()=>{
                alert('isEnd')
            },1000)
        }
    }
}
</script>

<style lang='scss' scoped>
    .line {
        margin-bottom:15px;
        .title {
            margin-bottom:6px;
        }
    }
</style>

