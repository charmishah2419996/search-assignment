import { SET_TODO_LIST } from "@/store/mutation-types";

const state = {
  todoList: [
    {
      "title" :"selected Person",
      "details":[
          {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"wade Cooper" ,"permission":"No access","email":"wadeCooper@gmail.com","isInvite":false},
          {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"Arlin Mccoy","permission":"No access","email":"ArlinMccoy@gmail.com","isInvite":false}
      ]
      },
       {
      "title" :"selected Group",
      "details":[
          {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"product","permission":"No access","email":"product@gmail.com","isInvite":false},
          {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"engineer","permission":"No access","email":"engineer@gmail.com","isInvite":false}
      ]
      }
  ],
};

const getters = {
  getToDoList: (state) => state.todoList,
};

const mutations = {
  [SET_TODO_LIST](state, payload) {
    state.todoList = payload;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
