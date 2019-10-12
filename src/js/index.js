// https://mp.weixin.qq.com/s/1jstaEeSUq2eMIUXEqJb-A
// https://github.com/brickspert/blog/issues/22#coordination
import createStore from '@/store/index';
import * as types from '@/store/actionType';

window.onload = function() {
  class MyRedux {
    constructor() {
      this.state = null;

      this.DOM = {
        changeColorBtn: document.querySelector("#changeColorBtn"),
        changeFontBtn: document.querySelector("#changeFontBtn"),
        header: document.querySelector("#header"),
        content: document.querySelector("#content"),
        countID: document.querySelector("#countID"),
        increment: document.querySelector("#increment"),
        decrement: document.querySelector("#decrement")
      }
    }

    get stateDate() {
      return store.getState();
    }

    set stateDate(value) {
      this.state = value;
    }

    renderHeader = ()　=> {
      const { header} = this.DOM;
      const { color, fontSize } = this.stateDate.info;
      header.style.color = color;
      header.style.fontSize = fontSize;
    }

    renderContent = () => {
      const { content } = this.DOM;
      const { color, fontSize } = this.stateDate.info;
      content.style.color = color;
      content.style.fontSize = fontSize;
    }

    renderCount = () => {
      const { countID } = this.DOM;
      const { count } = this.stateDate.counter;
      countID.innerText = count;
    }

    renderApp() {
      this.renderHeader();
      this.renderContent();
      this.renderCount();
    }

    changeColor = () => {
      this.stateDate = store.dispatch({ type: types.CHANGE_COLOR, color: 'deeppink'});
      // this.state.color = "deeppink";
      // this.renderApp(this.stateDate);
    }

    changeFont = () => {
      this.stateDate = store.dispatch({ type: types.CHANGE_FONT, fontSize: '40px' });
      // this.state.fontSize = "20px";
      // this.renderApp(this.stateDate);
    }

    increment = () => {
      this.stateDate = store.dispatch({ type: types.INCREMENT});
    }

    decrement = () => {
      const next = store.dispatch;

      // this.stateDate = store.dispatch({ type: types.DECREMENT });
      store.dispatch = action =>  {
        try {
          console.log('this state', store.getState());
          console.log('action', action);
          next(action);
          console.log('next state', store.getState());
        } catch (error) {
          console.log(error)
        }
      };

      this.stateDate = store.dispatch({ type: types.DECREMENT });
    }

    bindEvents() {
      const wm = new WeakMap();
      const { changeColorBtn, changeFontBtn, increment, decrement } = this.DOM;
      wm.set(changeColorBtn, this.changeColor);
      wm.set(changeFontBtn, this.changeFont);
      wm.set(increment, this.increment);
      wm.set(decrement, this.decrement);

      changeColorBtn.addEventListener('click', wm.get(changeColorBtn), false);
      changeFontBtn.addEventListener('click', wm.get(changeFontBtn), false);
      increment.addEventListener('click', wm.get(increment), false);
      decrement.addEventListener('click', wm.get(decrement), false);
    }

    init() {
      // 派发一个随机type,返回默认值
      this.stateDate = store.dispatch({ type: `@@redux/__INIT__${Math.random()}`});
      this.renderApp();
      this.bindEvents();
      store.subscribe(() => this.renderApp());
    }
  }

  const myRedux = new MyRedux();
  const store = createStore();
  myRedux.init();
}