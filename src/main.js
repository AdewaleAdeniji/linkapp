import Vue from 'vue'
//import App from './App.vue'
import Header from './header.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import Appbody from './body.vue';

Vue.use(VueSweetalert2);
Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#example');

new Vue({
  render: h => h(Header),
}).$mount('#header');

new Vue({
  render: h => h(Appbody),
}).$mount('#appbody');

// new Vue({
// 	el:"#one",
// 	data:function(){
// 		return{
// 			title:"mytitle",
// 		}
// 	},
// }).$mount('#one');
