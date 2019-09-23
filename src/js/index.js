// https://mp.weixin.qq.com/s/1jstaEeSUq2eMIUXEqJb-A
import createStore from '@/store/index';
import * as types from '@/store/actionType';

window.onload = function() {
  class MyRedux {
    constructor() {
      this.state = {
        color: '',
        fontSize: ''
      };

      this.DOM = {
        changeColorBtn: document.querySelector("#changeColorBtn"),
        changeFontBtn: document.querySelector("#changeFontBtn"),
        header: document.querySelector("#header"),
        content: document.querySelector("#content")
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
      const { color, fontSize } = this.stateDate;
      header.style.color = color;
      header.style.fontSize = fontSize;
    }

    renderContent = () => {
      const { content } = this.DOM;
      const { color, fontSize } = this.stateDate;
      content.style.color = color;
      content.style.fontSize = fontSize;
    }

    renderApp() {
      this.renderHeader();
      this.renderContent();
    }

    changeColor = () => {
      this.stateDate = store.dispatch({ type: types.CHANGE_COLOR, color: 'deeppink'});
      // this.state.color = "deeppink";
      this.renderApp(this.stateDate);
    }

    changeFont = () => {
      this.stateDate = store.dispatch({ type: types.CHANGE_FONT, fontSize: '40px' });
      // this.state.fontSize = "20px";
      this.renderApp(this.stateDate);
    }

    bindEvents() {
      const wm = new WeakMap();
      const { changeColorBtn, changeFontBtn } = this.DOM;
      wm.set(changeColorBtn, this.changeColor);
      wm.set(changeFontBtn, this.changeFont);

      changeColorBtn.addEventListener('click', wm.get(changeColorBtn), false);
      changeFontBtn.addEventListener('click', wm.get(changeFontBtn), false);
    }

    init() {
      // 派发一个随机type,返回默认值
      this.stateDate = store.dispatch({ type: `@@redux/__INIT__${Math.random()}`});
      this.renderApp();
      this.bindEvents();
    }
  }

  const myRedux = new MyRedux();
  const store = createStore();
  myRedux.init();
}