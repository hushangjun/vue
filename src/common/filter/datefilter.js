//时间过滤器
import Vue from 'vue';
//引入moment
import moment from 'moment';

export default Vue.filter("datefilter", (data, format) => {
    // 判断是否是字符串  是字符串就做日期转换   不是就返回data
    if (Object.prototype.toString.call(data) === "[Object String]") {
        return moment(data).format(format || 'YYYY-MM-DD HH:mm:ss')
    } else {
        return data;
    }

})