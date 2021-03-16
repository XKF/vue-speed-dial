import SpeedDialComponent from './SpeedDial';
import registerSpeedDial from "./registerSpeedDial";
import './style/index.scss';

var SpeedDial = registerSpeedDial

SpeedDial.install = function(Vue) {
    Vue.component('v-speeddial', SpeedDialComponent)
}

SpeedDial.Component = SpeedDialComponent

export default SpeedDial
