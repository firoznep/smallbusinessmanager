import {Products} from '../database';

export const dltAllPro = () => {
  Products.perform(function (db) {
    Products.data().forEach(function (item) {
      db.remove(item);
    });
  });
  alert('deleted all');
};
