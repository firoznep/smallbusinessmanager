import _ from 'lodash';

export const formatToCurrencyDollar = (amount) => {
  return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const formatToCurrencyInd = (x) => {
  // let x=12345678;

  x = x.toString();

  let lastThree = x.substring(x.length - 3);
  let otherNumbers = x.substring(0, x.length - 3);

  if (otherNumbers != '') lastThree = ',' + lastThree;
  let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  if (res <= 0) return '₹' + '0.0';
  return '₹' + res;
};

export const getTotalWithPercent = (t, per) => {
  let result = Math.floor((per / 100) * t + t);
  return result;
};

export const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

export const randomId = () => {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

export const getTotal = (data, num) => {
  let arr = data.map((itm) => Number(itm[num]));
  return _.sum(arr);
};
