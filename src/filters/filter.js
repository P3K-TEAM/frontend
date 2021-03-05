import Vue from 'vue';

Vue.filter('roundToTwoDecimals', function (value) {
    return Number.isInteger(value) ? Number(value).toFixed(0) : Number(value).toFixed(2)
})