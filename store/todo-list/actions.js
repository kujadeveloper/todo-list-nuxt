export default {

  async setData(store, data) {
    store.commit('storeData', { data });
  },
  async addData(store, data) {
    store.commit('storeAddData', { data });
  },
  async deleteData(store, data) {
    const dt = JSON.parse(localStorage.getItem('data'));

    const array = [];
    Object.keys(dt).forEach((key) => {
      if (data.row.id !== dt[key].id) {
        array.push(dt[key]);
      }
    });
    store.commit('storeData1', { array });
  },
};
