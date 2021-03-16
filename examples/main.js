import Vue from 'vue'
import App from './App.vue'
import SpeedDial from '../packages/'

Vue.config.productionTip = false

Vue.use(SpeedDial)

Vue.prototype.$SpeedDial = SpeedDial

new Vue({
  render: h => h(App),
}).$mount('#app')
