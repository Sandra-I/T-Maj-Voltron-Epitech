import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://api-voltron.herokuapp.com/api/'
})

let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

// Create a new store instance.
const store = createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      lastname:'',
      firstname: '',
      email: ''
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    // TO REVOIR
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        const userBody = {
          login: userInfos.email,
          password: userInfos.password
        };
        instance.post('/login', userBody)
        .then(function (response) {
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },
    createAccount: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        const userBody = {
          firstname: userInfos.firstname,
          lastname: userInfos.lastname,
          login: userInfos.email,
          password: userInfos.password
        }
        instance.post('/register', userBody)
        .then(function (response) {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        });
      });
    },
    getUserInfos: ({commit}) => {
      instance.post('/infos')
      .then(function (response) {
        commit('userInfos', response.data.infos);
      })
      .catch(function () {
      });
    }
  }
})

export default store;