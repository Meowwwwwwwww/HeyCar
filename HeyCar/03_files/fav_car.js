
var cars = [];
function initFavCar(){
    if (hasSignIn()) {
        // load from interface
        $.getScript('http://my.pcauto.com.cn/intf/getCars.jsp?act=getCars&isForIndex=1&callback=getCarsFromIntf&t=' + new Date().getTime());
    } else {
        // load from cookie
        getCarsFromCookie();
    }
}
/**
 * 根据 cookie: common_session_id 和 cmu 来判断是否已登录
 */
function hasSignIn() {
    return hasCookie('common_session_id') && hasCookie('cmu');
}
/**
 * 根据接口返回的数据来获取爱车信息
 * @param {JSON} data 接口数据.
 */
function getCarsFromIntf(data) {
    cars = [];
    var cs = data.cars,l = cs.length,car;
    if (l > 5) {
        cs = cs.slice(l - 5, l);
        l = 5;
    }
    for (var i = 0; i < l; i++) {
        car = cs[i];
        // cars.push({uid: car.id, id: car.carSeriesId, name: car.carSeriesName});
        cars.push(car.carSeriesId);
    }
}
// 从 cookie 中获取爱车列表，然后保存到 cars 变量中
function getCarsFromCookie() {
    var cs = getFavCarCookie("favCar");
    if (!cs) return;
    cs = cs.split('|');
    var l = cs.length;
    var car;
    if (l > 5) {
        cs = cs.slice(l - 5, l);
        l = 5;
    }
    for (var i = 0; i < l; i++) {
        car = cs[i].split('_');
        // cars.push({id: car[1], name: car[0], uid: i});
        cars.push(car[1]);
    }
}
function hasCookie(key) {
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
}
function getFavCarCookie(key) {
    if (!key || !hasCookie(key)) return null;
    var res = document.cookie.replace(new RegExp('(?:^|.*;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1');

    return decodeURIComponent(res);
}

function getCarSerialGroupIds(){
    var serialGroupIds = cars.join(",");
    return serialGroupIds;
}