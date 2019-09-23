// https://mp.weixin.qq.com/s/1jstaEeSUq2eMIUXEqJb-A
import changeState from '@/store/index';
import * as types from '@/store/actionType';

console.log(changeState)
window.onload = function() {
  class MyRedux {
    constructor() {
      this.state = {
        color: 'blue',
        fontSize: '14px'
      }

      this.DOM = {
        changeColorBtn: document.querySelector("#changeColorBtn"),
        changeFontBtn: document.querySelector("#changeFontBtn"),
        header: document.querySelector("#header"),
        content: document.querySelector("#content")
      }
    }

    renderHeader = ()　=> {
      const { header} = this.DOM;
      const { color, fontSize } = this.state;
      header.style.color = color;
      header.style.fontSize = fontSize;
    }

    renderContent = () => {
      const { content } = this.DOM;
      const { color, fontSize } = this.state;
      content.style.color = color;
      content.style.fontSize = fontSize;
    }

    renderApp() {
      this.renderHeader();
      this.renderContent();
    }

    changeColor = () => {
      this.state = changeState({ type: types.CHANGE_COLOR, color: 'deeppink'}, this.state);
      // this.state.color = "deeppink";
      this.renderApp();
    }

    changeFont = () => {
      this.state = changeState({ type: types.CHANGE_FONT, fontSize: '20px' }, this.state);
      // this.state.fontSize = "20px";
      this.renderApp();
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
      this.renderApp();
      this.bindEvents();
    }
  }

  const myRedux = new MyRedux();
  myRedux.init();
}