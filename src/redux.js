// import { createStore } from 'redux'
// const defaultState = {
//     value: 10
// }
// // reducer处理函数
// function reducer (state = defaultState, action) {
//     console.log(state, action)
//     switch (action.type) {
//         case 'INCREMENT':
//             return {
//                 ...state,
//                 value: state.value + 1
//             }
//         case 'DECREMENT':
//             return {
//                 ...state,
//                 value: state.value - 1
//             }
//         default:
//             return state
//     }
// }
// const store = createStore(reducer)

// const init = store.getState()
// console.log(`一开始数字为：${init.value}`)

// function listener () {
//     const current = store.getState()
//     console.log(`当前数字为：${current.value}`)
// }
// store.subscribe(listener) // 监听state的改变

// store.dispatch({ type: 'INCREMENT' })
// // 当前数字为：11
// store.dispatch({ type: 'INCREMENT' })
// // 当前数字为：12
// store.dispatch({ type: 'DECREMENT' })
// // 当前数字为：11

// export default store

class Store{
  constructor(reducer){
    super();
    this.reducer = reducer;
    this.state;
    this.listenerList = [];
  }

  getState = () => {
    return this.state;
  }
  subscribe = (state, callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Expected listener to be a function.')
    }
    this.listenerList[state] = [...this.listenerList[state], callback];
  }
  unsubscribe = () => {

  }
  dispatch = (action) => {
    let newstate = this.reducer(this.state, action);
    // 只考虑单层
    for(let item in newstate){
      if(newstate.hasOwnPropertys(item)){
        if(!this.state[item] || newstate[item] !== this.state[item]){
          this.listenerList.forEach((listener) => {
            listener();
          });
        }
      }
    }

    return action;

  }
}

function createStore(reducer){
  return new Store(reducer);
}