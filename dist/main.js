(()=>{"use strict";const e=(e,t)=>{return{length:(a=e,a<1?1:a>5?5:a),name:t,hits:[],hit(e){this.hits.every((t=>t.toString()!==e))&&this.hits.push(e)},isSunk(){return this.hits.length===this.length}};var a};let t=10;function a(e,a){let r=document.createElement("div");r.setAttribute("id",e.toString()),r.classList.add("gameboard-div"),a.appendChild(r);for(let e=1;e<=t;e++)for(let a=1;a<=t;a++){let t=document.createElement("div");t.classList.add("gameboard-tile"),t.setAttribute("data-value",[a,e]),r.appendChild(t)}return r}function r(e,t,a,r){let i=document.createElement(t);return i.classList.add(e),i.textContent=r,a.appendChild(i),i}function i(e,a,r,i,s,n){if(0==e){let e=a+(i.length-1)>t?11-a:i.length;for(let t=0;t<e;t++){let e=document.querySelector(`${n} > [data-value="${a+t},${r}"]`);"add"===s?e.classList.add("hover"):"remove"===s&&e.classList.remove("hover")}return}let o=r+(i.length-1)>t?11-r:i.length;for(let e=0;e<o;e++){let t=document.querySelector(`[data-value="${a},${r+e}"]`);"add"===s?t.classList.add("hover"):"remove"===s&&t.classList.remove("hover")}}const s=()=>({gameStart:!1,createStartGameMenu(e){document.querySelector("body").classList.add("blur-page");let t=r("start-menu-div","div",e),i=(r("welcome-text","div",t,"Welcome to Battleships"),r("place-text","div",t));r("place-text-p","p",i,"Place your"),r("place-current","p",i),r("rotate-button","button",t,"Rotate"),a("place-ship-gameboard",t)},createPlayerGameboard:(e,t)=>a(t,e),createShips(t){t.ships.push(e(5,"Carrier")),t.ships.push(e(4,"Battleship")),t.ships.push(e(3,"Cruiser")),t.ships.push(e(3,"Submarine")),t.ships.push(e(2,"Destroyer"))},enableShipPlacing(e,t=[],r=0,s=!1){let n=document.querySelector(".place-current"),o=document.querySelectorAll("#place-ship-gameboard > .gameboard-tile"),l=document.querySelector("#place-ship-gameboard"),d=document.querySelector(".start-menu-div"),c=document.querySelector(".rotate-button");for(e.gameboard.updateShipPlacement("#place-ship-gameboard"),c.addEventListener("click",(()=>{s=0==s})),t.push(e.ships[0]);t.length>0&&r<5;){t.shift();let c=e.ships[r];n.textContent=c.name,o.forEach((n=>{let o=n.getAttribute("data-value");o=o.split(",");let h=parseInt(o[0]),u=parseInt(o[1]);n.addEventListener("mouseover",(()=>{i(s,h,u,c,"add","#place-ship-gameboard")})),n.addEventListener("mouseout",(()=>{i(s,h,u,c,"remove","#place-ship-gameboard")})),n.addEventListener("click",(()=>{o=[h,u],1==e.gameboard.placeShip(c,o,s)&&(r+=1,t.push(e.ships[r]),l.remove(),a("place-ship-gameboard",d),this.enableShipPlacing(e,t,r,s))}))}))}5===r&&(this.gameStart=!0)},startGame(e){document.querySelector(".start-menu-div").remove(),e.classList.remove("blur-page")},declareWinner(e){let t=document.querySelector("body");t.classList.add("blur-page");let a=r("game-end-div","div",t),i=r("game-end-text-div","div",a);r("game-end-text","div",i,"player1"===e?"You Win!":"You Lose"),r("reset-button","button",a,"reset").addEventListener("click",(()=>{window.location.reload()}))}});function n(e,t){let a=!0;return t.forEach((t=>{e.indexOf(t.toString())>-1&&(a=!1)})),a}function o(e,t){let a=!0;return t.forEach((t=>{for(let r=-1;r<2;r+=2){let i=[t[0]+r,t[1]];e.indexOf(i.toString())>-1&&(a=!1)}for(let r=-1;r<2;r+=2){let i=[t[0],t[1]+r];e.indexOf(i.toString())>-1&&(a=!1)}})),a}function l(e,t){this.ship=e,this.position=t}const d=()=>{let e=[];return{gameboard:e,missedShots:[],placeShip(e,t,a){if(!1===function(e,t,a,r){if(a){if(t[1]+(e.length-1)>10||t[1]+(e.length-1)<1)return!1;let a=[];for(let r=0;r<e.length;r++)a.push([t[0],t[1]+r]);return 0!=o(r,a)&&n(r,a)}if(t[0]+(e.length-1)>10||t[0]+(e.length-1)<1)return!1;let i=[];for(let a=0;a<e.length;a++)i.push([t[0]+a,t[1]]);return 0!=o(r,i)&&n(r,i)}(e,t,a,this.gameboard.map((e=>e.position.toString()))))return!1;if(a){for(let a=0;a<e.length;a++){let r=new l(e,[t[0],t[1]+a]);this.gameboard.push(r)}return!0}for(let a=0;a<e.length;a++){let r=new l(e,[t[0]+a,t[1]]);this.gameboard.push(r)}return!0},recieveAttack(t){let a=this.gameboard.find((e=>e.position.toString()==t.toString())),r=this.gameboard.indexOf(a);return-1===r?(this.recieveMissedHit(t),!1):(e[r].ship.hit(t),!0)},recieveMissedHit(e){-1!==this.missedShots.findIndex((t=>t.toString()===e.toString()))||this.missedShots.push(e)},checkAllShipsSunk:()=>e.reduce(((e,t)=>(e.find((e=>e.name===t.ship.name))?t.times++:(t.times=1,e.push(t.ship)),e)),[]).every((e=>!0===e.isSunk())),updateShipPlacement(e,t=this.gameboard){0!=t.length&&t.forEach((t=>{let a=t.position;document.querySelector(`${e} > [data-value="${a[0]},${a[1]}"]`).classList.add("selected")}))},updateMissed(e,t=this.missedShots){t.forEach((t=>{document.querySelector(`${e} > [data-value="${t[0]},${t[1]}"]`).classList.add("missed")}))},updateHit(e,t){t.ships.forEach((t=>{t.hits.forEach((t=>{document.querySelector(`${e} > [data-value="${t[0]},${t[1]}"]`).classList.add("hit")}))}))}}};function c(e,t){return Math.floor(Math.random()*(t-e+1)+e)}const h=e=>({name:e,ships:[],gameboard:d(),passAttacks:[],attack(e,t){if(this.checkAlreadyHit(e))return!1;this.passAttacks.push(e),t.recieveAttack(e)},randomAttack(e){let t=c(1,10),a=c(1,10),r=[t,a];for(;this.checkAlreadyHit(r);)t=c(1,10),a=c(1,10),r=[t,a];return this.attack(r,e),c(1,10)},checkAlreadyHit(e){return-1!==this.passAttacks.findIndex((t=>t.toString()===e.toString()))}});function u(e,t){return Math.floor(Math.random()*(t-e+1)+e)}console.log("working");let p=document.querySelector("body"),m=s();m.createStartGameMenu(p),m.createPlayerGameboard(p,"player1-gameboard"),m.createPlayerGameboard(p,"player2-gameboard");let g=h("player1"),b=(()=>{let e=h("aiPlayer"),t=s();return{aiPlayer:e,initialiseGame:t,generateShips(){t.createShips(this.aiPlayer)},generateGameboard(t=this.aiPlayer.gameboard,a=0){if(5===a)return;let r=u(1,10),i=u(1,10),s=[r,i],n=Math.random()<.5;for(;0==t.placeShip(e.ships[a],s,n);)r=u(1,10),i=u(1,10),s=[r,i];this.generateGameboard(t,a+1)},startAiGame(e,a=this.aiPlayer,r=this.aiPlayer.gameboard){document.querySelectorAll("#player2-gameboard > .gameboard-tile").forEach((i=>{i.addEventListener("click",(()=>{let s=function(e){let t=e.getAttribute("data-value");return t=t.split(","),[parseInt(t[0]),parseInt(t[1])]}(i);e.attack(s,r),r.updateMissed("#player2-gameboard"),r.updateHit("#player2-gameboard",a),1!=r.checkAllShipsSunk()?this.aiTurn(e):t.declareWinner("player1")}),{once:!0})}))},aiTurn(a){e.randomAttack(a.gameboard),a.gameboard.updateMissed("#player1-gameboard"),a.gameboard.updateHit("#player1-gameboard",a),1!=a.gameboard.checkAllShipsSunk()||t.declareWinner("player2")}}})();m.createShips(g),b.generateShips(),b.generateGameboard(),m.enableShipPlacing(g),async function(){await function(e){const t=e=>{1==m.gameStart?e():setTimeout((a=>t(e)),400)};return new Promise(t)}(),m.startGame(p),g.gameboard.updateShipPlacement("#player1-gameboard"),b.startAiGame(g)}()})();