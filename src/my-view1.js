/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement } from '@polymer/polymer/polymer-element';
import './shared-styles';


const template = document.createElement('template');
template.innerHTML = `
<style include="shared-styles">
    :host {
      display: block;
      padding: 10px;
    }
    
</style>

<div class = card>
<h1>游戏简介</h1>
点击屏幕进行跳跃， 别接触墙上的刺。<br>
<iframe src="./src/game/dont-touch-spike/index.html" frameborder="0"></iframe>
  <button id = "start-game">全屏</button>
  
</div>
`;
class MyView1 extends PolymerElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$startGame = this._shadowRoot.getElementById("start-game");
        this.$startGame.addEventListener('click', this._startGame);
    }
    _startGame(){
        window.open("./src/game/dont-touch-spike/index.html");
    }

}

window.customElements.define('my-view1', MyView1);

