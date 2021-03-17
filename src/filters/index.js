import Vue from 'vue';

import toNumber from '@/filters/to-number.filter';
import roundToTwoDecimals from '@/filters/round-to-two-decimals.filter';
import stringify from '@/filters/stringify.filter';

const filters = { toNumber, roundToTwoDecimals, stringify };

Object.entries(filters).forEach(([key, fn]) => Vue.filter(key, fn));

export default filters;
