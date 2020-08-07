import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import User from "../apis/User";

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    setMessages(state, payload) {
        state.messages = payload;
    },
    setMessage(state, payload) {
        state.messages.push(payload);
    }
  },
  actions: {
    fetchMessages(state) {
        User.fetchMessages()
            .then(response => {
                state.commit("setMessages", response.data);
            });
    }
  },
  getters: {
    getMessages: state => state.messages
  }
});
