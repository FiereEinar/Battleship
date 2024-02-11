(()=>{"use strict";class e{constructor(){this.ship=null,this.discovered=!1}setDiscovered(){this.discovered=!0}setShip(e){this.ship=e}getShip(){return this.ship}getDiscovered(){return this.discovered}hasShip(){return null!==this.ship}}function t(e){return Math.floor(Math.random()*e)}class s{constructor(){this.board=this.fillBoard(),this.aliveShips=[],this.takenSpots=[]}fillBoard(){const t=[];for(let e=0;e<10;e++)t.push([]);return t.forEach((t=>{for(let s=0;s<10;s++)t.push(new e)})),t}getShips(){return this.aliveShips}getBoard(){return this.board}getTileAt(e,t){return this.board[e][t]}getCoordinatesX(e,t,s){const r=[];for(let o=0;o<s;o++)r.push([e,t]),e--;return r}getCoordinatesY(e,t,s){const r=[];for(let o=0;o<s;o++)r.push([e,t]),t--;return r}placeShip(e,t){e.forEach((e=>{const[s,r]=e;this.board[s][r].setShip(t.getName()),this.takenSpots.push([s,r])})),this.aliveShips.push(t)}placeShipX(e,s,r){let o,a,i,n;if(void 0===s&&void 0===r||null===s&&null===r)do{o=t(10),a=t(10),n=[],i=o;for(let t=0;t<e.shipLength;t++)n.push([o,a]),o--}while(this.isOutOfBounds(i,e.shipLength)||this.isAlreadyTaken(n));else{n=[];for(let t=0;t<e.shipLength;t++)n.push([s,r]),s--}this.placeShip(n,e)}placeShipY(e,s,r){let o,a,i=s,n=r;if(void 0===s&&void 0===r||null===s&&null===r)do{i=t(10),n=t(10),a=[],o=n;for(let t=0;t<e.shipLength;t++)a.push([i,n]),n--}while(this.isOutOfBounds(o,e.shipLength)||this.isAlreadyTaken(a));else{a=[];for(let t=0;t<e.shipLength;t++)a.push([s,r]),r--}this.placeShip(a,e)}isAlreadyTaken(e){let t=!1;return this.takenSpots.forEach((s=>{const[r,o]=s;e.forEach((e=>{const[s,a]=e;r===s&&o===a&&(t=!0)}))})),t}isOutOfBounds(e,t){return e-t<0||e>10}receiveAttack(e,t){this.board[e][t].setDiscovered(),this.board[e][t].hasShip()&&this.aliveShips.find((s=>s.getName()===this.board[e][t].getShip())).hit()}isAllShipSunk(){let e=!0;return this.aliveShips.forEach((t=>{t.isSunk()||(e=!1)})),e}restartBoard(){this.board=this.fillBoard(),this.aliveShips=[],this.takenSpots=[]}}class r{constructor(e,t){this.shipName=e,this.shipLength=t,this.numberOfHits=0,this.sunk=!1}getName(){return this.shipName}getLength(){return this.shipLength}getHits(){return this.numberOfHits}hit(){this.numberOfHits+=1,this.numberOfHits===this.shipLength&&(this.sunk=!0)}isSunk(){return this.sunk}}const o=[["carrier",5],["battleship",4],["cruiser",3],["submarine",3],["destroyer",2]];class a{constructor(){this.playerBoard=new s}getBoard(){return this.playerBoard}addShips(){const e=o;this.getBoard().restartBoard(),e.forEach((e=>{const[t,s]=e,o=new r(t,s);0===Math.floor(2*Math.random())?this.getBoard().placeShipX(o):this.getBoard().placeShipY(o)}))}redeployShips(){this.getBoard().restartBoard(),this.addShips()}}class i extends a{constructor(e){super(),this.playerName=e}setPlayerName(e){this.playerName=e}getPlayerName(){return this.playerName}}class n extends a{constructor(){super(),this.previousMoves=[]}getRandomMove(){for(;;){const e=[t(10),t(10)];if(!this.previousMoves.some((t=>JSON.stringify(t)===JSON.stringify(e))))return this.previousMoves.push(e),e}}resetMoves(){this.previousMoves=[]}}function d(e,t){const s=t.querySelectorAll("div");0!==s.length&&s.forEach((e=>e.remove())),e.forEach(((e,s)=>{e.forEach(((e,r)=>{const o=document.createElement("div");o.dataset.row=s,o.dataset.col=r,e.hasShip()?o.dataset.ship=e.ship:o.dataset.ship="none",t.appendChild(o)}))}))}const c=e=>{e.querySelectorAll("div").forEach((e=>{"none"!==e.dataset.ship&&e.classList.add("hasShip")}))},h=()=>{document.querySelector(".computerBoard").style.pointerEvents="auto"},l=()=>{document.querySelector(".computerBoard").style.pointerEvents="none"},u=e=>{0!==e.length&&(document.querySelector(".playerName").innerHTML=e)},p=e=>{"none"!==e.dataset.ship?e.classList.add("shipHit"):e.classList.add("discovered")},m=()=>{document.querySelector(".controls").classList.remove("hideControls")},S=()=>{document.querySelector(".controls").classList.add("hideControls")},g=()=>{document.querySelector(".endgame").classList.remove("showEndgame")},v=()=>{document.querySelector(".endgame").classList.add("showEndgame")},y=e=>{document.querySelector(".winner").innerHTML=`Winner: ${e}`},f=(e,t)=>{e.forEach((e=>{"none"===e.dataset.ship&&e.classList.remove(t)}))},B=()=>{document.querySelector(".prompt").classList.remove("showPrompt")},L=()=>{document.querySelector(".prompt").classList.add("showPrompt")},E=()=>{document.querySelector(".warning").innerHTML="Please ensure that you placed all your ships and entered your name"};(()=>{const e=new i("null"),t=new n,s=document.querySelector(".editContainer");let a=JSON.parse(JSON.stringify(o));const k=s=>{const r=document.querySelector(".playerBoard"),o=document.querySelector(".computerBoard"),a=document.querySelector(".shuffle"),i=document.querySelector(".start"),n=document.querySelector(".edit");u(s),e.setPlayerName(s),t.addShips(),d(e.getBoard().board,r),d(t.getBoard().board,o),m(),c(r),a.addEventListener("click",T),i.addEventListener("click",b),n.addEventListener("click",q)},q=()=>{a=JSON.parse(JSON.stringify(o)),e.getBoard().restartBoard(),L(),d(e.getBoard().board,s),O(a)},O=t=>{const o=document.querySelectorAll(".editContainer > div"),i=document.querySelector(".changeAxis"),n=t[0][1],h=t[0][0];let l="X";window.addEventListener("keydown",(e=>{l=" "===e.key&&"X"===l?"Y":"X"})),i.addEventListener("click",(()=>{l="X"===l?"Y":"X"})),o.forEach((t=>{t.addEventListener("mouseover",(()=>{w(+t.dataset.row,+t.dataset.col,n,l)})),t.addEventListener("click",(()=>{const o=+t.dataset.row,i=+t.dataset.col,u=new r(h,n);let p=!1;if("X"===l){const t=e.getBoard().getCoordinatesX(o,i,n);e.getBoard().isOutOfBounds(o,n-1)||e.getBoard().isAlreadyTaken(t)||(e.getBoard().placeShipX(u,o,i),p=!0)}else if("Y"===l){const t=e.getBoard().getCoordinatesY(o,i,n);e.getBoard().isOutOfBounds(i,n-1)||e.getBoard().isAlreadyTaken(t)||(e.getBoard().placeShipY(u,o,i),p=!0)}else p=!1;p&&(d(e.getBoard().board,s),c(s),a.length>1&&(a.shift(),O(a)))}))}))},w=(t,s,r,o)=>{const a=document.querySelectorAll(".editContainer > div"),i=[],n=t,d=s;for(let e=0;e<r;e++)i.push([t,s]),"X"===o?t--:s--;f(a,"hasShip"),"X"===o&&e.getBoard().isOutOfBounds(n,r-1)||"Y"===o&&e.getBoard().isOutOfBounds(d,r-1)||i.forEach((e=>{const[t,s]=e;a.forEach((e=>{t===+e.dataset.row&&s===+e.dataset.col&&e.classList.add("hasShip")}))}))},b=()=>{N(),S()},N=()=>{const s=Y(),r=s=>{const o=s.currentTarget;p(o),t.getBoard().receiveAttack(o.dataset.row,o.dataset.col),l(),o.removeEventListener("click",r),M(t,e.getPlayerName())||A()};s.forEach((e=>{e.addEventListener("click",r)}))},A=()=>{setTimeout((()=>{const[s,r]=t.getRandomMove();e.getBoard().receiveAttack(s,r),H(s,r),M(e,"Computer")||h()}),0)},M=(e,t)=>!!e.getBoard().isAllShipSunk()&&(X(t),!0),X=e=>{l(),v(),y(e),document.querySelector(".endgame > .restart").addEventListener("click",C)},C=()=>{e.getBoard().restartBoard(),t.getBoard().restartBoard(),t.resetMoves(),e.addShips(),k(e.getPlayerName()),g(),h()},T=()=>{const t=document.querySelector(".playerBoard");e.redeployShips(),d(e.getBoard().board,t),c(t)},H=(e,t)=>{P().forEach((s=>{+s.dataset.row===e&&+s.dataset.col===t&&p(s)}))},P=()=>document.querySelectorAll(".playerBoard > div"),Y=()=>document.querySelectorAll(".computerBoard > div");return{start:()=>{const e=document.querySelector(".submitPrompt"),t=document.querySelector("#name");q(),e.addEventListener("click",(()=>{0!==t.value.length&&1===a.length?(k(t.value),B()):E()}))}}})().start()})();