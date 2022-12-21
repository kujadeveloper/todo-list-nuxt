export default {
  storeData(state, payload) {
    localStorage.setItem('data', JSON.stringify(payload.data));
    state.data = payload.data;
  },
  storeData1(state, payload) {
    localStorage.setItem('data', JSON.stringify(payload.array));
    state.data = payload.array;
  },
  storeAddData(state, obj) {
    if (state.data == null) {
      state.data = [];
    }
    state.data.push(obj.data);
    localStorage.setItem('data', JSON.stringify(state.data));
    return state.data;
  },
};
