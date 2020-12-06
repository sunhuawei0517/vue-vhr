import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 封装成插件，使用的时候不需要在script中引用了
import {postRequest} from "@/util/api";
import {postKeyValueRequest} from "@/util/api";
import {getRequest} from "@/util/api";
import {putRequest} from "@/util/api";
import {deleteRequest} from "@/util/api";

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
