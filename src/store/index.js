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
      id: '',
      lastname:'',
      firstname: '',
      email: ''
    },
    isConnected: false
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    // TO REVOIR
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isConnected', JSON.stringify(true));
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
      localStorage.removeItem('isConnected');
    },
    connected: function (state, connexion) {
      state.isConnected = connexion;
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
          const userInfosToStore = {
            id: response.data._id,
            lastname: response.data.lastname,
            firstname: response.data.firstname,
            email: response.data.login
          }
          commit('logUser', userInfosToStore);
          commit('userInfos', userInfosToStore);
          commit('connected', true);
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