//
export const key = 'goodslist';

//保存单条数
//思路：判断localstorage是否有这条数据。有酒增加啊购买的数量，没有就增加这款商品
export function setItem(data) {
    //获取loacalStorage
    let list = JSON.parse(localStorage.getItem(key) || '[]');
    //将当前数据插入到loacalStorage
    if (list.length > 0) {
        //判断是否存在这条数据
        let _index = -1;
        let status = list.some((item, index) => {
            _index = index
            return item.id == data.id
        });
        if (status) {
            //有这条数据在loacalStroage
            list[_index].cou += data.cou
        } else {
            list.push(data)
        }
    } else {
        list.push(data)
    }
    //将list数据保持
    localStorage.setItem(key, JSON.stringify(list))
}
//获取数据
export function getItem() {
    //将数据获取过来直接转发出去
    return JSON.parse(localStorage.getItem(key) || '[]');
}
//获取所有数据的id
export function getItemId() {
    //获取全部的数
    let list = getItem();
    let itemIdList = [];
    list.forEach(item => {
        itemIdList.push(item.id)
    });
    return itemIdList.join(',')
}
//保存所有的数据
export function setAllItem(list) {
    localStorage.setItem(key, JSON.stringify(list))
}