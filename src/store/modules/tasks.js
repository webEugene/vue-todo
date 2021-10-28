export default {
  actions: {
    addTask({ commit }, task) {
      commit('ADD_TASK', task);
      commit('SET_TASKS');
    },
    getTasks({ commit }) {
      commit('SET_TASKS');
    },
    updateTask({ commit }, { id, name }) {
      commit('UPDATE_TASK', { id, name });
    },
    deleteTask({ commit }, id) {
      commit('DELETE_TASK', id);
    },
  },
  state: {
    tasks: [],
  },
  mutations: {
    ADD_TASK(state, payload) {
      const getTasks = JSON.parse(localStorage.getItem('tasks'));
      if (getTasks !== null) {
        getTasks.unshift(payload);
        localStorage.setItem('tasks', JSON.stringify(getTasks));
      } else {
        localStorage.setItem('tasks', JSON.stringify([payload]));
      }
    },
    SET_TASKS(state) {
      const getTasks = JSON.parse(localStorage.getItem('tasks'));
      if (getTasks !== null) {
        state.tasks.push(getTasks);
      }
    },
    UPDATE_TASK(state, payload) {
      const index = state.tasks[0].findIndex((c) => c.id === payload.id);
      state.tasks[0].splice(index, 1, {
        id: payload.id,
        name: payload.name,
      });
      localStorage.setItem('tasks', JSON.stringify(state.tasks[0]));
    },
    DELETE_TASK(state, id) {
      const index = state.tasks[0].findIndex((c) => c.id === id);
      state.tasks[0].splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks[0]));
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks[0];
    },
  },
};
