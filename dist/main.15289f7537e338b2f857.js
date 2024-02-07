(()=>{"use strict";class e{constructor(){this.ship=null,this.discovered=!1}setDiscovered(){this.discovered=!0}setShip(e){this.ship=e}getShip(){return this.ship}getDiscovered(){return this.discovered}hasShip(){return null!==this.ship}}function t(e){return Math.floor(Math.random()*e)}class s{constructor(){this.board=this.fillBoard(),this.aliveShips=[],this.takenSpots=[]}fillBoard(){const t=[];for(let e=0;e<10;e++)t.push([]);return t.forEach((t=>{for(let s=0;s<10;s++)t.push(new e)})),t}getShips(){return this.aliveShips}getBoard(){return this.board}placeShip(e,t){e.forEach((e=>{const[s,r]=e;this.board[s][r].setShip(t.getName()),this.takenSpots.push([s,r])})),this.aliveShips.push(t)}placeShipX(e){let s,r,o,i;do{s=t(10),r=t(10),i=[],o=s;for(let t=0;t<e.shipLength;t++)i.push([s,r]),s--}while(this.isOutOfBounds(o,e.shipLength)||this.isAlreadyTaken(i));this.placeShip(i,e)}placeShipY(e){let s,r,o,i;do{s=t(10),r=t(10),i=[],o=r;for(let t=0;t<e.shipLength;t++)i.push([s,r]),r--}while(this.isOutOfBounds(o,e.shipLength)||this.isAlreadyTaken(i));this.placeShip(i,e)}isAlreadyTaken(e){let t=!1;return this.takenSpots.forEach((s=>{const[r,o]=s;e.forEach((e=>{const[s,i]=e;r===s&&o===i&&(t=!0)}))})),t}isOutOfBounds(e,t){return e-t<0||e>10}receiveAttack(e,t){this.board[e][t].setDiscovered(),this.board[e][t].hasShip()&&this.aliveShips.find((s=>s.getName()===this.board[e][t].getShip())).hit()}isAllShipSunk(){let e=!0;return this.aliveShips.forEach((t=>{t.isSunk()||(e=!1)})),e}restartBoard(){this.board=this.fillBoard(),this.aliveShips=[],this.takenSpots=[]}}class r{constructor(e,t){this.shipName=e,this.shipLength=t,this.numberOfHits=0,this.sunk=!1}getName(){return this.shipName}getLength(){return this.shipLength}getHits(){return this.numberOfHits}hit(){this.numberOfHits+=1,this.numberOfHits===this.shipLength&&(this.sunk=!0)}isSunk(){return this.sunk}}class o{constructor(){this.playerBoard=new s}getBoard(){return this.playerBoard}addShips(){[["carrier",5],["battleship",4],["cruiser",3],["submarine",3],["destroyer",2]].forEach((e=>{const[t,s]=e,o=new r(t,s);0===Math.floor(2*Math.random())?this.getBoard().placeShipX(o):this.getBoard().placeShipY(o)}))}redeployShips(){this.getBoard().restartBoard(),this.addShips()}}class i extends o{constructor(e){super(),this.playerName=e}setPlayerName(e){this.playerName=e}getPlayerName(){return this.playerName}}class a extends o{constructor(){super(),this.previousMoves=[]}getRandomMove(){for(;;){const e=[t(10),t(10)];if(!this.previousMoves.some((t=>JSON.stringify(t)===JSON.stringify(e))))return this.previousMoves.push(e),e}}}function n(e,t){const s=t.querySelectorAll("div");0!==s.length&&s.forEach((e=>e.remove())),e.forEach(((e,s)=>{e.forEach(((e,r)=>{const o=document.createElement("div");o.dataset.row=s,o.dataset.col=r,e.hasShip()?o.dataset.ship=e.ship:o.dataset.ship="none",t.appendChild(o)}))}))}(()=>{const e=new i("null"),t=new a,s=s=>{const o=document.querySelector(".playerBoard"),i=document.querySelector(".computerBoard"),a=document.querySelector(".shuffle"),h=document.querySelector(".start");f(s),e.addShips(),t.addShips(),n(e.getBoard().board,o),n(t.getBoard().board,i),p(),k(),a.addEventListener("click",u),h.addEventListener("click",r)},r=()=>{o(),m()},o=()=>{const s=v(),r=s=>{const o=s.currentTarget;g(o),t.getBoard().receiveAttack(o.dataset.row,o.dataset.col),B(),c(t,e.getPlayerName())||h(),o.removeEventListener("click",r)};s.forEach((e=>{e.addEventListener("click",r)}))},h=()=>{setTimeout((()=>{const[s,r]=t.getRandomMove();e.getBoard().receiveAttack(s,r),S(s,r),c(e,"Computer")||L()}),0)},c=(e,t)=>!!e.getBoard().isAllShipSunk()&&(document.querySelector(".winner").innerHTML=`Winner: ${t}`,d(),!0),d=()=>{B(),document.querySelector(".endgame").classList.add("showEndgame"),document.querySelector(".endgame > .restart").addEventListener("click",(()=>{l()}))},l=()=>{e.getBoard().restartBoard(),t.getBoard().restartBoard(),s(e.getPlayerName()),document.querySelector(".endgame").classList.remove("showEndgame"),L()},u=()=>{const t=document.querySelector(".playerBoard");e.redeployShips(),n(e.getBoard().board,t),k()},p=()=>{document.querySelector(".controls").classList.remove("hideControls")},m=()=>{document.querySelector(".controls").classList.add("hideControls")},S=(e,t)=>{y().forEach((s=>{+s.dataset.row===e&&+s.dataset.col===t&&g(s)}))},g=e=>{"none"!==e.dataset.ship?e.classList.add("shipHit"):e.classList.add("discovered")},y=()=>document.querySelectorAll(".playerBoard > div"),v=()=>document.querySelectorAll(".computerBoard > div"),f=t=>{0!==t.length&&(e.setPlayerName(t),document.querySelector(".playerName").innerHTML=t)},B=()=>{document.querySelector(".computerBoard").style.pointerEvents="none"},L=()=>{document.querySelector(".computerBoard").style.pointerEvents="auto"},k=()=>{y().forEach((e=>{"none"!==e.dataset.ship&&e.classList.add("hasShip")}))};return{start:()=>{const e=document.querySelector(".prompt"),t=document.querySelector(".submitPrompt"),r=document.querySelector("#name");e.classList.add("showPrompt"),t.addEventListener("click",(()=>{s(r.value),e.classList.remove("showPrompt")}))}}})().start()})();