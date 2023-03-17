(()=>{"use strict";const t=(t,e)=>{return{length:(i=t,i<1?1:i>5?5:i),name:e,hits:[],hit(t){this.hits.every((e=>e.toString()!==t))&&this.hits.push(t)},isSunk(){return this.hits.length===this.length}};var i};let e=10;function i(t,e,i,r){let s=document.createElement(e);return s.classList.add(t),s.textContent=r,i.appendChild(s),s}function r(t,i,r,s){let n=parseInt(i[0]),a=parseInt(i[1]);if(0==t){let t=n+(r.length-1)>=e?11-n:r.length;for(let e=0;e<t;e++){let t=document.querySelector(`[data-value="${n+e},${a}"]`);"add"===s?t.classList.add("hover"):"remove"===s&&t.classList.remove("hover")}}}function s(t,e){let i=!0;return e.forEach((e=>{t.indexOf(e)>-1&&(i=!1)})),i}function n(t,e){this.ship=t,this.position=e}const a=()=>{let t=[];return{gameboard:t,missedShots:[],placeShip(t,e,i){if(!1===function(t,e,i,r){if(i){if(e[0]+(t.length-1)>10||e[0]+(t.length-1)<1)return!1;let i=[];for(let r=0;r<t.length;r++)i.push(`[${e[0]+r}, ${e[1]}]`);return s(r,i)}if(e[1]+(t.length-1)>10||e[1]+(t.length-1)<1)return!1;let n=[];for(let i=0;i<t.length;i++)n.push([e[0],e[1]+i].toString());return s(r,n)}(t,e,i,this.gameboard.map((t=>t.position.toString()))))return!1;if(i){for(let i=0;i<t.length;i++){let r=new n(t,[e[0]+i,e[1]]);this.gameboard.push(r)}return!0}for(let i=0;i<t.length;i++){let r=new n(t,[e[0],e[1]+i]);this.gameboard.push(r)}return!0},recieveAttack(e){let i=this.gameboard.find((t=>t.position.toString()==e.toString())),r=this.gameboard.indexOf(i);if(-1!==r)return t[r].ship.hit(e),t[r].ship.hits;this.recieveMissedHit(e)},recieveMissedHit(t){-1!==this.missedShots.findIndex((e=>e.toString()===t.toString()))||this.missedShots.push(t)},checkAllShipsSunk:()=>t.reduce(((t,e)=>(t.find((t=>t.name===e.ship.name))?e.times++:(e.times=1,t.push(e.ship)),t)),[]).every((t=>!0===t.isSunk()))}};function l(t,e){return Math.floor(Math.random()*(e-t+1)+t)}console.log("working");let o=document.querySelector("body"),h={createStartGameMenu(t){let r=i("start-menu-div","div",t),s=(i("welcome-text","div",r,"Welcome to Battleships"),i("place-text","div",r));i("place-text-p","p",s,"Place your"),i("place-current","p",s),i("rotate-button","button",r,"Rotate"),function(t,i){let r=document.createElement("div");r.setAttribute("id","place-ship-gameboard".toString()),r.classList.add("gameboard-div"),i.appendChild(r);for(let t=1;t<=e;t++)for(let i=1;i<=e;i++){let e=document.createElement("div");e.classList.add("gameboard-tile"),e.setAttribute("data-value",[i,t]),r.appendChild(e)}}(0,r)},createShips(e){e.ships.push(t(5,"Carrier")),e.ships.push(t(4,"Battleship")),e.ships.push(t(3,"Cruiser")),e.ships.push(t(3,"Carrier")),e.ships.push(t(2,"Destroyer"))},enableShipPlacing(t){let e=document.querySelector(".place-current"),i=document.querySelectorAll(".gameboard-tile"),s=document.querySelector(".rotate-button"),n=!1;s.addEventListener("click",(()=>{n=0==n}));let a=[];for(a.push(t.ships[0]);a.length;){let t=a.shift();e.textContent=t.name,i.forEach((e=>{e.addEventListener("mouseover",(()=>{let i=e.getAttribute("data-value").split(",");r(n,i,t,"add")})),e.addEventListener("mouseout",(()=>{let i=e.getAttribute("data-value").split(",");r(n,i,t,"remove")}))}))}}};h.createStartGameMenu(o);let u={name:"player1",ships:[],gameboard:a(),passAttacks:[],attack(t,e){if(this.checkAlreadyHit(t))return!1;this.passAttacks.push(t),e.recieveAttack(t)},randomAttack(t){let e=l(1,10),i=l(1,10),r=[e,i];for(;this.checkAlreadyHit(r);)e=l(1,10),i=l(1,10),r=[e,i];return this.attack(r,t),l(1,10)},checkAlreadyHit(t){return-1!==this.passAttacks.findIndex((e=>e.toString()===t.toString()))}};h.createShips(u),h.enableShipPlacing(u)})();