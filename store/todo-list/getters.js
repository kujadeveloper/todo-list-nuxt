export default {
  getResults(state) {
    // localStorage.removeItem('data')
    const dt = localStorage.getItem('data');
    if (dt === 'undefined') {
      return [];
    }

    return state.data;
  },
};
