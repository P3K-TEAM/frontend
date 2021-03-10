import Vue from 'vue';

Vue.filter('toNumber', function (value) {
    return Number(value)
})

Vue.filter('roundToTwoDecimals', function (value) {
    return Number.isInteger(value) ? Number(value).toFixed(0) : Number(value).toFixed(2)
})
