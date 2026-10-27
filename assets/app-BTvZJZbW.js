import{s as St,g as Ut,p as A}from"./index-BC2iONB_.js";const C=["S","C","D","H"],Gr=[6,7,8,9,10,11,12,13,14],zr={S:"♠",C:"♣",D:"♦",H:"♥"},Ur={S:"пики",C:"трефы",D:"бубны",H:"черви"},Vr={6:"6",7:"7",8:"8",9:"9",10:"10",11:"В",12:"Д",13:"К",14:"Т"};function Dr(t){return Vr[t]}function ee(t){return t==="D"||t==="H"}function Kr(){const t=[];for(const e of C)for(const r of Gr)t.push({id:`${r}${e}`,suit:e,rank:r});return t}function pe(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let r=e;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}function ut(t,e){const r=t.slice();for(let a=r.length-1;a>0;a--){const i=Math.floor(e()*(a+1));[r[a],r[i]]=[r[i],r[a]]}return r}function ar(t,e){return t[Math.floor(e()*t.length)]}const ue=6;function Le(){return{handSize:6,canTransfer:!1,extraTrump:null,sixKiller:!1}}function Wr(){return{seats:[Le(),Le()],rotatingTrump:!1,hiddenTrump:!1,opponentFirst:!1,playerFirst:!1,memory:!1,bonusTrumps:0}}const sr=t=>t===0?1:0;function Yr(t,e){const r=ut(Kr(),e),a=r[0],i={deck:r,trumpSuit:a.suit,trumpCard:a,trumpRevealed:!t.hiddenTrump,hands:[[],[]],attacker:0,bout:[],phase:"attack",discard:[],mods:t,result:null,knownOpponent:new Set,defended:[0,0],bouts:0,events:[]};Pt(i,0),Pt(i,1);for(let n=0;n<t.bonusTrumps;n++){const o=i.deck.findIndex((l,h)=>h>0&&l.suit===i.trumpSuit);o>0&&i.hands[0].push(i.deck.splice(o,1)[0])}return i.attacker=t.playerFirst?0:t.opponentFirst?1:Jr(i,e),i}function Jr(t,e){const r=n=>{const o=t.hands[n].filter(l=>l.suit===t.trumpSuit).map(l=>l.rank);return o.length?Math.min(...o):99},a=r(0),i=r(1);return a===i?e()<.5?0:1:a<i?0:1}const E=t=>sr(t.attacker);function Q(t){return t.phase==="defend"?E(t):t.attacker}function I(t,e){return e.suit===t.trumpSuit}function Ft(t,e,r,a){const i=t.mods.seats[a];return r.suit===e.suit?r.rank>e.rank:e.suit===t.trumpSuit?!1:r.suit===t.trumpSuit||i.extraTrump&&r.suit===i.extraTrump?!0:i.sixKiller&&r.rank===6}const tt=t=>t.bout.filter(e=>!e.defense&&!e.parried);function Xr(t){const e=new Set;for(const r of t.bout)e.add(r.attack.rank),r.defense&&e.add(r.defense.rank);return e}function Vt(t,e){return t.phase!=="attack"&&t.phase!=="pickup"||!t.hands[t.attacker].some(r=>r.id===e.id)?!1:t.bout.length===0?t.phase==="attack":t.bout.length>=ue||tt(t).length>=t.hands[E(t)].length?!1:Xr(t).has(e.rank)}function ir(t,e){if(!Vt(t,e))throw new Error(`Нельзя ходить ${e.id}`);const r=t.attacker;Dt(t,r,e),t.bout.push({attack:e,defense:null}),be(t,e),t.events.push({type:"attack",seat:r,card:e}),t.phase==="attack"&&(t.phase="defend")}function wt(t,e,r){if(t.phase!=="defend")return!1;const a=t.bout[e];if(!a||a.defense||a.parried)return!1;const i=E(t);return t.hands[i].some(n=>n.id===r.id)?Ft(t,a.attack,r,i):!1}function ke(t,e,r){if(!wt(t,e,r))throw new Error(`Нельзя бить ${r.id}`);const a=E(t);Dt(t,a,r),t.bout[e].defense=r,be(t,r),t.events.push({type:"defend",seat:a,card:r,trump:r.suit===t.trumpSuit}),tt(t).length===0&&(t.phase="attack")}function xt(t,e){if(t.phase!=="defend")return!1;const r=E(t);return!t.mods.seats[r].canTransfer||!t.hands[r].some(a=>a.id===e.id)||t.bout.some(a=>a.defense||a.parried)||e.rank!==t.bout[0].attack.rank?!1:t.hands[t.attacker].length>=t.bout.length+1}function $e(t,e){if(!xt(t,e))throw new Error(`Нельзя перевести ${e.id}`);const r=E(t);Dt(t,r,e),t.bout.push({attack:e,defense:null}),be(t,e),t.attacker=r,t.events.push({type:"transfer",seat:r,card:e})}function Qr(t,e){const r=t.bout[e];if(t.phase!=="defend"||!r||r.defense||r.parried)throw new Error("Нечего отбивать");r.parried=!0,tt(t).length===0&&(t.phase="attack")}function nr(t){if(t.phase!=="defend")throw new Error("Брать можно только при защите");t.phase="pickup"}function or(t){return t.hands[t.attacker].filter(e=>Vt(t,e))}function ge(t){if(t.phase==="pickup"){const e=E(t),r=t.bout.flatMap(a=>a.defense?[a.attack,a.defense]:[a.attack]);if(t.hands[e].push(...r),e===1&&t.mods.memory)for(const a of r)t.knownOpponent.add(a.id);t.events.push({type:"take",seat:e,count:r.length}),Re(t,!1)}else if(t.phase==="attack"&&t.bout.length>0&&tt(t).length===0){for(const e of t.bout)t.discard.push(e.attack),e.defense&&t.discard.push(e.defense);t.defended[E(t)]++,t.events.push({type:"bito"}),Re(t,!0)}else throw new Error("Отбой ещё не закончен")}function Re(t,e){const r=t.attacker,a=sr(r);if(t.bout=[],t.bouts++,Pt(t,r),Pt(t,a),t.mods.rotatingTrump&&(t.trumpSuit=C[(C.indexOf(t.trumpSuit)+1)%C.length],t.events.push({type:"trump",suit:t.trumpSuit})),t.deck.length===0){const i=t.hands[0].length===0,n=t.hands[1].length===0;if(i||n){t.result=i&&n?"draw":i?"win":"lose",t.phase="over",t.events.push({type:"over",result:t.result});return}}t.attacker=e?a:r,t.phase="attack"}function Pt(t,e){const r=t.mods.seats[e].handSize;for(;t.hands[e].length<r&&t.deck.length>0;)t.hands[e].push(t.deck.pop());t.deck.length===0&&(t.trumpCard=null)}function Dt(t,e,r){const a=t.hands[e],i=a.findIndex(n=>n.id===r.id);if(i<0)throw new Error(`Нет карты ${r.id}`);a.splice(i,1),e===1&&t.knownOpponent.delete(r.id)}function be(t,e){!t.trumpRevealed&&e.suit===t.trumpSuit&&(t.trumpRevealed=!0)}function cr(t,e,r){return t.deck.length<2?!1:(Dt(t,e,r),t.discard.push(r),t.hands[e].push(t.deck.pop()),!0)}function Ae(t,e){t.trumpSuit=e,t.trumpRevealed=!0,t.events.push({type:"trump",suit:e})}function kt(t,e){return e.rank+(I(t,e)?9:0)}const re=t=>(e,r)=>kt(t,e)-kt(t,r),ae=t=>t<=0?.4:t===1?.2:0;function ta(t,e,r){const a=Q(t);return t.phase==="defend"?ra(t,a,e,r):ea(t,a,e,r)}function ea(t,e,r,a){const i=t.hands[e].slice().sort(re(t)),n=t.hands[E(t)],o=t.deck.length===0,l=o&&r>=2;if(t.bout.length===0){if(l){const F=i.filter(Nr=>!n.some(_r=>Ft(t,Nr,_r,E(t))));if(F.length)return{type:"attack",card:F[0]}}const g=i.filter(F=>!I(t,F)),p=g.length?g:i,v=new Map;for(const F of p)v.set(F.rank,(v.get(F.rank)??0)+1);const Et=p.find(F=>(v.get(F.rank)??0)>1&&F.rank<=p[0].rank+2);return r<=0&&a()<ae(r)?{type:"attack",card:p[Math.floor(a()*p.length)]}:{type:"attack",card:Et??p[0]}}const h=or(t).sort(re(t));if(h.length===0)return{type:"finish"};if(a()<ae(r))return{type:"finish"};if(t.phase==="pickup"){const g=h.find(p=>o||!I(t,p)&&p.rank<=10+r);return g?{type:"attack",card:g}:{type:"finish"}}if(l){const g=h.find(p=>!n.some(v=>Ft(t,p,v,E(t))));return g?{type:"attack",card:g}:{type:"attack",card:h[0]}}const d=h[0],f=!I(t,d)&&d.rank<=9+r,m=t.deck.length<=6&&!I(t,d);return f||m||o?{type:"attack",card:d}:{type:"finish"}}function ra(t,e,r,a){const i=t.hands[e].slice().sort(re(t)),n=tt(t),o=t.deck.length===0,l=i.find(g=>xt(t,g)&&(o||!I(t,g)));if(l)return{type:"transfer",card:l};const h=n.slice().sort((g,p)=>kt(t,p.attack)-kt(t,g.attack))[0],d=t.bout.indexOf(h),f=i.filter(g=>wt(t,d,g));if(f.length===0)return{type:"take"};if(n.length>1&&!aa(t,e,n.map(g=>g.attack),i))return{type:"take"};const m=f[0];if(!o){const g=t.bout.length,p=I(t,m)&&!I(t,h.attack)&&(m.rank>=12||h.attack.rank<=8),v=t.deck.length>8;if(p&&v&&g<=2&&(!(r<=1)||a()<.5))return{type:"take"};if(a()<ae(r)*.4)return{type:"take"}}return{type:"defend",pair:d,card:m}}function aa(t,e,r,a){if(r.length>a.length)return!1;const i=a.slice(),n=r.slice().sort((o,l)=>kt(t,l)-kt(t,o));for(const o of n){const l=i.findIndex(h=>Ft(t,o,h,e));if(l<0)return!1;i.splice(l,1)}return n.length<=ue}const L={sixKiller:{id:"sixKiller",name:"Шестёрка-убийца",icon:"sixKiller",price:6,desc:"Твои шестёрки бьют любую некозырную карту"},transfer:{id:"transfer",name:"Переводчик",icon:"transfer",price:6,desc:"Можешь переводить: картой того же достоинства, пока ничего не побито"},seventh:{id:"seventh",name:"Седьмая карта",icon:"seventh",price:7,desc:"Добираешь до 7 карт"},memory:{id:"memory",name:"Память",icon:"memory",price:5,desc:"Карты, которые соперник забрал со стола, остаются у него открытыми"},piggy:{id:"piggy",name:"Копилка",icon:"piggy",price:4,desc:"+1 монета за каждые 2 отбоя, которые ты отбил"},secondSuit:{id:"secondSuit",name:"Вторая масть",icon:"secondSuit",price:7,desc:"В начале стола выпадает вторая масть — для тебя она тоже бьёт как козырь"},cheat:{id:"cheat",name:"Шулер",icon:"cheat",price:5,desc:"Раз за стол: сбрось выбранную карту и возьми из колоды"},spareTrump:{id:"spareTrump",name:"Запасной козырь",icon:"spareTrump",price:6,desc:"Начинаешь каждый стол с лишним случайным козырем"},greed:{id:"greed",name:"Жадность",icon:"greed",price:5,desc:"Карты, оставшиеся у соперника, дают по 2 монеты вместо 1"}},U={changeTrump:{id:"changeTrump",name:"Смена козыря",icon:"changeTrump",price:3,desc:"Козырем становится масть, которой у тебя больше всего"},reset:{id:"reset",name:"Сброс",icon:"reset",price:3,desc:"Сбрось 2 младшие некозырные карты и добери"},peek:{id:"peek",name:"Подглядеть",icon:"peek",price:2,desc:"До конца отбоя видишь все карты соперника"},parry:{id:"parry",name:"Отбой",icon:"parry",price:3,desc:"При защите: одна атакующая карта уходит в отбой без защиты"}},D={mihalych:{id:"mihalych",name:"Михалыч-шулер",icon:"mihalych",rule:"После каждого отбоя козырь меняется на следующую масть"},general:{id:"general",name:"Генерал",icon:"general",rule:"Всегда ходит первым и добирает до 7 карт"},fog:{id:"fog",name:"Туман",icon:"fog",rule:"Козырь скрыт, пока кто-нибудь не сыграет козырем"},translator:{id:"translator",name:"Переводчица",icon:"translator",rule:"Переводит, как только может"}},Xt=[[{name:"Дед Матвей",icon:"matvey"},{name:"Тётя Зина",icon:"zina"}],[{name:"Вован",icon:"vovan"},{name:"Проводница Люба",icon:"lyuba"}],[{name:"Шахматист Гоша",icon:"gosha"},{name:"Капитан",icon:"captain"}]],$t=[null,null,"Умеет переводить"],He=4,It=2,gt=3,at=[{n:1,name:"Дворовая",rule:"Правила как есть — для знакомства"},{n:2,name:"Мелкие ставки",rule:"За победу на 1 монету меньше"},{n:3,name:"Тесный пояс",rule:"3 места под джокеров вместо 4"},{n:4,name:"Хитрые соперники",rule:"Все соперники на уровень умнее"},{n:5,name:"Дорогая лавка",rule:"В лавке всё на 1 монету дороже"},{n:6,name:"Двойные боссы",rule:"У каждого босса второе правило"},{n:7,name:"Полная рука",rule:"Все соперники добирают до 7 карт"},{n:8,name:"Дурацкая",rule:"2 жизни вместо 4"}],me=at.length,j=me+1,se={name:"Бесконечный",rule:"С каждым кругом труднее, за босса — трофей или жизнь"},sa=[["fog","mihalych"]],ia={matvey:{intro:["Садись, внучок. Я в дурака играл, когда тебя ещё в проекте не было. Чай будешь?","Барсик мой и тот лучше тебя тасует. Ну, раздавай, раздавай.","Я как-то весь вагон до Воркуты в дураках оставил. Посмотрим, что ты за птица."],rematch:"Опять ты? Ну садись, садись. Дед добрый — дед ещё раз обыграет."},zina:{intro:["Проходи, проходи! Только руки помой. И не жульничай — я тридцать лет в бухгалтерии, всё вижу.","Варенье потом, сначала партию. Проиграешь — посуду моешь.","Я, милок, петли считаю быстрее, чем ты карты. Сдавай."],rematch:"Что, понравилось у тёти Зины? Садись, ещё подсыплю."},vovan:{intro:["О, здоро́во. Ща, ключ на семнадцать положу… Ну чё, раскидаем?","Я в армии весь взвод обыгрывал. Сержант до сих пор дуется.","Только по-честному, без фокусов. Фокусы у нас в гараже плохо заканчиваются."],rematch:"Реванш? Уважаю. Только не плачь потом."},lyuba:{intro:["Чай будете? Сахар два кусочка. А пока греется — партеечку.","До следующей станции сорок минут. Как раз успею оставить вас в дураках.","Двенадцать лет на маршруте. Знаете, сколько пассажиров уехало дураками?"],rematch:"Билетик предъявите… Шучу. Садитесь, отыграйтесь."},gosha:{intro:["Дурак — игра вероятностей. Я посчитал: ваши шансы — тридцать семь процентов. Округлим вниз.","Обычно я играю в шахматы, но там соперники кончились.","Я запоминаю все вышедшие карты. Это не жульничество, это память."],rematch:"Любопытно. Повторим эксперимент при тех же условиях."},captain:{intro:["Добро пожаловать на борт! Качка сегодня бодрая — держи карты крепче.","В море я видал шторма и пострашнее тебя. Сдавай, салага.","Проиграешь — драишь палубу. Морская традиция, я её только что придумал."],rematch:"Снова за штурвал? Хвалю за упрямство!"},mihalych:{intro:["Добрый вечер. Козырь сегодня… а впрочем, какая разница? Он у меня всё равно меняется.","Не волнуйтесь, у меня всё честно. Почти. Козыри просто иногда… передумывают.","Тридцать лет за столом — ни одного проигрыша. Ну, почти ни одного."],rematch:"Вернулись за добавкой? Похвально."},general:{intro:["Смирно! Первым хожу я. Это не обсуждается — это устав.","Семь карт в руке и первый ход — так выглядит превосходство. Приступим.","Наступление начнётся по моей команде. То есть сейчас."],rematch:"Повторная атака? Одобряю. Но и я не сплю."},fog:{intro:["…Козырь? Его здесь нет. Пока я не захочу.","Ты слышишь шорох карт? Это не мои. Или мои…","В тумане все масти серые. Угадаешь козырь — может, и выйдешь."],rematch:"…Снова ты. Туман не забывает."},translator:{intro:["Позвольте перевести: «сейчас вы проиграете». В оригинале звучит лучше.","Каждую вашу карту я переведу — обратно вам.","Я знаю семь языков, и на всех «дурак» звучит одинаково."],rematch:"Повтор? С удовольствием переведу и его."}},Rt={tophat:{id:"tophat",boss:"mihalych",name:"Цилиндр Михалыча",icon:"tophat",desc:"Раз за стол: козырем становится масть, которой у тебя больше всего"},epaulettes:{id:"epaulettes",boss:"general",name:"Погоны Генерала",icon:"epaulettes",desc:"Ты всегда ходишь первым — даже против Генерала"},lantern:{id:"lantern",boss:"fog",name:"Фонарь из Тумана",icon:"lantern",desc:"Видишь верхнюю карту колоды — знаешь, что придёт"},dictionary:{id:"dictionary",boss:"translator",name:"Словарь Переводчицы",icon:"dictionary",desc:"Ты переводишь, а соперники — нет"}},ye=t=>Object.values(Rt).find(e=>e.boss===t),na={mihalych:"Ладно… Шулер шулера видит издалека. Забирай мой цилиндр — заслужил.",general:"Отступаю… Временно! Погоны возьми. Носи с честью.",fog:"…Туман рассеивается. Возьми фонарь — он показывает то, что скрыто.",translator:"Это не переводится… Ладно, держите словарь. Пригодится."},oa={trump:{title:"Козырь",text:"Масть нижней карты колоды — козырь. Козырь бьёт любую карту другой масти. Козыри в руке обведены золотом.",target:".trump-badge",place:"top"},attack:{title:"Ваш ход",text:"Положите на стол любую карту — нажмите на неё. Лучше начинать с мелких некозырных.",target:".hand",place:"top"},defend:{title:"Отбивайтесь",text:"Побейте карту старшей той же масти или козырем. Подходящие карты в руке подняты. Нечем бить — «Беру».",target:".bout",place:"top"},throw:{title:"Можно подкинуть",text:"Соперник отбился. Подкиньте карту того же достоинства, что уже на столе, — или нажмите «Бито», и ход перейдёт к сопернику.",target:".actions",place:"top"},pickup:{title:"Соперник берёт",text:"Подкиньте ему вдогонку карты того же достоинства, что на столе, или нажмите «Пусть берёт».",target:".actions",place:"top"},belt:{title:"Джокеры и приёмы",text:"Внизу — ваши джокеры (действуют всегда) и приёмы (один раз). Нажмите на любой, чтобы прочитать или применить.",target:".belt",place:"top"},endgame:{title:"Колода кончилась",text:"Карты больше не добираются. Кто первым избавится от всех карт — победил, оставшийся с картами — дурак.",target:".deck-area",place:"top"},boss:{title:"Босс",text:"У босса особое правило — оно написано под именем. Победа над боссом стоит вдвое дороже.",target:".opp-name",place:"low"},shop:{title:"Лавка",text:"Монеты за победы тратьте здесь. Джокеры меняют правила в вашу пользу на весь забег, приёмы срабатывают один раз.",target:".shop-items",place:"shop"},endless:{title:"Бесконечный режим",text:"Каждый новый круг добавляет трудность. За босса — трофей или жизнь. Сколько продержитесь?",target:".hud .where",place:"low"}},At=[{title:"Дурак, но с секретом",text:"Обычный подкидной дурак один на один: избавьтесь от карт раньше соперника. Остался с картами — дурак.",art:"cards"},{title:"Забег",text:"Три круга: в каждом два стола и босс. Проиграли стол — минус жизнь, стол переигрывается. Жизней — четыре.",art:"hearts"},{title:"Джокеры",text:"За победы — монеты. В лавке между столами покупайте джокеров: они ломают правила в вашу пользу.",art:"joker"}],we="durak.tips",lr="durak.tipsOff",dr="durak.introSeen",xe=t=>Ut(t),Nt=(t,e)=>St(t,e),Tt=new Set((()=>{try{return JSON.parse(xe(we)??"[]")}catch{return[]}})());let lt=xe(lr)==="1",hr=xe(dr)==="1";const fr=()=>!lt,ca=t=>Tt.has(t);function la(t){Tt.add(t),Nt(we,JSON.stringify([...Tt]))}function da(){lt=!lt,Nt(lr,lt?"1":null),lt||(Tt.clear(),Nt(we,"[]"))}const ha=()=>hr;function Be(){hr=!0,Nt(dr,"1")}function fa(t){return lt||Tt.has(t)?null:(la(t),{id:t,...oa[t]})}const et=t=>t===8?2:4,H=t=>t.stage===j;function pr(t=1,e=Math.floor(Math.random()*2**31)){const r=pe(e),a=ut(Object.keys(D),r).slice(0,gt);return{seed:e,rnd:r,circle:0,step:0,hearts:et(t),coins:4,jokers:[],consumables:[ar(Object.keys(U),r)],bosses:a,wins:0,over:null,stage:t,trophies:[],reviveUsed:!1}}const ur={lowStakes:2,tightBelt:3,smart:4,pricey:5,doubleBoss:6,fullHand:7},ie={lowStakes:3,pricey:4,doubleBoss:5,smart:6,fullHand:7};function bt(t,e){if(H(t)){const r=ie[e];return r!==void 0&&t.circle>=r}return t.stage>=ur[e]}function pa(t){if(!H(t)||t.step!==0)return null;const e=Object.keys(ie).find(r=>ie[r]===t.circle);return e?at[ur[e]-1].rule:t.circle===8?"Соперники играют в полную силу":null}const _t=t=>bt(t,"tightBelt")?He-1:He,ne=t=>bt(t,"pricey")?1:0;function Kt(t,e){if(e<t.bosses.length)return t.bosses[e];const r=Object.keys(D),a=Kt(t,e-1),i=r[(t.seed+e*3)%r.length];return i===a?r[(r.indexOf(i)+1)%r.length]:i}function ve(t){if(t.circle<Xt.length)return Xt[t.circle][t.step];const e=Xt.flat();return e[(t.seed+t.circle*2+t.step)%e.length]}function kr(t,e){if(!bt(t,"doubleBoss"))return null;const r=(i,n)=>i===n||sa.some(([o,l])=>o===i&&l===n||o===n&&l===i),a=Object.keys(D).filter(i=>!r(e,i));return a[(t.seed+t.circle*7)%a.length]}function Me(t){if(!t.boss)return null;const e=D[t.boss].rule;if(!t.bossExtra)return e;const r=D[t.bossExtra].rule;return`${e}. И ещё: ${r.charAt(0).toLowerCase()}${r.slice(1)}`}const N=(t,e)=>t.jokers.includes(e),mt=(t,e)=>t.trophies.includes(e),oe=t=>t.step===2;function ua(t){return ut(Object.keys(L),t.rnd).slice(0,3)}function ka(t){const e=Wr(),[r,a]=e.seats;N(t,"seventh")&&(r.handSize=7),r.canTransfer=N(t,"transfer"),r.sixKiller=N(t,"sixKiller"),e.memory=N(t,"memory"),e.bonusTrumps=N(t,"spareTrump")?1:0,t.circle>=2&&(a.canTransfer=!0),bt(t,"fullHand")&&(a.handSize=7);const i=oe(t)?Kt(t,t.circle):null,n=i?kr(t,i):null;for(const f of[i,n])f==="mihalych"&&(e.rotatingTrump=!0),f==="general"&&(e.opponentFirst=!0,a.handSize=7),f==="fog"&&(e.hiddenTrump=!0),f==="translator"&&(a.canTransfer=!0);mt(t,"dictionary")&&(r.canTransfer=!0,a.canTransfer=!1),mt(t,"epaulettes")&&(e.playerFirst=!0);const o=Yr(e,t.rnd);N(t,"secondSuit")&&(r.extraTrump=ar(C.filter(f=>f!==o.trumpSuit),t.rnd));const l=i?{name:D[i].name,icon:D[i].icon}:ve(t),h=t.circle>=8?3:t.circle>=3?2:[0,1,1][t.circle],d=Math.min(3,Math.max(h,i?1:0)+(bt(t,"smart")?1:0));return{table:o,opponent:l,boss:i,bossExtra:n,level:d}}function $a(t,e){const r=[];if(e.result==="win"){const i=(oe(t)?6:3)-(bt(t,"lowStakes")?1:0);r.push({label:oe(t)?"Победа над боссом":"Победа",amount:i});const n=e.hands[1].length,o=N(t,"greed")?2:1;n>0&&r.push({label:`Карт у соперника: ${n}${o>1?" × 2":""}`,amount:n*o})}else e.result==="draw"&&r.push({label:"Ничья",amount:2});const a=Math.floor(e.defended[0]/2);return N(t,"piggy")&&a>0&&r.push({label:`Копилка: отбито ${e.defended[0]}`,amount:a}),r}function ga(t,e,r){if(t.coins+=r.reduce((a,i)=>a+i.amount,0),e==="lose"){t.hearts--,t.hearts<=0&&(t.over="lost");return}if(t.wins++,t.step<2){t.step++;return}t.step=0,t.circle++,!H(t)&&t.circle>=gt&&(t.over="won")}const $r=8;function ba(t,e){const r=[mt(t,ye(e).id)?"coins":"trophy"];return t.hearts<et(t.stage)&&r.push("heart"),r}function ma(t,e,r){r==="trophy"?t.trophies.push(ye(e).id):r==="heart"?t.hearts=Math.min(et(t.stage),t.hearts+1):t.coins+=$r}function ya(t){t.reviveUsed||(t.reviveUsed=!0,t.hearts=Math.min(et(t.stage),t.hearts+1),t.over==="lost"&&(t.over=null))}function wa(t,e,r){const{rnd:a,...i}=t;return{v:1,at:e,run:structuredClone(i),shop:r?structuredClone(r):null}}function xa(t){return{run:{...pr(t.run.stage,t.run.seed),...t.run,rnd:pe((t.run.seed^(t.run.wins+1)*2654435761)>>>0)},at:t.at,shop:t.shop}}function va(t,e){e.items=je(t)}function Ma(t){return{items:je(t),rerollCost:2+ne(t)}}function je(t){const e=ut(Object.keys(L).filter(a=>!N(t,a)),t.rnd).slice(0,3),r=ut(Object.keys(U),t.rnd).slice(0,2);return[...e.map(a=>({kind:"joker",id:a,price:L[a].price+ne(t),sold:!1})),...r.map(a=>({kind:"consumable",id:a,price:U[a].price+ne(t),sold:!1}))]}function Se(t,e){return e.sold||t.coins<e.price?!1:e.kind==="joker"?t.jokers.length<_t(t):t.consumables.length<It}function ja(t,e){Se(t,e)&&(t.coins-=e.price,e.sold=!0,e.kind==="joker"?t.jokers.push(e.id):t.consumables.push(e.id))}function Sa(t,e){t.coins<e.rerollCost||(t.coins-=e.rerollCost,e.rerollCost++,e.items=je(t))}const gr=t=>Math.floor(L[t].price/2);function Ta(t,e){const r=t.jokers.indexOf(e);r<0||(t.jokers.splice(r,1),t.coins+=gr(e))}const br="durak.muted";let w=null,dt=Ut(br)==="1";function ce(){return dt}function Za(){dt=!dt,St(br,dt?"1":"0")}function Ca(){if(!w){const t=window.AudioContext??window.webkitAudioContext;if(!t)return;w=new t}w.state==="suspended"&&w.resume()}function mr(){w&&w.state==="running"&&w.suspend()}function yr(){w&&w.state==="suspended"&&w.resume()}function y(t,e,r,a,i=0,n){if(!w||dt)return;const o=w.currentTime+i,l=w.createOscillator(),h=w.createGain();l.type=r,l.frequency.setValueAtTime(t,o),n&&l.frequency.exponentialRampToValueAtTime(n,o+e),h.gain.setValueAtTime(1e-4,o),h.gain.exponentialRampToValueAtTime(a,o+.01),h.gain.exponentialRampToValueAtTime(1e-4,o+e),l.connect(h).connect(w.destination),l.start(o),l.stop(o+e+.02)}function le(t){if(!w||dt)return;const e=w.currentTime+(t.delay??0),r=Math.floor(w.sampleRate*t.dur),a=w.createBuffer(1,r,w.sampleRate),i=a.getChannelData(0);for(let h=0;h<r;h++)i[h]=Math.random()*2-1;const n=w.createBufferSource();n.buffer=a;const o=w.createBiquadFilter();o.type=t.type,o.Q.value=t.q??.7,o.frequency.setValueAtTime(t.freq,e),t.freqTo&&o.frequency.exponentialRampToValueAtTime(t.freqTo,e+t.dur);const l=w.createGain();l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(t.gain,e+.006),l.gain.exponentialRampToValueAtTime(1e-4,e+t.dur),n.connect(o).connect(l).connect(w.destination),n.start(e),n.stop(e+t.dur+.02)}function ot(t=1,e=0){le({dur:.07,gain:.22*t,type:"lowpass",freq:1100,delay:e}),y(150,.08,"sine",.14*t,e,80)}const P=[523.25,587.33,659.25,698.46,783.99,880,987.77,1046.5],b={card:()=>ot(),beat:t=>{ot(1.1),t&&(y(784,.35,"sine",.07,.02),y(1175,.3,"sine",.04,.05))},take:()=>{ot(.9),ot(.8,.07),ot(.7,.13)},bito:()=>le({dur:.26,gain:.12,type:"bandpass",freq:500,freqTo:2200,q:.9}),transfer:()=>{y(523,.12,"triangle",.08),y(784,.16,"triangle",.08,.08)},coin:t=>{y(P[Math.min(t,P.length-1)],.22,"sine",.12),y(P[Math.min(t,P.length-1)]*2,.12,"sine",.03)},win:()=>[0,2,4,7].forEach((t,e)=>y(P[t],.3,"triangle",.1,e*.1)),lose:()=>{y(392,.3,"triangle",.08),y(330,.3,"triangle",.08,.18),y(262,.45,"triangle",.08,.36)},error:()=>y(200,.09,"sine",.09,0,160),buy:()=>{y(784,.12,"sine",.1),y(1046,.18,"sine",.1,.07)},click:()=>y(660,.05,"sine",.05),meet:()=>{for(let t=0;t<6;t++)ot(.55-t*.05,t*.055);y(784,.4,"sine",.04,.4)},bossDefeat:()=>{y(110,2.2,"sine",.28,0,100),y(220,1.6,"sine",.1,.01),le({dur:.6,gain:.12,type:"lowpass",freq:700}),[0,2,4,7].forEach((t,e)=>y(P[t],.28,"triangle",.12,1+e*.12)),[P[0],P[2],P[4],P[7]].forEach(t=>y(t,1.4,"triangle",.06,1.55))},heartbeat:()=>{y(60,.16,"sine",.32,0,40),y(55,.18,"sine",.24,.2,38)},bossMeet:()=>{y(90,.35,"sine",.3,0,45),y(90,.35,"sine",.3,.28,45),[220,261.63,329.63].forEach(t=>y(t,1.1,"triangle",.06,.55)),y(110,1.2,"sawtooth",.025,.55)}},wr={S:"M5 0C8 4 10 6 10 8.2a2.4 2.4 0 0 1-4.4 1.4L6.6 13H3.4l1-3.4A2.4 2.4 0 0 1 0 8.2C0 6 2 4 5 0Z",H:"M5 13C1 9 0 7 0 4.5a2.6 2.6 0 0 1 5-1.5 2.6 2.6 0 0 1 5 1.5C10 7 9 9 5 13Z",D:"M5 0l5 7-5 7-5-7Z",C:"M5 .6a2.6 2.6 0 0 1 2.3 3.8A2.6 2.6 0 1 1 6 9.3L6.8 13H3.2L4 9.3a2.6 2.6 0 1 1-1.3-4.9A2.6 2.6 0 0 1 5 .6Z"};function O(t,e=""){return`<svg class="suit ${e}" viewBox="-0.5 -0.5 11 14.5" aria-hidden="true"><path d="${wr[t]}" fill="currentColor"/></svg>`}function ct(t,e,r,a){return`<path d="${wr[t]}" transform="translate(${e} ${r}) scale(${a})" fill="currentColor" stroke="none"/>`}const $=t=>`<svg class="ic" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,W=(t,e,r=13,a=18,i=0)=>`<rect x="${t}" y="${e}" width="${r}" height="${a}" rx="2.5" class="ic-card"${i?` transform="rotate(${i} ${t+r/2} ${e+a})"`:""}/>`,Oa={sixKiller:$(`${W(4,4,15,21)}<text x="11.5" y="19.5" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor" stroke="none">6</text>
    <path d="M28 15 19.5 23.5" stroke-width="2.6"/><path d="M17.5 21.5l4 4"/><path d="M19.5 23.5 16 27"/>`),transfer:$('<path d="M6 11h18"/><path d="M20 6.5 24.5 11 20 15.5"/><path d="M26 21H8"/><path d="M12 16.5 7.5 21l4.5 4.5"/>'),seventh:$(`${W(7,6,12,17,-16)}${W(10,5,12,17,0)}${W(13,6,12,17,16)}
    <text x="19.6" y="19.5" text-anchor="middle" font-size="9" font-weight="800" fill="currentColor" stroke="none" transform="rotate(16 19 23)">7</text>`),memory:$(`${W(7,3,18,26)}<path d="M10 16c2-3 4-4.5 6-4.5s4 1.5 6 4.5c-2 3-4 4.5-6 4.5S12 19 10 16Z"/><circle cx="16" cy="16" r="1.6" fill="currentColor"/>
    <path d="M11 7h4M17 25h4" stroke-width="1.6"/>`),piggy:$('<ellipse cx="15" cy="18" rx="10" ry="7.5"/><rect x="24.5" y="15" width="4" height="5.5" rx="1.6"/><path d="M10 12.2 11.2 7.5l3.8 3.2"/><path d="M10 24.6v3M19.5 24.6v3"/><path d="M5.2 16.5c-2.2-.2-2.6-2.4-1-3"/><path d="M12.5 11.5h5"/><circle cx="20.5" cy="15.5" r="1" fill="currentColor"/><circle cx="15" cy="4.6" r="2.4" stroke-width="1.6"/>'),secondSuit:$(`${ct("D",5,6,1.25)}${ct("C",15,11,1.25)}`),cheat:$(`${W(5,7,15,21)}${ct("S",9,13,.75)}<path d="M25 3.5l1.2 3.3 3.3 1.2-3.3 1.2L25 12.5l-1.2-3.3L20.5 8l3.3-1.2Z" fill="currentColor" stroke-width="1"/>`),spareTrump:$(`${W(5,4,15,21)}${ct("H",7.5,8.5,1)}<circle cx="23.5" cy="23.5" r="6" class="ic-card"/><path d="M23.5 20.5v6M20.5 23.5h6"/>`),greed:$('<ellipse cx="16" cy="9" rx="9" ry="3.5"/><path d="M7 9v13c0 2 4 3.5 9 3.5s9-1.5 9-3.5V9"/><path d="M7 13.5c0 2 4 3.5 9 3.5s9-1.5 9-3.5M7 18c0 2 4 3.5 9 3.5s9-1.5 9-3.5"/>'),changeTrump:$(`<path d="M25.5 12A10 10 0 0 0 7.6 9.5"/><path d="M7 4.5v5.5h5.5"/><path d="M6.5 20a10 10 0 0 0 17.9 2.5"/><path d="M25 27.5V22h-5.5"/>${ct("H",12,10.5,.8)}`),reset:$(`${W(10,3,12,15)}<path d="M16 9v11"/><path d="M12 16.5 16 20.5l4-4"/><path d="M5 22v5h22v-5"/>`),peek:$('<path d="M3 16c4-6.5 8.5-9.5 13-9.5s9 3 13 9.5c-4 6.5-8.5 9.5-13 9.5S7 22.5 3 16Z"/><circle cx="16" cy="16" r="4.5"/><circle cx="16" cy="16" r="1.8" fill="currentColor"/>'),parry:$(`<path d="M16 3.5 26.5 7.5v7.5c0 7-4.6 11.2-10.5 13.5C10.1 26.2 5.5 22 5.5 15V7.5Z"/>${ct("S",11.2,9,.95)}`),soundOn:$('<path d="M5 12.5h4.5L16 7v18l-6.5-5.5H5Z"/><path d="M20.5 11.5a6.5 6.5 0 0 1 0 9M24 8a11 11 0 0 1 0 16"/>'),soundOff:$('<path d="M5 12.5h4.5L16 7v18l-6.5-5.5H5Z"/><path d="M21 12.5l7 7M28 12.5l-7 7"/>'),menu:$('<path d="M6 9h20M6 16h20M6 23h20"/>'),reroll:$('<path d="M25.5 12A10 10 0 0 0 7.6 9.5"/><path d="M7 4.5v5.5h5.5"/><path d="M6.5 20a10 10 0 0 0 17.9 2.5"/><path d="M25 27.5V22h-5.5"/>'),trophy:$('<path d="M10 5h12v6a6 6 0 0 1-12 0Z"/><path d="M10 7H5.5v2a4.5 4.5 0 0 0 4.7 4.5M22 7h4.5v2a4.5 4.5 0 0 1-4.7 4.5"/><path d="M16 17v5M11 27h10M13 22h6v5h-6Z"/>'),back:$('<path d="M19 7 10 16l9 9"/>'),play:$('<path d="M11 7.5v17L24 16Z" fill="currentColor"/>'),book:$('<path d="M6 6.5h8a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h8V24h-8a2.5 2.5 0 0 0-2 1 2.5 2.5 0 0 0-2-1H6Z"/><path d="M16 7.5V25"/>'),bulb:$('<path d="M12 22.5h8M13 26.5h6"/><path d="M11.5 19c-2.4-1.8-4-4.5-4-7.5a8.5 8.5 0 0 1 17 0c0 3-1.6 5.7-4 7.5v1.5h-9Z"/><path d="M16 9v4M14 11h4" stroke-width="1.6"/>'),tophat:$('<path d="M10 22V8.5c0-1 .8-1.5 1.8-1.5h8.4c1 0 1.8.5 1.8 1.5V22"/><path d="M4.5 22.5c3 2 20 2 23 0"/><path d="M10 17.5h12" stroke-width="3.2"/>'),epaulettes:$('<rect x="5" y="8" width="22" height="11" rx="5.5"/><path d="M8 19v5M12 19v6M16 19v6M20 19v6M24 19v5"/><path d="M16 10.3l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3Z" fill="currentColor" stroke-width="1"/>'),lantern:$('<path d="M12 6h8M16 3v3"/><rect x="10" y="8" width="12" height="16" rx="3"/><path d="M10 12h12M10 20h12"/><path d="M16 13.5c-1.8 1.8-1.8 3.6 0 5 1.8-1.4 1.8-3.2 0-5Z" fill="currentColor"/><path d="M12 24v3h8v-3"/>'),dictionary:$('<path d="M7 5h15a3 3 0 0 1 3 3v19H10a3 3 0 0 1-3-3Z"/><path d="M7 24a3 3 0 0 1 3-3h15"/><text x="16" y="16.5" font-size="8.5" font-weight="800" fill="currentColor" stroke="none" text-anchor="middle" font-family="Georgia, serif">Аа</text>'),heartPlus:$('<path d="M16 27C6 19.5 3.5 15 3.5 10.5a6.2 6.2 0 0 1 12.5-1.8 6.2 6.2 0 0 1 12.5 1.8C28.5 15 26 19.5 16 27Z"/><path d="M16 12v8M12 16h8"/>'),video:$('<rect x="4" y="7" width="24" height="18" rx="4"/><path d="M13.5 11.5v9l7-4.5Z" fill="currentColor"/>'),check:$('<path d="M7 16.5 13 22.5 25 9.5" stroke-width="3"/>'),alert:$('<path d="M16 4 29 27H3Z"/><path d="M16 12v7"/><circle cx="16" cy="23" r="1.3" fill="currentColor"/>'),lock:$('<rect x="7" y="14" width="18" height="13" rx="3"/><path d="M11 14v-4a5 5 0 0 1 10 0v4"/><circle cx="16" cy="20.5" r="1.6" fill="currentColor"/>'),door:$('<path d="M14 5H7v22h7"/><path d="M19 11l5 5-5 5M24 16H12"/>')};function k(t){return Oa[t]??""}const qa={matvey:{bg:"#35577a",skin:"#efc39b",cloth:"#5b4a3a",hair:{style:"sides",color:"#e9e4da"},hat:"cap",hatColor:"#4a4f57",beard:"#efeae2",glasses:!0},zina:{bg:"#8a3a52",skin:"#f2c6a2",cloth:"#3e6b8a",hat:"kerchief",hatColor:"#d9443b",lips:!0},vovan:{bg:"#2e5a44",skin:"#e8b48c",cloth:"#2f4f9a",hair:{style:"buzz",color:"#3a2a20"},beard:"rgba(58,42,32,.35)",stripes:!0},lyuba:{bg:"#27406a",skin:"#f3c9a6",cloth:"#1f2f52",hair:{style:"bun",color:"#7a3d1d"},hat:"conductor",hatColor:"#1f2f52",lips:!0},gosha:{bg:"#4d3d72",skin:"#f0c7a4",cloth:"#7d6a3a",hair:{style:"curly",color:"#2a1d16"},glasses:!0},captain:{bg:"#1d3e5e",skin:"#e3ad86",cloth:"#14243a",hat:"captain",hatColor:"#f4f1ea",beard:"#8a8a8a",epaulettes:!0},mihalych:{bg:"#5e2240",skin:"#ecbd96",cloth:"#1e1e24",hat:"top",hatColor:"#1b1b20",mustache:"#2a2a2a",bow:!0},general:{bg:"#3f4c2a",skin:"#e6b48e",cloth:"#4d5a32",hat:"general",hatColor:"#4d5a32",mustache:"#5a4636",epaulettes:!0},fog:{bg:"#2a3040",skin:"#1a1d26",cloth:"#3a4152",hat:"hood",hatColor:"#4a5266",shadow:!0},translator:{bg:"#4e2a5e",skin:"#f2c8a8",cloth:"#a8453c",hair:{style:"long",color:"#1f1712"},glasses:!0,lips:!0}};function Ea(t){const e=qa[t];if(!e)return"";const r=[];r.push(`<circle cx="24" cy="24" r="24" fill="${e.bg}"/>`),e.hair?.style==="long"&&r.push(`<path d="M13 22c0-9 5-13 11-13s11 4 11 13v15H13Z" fill="${e.hair.color}"/>`),e.hat==="hood"&&r.push(`<path d="M10 48c0-14 4-34 14-36 10 2 14 22 14 36Z" fill="${e.hatColor}"/>`),r.push(`<path d="M7 48c0-9 7-14 17-14s17 5 17 14Z" fill="${e.cloth}"/>`),e.stripes&&r.push('<path d="M14 37.5 12 48M34 37.5 36 48" stroke="#f4f1ea" stroke-width="1.6"/>'),e.epaulettes&&r.push('<path d="M9 40.5h8M31 40.5h8" stroke="#e8b93c" stroke-width="2.6" stroke-linecap="round"/>'),r.push(`<rect x="20.5" y="29" width="7" height="6" rx="2" fill="${e.skin}"/>`),e.bow&&r.push('<path d="M19.5 34.5l4.5 2-4.5 2ZM28.5 34.5l-4.5 2 4.5 2Z" fill="#c23a3a"/>'),r.push(`<ellipse cx="24" cy="22" rx="8.6" ry="9.6" fill="${e.skin}"/>`),e.shadow||r.push(`<ellipse cx="15.6" cy="23" rx="1.4" ry="2" fill="${e.skin}"/><ellipse cx="32.4" cy="23" rx="1.4" ry="2" fill="${e.skin}"/>`);const a=e.hair;(a?.style==="short"||a?.style==="bun"||a?.style==="long")&&r.push(`<path d="M15.2 21c0-6.5 3.8-10 8.8-10s8.8 3.5 8.8 10c-1.6-3.6-4.6-5-8.8-5s-7.2 1.4-8.8 5Z" fill="${a.color}"/>`),a?.style==="bun"&&r.push(`<circle cx="24" cy="10" r="3.6" fill="${a.color}"/>`),a?.style==="buzz"&&r.push(`<path d="M15.4 19.5c.6-5.4 4-8 8.6-8s8 2.6 8.6 8c-2-2.4-5-3.3-8.6-3.3s-6.6.9-8.6 3.3Z" fill="${a.color}"/>`),a?.style==="curly"&&r.push(`<g fill="${a.color}"><circle cx="17" cy="16" r="3.2"/><circle cx="21" cy="13" r="3.4"/><circle cx="26" cy="12.8" r="3.4"/><circle cx="30.5" cy="15.6" r="3.2"/><circle cx="15.6" cy="19.6" r="2.4"/><circle cx="32.4" cy="19.6" r="2.4"/></g>`),a?.style==="sides"&&r.push(`<path d="M15.4 24c-.6-2.6-.4-4.4.4-5.6M32.6 24c.6-2.6.4-4.4-.4-5.6" stroke="${a.color}" stroke-width="2.4" stroke-linecap="round"/>`),e.shadow?r.push('<circle cx="20.6" cy="22.5" r="1.5" fill="#9fe3ff"/><circle cx="27.4" cy="22.5" r="1.5" fill="#9fe3ff"/>'):(r.push('<circle cx="20.6" cy="22.4" r="1.15" fill="#2a1d18"/><circle cx="27.4" cy="22.4" r="1.15" fill="#2a1d18"/>'),r.push('<path d="M19 19.2q1.6-1 3.2 0M25.8 19.2q1.6-1 3.2 0" stroke="#5a4033" stroke-width=".9" stroke-linecap="round" fill="none"/>'),e.beard&&r.push(`<path d="M15.6 24c.4 5.8 3.8 9.4 8.4 9.4s8-3.6 8.4-9.4c-1.6 2.4-3.6 3.4-5 3.4-1.2-1-2.2-1.4-3.4-1.4s-2.2.4-3.4 1.4c-1.4 0-3.4-1-5-3.4Z" fill="${e.beard}"/>`),e.mustache&&r.push(`<path d="M18.6 27.6c1.8-1.8 3.6-2 5.4-1 1.8-1 3.6-.8 5.4 1-1.8.2-3.6 0-5.4-.6-1.8.6-3.6.8-5.4.6Z" fill="${e.mustache}"/>`),r.push(`<path d="M21.4 28.6q2.6 1.8 5.2 0" stroke="${e.lips?"#c4484a":"#7a4a3a"}" stroke-width="${e.lips?1.5:1.1}" stroke-linecap="round" fill="none"/>`),e.glasses&&r.push('<g stroke="#2a2a2a" stroke-width="1" fill="rgba(255,255,255,.18)"><circle cx="20.6" cy="22.4" r="2.9"/><circle cx="27.4" cy="22.4" r="2.9"/><path d="M23.5 22.2h1"/></g>'));const i=e.hatColor??"#333";if(e.hat==="cap"&&r.push(`<path d="M14.6 18.6c.6-5.6 4.4-8.4 9.6-8.4s8.6 2.6 9.4 8.4Z" fill="${i}"/><path d="M14 18.4h22.4c-.4 1.4-1.4 2-3 2H14.6Z" fill="${i}" opacity=".85"/>`),e.hat==="kerchief"&&(r.push(`<path d="M13.4 24c-.6-8.4 4.4-14 10.6-14s11.2 5.6 10.6 14c-1.6-4.6-5.4-7.4-10.6-7.4S15 19.4 13.4 24Z" fill="${i}"/>`),r.push(`<path d="M18 31.6l6 3.4 6-3.4" stroke="${i}" stroke-width="2.4" fill="none"/><g fill="#f4e9d8"><circle cx="19" cy="14.6" r=".9"/><circle cx="24" cy="12.6" r=".9"/><circle cx="29" cy="14.6" r=".9"/><circle cx="16.4" cy="19" r=".9"/><circle cx="31.6" cy="19" r=".9"/></g>`)),e.hat==="conductor"||e.hat==="captain"||e.hat==="general"){const n=e.hat==="general"?"#b8322e":e.hat==="captain"?"#14243a":"#c9a23a";r.push(`<path d="M13.6 15.6c1-4 5.6-6.4 10.4-6.4s9.4 2.4 10.4 6.4c-3 1.4-6.6 2-10.4 2s-7.4-.6-10.4-2Z" fill="${i}"/>`),r.push(`<path d="M15 15.4h18v3H15Z" fill="${n}"/><path d="M15.4 18.4h17.2l-1.8 2.4H17.2Z" fill="#14161c"/>`),r.push(e.hat==="general"?'<path d="M24 10.4l.9 1.9 2.1.3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.4 2.1-.3Z" fill="#e8b93c"/>':'<circle cx="24" cy="13.2" r="1.5" fill="#e8b93c"/>')}return e.hat==="top"&&r.push(`<path d="M17 4.6h14v12.4H17Z" fill="${i}"/><path d="M17 13.4h14v2.2H17Z" fill="#7a2140"/><path d="M12.6 16.6h22.8v2.2H12.6Z" fill="${i}"/>`),e.hat==="hood"&&r.push(`<path d="M12.6 28c-1.2-11 4-17.6 11.4-17.6S36.6 17 35.4 28c-2-6-5.8-9.4-11.4-9.4S14.6 22 12.6 28Z" fill="${i}"/>`),`<svg class="portrait" viewBox="0 0 48 48" aria-hidden="true"><defs><clipPath id="pc-${t}"><circle cx="24" cy="24" r="24"/></clipPath></defs><g clip-path="url(#pc-${t})">${r.join("")}</g></svg>`}const c=(t,e)=>`<svg viewBox="${t}" class="prop-svg" aria-hidden="true">${e}</svg>`;function st(t,e,r,a,i,n=0){const o=[];for(let l=0;l<i*2;l++){const h=Math.PI*l/i,d=(l%2?a:r)+(n?l*7%5-2:0)*n;o.push(`${(t+d*Math.cos(h)).toFixed(1)},${(e+d*Math.sin(h)).toFixed(1)}`)}return o.join(" ")}const Fe=c("0 0 84 80",`
  <defs>
    <linearGradient id="silver" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f1f1f5"/><stop offset=".45" stop-color="#a3a3ae"/><stop offset="1" stop-color="#dcdce3"/>
    </linearGradient>
    <radialGradient id="tea" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#d07a22"/><stop offset="1" stop-color="#6e3209"/></radialGradient>
  </defs>
  <path d="M66 31q13 9 0 18" fill="none" stroke="url(#silver)" stroke-width="6" stroke-linecap="round"/>
  <circle cx="40" cy="40" r="28" fill="url(#silver)"/>
  <circle cx="40" cy="40" r="24.5" fill="none" stroke="rgba(70,70,80,.45)" stroke-width="1.6" stroke-dasharray="2.5 3"/>
  <circle cx="40" cy="40" r="21.5" fill="rgba(255,255,255,.35)" stroke="rgba(255,255,255,.75)"/>
  <circle cx="40" cy="40" r="19" fill="url(#tea)"/>
  <g transform="translate(33 36)">
    <circle r="8.5" fill="#f9e57e" stroke="#e5bf32" stroke-width="1.6"/>
    <path d="M0-7V7M-7 0H7M-5-5l10 10M5-5-5 5" stroke="#fff7c9"/><circle r="1.4" fill="#fff7c9"/>
  </g>
  <path d="M46 35 70 11" stroke="url(#silver)" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M27 30a17 17 0 0 1 13-8" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2" stroke-linecap="round"/>`),La=c("0 0 92 92",`
  <circle cx="46" cy="46" r="41" fill="#f6f1e8" stroke="#d6ccbb" stroke-width="1.5"/>
  <circle cx="46" cy="46" r="37" fill="none" stroke="#3d6fb3" stroke-width="2.2"/>
  <circle cx="46" cy="46" r="27" fill="none" stroke="#e4dacb" stroke-width="1.2"/>
  ${[[33,36],[57,33],[47,57],[29,59]].map(([t,e])=>`
    <circle cx="${t}" cy="${e}" r="10.5" fill="none" stroke="#b9772f" stroke-width="7.5"/>
    <circle cx="${t}" cy="${e}" r="10.5" fill="none" stroke="#e0a75f" stroke-width="2.2" stroke-dasharray="8 6"/>`).join("")}
  <g fill="#2d2420"><circle cx="27" cy="31" r=".9"/><circle cx="38" cy="29" r=".9"/><circle cx="63" cy="28" r=".9"/><circle cx="52" cy="62" r=".9"/><circle cx="41" cy="63" r=".9"/></g>`),Ra=c("0 0 120 86",`
  <rect x="2" y="2" width="116" height="82" rx="2" fill="#ebe4d2"/>
  <path d="M60 2v82" stroke="rgba(0,0,0,.12)" stroke-width="1.5"/>
  <rect x="8" y="8" width="46" height="7" fill="#3a3632" opacity=".75"/>
  ${[20,26,32,38,44,50,56,62,68,74].map(t=>`<rect x="8" y="${t}" width="${t%12===2?34:46}" height="2.2" fill="#8e877a"/>`).join("")}
  <g transform="translate(67 10)">
    ${Array.from({length:36},(t,e)=>`<rect x="${e%6*8}" y="${Math.floor(e/6)*8}" width="8" height="8"
      fill="${[3,8,13,17,22,26,31].includes(e)?"#2d2a26":"#f8f4ea"}" stroke="#6f685c" stroke-width=".6"/>`).join("")}
    <text x="9" y="7" font-size="6" fill="#2d2a26" font-family="Georgia, serif">К</text>
    <text x="17" y="7" font-size="6" fill="#2d2a26" font-family="Georgia, serif">О</text>
    <text x="1.5" y="23" font-size="6" fill="#2d2a26" font-family="Georgia, serif">Т</text>
  </g>
  <rect x="68" y="62" width="44" height="2.2" fill="#8e877a"/><rect x="68" y="68" width="34" height="2.2" fill="#8e877a"/>
  <path d="M96 52 112 30" stroke="#1d3e8a" stroke-width="2.2" stroke-linecap="round"/>`),Aa=c("0 0 170 150",`
  <g class="cat-breath">
    <ellipse cx="86" cy="80" rx="66" ry="52" fill="#8a8e96"/>
    <g fill="none" stroke="#6c7078" stroke-width="7" stroke-linecap="round">
      <path d="M60 36q10 14 2 30"/><path d="M84 30q10 18 2 36"/><path d="M108 36q8 16 0 32"/><path d="M128 52q4 14-4 26"/>
    </g>
  </g>
  <path d="M30 104q-8 30 30 34 30 3 50-2" fill="none" stroke="#7d818a" stroke-width="15" stroke-linecap="round"/>
  <path d="M30 104q-8 30 30 34" fill="none" stroke="#6c7078" stroke-width="15" stroke-linecap="round" stroke-dasharray="6 12"/>
  <path class="cat-tail" d="M110 136q14-3 24-10" fill="none" stroke="#7d818a" stroke-width="15" stroke-linecap="round"/>
  <g class="cat-head">
    <ellipse cx="62" cy="98" rx="30" ry="25" fill="#959aa2"/>
    <path d="M38 84 40 62l16 14Z" fill="#959aa2"/><path d="M42 80 43 68l8 8Z" fill="#d9a3a8"/>
    <g class="cat-ear"><path d="M70 74l14-14 4 22Z" fill="#959aa2"/><path d="M73 74l8-8 2 12Z" fill="#d9a3a8"/></g>
    <path d="M50 99q5 4 10 0M66 99q5 4 10 0" fill="none" stroke="#3a3c42" stroke-width="2" stroke-linecap="round"/>
    <path d="M61 107l2 2 2-2" fill="#d98a92"/>
    <path d="M46 108h-16M46 112l-15 4M80 108h16M80 112l15 4" stroke="#e7e7ea" opacity=".8"/>
  </g>`),Ha='<div class="zz"><span>z</span><span>z</span><span>z</span></div>',Pe=c("0 0 120 120",`
  <defs><pattern id="plaid" width="12" height="12" patternUnits="userSpaceOnUse">
    <rect width="12" height="12" fill="#8c2a2a"/><rect width="12" height="4" fill="#5a1717"/><rect width="4" height="12" fill="#5a1717" opacity=".8"/>
    <rect x="8" width="1" height="12" fill="#e2b04a" opacity=".6"/></pattern></defs>
  ${[[-12,0],[10,48]].map(([t,e])=>`<g transform="translate(${e} 0) rotate(${t} 34 60)">
    <path d="M20 100c-8-30-6-62 6-78 8-10 20-10 26 0 10 16 10 48 2 78-6 12-28 12-34 0Z" fill="url(#plaid)"/>
    <path d="M24 92c-3-14-2-26 2-34 6 4 20 4 26 0 4 8 4 20 2 34-6 8-24 8-30 0Z" fill="#3b1a14"/></g>`).join("")}`),Ba=c("0 0 120 120",`
  <circle cx="60" cy="60" r="50" fill="#b5613a" stroke="#8b4426" stroke-width="5"/>
  <circle cx="60" cy="60" r="41" fill="#4a3427"/>
  ${[[38,44],[78,40],[84,74],[44,82],[60,58],[28,66],[62,26]].map(([t,e],r)=>`
    <circle cx="${t}" cy="${e}" r="${15-r%3}" fill="${r%2?"#4f8a3a":"#5d9a45"}"/>
    <circle cx="${t}" cy="${e}" r="${9-r%3}" fill="none" stroke="#3c6e2c" stroke-width="2"/>`).join("")}
  ${[[56,46],[72,60],[48,66]].map(([t,e])=>`<g transform="translate(${t} ${e})">
    ${[[0,-6],[5.5,-2],[3.5,5],[-3.5,5],[-5.5,-2],[0,0]].map(([r,a])=>`<circle cx="${r}" cy="${a}" r="3.6" fill="#e0384a"/>`).join("")}
    <circle r="1.6" fill="#ffd2d6"/></g>`).join("")}`),Fa=c("0 0 124 100",`
  <path d="M80 44 112 32l3 7-32 16Z" fill="#a8302a"/>
  <path d="M28 38C8 36 8 64 28 62" fill="none" stroke="#a8302a" stroke-width="8" stroke-linecap="round"/>
  <circle cx="54" cy="50" r="32" fill="#c63a2d"/>
  <g fill="#f6efe3">${[[38,30],[66,28],[78,52],[64,74],[40,72],[30,52],[52,40],[56,62]].map(([t,e])=>`<circle cx="${t}" cy="${e}" r="3.4"/>`).join("")}</g>
  <circle cx="54" cy="50" r="15" fill="#b03225" stroke="#efe7da" stroke-width="2"/>
  <circle cx="54" cy="50" r="5.5" fill="#efe7da"/>
  <path d="M34 32a26 26 0 0 1 16-9" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="3" stroke-linecap="round"/>`),Pa=c("0 0 84 84",`
  <defs><pattern id="ging" width="8" height="8" patternUnits="userSpaceOnUse">
    <rect width="8" height="8" fill="#fbf6ee"/><rect width="4" height="8" fill="#d23c3c" opacity=".55"/><rect width="8" height="4" fill="#d23c3c" opacity=".55"/></pattern></defs>
  <polygon points="${st(42,42,38,33,14)}" fill="url(#ging)"/>
  <circle cx="42" cy="42" r="23" fill="none" stroke="#8a5a2b" stroke-width="2.4"/>
  <path d="M60 54q10 6 14 2M60 54q4 10 0 14" stroke="#8a5a2b" stroke-width="2" fill="none" stroke-linecap="round"/>`),Ia=c("0 0 130 96",`
  <rect x="62" y="22" width="52" height="44" rx="4" fill="#6a8fc7"/>
  ${[30,38,46,54].map(t=>`<path d="M64 ${t}${" l4 4 l4 -4".repeat(6)}" fill="none" stroke="#4d72aa" stroke-width="2"/>`).join("")}
  <path d="M56 12 124 74M70 8l50 70" stroke="#c9ccd2" stroke-width="3" stroke-linecap="round"/>
  <circle cx="56" cy="12" r="3.4" fill="#e0b04a"/><circle cx="70" cy="8" r="3.4" fill="#e0b04a"/>
  <path d="M42 62q14-6 22-2" fill="none" stroke="#6a8fc7" stroke-width="2.4"/>
  <circle cx="30" cy="66" r="24" fill="#7b9fd4"/>
  <g fill="none" stroke="#4d72aa" stroke-width="2.2"><path d="M10 58q20-10 40 4"/><path d="M12 74q18-14 38-2"/><path d="M22 46q4 22-2 42"/><path d="M38 44q-6 22 2 44"/></g>`),Na=c("0 0 120 120",`
  <circle cx="60" cy="60" r="52" fill="#7d838b" stroke="#a9afb7" stroke-width="6"/>
  <path d="M10 60h100" stroke="#5d6269" stroke-width="3"/>
  ${[[40,40,"#c8342c"],[64,34,"#7aa63a"],[84,52,"#c8342c"],[46,64,"#d9532f"],[70,72,"#c8342c"],[36,86,"#7aa63a"],[84,84,"#d9532f"],[58,52,"#a8c94a"]].map(([t,e,r])=>`<circle cx="${t}" cy="${e}" r="13" fill="${r}"/><path d="M${t} ${Number(e)-3}l2-5" stroke="#4a3020" stroke-width="2"/><circle cx="${Number(t)-4}" cy="${Number(e)-4}" r="3" fill="rgba(255,255,255,.35)"/>`).join("")}`),_a=c("0 0 110 110",`
  <rect x="6" y="6" width="98" height="98" rx="16" fill="#b07a42"/>
  ${[22,38,54,70,86].map(t=>`<path d="M14 ${t}q40 -4 82 2" stroke="#93622f" stroke-width="1.6" fill="none"/>`).join("")}
  <rect x="42" y="49" width="26" height="12" rx="6" fill="#3b2614"/>
  <rect x="6" y="6" width="98" height="98" rx="16" fill="none" stroke="#7d5126" stroke-width="3"/>`),Ga=c("0 0 150 56",`
  <defs><linearGradient id="steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e6ea"/><stop offset=".5" stop-color="#9aa0a8"/><stop offset="1" stop-color="#c9cdd3"/></linearGradient></defs>
  <rect x="30" y="22" width="88" height="12" rx="5" fill="url(#steel)"/>
  <circle cx="24" cy="28" r="17" fill="url(#steel)"/>
  <path d="M4 22h18v12H4Z" fill="rgba(30,30,30,.65)"/>
  <circle cx="126" cy="28" r="14" fill="url(#steel)"/><circle cx="126" cy="28" r="6.5" fill="rgba(30,30,30,.6)"/>
  <text x="62" y="31.5" font-size="8" fill="#5b616a" font-family="monospace" font-weight="700">17</text>`),za=c("0 0 96 84",`
  <rect x="64" y="30" width="26" height="22" rx="10" fill="none" stroke="#f1efe9" stroke-width="7"/>
  <circle cx="40" cy="42" r="34" fill="#f1efe9"/>
  <circle cx="40" cy="42" r="34" fill="none" stroke="#2f5fa8" stroke-width="4"/>
  <circle cx="40" cy="42" r="26" fill="#5a2f10"/>
  <circle cx="16" cy="22" r="3.4" fill="#2b2b2b"/>
  <path d="M26 30a20 20 0 0 1 12-6" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2.4" stroke-linecap="round"/>`),Ua=c("0 0 110 80",`
  ${[[20,22,0],[52,16,20],[84,30,10],[34,56,35],[70,60,5]].map(([t,e,r])=>`<g transform="translate(${t} ${e}) rotate(${r})"><polygon points="${st(0,0,11,11,3)}" fill="#a5abb3" stroke="#6f757d" stroke-width="1.5"/><circle r="5" fill="#4b4f55"/></g>`).join("")}
  <path d="M60 36l30 6" stroke="#8d939b" stroke-width="7" stroke-linecap="round"/>
  <path d="M60 36l30 6" stroke="#6f757d" stroke-width="7" stroke-dasharray="1.5 2.5"/>`),Va=c("0 0 120 90",`
  <path d="M10 30c14-22 46-26 72-14 22 10 34 30 26 48-10 22-46 28-74 18C10 74 0 50 10 30Z" fill="#4b6a8a"/>
  <path d="M24 30q30 10 60 0M20 50q36 14 76 2M30 70q26 6 50-2" fill="none" stroke="#3a5675" stroke-width="3" stroke-linecap="round"/>
  <path d="M60 44c10 4 20 2 28-4" fill="none" stroke="#2c2c2c" stroke-width="5" opacity=".35" stroke-linecap="round"/>`),Da=c("0 0 140 140",`
  <circle cx="70" cy="70" r="64" fill="#1f1f22"/>
  <circle cx="70" cy="70" r="56" fill="none" stroke="#2f2f34" stroke-width="16" stroke-dasharray="7 5"/>
  <circle cx="70" cy="70" r="36" fill="#55595f"/>
  <circle cx="70" cy="70" r="30" fill="#8b9097"/>
  <circle cx="70" cy="70" r="11" fill="#55595f"/>
  ${[0,72,144,216,288].map(t=>`<circle cx="${70+20*Math.cos(t*Math.PI/180)}" cy="${70+20*Math.sin(t*Math.PI/180)}" r="3.2" fill="#3a3d42"/>`).join("")}`),Ka=c("0 0 170 100",`
  <rect x="6" y="10" width="158" height="82" rx="8" fill="#c0392b"/>
  <rect x="6" y="10" width="158" height="82" rx="8" fill="none" stroke="#8f261c" stroke-width="3"/>
  <rect x="58" y="40" width="54" height="16" rx="8" fill="#2f3237"/>
  <rect x="16" y="46" width="14" height="10" rx="2" fill="#c9cdd3"/><rect x="140" y="46" width="14" height="10" rx="2" fill="#c9cdd3"/>
  <path d="M10 20h150" stroke="rgba(255,255,255,.25)" stroke-width="2"/>`),Wa=c("0 0 120 96",`
  <defs><linearGradient id="foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f5f7"/><stop offset=".35" stop-color="#b8bcc4"/><stop offset=".6" stop-color="#e6e8ec"/><stop offset="1" stop-color="#9ea3ab"/></linearGradient></defs>
  <polygon points="${st(60,48,46,38,11,1.2)}" fill="url(#foil)"/>
  <path d="M28 40l16 8-6 12M64 22l4 18 16 4M82 62l-14 6 2 14M40 70l12-6" stroke="rgba(90,95,105,.5)" stroke-width="1.6" fill="none"/>
  <path d="M46 36c10-10 30-8 36 4 4 10-6 22-20 22-14 0-24-12-16-26Z" fill="#c98b4a"/>
  <path d="M52 40c6-4 16-4 22 2" stroke="#e2a96a" stroke-width="3" fill="none" stroke-linecap="round"/>`),Ya=c("0 0 110 80",`
  <path d="M8 16h94l-6 56H14Z" fill="#f2efe8" opacity=".95"/>
  <path d="M8 16h94" stroke="#d24a4a" stroke-width="2.4"/>
  <ellipse cx="38" cy="44" rx="17" ry="21" fill="#fbf7ee" transform="rotate(-18 38 44)"/>
  <ellipse cx="72" cy="46" rx="17" ry="21" fill="#f6efe1" transform="rotate(14 72 46)"/>
  <circle cx="58" cy="66" r="4" fill="#fff"/><circle cx="66" cy="66" r="1.2" fill="#555"/><circle cx="62" cy="62" r="1.2" fill="#555"/>`),Ja=c("0 0 120 60",`
  <rect x="2" y="2" width="116" height="56" rx="4" fill="#f3d9de"/>
  <path d="M86 2v56" stroke="#c99aa4" stroke-width="1.6" stroke-dasharray="3 3"/>
  <text x="10" y="18" font-size="10" font-weight="700" fill="#8a2c3e" font-family="system-ui, sans-serif">БИЛЕТ</text>
  ${[26,34,42].map(t=>`<rect x="10" y="${t}" width="${t===34?48:66}" height="3" fill="#b07a86"/>`).join("")}
  <text x="92" y="36" font-size="15" font-weight="800" fill="#8a2c3e" font-family="system-ui, sans-serif">7</text>`),Xa=c("0 0 170 120",`
  <rect x="6" y="14" width="158" height="100" rx="12" fill="#8a5a33"/>
  <rect x="6" y="14" width="158" height="100" rx="12" fill="none" stroke="#5e3a1f" stroke-width="4"/>
  <rect x="40" y="14" width="12" height="100" fill="#5e3a1f"/><rect x="118" y="14" width="12" height="100" fill="#5e3a1f"/>
  <rect x="62" y="2" width="46" height="18" rx="7" fill="none" stroke="#3e2512" stroke-width="6"/>
  <rect x="64" y="58" width="42" height="26" rx="2" fill="#efe6d4"/><path d="M70 66h30M70 74h22" stroke="#8a7c66" stroke-width="2"/>`),Qa=c("0 0 130 72",`
  <rect x="4" y="12" width="122" height="56" rx="8" fill="#6b4226"/>
  <rect x="4" y="12" width="122" height="56" rx="8" fill="none" stroke="#4a2c18" stroke-width="3"/>
  <rect x="22" y="2" width="22" height="12" rx="3" fill="#c23a2e"/><rect x="86" y="6" width="22" height="8" rx="3" fill="#c23a2e"/>
  ${[36,94].map((t,e)=>`<circle cx="${t}" cy="42" r="20" fill="#f6f1e6" stroke="#d6c9a8" stroke-width="2"/>
    ${Array.from({length:12},(r,a)=>{const i=a*Math.PI/6;return`<path d="M${t+16*Math.cos(i)} ${42+16*Math.sin(i)}L${t+18*Math.cos(i)} ${42+18*Math.sin(i)}" stroke="#555" stroke-width="1.4"/>`}).join("")}
    <path d="M${t} 42V${e?28:30}M${t} 42l${e?9:-6} ${e?4:6}" stroke="#222" stroke-width="2" stroke-linecap="round"/>
    ${e?"":`<path d="M${t+12} 28l3-4" stroke="#c23a2e" stroke-width="3" stroke-linecap="round"/>`}`).join("")}`);function T(t,e,r,a){const i=r?"#f2ead6":"#2c2622",n=r?"#b7a77f":"#5a504a",o=a==="pawn"?9:12;let l="";return a==="king"&&(l=`<path d="M${t} ${e-5}v10M${t-5} ${e}h10" stroke="${n}" stroke-width="2.4"/>`),a==="queen"&&(l=`<polygon points="${st(t,e,7,3.5,5)}" fill="${n}"/>`),a==="rook"&&(l=`<rect x="${t-6}" y="${e-6}" width="12" height="12" rx="1" fill="none" stroke="${n}" stroke-width="2"/>`),`<circle cx="${t}" cy="${e}" r="${o}" fill="${i}" stroke="${n}" stroke-width="2"/><circle cx="${t}" cy="${e}" r="${o-4}" fill="none" stroke="${n}" stroke-width="1"/>${l}`}const ts=c("0 0 96 70",`
  ${T(18,20,!1,"pawn")}${T(42,16,!1,"rook")}${T(70,22,!0,"queen")}${T(28,48,!0,"pawn")}${T(56,50,!1,"pawn")}${T(80,52,!0,"pawn")}`),es=c("0 0 100 120",`
  <rect x="4" y="4" width="92" height="112" rx="2" fill="#f7f3e8"/>
  <path d="M50 14v96" stroke="#c9c0a8"/>
  ${["e2-e4","Кg1-f3","Сf1-c4","c2-c3","d2-d4","0-0"].map((t,e)=>`<text x="8" y="${24+e*14}" font-size="8" fill="#3a3a5a" font-family="Georgia, serif">${e+1}. ${t}</text>`).join("")}
  ${["e7-e5","Кb8-c6","Сf8-c5","Кg8-f6","e5:d4",""].map((t,e)=>`<text x="54" y="${24+e*14}" font-size="8" fill="#3a3a5a" font-family="Georgia, serif">${t}</text>`).join("")}
  <path d="M60 98l34-22" stroke="#e0b44a" stroke-width="5" stroke-linecap="round"/><path d="M60 98l-4 3" stroke="#333" stroke-width="2"/>`),rs=c("0 0 170 170",`
  <rect x="4" y="4" width="162" height="162" rx="10" fill="#5a3a22"/>
  <g transform="translate(17 17)">
    ${Array.from({length:64},(t,e)=>`<rect x="${e%8*17}" y="${Math.floor(e/8)*17}" width="17" height="17" fill="${(e+Math.floor(e/8))%2?"#7a4e2c":"#e7d3ad"}"/>`).join("")}
  </g>
  ${T(42,42,!1,"rook")}${T(110,42,!1,"king")}${T(76,76,!0,"queen")}${T(60,128,!0,"king")}${T(128,110,!0,"rook")}${T(94,60,!1,"pawn")}`),Qt=c("0 0 150 140",`
  <rect x="8" y="8" width="134" height="124" rx="26" fill="#6e2b23"/>
  <rect x="8" y="8" width="134" height="34" rx="16" fill="#5a2019"/>
  <rect x="8" y="30" width="26" height="102" rx="13" fill="#5a2019"/><rect x="116" y="30" width="26" height="102" rx="13" fill="#5a2019"/>
  <rect x="36" y="44" width="78" height="80" rx="12" fill="#84362c"/>
  <path d="M46 70h58M46 96h58" stroke="#6e2b23" stroke-width="2"/>
  ${[[20,18],[75,18],[130,18]].map(([t,e])=>`<circle cx="${t}" cy="${e}" r="2.4" fill="#d1a45a"/>`).join("")}`),as=c("0 0 100 100",`
  <defs><radialGradient id="brass" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe7a1"/><stop offset=".5" stop-color="#c9952f"/><stop offset="1" stop-color="#8a5f17"/></radialGradient></defs>
  <circle cx="50" cy="50" r="46" fill="url(#brass)"/>
  <circle cx="50" cy="50" r="37" fill="#f4ecd6" stroke="#8a5f17" stroke-width="2"/>
  ${Array.from({length:36},(t,e)=>{const r=e*Math.PI/18,a=e%9===0?7:3;return`<path d="M${50+36*Math.cos(r)} ${50+36*Math.sin(r)}L${50+(36-a)*Math.cos(r)} ${50+(36-a)*Math.sin(r)}" stroke="#5a4a2a" stroke-width="1"/>`}).join("")}
  <polygon points="50,18 56,50 50,82 44,50" fill="#2b3b55"/><polygon points="50,18 56,50 44,50" fill="#c23a2e"/>
  <polygon points="18,50 50,45 82,50 50,55" fill="#5a6a85" opacity=".75"/>
  <circle cx="50" cy="50" r="4" fill="#c9952f"/>
  <text x="46.5" y="16" font-size="8" font-weight="700" fill="#c23a2e" font-family="Georgia, serif">С</text>
  <path d="M28 22a30 30 0 0 1 22-8" stroke="rgba(255,255,255,.5)" stroke-width="2.4" fill="none" stroke-linecap="round"/>`),ss=c("0 0 170 50",`
  <defs><linearGradient id="tube" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe7a1"/><stop offset=".5" stop-color="#b9862a"/><stop offset="1" stop-color="#e6c06a"/></linearGradient></defs>
  <path d="M10 18h44v14H10Z" fill="url(#tube)"/><path d="M54 15h40v20H54Z" fill="#5a3a22"/><path d="M94 12h52v26H94Z" fill="url(#tube)"/>
  <rect x="144" y="9" width="16" height="32" rx="3" fill="url(#tube)"/><ellipse cx="160" cy="25" rx="3" ry="14" fill="#1d2f44"/>
  <rect x="52" y="13" width="4" height="24" fill="#8a5f17"/><rect x="92" y="10" width="4" height="30" fill="#8a5f17"/>
  ${[60,68,76,84].map(t=>`<path d="M${t} 15v20" stroke="#3e2614" stroke-width="1.4"/>`).join("")}
  <rect x="4" y="20" width="8" height="10" rx="2" fill="#8a5f17"/>`),is=c("0 0 80 120",`
  <circle cx="40" cy="14" r="8" fill="#c9952f" stroke="#8a5f17" stroke-width="2"/>
  <path d="M36 20 18 112M44 20l18 92" stroke="#b7bcc4" stroke-width="5" stroke-linecap="round"/>
  <path d="M36 20 18 112M44 20l18 92" stroke="#e8ebef" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M26 66h28" stroke="#c9952f" stroke-width="3"/>`);function Ie(){return Array.from({length:140},(t,e)=>{const r=e*.19,a=6+r*2.1;return`L${(70+a*Math.cos(r)).toFixed(1)} ${(70+a*Math.sin(r)).toFixed(1)}`}).join(" ")}const ns=c("0 0 140 140",`
  <path d="M70 70 ${Ie()}"
    fill="none" stroke="#c9a46a" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M70 70 ${Ie()}"
    fill="none" stroke="#8f6f3c" stroke-width="9" stroke-dasharray="2 4" stroke-linecap="round" stroke-linejoin="round"/>`),os=c("0 0 140 140",`
  <circle cx="70" cy="70" r="52" fill="none" stroke="#f3efe6" stroke-width="28"/>
  <circle cx="70" cy="70" r="52" fill="none" stroke="#d2382c" stroke-width="28" stroke-dasharray="40.84 40.84"/>
  <circle cx="70" cy="70" r="52" fill="none" stroke="#c9a46a" stroke-width="3" stroke-dasharray="10 6"/>
  <circle cx="70" cy="70" r="66" fill="none" stroke="rgba(0,0,0,.15)" stroke-width="1"/>`);function Ht(t,e,r){let a="";for(let i=0;i<r;i++)a+=`<circle cx="${t+i*.8}" cy="${e-i*2.2}" r="15" fill="#b8862a" stroke="#8a5f17" stroke-width="1.2"/>`;return a+`<circle cx="${t+(r-1)*.8}" cy="${e-(r-1)*2.2}" r="15" fill="#f0c45a" stroke="#a87414" stroke-width="1.6"/>
    <polygon points="${st(t+(r-1)*.8,e-(r-1)*2.2,7,3,5)}" fill="#d9a43a"/>`}const cs=c("0 0 110 90",`${Ht(24,70,6)}${Ht(58,64,9)}${Ht(88,74,4)}
  <circle cx="44" cy="80" r="12" fill="#f0c45a" stroke="#a87414" stroke-width="1.6"/>`),ls=c("0 0 120 90",`
  <path d="M36 14q40-20 76 10" fill="none" stroke="#d9a43a" stroke-width="3" stroke-dasharray="4 3"/>
  <circle cx="36" cy="14" r="5" fill="none" stroke="#c9952f" stroke-width="3"/>
  <circle cx="44" cy="54" r="32" fill="#d9a43a" stroke="#8a5f17" stroke-width="2"/>
  <circle cx="44" cy="54" r="25" fill="#fbf6ea"/>
  ${Array.from({length:12},(t,e)=>{const r=e*Math.PI/6;return`<circle cx="${44+20*Math.cos(r)}" cy="${54+20*Math.sin(r)}" r="${e%3?1:1.8}" fill="#3a3a3a"/>`}).join("")}
  <path d="M44 54V38M44 54l10 6" stroke="#222" stroke-width="2" stroke-linecap="round"/>
  <circle cx="44" cy="20" r="5" fill="#d9a43a" stroke="#8a5f17"/>`),ds=c("0 0 120 100",`
  ${[["♠",-30,"#1f1f24"],["♣",-10,"#1f1f24"],["♦",10,"#c62828"],["♥",30,"#c62828"]].map(([t,e,r])=>`
    <g transform="rotate(${e} 60 92)"><rect x="42" y="14" width="36" height="52" rx="4" fill="#fffaf0" stroke="#d8cfba"/>
    <text x="47" y="28" font-size="11" font-weight="700" fill="${r}" font-family="Georgia, serif">Т</text>
    <text x="52" y="55" font-size="20" fill="${r}" font-family="Georgia, serif">${t}&#xFE0E;</text></g>`).join("")}`),hs=c("0 0 120 90",`
  ${[22,62].map(t=>`<rect x="12" y="${t}" width="90" height="24" rx="10" fill="#2f3a28"/>
    <rect x="30" y="${t}" width="40" height="24" fill="#3e4a33"/>
    <ellipse cx="102" cy="${t+12}" rx="6" ry="12" fill="#1a2433"/><ellipse cx="102" cy="${t+12}" rx="3" ry="7" fill="#4a6a8a"/>
    <rect x="4" y="${t+4}" width="10" height="16" rx="3" fill="#222"/>`).join("")}
  <rect x="44" y="44" width="22" height="20" rx="4" fill="#5b6650"/><circle cx="55" cy="54" r="5" fill="#8a946f"/>`),fs=c("0 0 120 90",`
  ${[[20,30,"#c23a2e"],[54,18,"#2f5fa8"],[86,40,"#c23a2e"],[40,64,"#2f5fa8"],[92,74,"#c23a2e"]].map(([t,e,r])=>`
    <circle cx="${t}" cy="${e}" r="3.4" fill="#e8e2d0" stroke="#555"/>
    <path d="M${t} ${e}l16 -5v10Z" fill="${r}"/>`).join("")}
  <path d="M20 30 54 18 86 40" fill="none" stroke="#c23a2e" stroke-width="2" stroke-dasharray="5 4"/>
  <path d="M40 64 92 74" fill="none" stroke="#2f5fa8" stroke-width="2" stroke-dasharray="5 4"/>`),ps=c("0 0 130 96",`
  <path d="M6 14h40l8 8h70v70H6Z" fill="#c9a96e"/>
  <rect x="6" y="22" width="118" height="70" fill="#d8bb82"/>
  <g transform="rotate(-10 66 56)"><rect x="24" y="40" width="84" height="26" rx="4" fill="none" stroke="#b8322e" stroke-width="3"/>
  <text x="66" y="58" text-anchor="middle" font-size="13" font-weight="800" fill="#b8322e" font-family="system-ui, sans-serif" letter-spacing="1">СЕКРЕТНО</text></g>`),us=c("0 0 140 140",`
  <circle cx="70" cy="70" r="64" fill="none" stroke="#c9952f" stroke-width="6"/>
  <circle cx="70" cy="70" r="54" fill="#3f6f9a"/>
  <path d="M40 46c10-8 24-6 28 4s-6 12-2 22-10 16-20 10S28 56 40 46ZM78 38c10-4 26 2 30 14s-4 16-12 12-8 8-16 2-12-24-2-28ZM80 88c8-2 16 4 14 12s-14 8-18 2 0-12 4-14Z" fill="#7aa35a"/>
  <path d="M16 70h108M70 16v108" stroke="rgba(255,255,255,.25)"/>
  <ellipse cx="70" cy="70" rx="26" ry="54" fill="none" stroke="rgba(255,255,255,.25)"/>
  <circle cx="70" cy="70" r="5" fill="#c9952f"/>`),Ne=c("0 0 140 140",`
  <rect x="6" y="6" width="128" height="128" rx="4" fill="#9b7a4a"/>
  ${[30,54,78,102].map(t=>`<path d="M6 ${t}h128" stroke="#7a5e36" stroke-width="2.4"/>`).join("")}
  <rect x="6" y="6" width="128" height="128" rx="4" fill="none" stroke="#6b5130" stroke-width="8"/>
  <path d="M10 10l120 120" stroke="#6b5130" stroke-width="8"/>
  <text x="70" y="78" text-anchor="middle" font-size="16" font-weight="800" fill="#3a2e1c" font-family="monospace" opacity=".7">№ 7</text>`),_e=c("0 0 80 80",`
  <circle cx="40" cy="40" r="22" fill="#e9dfc8"/>
  <path d="M18 40c0-6 4-4 6 2s4 8 6 2M58 36c2 6-2 10-4 4" fill="#f4ecd8" stroke="#d6c9aa" stroke-width="1"/>
  <circle cx="40" cy="40" r="15" fill="#f4ecd8"/>
  <circle cx="40" cy="40" r="2.4" fill="#2a2a2a"/>
  <circle class="flame" cx="40" cy="40" r="9" fill="url(#flame)"/>
  <defs><radialGradient id="flame"><stop offset="0" stop-color="#fff6c2"/><stop offset=".45" stop-color="#ffb84a"/><stop offset="1" stop-color="rgba(255,140,40,0)"/></radialGradient></defs>`),ks=c("0 0 140 60",`
  <circle cx="26" cy="30" r="18" fill="none" stroke="#6d6a62" stroke-width="7"/>
  <circle cx="26" cy="30" r="7" fill="none" stroke="#6d6a62" stroke-width="3"/>
  <path d="M44 30h82" stroke="#6d6a62" stroke-width="7" stroke-linecap="round"/>
  <path d="M106 30v14h8V30M120 30v10h6V30" fill="#6d6a62" stroke="#6d6a62" stroke-width="3"/>
  <path d="M44 27h82" stroke="#9a968c" stroke-width="1.6"/>`),$s=c("0 0 150 50",`
  <path d="M8 26C40 4 100 2 144 22 100 14 60 18 8 26Z" fill="#3a4152"/>
  <path d="M8 26C40 46 100 44 144 26 100 34 60 32 8 26Z" fill="#454d60"/>
  <path d="M2 27l142-3" stroke="#9aa4b8" stroke-width="1.6"/>
  ${[30,50,70,90,110].map(t=>`<path d="M${t} 26l10-10M${t} 26l10 10" stroke="#5c6578" stroke-width="1"/>`).join("")}`),Ge=c("0 0 160 120",`
  <path d="M30 60h100" stroke="#5c574c" stroke-width="7" stroke-linecap="round"/>
  <circle cx="80" cy="60" r="16" fill="#4a463e"/>
  ${[30,80,130].map(t=>`<circle cx="${t}" cy="60" r="15" fill="#e9dfc8"/><circle cx="${t}" cy="60" r="10" fill="#f4ecd8"/>
    <circle class="flame" cx="${t}" cy="60" r="8" fill="url(#flame2)"/>`).join("")}
  <defs><radialGradient id="flame2"><stop offset="0" stop-color="#fff6c2"/><stop offset=".45" stop-color="#ffb84a"/><stop offset="1" stop-color="rgba(255,140,40,0)"/></radialGradient></defs>`),ze=c("0 0 140 140",`
  <g stroke="rgba(220,226,235,.5)" stroke-width="1.2" fill="none">
    ${[0,15,30,45,60,75,90].map(t=>{const e=t*Math.PI/180;return`<path d="M0 0L${140*Math.cos(e)} ${140*Math.sin(e)}"/>`}).join("")}
    ${[30,55,80,105].map(t=>`<path d="M${t} 0 ${[15,30,45,60,75].map(e=>{const r=e*Math.PI/180;return`Q${t*.8*Math.cos(r-.13)} ${t*.8*Math.sin(r-.13)} ${t*Math.cos(r)} ${t*Math.sin(r)}`}).join(" ")} Q${t*.8*Math.cos(1.44)} ${t*.8*Math.sin(1.44)} 0 ${t}"/>`).join("")}
  </g>`),te=c("0 0 130 110",`
  ${[["#7a2430",-6,0],["#24406b",4,10],["#2f5b3a",-2,20]].map(([t,e,r])=>`
    <g transform="translate(0 ${r}) rotate(${e} 65 50)">
      <rect x="14" y="12" width="102" height="70" rx="4" fill="#efe6d0"/>
      <rect x="10" y="10" width="100" height="70" rx="4" fill="${t}"/>
      <rect x="22" y="22" width="76" height="46" rx="2" fill="none" stroke="#d9b45a" stroke-width="1.6"/>
      <rect x="40" y="38" width="40" height="5" fill="#d9b45a"/></g>`).join("")}`),gs=c("0 0 150 70",`
  <rect x="20" y="12" width="110" height="46" fill="#ecdcb4"/>
  ${[30,40,50].map(t=>`<path d="M30 ${t}h${t===50?60:88}" stroke="#a08c62" stroke-width="2"/>`).join("")}
  <rect x="8" y="8" width="16" height="54" rx="8" fill="#d8c494"/><rect x="126" y="8" width="16" height="54" rx="8" fill="#d8c494"/>
  <path d="M8 35h16M126 35h16" stroke="#b39a64" stroke-width="2"/>
  <circle cx="100" cy="48" r="9" fill="#b8322e"/><path d="M96 56l-4 10M104 56l4 10" stroke="#b8322e" stroke-width="3"/>`),bs=c("0 0 120 110",`
  <circle cx="42" cy="66" r="30" fill="#1d2633" stroke="#3a4a5e" stroke-width="3"/>
  <circle cx="42" cy="66" r="18" fill="#0d1118"/>
  <path d="M36 58a12 12 0 0 1 10-4" stroke="rgba(255,255,255,.35)" stroke-width="2" fill="none"/>
  <path d="M46 62C70 30 96 12 116 4 104 22 84 44 52 66Z" fill="#f4f1ea"/>
  <path d="M46 62 116 4" stroke="#c9c2b2" stroke-width="1.6"/>
  ${[0,1,2,3,4].map(t=>`<path d="M${60+t*11} ${50-t*9}l-6 -10" stroke="#d9d2c2" stroke-width="1"/>`).join("")}`),ms=c("0 0 130 80",`
  <path d="M66 40h56" stroke="#5a3a22" stroke-width="10" stroke-linecap="round"/>
  <circle cx="36" cy="40" r="30" fill="rgba(170,210,235,.35)" stroke="#c9952f" stroke-width="6"/>
  <path d="M20 28a20 20 0 0 1 14-8" stroke="rgba(255,255,255,.7)" stroke-width="3" fill="none" stroke-linecap="round"/>`),ys=c("0 0 170 110",`
  <path d="M85 14C60 4 30 4 8 12v86c22-8 52-8 77 2Z" fill="#f1e8d2" stroke="#c9b88f"/>
  <path d="M85 14c25-10 55-10 77-2v86c-22-8-52-8-77 2Z" fill="#f6eedb" stroke="#c9b88f"/>
  ${[28,38,48,58,68,78].map(t=>`<path d="M18 ${t}q30-6 58 0M94 ${t}q30-6 58 0" stroke="#b7a57f" stroke-width="1.6" fill="none"/>`).join("")}
  <path d="M85 14v86" stroke="#a8956a" stroke-width="2"/>
  <path d="M120 100l4 10 4-10" fill="#b8322e"/>`),ws=c("0 0 140 90",`
  <path d="M20 40h100" stroke="#a9792a" stroke-width="5" stroke-linecap="round"/>
  <circle cx="70" cy="40" r="9" fill="#c9952f" stroke="#8a5f17" stroke-width="2"/>
  ${[22,118].map(t=>`<circle cx="${t}" cy="44" r="20" fill="#d9a83f" stroke="#8a5f17" stroke-width="2"/><circle cx="${t}" cy="44" r="14" fill="#e8bf5a"/>`).join("")}
  <circle cx="16" cy="40" r="5" fill="#8b8f96"/><circle cx="26" cy="48" r="4" fill="#8b8f96"/>
  ${Ht(118,50,3)}`),xs=c("0 0 140 100",`
  <rect x="4" y="4" width="132" height="92" rx="6" fill="none" stroke="#6b4226" stroke-width="8"/>
  ${[20,34,48,62,76].map((t,e)=>`<path d="M8 ${t}h124" stroke="#c9b48a" stroke-width="1.6"/>
    ${Array.from({length:10},(r,a)=>`<ellipse cx="${18+a*8+(a>=(3+e)%6?26:0)}" cy="${t}" rx="4.2" ry="5.5" fill="${a===4||a===5?"#2a2018":"#a8642f"}"/>`).join("")}`).join("")}`),vs=c("0 0 90 90",`
  <circle cx="45" cy="45" r="38" fill="rgba(190,225,235,.35)" stroke="rgba(230,245,250,.8)" stroke-width="3"/>
  ${[[34,38],[52,34],[44,52],[28,56],[60,54],[46,24]].map(([t,e])=>`<circle cx="${t}" cy="${e}" r="10" fill="#f0c45a" stroke="#a87414" stroke-width="1.4"/>`).join("")}
  <path d="M22 30a28 28 0 0 1 16-12" stroke="rgba(255,255,255,.7)" stroke-width="3" fill="none" stroke-linecap="round"/>`),Ms=c("0 0 140 140",`
  <circle cx="70" cy="70" r="62" fill="#8a5a33"/>
  ${[-40,-20,0,20,40].map(t=>`<path d="M${70+t} 10v120" stroke="#6e4426" stroke-width="2"/>`).join("")}
  <circle cx="70" cy="70" r="62" fill="none" stroke="#3a3a3e" stroke-width="7"/>
  <circle cx="70" cy="70" r="46" fill="none" stroke="#4a4a50" stroke-width="4"/>
  <circle cx="92" cy="58" r="7" fill="#5a3a22" stroke="#3a2614" stroke-width="2"/>`),js=c("0 0 140 130",`
  <path d="M30 30c20-14 60-14 80 0 22 18 24 70 0 86-20 12-60 12-80 0-24-16-22-68 0-86Z" fill="#c9a970"/>
  <path d="M40 48q30 10 60 0M36 76q34 12 68 0M44 100q26 8 52 0" stroke="#a8884f" stroke-width="2" fill="none"/>
  <path d="M58 20q12 10 24 0" stroke="#8a6a3a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="70" cy="18" rx="14" ry="8" fill="#b8975c"/>`),Ss=c("0 0 100 50",`
  <path d="M9 24 2 40M91 24l7 16" stroke="#5a3a1e" stroke-width="2.4" stroke-linecap="round"/>
  ${[25,75].map(t=>`<circle cx="${t}" cy="25" r="16" fill="rgba(225,242,255,.55)" stroke="#5a3a1e" stroke-width="2.6"/>
    <path d="M${t-9} 18a11 11 0 0 1 8-5" stroke="rgba(255,255,255,.7)" stroke-width="2" fill="none" stroke-linecap="round"/>`).join("")}
  <path d="M41 24q9-7 18 0" stroke="#5a3a1e" stroke-width="2.6" fill="none"/>`),Ts=c("0 0 80 80",`
  <circle cx="40" cy="40" r="34" fill="#f2efe9" stroke="#c9c2b4" stroke-width="2"/>
  <circle cx="40" cy="40" r="34" fill="none" stroke="#3d6fb3" stroke-width="2" stroke-dasharray="5 4"/>
  <circle cx="40" cy="40" r="26" fill="#fbfaf7"/>
  ${[[30,32,10],[46,30,-14],[38,46,24],[52,46,6],[26,48,-6]].map(([t,e,r])=>`<rect x="${t-6}" y="${e-6}" width="12" height="12" rx="1.5" fill="#fff" stroke="#d9d4ca" transform="rotate(${r} ${t} ${e})"/>`).join("")}`),Zs=c("0 0 150 150",`
  <defs><radialGradient id="smv" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe0a0"/><stop offset=".5" stop-color="#c98a2f"/><stop offset="1" stop-color="#7a4f15"/></radialGradient></defs>
  <rect x="2" y="64" width="22" height="22" rx="8" fill="none" stroke="#8a5a1a" stroke-width="6"/>
  <rect x="126" y="64" width="22" height="22" rx="8" fill="none" stroke="#8a5a1a" stroke-width="6"/>
  <rect x="66" y="122" width="18" height="24" rx="4" fill="#8a5a1a"/>
  <circle cx="75" cy="75" r="56" fill="url(#smv)"/>
  ${[44,34].map(t=>`<circle cx="75" cy="75" r="${t}" fill="none" stroke="rgba(90,55,10,.45)" stroke-width="2"/>`).join("")}
  <circle cx="75" cy="75" r="26" fill="#6a5040"/>
  <circle cx="75" cy="75" r="22" fill="#e9e1d2"/>
  ${[0,60,120,180,240,300].map(t=>`<circle cx="${75+14*Math.cos(t*Math.PI/180)}" cy="${75+14*Math.sin(t*Math.PI/180)}" r="3.5" fill="#3d6fb3"/>`).join("")}
  <circle cx="75" cy="75" r="5" fill="#c9952f"/>
  <path d="M42 46a46 46 0 0 1 26-14" stroke="rgba(255,255,255,.55)" stroke-width="4" fill="none" stroke-linecap="round"/>`),Cs=c("0 0 170 120",`
  ${[[10,18,0],[16,46,2],[8,74,-2]].map(([t,e,r])=>`<g transform="rotate(${r} 85 ${e+12})">
    <rect x="${t}" y="${e}" width="150" height="24" rx="11" fill="#7a5232"/>
    <path d="M${t+20} ${e+7}h40M${t+70} ${e+15}h50M${t+30} ${e+18}h22" stroke="#5e3c22" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="${t+146}" cy="${e+12}" rx="6" ry="11" fill="#d8b47e"/><ellipse cx="${t+146}" cy="${e+12}" rx="3" ry="6" fill="none" stroke="#a87e48"/></g>`).join("")}
  <g transform="rotate(-70 120 70)"><rect x="70" y="58" width="110" height="20" rx="9" fill="#8a5e3a"/><path d="M90 64h40M110 72h40" stroke="#6a4428" stroke-width="2"/></g>`),Os=c("0 0 120 90",`
  <ellipse cx="60" cy="45" rx="56" ry="41" fill="#f6f1e8" stroke="#d6ccbb" stroke-width="1.5"/>
  <ellipse cx="60" cy="45" rx="50" ry="35" fill="none" stroke="#3d6fb3" stroke-width="2"/>
  ${[[40,34,-20],[72,30,15],[48,58,10],[80,56,-25]].map(([t,e,r])=>`<g transform="rotate(${r} ${t} ${e})">
    <ellipse cx="${t}" cy="${e}" rx="17" ry="10" fill="#d9993f"/>
    <ellipse cx="${t-3}" cy="${e-3}" rx="10" ry="5" fill="#ebb661"/>
    <path d="M${t-14} ${e+2}q14 6 28 0" stroke="#b77a2a" stroke-width="1.6" fill="none" stroke-dasharray="3 2"/></g>`).join("")}`),qs=c("0 0 110 80",`
  <circle cx="26" cy="40" r="20" fill="#c9a46a"/><circle cx="26" cy="40" r="15" fill="#c8342c"/>
  ${[11,13].map(t=>`<circle cx="26" cy="40" r="${t}" fill="none" stroke="#a8261f" stroke-width="1"/>`).join("")}
  <circle cx="26" cy="40" r="4" fill="#5a3a22"/>
  <path d="M44 44q14 6 18 22" stroke="#c8342c" stroke-width="1.4" fill="none"/>
  <g transform="rotate(-30 80 40)">
    <path d="M78 40 108 32M78 40l30 10" stroke="#b7bcc4" stroke-width="5" stroke-linecap="round"/>
    <circle cx="66" cy="32" r="9" fill="none" stroke="#2f5fa8" stroke-width="5"/><circle cx="66" cy="50" r="9" fill="none" stroke="#2f5fa8" stroke-width="5"/>
    <circle cx="78" cy="40" r="2.5" fill="#666"/></g>`),Es=c("0 0 160 160",`
  <circle cx="80" cy="80" r="74" fill="#b0884f"/>
  ${Array.from({length:24},(t,e)=>{const r=e*Math.PI/12;return`<path d="M${80+20*Math.cos(r)} ${80+20*Math.sin(r)}L${80+72*Math.cos(r)} ${80+72*Math.sin(r)}" stroke="#8a6534" stroke-width="2"/>`}).join("")}
  ${[60,46,32].map(t=>`<circle cx="80" cy="80" r="${t}" fill="none" stroke="#9a7440" stroke-width="3" stroke-dasharray="6 4"/>`).join("")}
  <circle cx="80" cy="80" r="74" fill="none" stroke="#7a5528" stroke-width="7"/>
  ${[[58,62,"#d24a5a"],[100,70,"#6a8fc7"],[74,104,"#e0b04a"]].map(([t,e,r])=>`<circle cx="${t}" cy="${e}" r="22" fill="${r}"/>
    <path d="M${Number(t)-18} ${Number(e)-6}q18-10 36 4M${Number(t)-16} ${Number(e)+8}q16-12 32 2" stroke="rgba(0,0,0,.2)" stroke-width="2.4" fill="none"/>`).join("")}`),Ue=c("0 0 140 140",`
  <circle cx="70" cy="70" r="40" fill="#8a5a3a" stroke="#6a4028" stroke-width="5"/>
  <circle cx="70" cy="70" r="33" fill="#3e2c20"/>
  ${Array.from({length:11},(t,e)=>{const r=e*.9,a=22+e%3*14,i=70+a*Math.cos(r),n=70+a*Math.sin(r);return`<ellipse cx="${i.toFixed(1)}" cy="${n.toFixed(1)}" rx="17" ry="9" fill="${e%2?"#2f6b34":"#3a7c3e"}" transform="rotate(${(r*180/Math.PI).toFixed(0)} ${i.toFixed(1)} ${n.toFixed(1)})"/>
    <path d="M${(i-12*Math.cos(r)).toFixed(1)} ${(n-12*Math.sin(r)).toFixed(1)}L${(i+12*Math.cos(r)).toFixed(1)} ${(n+12*Math.sin(r)).toFixed(1)}" stroke="#24552a" stroke-width="1.4"/>`}).join("")}`),Ls=c("0 0 130 50",`
  <rect x="6" y="15" width="78" height="20" rx="6" fill="#2b2e33"/>
  ${[18,28,38,48,58].map(t=>`<path d="M${t} 16v18" stroke="#3d4148" stroke-width="3"/>`).join("")}
  <path d="M84 12h22l14 -4v34l-14 -4H84Z" fill="#3a3e45"/>
  <ellipse cx="120" cy="25" rx="5" ry="17" fill="#fff3b0"/>
  <rect x="62" y="10" width="10" height="6" rx="2" fill="#c0392b"/>`),Rs=c("0 0 100 90",`
  <path d="M6 14 92 6l2 76-84 4Z" fill="#e9dcc0"/>
  <path d="M30 10 26 84M60 8l6 74" stroke="rgba(150,120,80,.25)" stroke-width="1.5"/>
  <rect x="20" y="20" width="58" height="50" rx="12" fill="#c8954f"/>
  <rect x="25" y="25" width="48" height="40" rx="9" fill="#f0d9a6"/>
  ${[[38,38],[58,40],[46,54],[64,56]].map(([t,e])=>`<circle cx="${t}" cy="${e}" r="9" fill="#d97a7a" stroke="#b85a5a" stroke-width="1.4"/>
    <circle cx="${t-2}" cy="${e-2}" r="1.3" fill="#f6d3d3"/><circle cx="${t+3}" cy="${e+2}" r="1.1" fill="#f6d3d3"/>`).join("")}`),As=c("0 0 110 150",`
  <rect x="8" y="16" width="94" height="128" rx="10" fill="#4e6236"/>
  <path d="M18 34 92 128M92 34 18 128" stroke="#3e4f2a" stroke-width="6"/>
  <rect x="8" y="16" width="94" height="128" rx="10" fill="none" stroke="#3a4a26" stroke-width="4"/>
  ${[24,44,64].map(t=>`<rect x="${t}" y="2" width="14" height="20" rx="4" fill="#3a4a26"/>`).join("")}
  <rect x="78" y="4" width="18" height="18" rx="5" fill="#2b2e33"/>`),Hs=c("0 0 150 100",`
  <rect x="6" y="14" width="138" height="80" rx="6" fill="#1f2125"/>
  <rect x="6" y="14" width="138" height="20" rx="6" fill="#2c2f35"/>
  <circle cx="30" cy="12" r="10" fill="#c0392b"/><text x="30" y="17" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="system-ui">+</text>
  <circle cx="120" cy="12" r="10" fill="#3a3e45"/><text x="120" y="17" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="system-ui">−</text>
  <rect x="40" y="48" width="70" height="30" rx="4" fill="#e0b02a"/>
  <text x="75" y="68" text-anchor="middle" font-size="12" font-weight="800" fill="#1f2125" font-family="system-ui">12В</text>`),Bs=c("0 0 110 90",`
  ${[[30,36],[64,30],[46,62]].map(([t,e])=>`<circle cx="${t}" cy="${e}" r="20" fill="#f08a1c"/>
    <circle cx="${t-6}" cy="${e-6}" r="6" fill="rgba(255,255,255,.25)"/>
    <circle cx="${t}" cy="${e}" r="2" fill="#a85a10"/>
    <path d="M${t+2} ${e-18}q8-6 12 0q-6 4-12 0Z" fill="#4f8a3a"/>`).join("")}
  <g transform="translate(88 64)">${Array.from({length:8},(t,e)=>`<path d="M0 0L${(14*Math.cos(e*Math.PI/4)).toFixed(1)} ${(14*Math.sin(e*Math.PI/4)).toFixed(1)}A14 14 0 0 1 ${(14*Math.cos((e+1)*Math.PI/4)).toFixed(1)} ${(14*Math.sin((e+1)*Math.PI/4)).toFixed(1)}Z" fill="#f7a23a" stroke="#fde4b8" stroke-width="1.2"/>`).join("")}</g>`),Fs=c("0 0 80 60",`
  ${[[6,8,-8],[30,18,10]].map(([t,e,r])=>`<g transform="rotate(${r} ${t+22} ${e+14})">
    <rect x="${t}" y="${e}" width="44" height="28" rx="2" fill="#fbfaf7" stroke="#d9d4ca"/>
    <rect x="${t}" y="${e+18}" width="44" height="5" fill="#2f5fa8"/>
    <text x="${t+22}" y="${e+14}" text-anchor="middle" font-size="8" font-weight="800" fill="#2f5fa8" font-family="system-ui">САХАР</text></g>`).join("")}`),Ps=c("0 0 150 110",`
  <path d="M10 30q0-12 12-12h106q12 0 12 12v62q0 12-12 12H22q-12 0-12-12Z" fill="#2c3346"/>
  <path d="M10 46h130" stroke="#232838" stroke-width="3"/>
  <path d="M30 18q45-20 90 0" stroke="#1d2230" stroke-width="7" fill="none"/>
  <rect x="64" y="40" width="22" height="16" rx="3" fill="#c9952f"/><rect x="70" y="45" width="10" height="6" rx="1" fill="#2c3346"/>
  <path d="M24 72h40M24 82h28" stroke="#3a4258" stroke-width="3" stroke-linecap="round"/>`),Is=c("0 0 120 140",`
  <rect x="14" y="10" width="92" height="122" rx="30" fill="#3f6a4a"/>
  <rect x="26" y="70" width="68" height="50" rx="14" fill="#35593e"/>
  <path d="M30 70h60" stroke="#2c4a33" stroke-width="3"/>
  <path d="M40 10q20-14 40 0" stroke="#2c4a33" stroke-width="6" fill="none"/>
  <path d="M24 30v80M96 30v80" stroke="#2c4a33" stroke-width="5"/>
  <rect x="52" y="64" width="16" height="10" rx="2" fill="#c9cdd3"/>`),Ns=c("0 0 60 60",`
  <rect x="2" y="2" width="56" height="56" rx="7" fill="#1d1d1f"/>
  ${Array.from({length:9},(t,e)=>`<rect x="${6+e%3*17}" y="${6+Math.floor(e/3)*17}" width="15" height="15" rx="3"
    fill="${["#e23b3b","#f2f2f2","#2f7de1","#f7c52e","#2f9e4f","#f08a1c","#2f7de1","#e23b3b","#f7c52e"][e]}"/>`).join("")}`);function xr(t,e){return c("0 0 90 80",`
    <ellipse cx="44" cy="42" rx="40" ry="36" fill="#f6f1e8" stroke="#d6ccbb" stroke-width="1.5"/>
    <ellipse cx="44" cy="42" rx="30" ry="27" fill="none" stroke="${e}" stroke-width="1.8"/>
    <rect x="62" y="34" width="20" height="14" rx="7" fill="none" stroke="#f2ede4" stroke-width="5"/>
    <circle cx="44" cy="42" r="22" fill="#fbf8f2" stroke="${e}" stroke-width="2"/>
    <circle cx="44" cy="42" r="17" fill="${t}"/>
    <path d="M33 35a13 13 0 0 1 8-5" stroke="rgba(255,255,255,.4)" stroke-width="2" fill="none" stroke-linecap="round"/>`)}const _s=xr("#4a2a16","#2c2c2c"),Gs=xr("#b0611c","#c9952f"),zs=c("0 0 150 150",`
  <defs><radialGradient id="lampglow"><stop offset="0" stop-color="rgba(255,230,160,.65)"/><stop offset="1" stop-color="rgba(255,230,160,0)"/></radialGradient></defs>
  <circle cx="75" cy="75" r="74" fill="url(#lampglow)"/>
  <circle cx="75" cy="75" r="44" fill="#e8d5a8" stroke="#c9b07a" stroke-width="3"/>
  ${Array.from({length:12},(t,e)=>{const r=e*Math.PI/6;return`<path d="M${75+16*Math.cos(r)} ${75+16*Math.sin(r)}L${75+42*Math.cos(r)} ${75+42*Math.sin(r)}" stroke="#d4bc88" stroke-width="1.5"/>`}).join("")}
  <circle cx="75" cy="75" r="16" fill="#fff6d8"/><circle cx="75" cy="75" r="5" fill="#a88a4a"/>`),Us=c("0 0 170 64",`
  <path d="M14 10h104q30 0 30 22t-30 22H14q-10 0-10-22t10-22Z" fill="rgba(140,200,170,.35)" stroke="rgba(200,240,220,.8)" stroke-width="2.4"/>
  <rect x="146" y="22" width="12" height="20" rx="3" fill="rgba(140,200,170,.45)" stroke="rgba(200,240,220,.8)" stroke-width="2"/>
  <rect x="156" y="24" width="12" height="16" rx="3" fill="#b07a42"/>
  <path d="M30 40q40 8 80 0l-6 8H38Z" fill="#7a4a24"/>
  <path d="M50 38V14l20 22ZM72 38V10l22 26ZM94 38V18l14 18Z" fill="#f4efe2"/>
  <path d="M20 16q60-6 110 0" stroke="rgba(255,255,255,.55)" stroke-width="3" fill="none" stroke-linecap="round"/>`),Vs=c("0 0 70 70",`
  <path d="M35 64 6 30q2-22 29-24 27 2 29 24Z" fill="#f2c6a8"/>
  ${[-24,-14,-5,5,14,24].map(t=>`<path d="M35 62 ${35+t*1.15} 10" stroke="#d99a7a" stroke-width="2"/>`).join("")}
  <path d="M26 62h18l-4 6h-10Z" fill="#e8b292"/>`),Ds=c("0 0 120 160",`
  <g fill="none" stroke="#3a3f48" stroke-width="10" stroke-linecap="round">
    <circle cx="60" cy="18" r="10"/><path d="M60 28v114"/><path d="M34 46h52"/>
    <path d="M14 104q4 38 46 38 42 0 46-38"/></g>
  <path d="M6 104l16-14 6 20ZM114 104l-16-14-6 20Z" fill="#3a3f48"/>
  <path d="M60 32v108" stroke="#5a606a" stroke-width="2"/>`);function vr(t){return c("0 0 170 120",`
    <rect x="6" y="8" width="158" height="104" rx="10" fill="#7a4e2c"/>
    ${[30,54,78,102].map(e=>`<path d="M8 ${e}h154" stroke="#5e3a1f" stroke-width="2.4"/>`).join("")}
    ${[34,136].map(e=>`<rect x="${e-6}" y="8" width="12" height="104" fill="#4a4e56"/>`).join("")}
    <rect x="6" y="8" width="158" height="104" rx="10" fill="none" stroke="#4a4e56" stroke-width="6"/>
    <rect x="72" y="96" width="26" height="22" rx="4" fill="#c9952f"/><circle cx="85" cy="105" r="3" fill="#3a2a10"/>
    ${t?`<path d="M0 30 170 92M0 92 170 30" stroke="#8a8e96" stroke-width="7" stroke-dasharray="10 4"/>
      <rect x="74" y="50" width="22" height="22" rx="5" fill="#6a6e76"/>`:""}`)}const Ks=vr(!1),Ws=vr(!0),Ys=c("0 0 120 90",`
  ${[[34,48,-16],[78,44,18]].map(([t,e,r])=>`<g transform="rotate(${r} ${t} ${e})">
    <rect x="${t-16}" y="${e-6}" width="32" height="36" rx="12" fill="#f6f4ee" stroke="#d6d2c8" stroke-width="1.5"/>
    ${[-12,-4,4,12].map(a=>`<rect x="${t+a-3.5}" y="${e-30}" width="7" height="28" rx="3.5" fill="#f6f4ee" stroke="#d6d2c8" stroke-width="1.2"/>`).join("")}
    <rect x="${t-26}" y="${e+2}" width="12" height="7" rx="3.5" fill="#f6f4ee" stroke="#d6d2c8" stroke-width="1.2" transform="rotate(-30 ${t-20} ${e+5})"/>
    <path d="M${t-16} ${e+24}h32" stroke="#d6d2c8" stroke-width="2"/></g>`).join("")}`),Js=c("0 0 70 90",`
  ${[0,1,2,3].map(t=>`<rect x="${8+t*1.6}" y="${8+t*1.6}" width="50" height="72" rx="5" fill="${t===3?"url(#deckback)":"#e9e2d0"}" stroke="#c9c0a8"/>`).join("")}
  <defs><pattern id="deckback" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="8" height="8" fill="#8a1d2b"/><rect width="4" height="8" fill="#a12f3c"/></pattern></defs>
  <rect x="17" y="17" width="40" height="62" rx="3" fill="none" stroke="#e8b93c" stroke-width="1.4"/>`),Xs=c("0 0 190 40",`
  <path d="M30 20h150" stroke="#16161a" stroke-width="9" stroke-linecap="round"/>
  <path d="M40 18h130" stroke="#3a3a42" stroke-width="2"/>
  <circle cx="22" cy="20" r="13" fill="#d8d8de" stroke="#9a9aa4" stroke-width="2"/>
  <circle cx="18" cy="16" r="4" fill="rgba(255,255,255,.7)"/>
  <rect x="176" y="15" width="10" height="10" rx="2" fill="#c9952f"/>`),Qs=c("0 0 130 130",`
  <rect x="6" y="6" width="118" height="118" rx="8" fill="#5a5f68"/>
  <rect x="16" y="16" width="98" height="98" rx="4" fill="#6c727c" stroke="#4a4e56" stroke-width="3"/>
  <circle cx="65" cy="65" r="24" fill="#3a3e45" stroke="#c9cdd3" stroke-width="3"/>
  ${Array.from({length:12},(t,e)=>{const r=e*Math.PI/6;return`<path d="M${65+18*Math.cos(r)} ${65+18*Math.sin(r)}L${65+22*Math.cos(r)} ${65+22*Math.sin(r)}" stroke="#c9cdd3" stroke-width="1.5"/>`}).join("")}
  <path d="M65 65l10-8" stroke="#e8b93c" stroke-width="3" stroke-linecap="round"/>
  <rect x="98" y="54" width="8" height="22" rx="3" fill="#c9cdd3"/>`),ti=c("0 0 70 100",`
  <path d="M15 4h40l-6 34H21Z" fill="#c8342c"/>
  <path d="M28 4h14l-3 34h-8Z" fill="#f4efe2"/>
  <circle cx="35" cy="64" r="26" fill="#e0b04a" stroke="#a87a1a" stroke-width="2.5"/>
  <polygon points="${st(35,64,18,7.5,5)}" fill="#c8342c" stroke="#8a1d16" stroke-width="1" transform="rotate(-90 35 64)"/>
  <circle cx="35" cy="64" r="6" fill="#e0b04a"/>`),ei=c("0 0 120 100",`
  <rect x="8" y="22" width="104" height="72" rx="8" fill="#55603d"/>
  <rect x="8" y="22" width="104" height="72" rx="8" fill="none" stroke="#3f4a2a" stroke-width="4"/>
  <path d="M22 16h76" stroke="#2b2e22" stroke-width="12" stroke-linecap="round"/>
  <circle cx="20" cy="16" r="11" fill="#2b2e22"/><circle cx="100" cy="16" r="11" fill="#2b2e22"/>
  <circle cx="40" cy="60" r="14" fill="#3f4a2a"/><circle cx="40" cy="60" r="5" fill="#c9cdd3"/>
  <path d="M86 50v26M86 76h14" stroke="#2b2e22" stroke-width="5" stroke-linecap="round"/>
  <rect x="60" y="80" width="20" height="8" rx="2" fill="#c9952f"/>`),ri=c("0 0 130 130",`
  <circle cx="65" cy="65" r="60" fill="#3f4a2a"/>
  <circle cx="65" cy="65" r="50" fill="#55603d"/>
  <circle cx="58" cy="56" r="30" fill="rgba(255,255,255,.07)"/>
  <polygon points="${st(65,65,15,6,5)}" fill="#c8342c" transform="rotate(-18 65 65)"/>`),ai=c("0 0 130 150",`
  ${[[38,-8],[92,8]].map(([t,e])=>`<g transform="rotate(${e} ${t} 75)">
    <path d="M${t-22} 140c-6-30-4-58 4-74h36c8 16 10 44 4 74Z" fill="#1d1d21"/>
    <ellipse cx="${t}" cy="40" rx="24" ry="30" fill="#26262b"/>
    <ellipse cx="${t}" cy="40" rx="17" ry="22" fill="#0f0f12"/>
    <path d="M${t-14} 120h28" stroke="#33333a" stroke-width="3"/></g>`).join("")}`),si=c("0 0 90 90",`
  <defs><radialGradient id="orb" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#d9c8ff"/><stop offset=".5" stop-color="#6f5ab8"/><stop offset="1" stop-color="#241a4a"/></radialGradient>
  <radialGradient id="orbglow"><stop offset="0" stop-color="rgba(160,140,255,.55)"/><stop offset="1" stop-color="rgba(160,140,255,0)"/></radialGradient></defs>
  <circle class="orb-glow" cx="45" cy="45" r="44" fill="url(#orbglow)"/>
  <circle cx="45" cy="45" r="34" fill="#2a2420" stroke="#5a4a3a" stroke-width="4"/>
  <circle cx="45" cy="45" r="28" fill="url(#orb)"/>
  <g class="orb-swirl"><path d="M30 46q8-12 18-6t14-2M32 54q10 6 22-2" stroke="rgba(230,220,255,.6)" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
  <circle cx="36" cy="34" r="5" fill="rgba(255,255,255,.65)"/>`),ii=c("0 0 60 100",`
  <rect x="6" y="4" width="48" height="8" rx="3" fill="#5a3a22"/><rect x="6" y="88" width="48" height="8" rx="3" fill="#5a3a22"/>
  <path d="M12 12h36q0 24-14 38 14 14 14 38H12q0-24 14-38-14-14-14-38Z" fill="rgba(200,220,240,.3)" stroke="rgba(220,235,250,.7)" stroke-width="2"/>
  <path d="M20 30h20q-4 12-10 18-6-6-10-18ZM16 86q2-14 14-20 12 6 14 20Z" fill="#d8b47e"/>
  <path d="M30 48v18" stroke="#d8b47e" stroke-width="1.5"/>`),ni=c("0 0 130 110",`
  <ellipse cx="62" cy="62" rx="34" ry="26" fill="#14161b"/>
  <path d="M30 62 4 74l30-2ZM34 70 8 92l34-12Z" fill="#1d2027"/>
  <path d="M40 46q24-10 52 4M40 78q26 8 50-6" stroke="#2a2f3a" stroke-width="2" fill="none"/>
  <g class="raven-head">
    <circle cx="98" cy="58" r="16" fill="#1a1d23"/>
    <path d="M112 54 128 60 112 64Z" fill="#3a3e45"/>
    <circle cx="104" cy="52" r="3" fill="#cfe8ff"/><circle cx="104.8" cy="51.3" r="1" fill="#fff"/>
  </g>`),oi=c("0 0 100 90",`
  ${[["#f7e26b",8,10,-10,"hello"],["#f6a6c1",34,22,8,"привет"],["#9fd8f0",16,44,-4,"bonjour"]].map(([t,e,r,a,i])=>`<g transform="rotate(${a} ${Number(e)+22} ${Number(r)+20})"><rect x="${e}" y="${r}" width="46" height="40" fill="${t}"/>
    <rect x="${e}" y="${r}" width="46" height="8" fill="rgba(0,0,0,.08)"/>
    <text x="${Number(e)+23}" y="${Number(r)+27}" text-anchor="middle" font-size="9" fill="#3a3a5a" font-family="Georgia, serif" font-style="italic">${i}</text></g>`).join("")}`),ci=c("0 0 170 170",`
  <defs><radialGradient id="horn" cx=".5" cy=".5" r=".55"><stop offset="0" stop-color="#5a3a12"/><stop offset=".55" stop-color="#c98a2f"/><stop offset="1" stop-color="#ffe0a0"/></radialGradient></defs>
  <rect x="10" y="40" width="110" height="110" rx="8" fill="#6b4226"/>
  <circle cx="65" cy="95" r="44" fill="#16161a"/>
  ${[36,28,20].map(t=>`<circle cx="65" cy="95" r="${t}" fill="none" stroke="#2a2a30" stroke-width="1.5"/>`).join("")}
  <circle cx="65" cy="95" r="10" fill="#c8342c"/>
  <path d="M100 120 120 76" stroke="#c9952f" stroke-width="5" stroke-linecap="round"/>
  <circle cx="125" cy="50" r="42" fill="url(#horn)"/>
  <circle cx="125" cy="50" r="42" fill="none" stroke="#a87a1a" stroke-width="2"/>
  ${Array.from({length:8},(t,e)=>{const r=e*Math.PI/4;return`<path d="M125 50L${125+40*Math.cos(r)} ${50+40*Math.sin(r)}" stroke="rgba(120,80,20,.35)" stroke-width="1.5"/>`}).join("")}`),li=c("0 0 100 100",`
  <defs><radialGradient id="lanternlight"><stop offset="0" stop-color="rgba(255,210,120,.55)"/><stop offset="1" stop-color="rgba(255,210,120,0)"/></radialGradient></defs>
  <circle cx="50" cy="50" r="49" fill="url(#lanternlight)"/>
  <circle cx="50" cy="50" r="26" fill="#2a2a2e" stroke="#5a5a62" stroke-width="4"/>
  <circle cx="50" cy="50" r="18" fill="rgba(255,236,190,.5)"/>
  <circle class="flame" cx="50" cy="50" r="9" fill="url(#flame3)"/>
  <defs><radialGradient id="flame3"><stop offset="0" stop-color="#fff6c2"/><stop offset=".45" stop-color="#ffb84a"/><stop offset="1" stop-color="rgba(255,140,40,0)"/></radialGradient></defs>
  <path d="M50 18q14-12 22 0" stroke="#5a5a62" stroke-width="4" fill="none"/>`),di=c("0 0 70 190",`
  <path d="M35 6v110" stroke="#9a6a3a" stroke-width="7" stroke-linecap="round"/>
  <path d="M14 112h42l10 72H4Z" fill="#d8b45a"/>
  ${[12,22,32,42,52].map(t=>`<path d="M${t+4} 116l${(t-32)/3} 66" stroke="#b8943a" stroke-width="2"/>`).join("")}
  <path d="M14 122h42" stroke="#8a3a2a" stroke-width="4"/>`),Mt='<div class="steam"><span></span><span></span><span></span></div>';function Lt(t,e){const r=[[-60,-30],[50,-40],[70,20],[-40,36],[10,-56],[-74,4],[36,44]].map(([a,i])=>`<i style="--dx:${a}px;--dy:${i}px"></i>`).join("");return`<div class="splash ${t}" style="--d:${e}s"><b></b>${r}</div>`}const hi=(t,e)=>{const r=Math.sin(t*12.9898+e*78.233)*43758.5453;return r-Math.floor(r)};function Ve(t,e){if(!t.anim)return{cls:"",style:""};const r=(a,i,n)=>(i+hi(e,a)*(n-i)).toFixed(2);return t.anim==="ship"?{cls:" anim-ship",style:`;--ax:${r(1,3,10)}px;--ay:${r(2,1,5)}px;--rt:${r(3,1,5)}deg;--dur:${r(4,3.8,6.2)}s;animation-delay:${r(5,-6,0)}s`}:{cls:` anim-train-${e%3}`,style:`;--ax:${r(1,.8,2.6)}px;--rt:${r(3,.3,1.2)}deg;--dur:${r(4,1.5,3.2)}s;animation-delay:${r(5,-3,0)}s`}}const _=(t,e,r)=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${r}'>${t}</svg>`)}")`;function De(t,e,r,a,i){const n=[];for(let o=0;o<=t;o+=10)n.push(`${(e+r*Math.sin(2*Math.PI*a*o/t+i)).toFixed(1)},${o}`);return`M0 0L${n.join("L")}L0 ${t}Z`}const fi={"--pat-near":_(`<rect width='60' height='300' fill='#78a64a'/>
    <rect width='10' height='300' fill='#8d877c'/><path d='M10 0V300' stroke='#6f6a60' stroke-width='1.5'/>
    <g fill='#5f8a3a'>${[[20,30],[34,70],[26,112],[40,196],[22,238],[36,270],[30,20],[44,100],[18,180]].map(([t,e])=>`<ellipse cx='${t}' cy='${e}' rx='3' ry='6'/>`).join("")}</g>
    <rect x='8' y='146' width='44' height='6' rx='2' fill='#5a4632'/>
    <circle cx='50' cy='149' r='2.2' fill='#dfe8ec'/>
    <path d='M43 0C46 75 50 140 50 149C50 158 46 225 43 300' fill='none' stroke='#2c2f33' stroke-opacity='.55' stroke-width='.9'/>
    <path d='M39 0C42 75 46 140 46 151C46 160 42 225 39 300' fill='none' stroke='#2c2f33' stroke-opacity='.45' stroke-width='.9'/>`,60,300),"--pat-mid":_(`<rect width='58' height='420' fill='#9cc46a'/>
    <g stroke='#8bb35a' stroke-width='1.2'>${[8,18,28,38,48].map(t=>`<path d='M${t} 0V420'/>`).join("")}</g>
    ${[[40,15],[120,13],[300,16],[362,12]].map(([t,e])=>`
      <rect x='36' y='${t-2}' width='${e+10}' height='4' fill='#6b4a2e'/>
      <circle cx='${48+e}' cy='${t}' r='${e}' fill='#3f7a3a'/><circle cx='${44+e}' cy='${t-e/3}' r='${e*.55}' fill='#4d8c45'/>`).join("")}
    <rect x='36' y='198' width='34' height='3.5' fill='#f1efe8'/><path d='M44 198v3.5M54 198v3.5M62 198v3.5' stroke='#333' stroke-width='1.4'/>
    <ellipse cx='76' cy='199' rx='9' ry='12' fill='#8fbf5a'/>
    <rect x='34' y='232' width='22' height='36' fill='#c9a46a'/><rect x='40' y='244' width='8' height='10' fill='#6fa3c9'/>
    <polygon points='56,226 72,250 56,274' fill='#8a3a2a'/>
    <path d='M30 160c0-9 12-12 18-4 3 5-1 13-6 13-6 0-12-3-12-9Z' fill='#d8b45a'/>`,90,420),"--pat-far":_(`<path d='${De(600,46,8,3,1)}' fill='#9dbcae'/>
    <path d='${De(600,30,10,2,0)}' fill='#6f9a5e'/>`,70,600),"--pat-clouds":_(`${[[30,80,9,26],[18,240,7,20],[40,330,10,30],[26,440,6,18]].map(([t,e,r,a])=>`<ellipse cx='${t}' cy='${e}' rx='${r}' ry='${a}' fill='#fff' fill-opacity='.85'/>
      <ellipse cx='${t-4}' cy='${e+a*.4}' rx='${r*.8}' ry='${a*.7}' fill='#fff' fill-opacity='.7'/>`).join("")}`,60,500)},Te={matvey:{under:'<div class="rug"></div>',table:[{svg:Fe,at:"tr",w:76,extra:Mt},{svg:La,at:"tl",w:80,rot:-10},{svg:Ra,at:"r",w:116,rot:-9},{svg:Ss,at:"tc",w:80,rot:-6},{svg:Ts,at:"mr",w:66}],floor:[{svg:Aa,side:"L",gap:40,top:50,w:230,rot:-8,extra:Ha},{svg:Pe,side:"L",gap:70,top:10,w:120,rot:8},{svg:Ba,side:"R",gap:70,top:16,w:180},{svg:Zs,side:"R",gap:60,top:54,w:160},{svg:Cs,side:"L",gap:50,top:81,w:170,rot:-4}]},zina:{table:[{svg:Fa,at:"tr",w:96,rot:8},{svg:Pa,at:"tl",w:72},{svg:Ia,at:"r",w:120,rot:-6},{svg:Os,at:"tc",w:100},{svg:qs,at:"mr",w:88,rot:10}],floor:[{svg:_a,side:"L",gap:60,top:18,w:150,rot:6},{svg:Na,side:"R",gap:60,top:52,w:170},{svg:Pe,side:"R",gap:90,top:14,w:110,rot:-14},{svg:Es,side:"L",gap:60,top:56,w:160},{svg:Ue,side:"R",gap:80,top:80,w:130}]},vovan:{under:'<div class="oil"></div><div class="hazard"></div>',table:[{svg:za,at:"tr",w:80,extra:Mt},{svg:Ga,at:"tl",w:120,rot:18},{svg:Ua,at:"r",w:96},{svg:Va,at:"l",w:96,rot:10},{svg:Ls,at:"tc",w:100,rot:-10},{svg:Rs,at:"mr",w:84,rot:8}],floor:[{svg:Da,side:"L",gap:50,top:40,w:200},{svg:Ka,side:"R",gap:50,top:20,w:220,rot:-4},{svg:As,side:"L",gap:70,top:8,w:104,rot:8},{svg:Hs,side:"R",gap:60,top:42,w:150,rot:6}]},lyuba:{noMirror:!0,under:`<div class="runner"></div>
      <div class="train-wall"><div class="train-window">
        <div class="tw tw-clouds"></div><div class="tw tw-far"></div><div class="tw tw-mid"></div><div class="tw tw-near"></div>
        <div class="glare"></div><div class="curtain top"></div><div class="curtain bottom"></div>
      </div></div>`,patterns:fi,table:[{svg:Fe,at:"tr",w:76,extra:Mt,anim:"train"},{svg:Ya,at:"tl",w:96,rot:-8,anim:"train"},{svg:Wa,at:"r",w:104,anim:"train"},{svg:Ja,at:"l",w:88,rot:12,anim:"train"},{svg:Bs,at:"tc",w:92,anim:"train"},{svg:Fs,at:"mr",w:64,rot:-6,anim:"train"}],floor:[{svg:Xa,side:"L",gap:50,top:30,w:210,rot:-6,anim:"train"},{svg:Ps,side:"L",gap:70,top:64,w:150,rot:8,anim:"train"},{svg:Is,side:"L",gap:90,top:4,w:110,rot:-10,anim:"train"}]},gosha:{table:[{svg:Qa,at:"tr",w:104,rot:-6},{svg:ts,at:"tl",w:84},{svg:es,at:"r",w:88,rot:-10},{svg:Ns,at:"tc",w:48,rot:14},{svg:_s,at:"mr",w:68,extra:Mt}],floor:[{svg:Qt,side:"L",gap:60,top:30,w:190,rot:-90},{svg:rs,side:"R",gap:60,top:26,w:220,rot:4},{svg:zs,side:"L",gap:70,top:4,w:140},{svg:te,side:"R",gap:80,top:66,w:150,rot:12}]},captain:{table:[{svg:as,at:"tr",w:88,anim:"ship"},{svg:ss,at:"tl",w:132,rot:12,anim:"ship"},{svg:is,at:"r",w:58,rot:24,anim:"ship"},{svg:Us,at:"tc",w:130,rot:-6,anim:"ship"},{svg:Vs,at:"mr",w:56,rot:20,anim:"ship"}],floor:[{svg:ns,side:"L",gap:60,top:52,w:190,anim:"ship"},{svg:os,side:"R",gap:60,top:18,w:180,anim:"ship"},{svg:Ds,side:"L",gap:70,top:6,w:110,rot:-14},{svg:Ks,side:"R",gap:60,top:60,w:170,rot:6,anim:"ship"}],under:Lt("sp-floor-1",0)+Lt("sp-floor-2",6)+Lt("sp-floor-3",11),over:'<div class="sway-light"></div>',onTable:Lt("sp-table",3)},mihalych:{table:[{svg:cs,at:"tr",w:100},{svg:ls,at:"tl",w:96},{svg:ds,at:"r",w:100,rot:-12},{svg:Ys,at:"tc",w:92},{svg:Js,at:"mr",w:54,rot:10}],floor:[{svg:Qt,side:"L",gap:50,top:34,w:200,rot:-90},{svg:Qt,side:"R",gap:50,top:34,w:200,rot:90},{svg:Xs,side:"L",gap:40,top:76,w:190,rot:-24},{svg:Qs,side:"R",gap:70,top:6,w:130,rot:4}],patterns:{"--pat-floor":_(`<g fill='#c24860' opacity='.2'>
        <path d='M30 8c7 9 14 13 14 24s-7 16-14 24c-7-8-14-13-14-24S23 17 30 8Z'/><circle cx='30' cy='70' r='4'/>
        <path d='M0 50c5-6 10-8 10-14S5 26 0 22ZM60 50c-5-6-10-8-10-14s5-10 10-14Z'/></g>`,60,84)}},general:{table:[{svg:hs,at:"tr",w:96,rot:8},{svg:fs,at:"tl",w:124},{svg:ps,at:"r",w:120,rot:-8},{svg:ti,at:"tc",w:50,rot:8},{svg:ei,at:"mr",w:88,rot:-6}],floor:[{svg:us,side:"L",gap:60,top:18,w:180},{svg:Ne,side:"R",gap:60,top:46,w:170,rot:8},{svg:ri,side:"L",gap:70,top:60,w:130},{svg:ai,side:"R",gap:80,top:10,w:116,rot:-8}],patterns:{"--pat-table":_(`<g fill='none' stroke='#d8e0b8' stroke-opacity='.13' stroke-width='1.4'>
        <path d='M20 60c10-30 60-40 90-20s40 60 10 80-90 10-100-20 0-40 0-40Z'/>
        <path d='M40 64c8-18 40-24 58-10s22 40 4 50-56 4-62-14 0-26 0-26Z'/>
        <path d='M60 68c4-8 20-10 28-4s10 18 2 22-24 2-28-6 0-12 0-12Z'/>
        <path d='M150 160c20-10 50 0 46 24s-40 26-56 10-10-28 10-34Z'/>
        <path d='M160 168c12-6 28 0 26 14s-22 14-30 6-6-16 4-20Z'/></g>`,220,220)}},fog:{over:`<div class="fog"><span></span><span></span><span></span></div>
      <div class="web web-l">${ze}</div><div class="web web-r">${ze}</div>`,table:[{svg:_e,at:"tr",w:70},{svg:_e,at:"tl",w:60},{svg:ks,at:"r",w:110,rot:-14},{svg:$s,at:"l",w:120,rot:20},{svg:si,at:"tc",w:78},{svg:ii,at:"mr",w:46,rot:-20}],floor:[{svg:Ge,side:"L",gap:60,top:40,w:200},{svg:Ge,side:"R",gap:60,top:16,w:170,rot:90},{svg:ni,side:"R",gap:60,top:54,w:150,rot:180},{svg:Ws,side:"L",gap:50,top:72,w:170,rot:-6}],patterns:{"--pat-floor":_(`<rect width='160' height='160' fill='#121418'/>
        <g fill='#2a2e35'><path d='M4 6h46l6 30-10 24H6Z'/><path d='M58 4h50l4 40-46 6Z'/><path d='M116 6h40v52l-36-6Z'/>
        <path d='M6 66h42l12 40-18 28H8Z'/><path d='M66 56l48-2 6 44-50 10Z'/><path d='M124 64h32v60l-30-8Z'/>
        <path d='M50 116h26l42 4 4 36H52Z'/><path d='M128 126h28v30h-26Z'/></g>
        <g fill='#33373f'><path d='M58 4h50l4 40-46 6Z'/><path d='M6 66h42l12 40-18 28H8Z'/><path d='M128 126h28v30h-26Z'/></g>`,160,160)}},translator:{under:'<div class="carpet"></div>',table:[{svg:te,at:"tr",w:100,rot:6},{svg:bs,at:"tl",w:86},{svg:gs,at:"r",w:120,rot:-10},{svg:ms,at:"l",w:96,rot:18},{svg:oi,at:"tc",w:84},{svg:Gs,at:"mr",w:68,extra:Mt}],floor:[{svg:ys,side:"L",gap:60,top:46,w:200,rot:-6},{svg:te,side:"R",gap:60,top:20,w:170,rot:-14},{svg:ci,side:"R",gap:50,top:54,w:180,rot:-8},{svg:Ue,side:"L",gap:70,top:6,w:140}],patterns:{"--pat-floor":_(`<rect width='48' height='48' fill='#7a1f2b'/>
        <path d='M24 4 44 24 24 44 4 24Z' fill='none' stroke='#d9b45a' stroke-opacity='.45' stroke-width='2'/>
        <path d='M24 14 34 24 24 34 14 24Z' fill='#22345c' fill-opacity='.7'/>
        <circle cx='0' cy='0' r='4' fill='#d9b45a' fill-opacity='.4'/><circle cx='48' cy='48' r='4' fill='#d9b45a' fill-opacity='.4'/>
        <circle cx='48' cy='0' r='4' fill='#d9b45a' fill-opacity='.4'/><circle cx='0' cy='48' r='4' fill='#d9b45a' fill-opacity='.4'/>`,48,48)}},shop:{fixedTable:!0,table:[{svg:xs,at:"tl",w:78,rot:-8},{svg:ws,at:"tr",w:88}],floor:[{svg:Ms,side:"L",gap:40,top:12,w:170},{svg:js,side:"L",gap:90,top:52,w:160,rot:10},{svg:Ne,side:"R",gap:50,top:28,w:170,rot:-6},{svg:vs,side:"R",gap:110,top:64,w:110},{svg:li,side:"R",gap:70,top:6,w:100},{svg:di,side:"L",gap:60,top:76,w:64,rot:24}],patterns:{"--pat-floor":_(`<rect width='120' height='120' fill='#2b2621'/>
        <g fill='#4a423a'><rect x='3' y='3' width='52' height='34' rx='12'/><rect x='60' y='4' width='56' height='30' rx='12'/>
        <rect x='-26' y='42' width='50' height='34' rx='12'/><rect x='30' y='41' width='58' height='35' rx='12'/><rect x='94' y='42' width='50' height='34' rx='12'/>
        <rect x='4' y='81' width='54' height='35' rx='12'/><rect x='63' y='82' width='53' height='34' rx='12'/></g>
        <g fill='#564c42'><rect x='60' y='4' width='56' height='30' rx='12'/><rect x='30' y='41' width='58' height='35' rx='12'/><rect x='4' y='81' width='54' height='35' rx='12'/></g>`,120,120)}}},pi=t=>!!t&&t in Te;function ui(t){return Te[t].patterns??{}}const Mr={tl:140,tr:140,tc:90,mr:72,r:130,l:130},Ke=Object.keys(Mr);function ki(t,e){const r=(l,h)=>({prop:l,at:h,rot:(l.rot??0)+(e()*30-15),dx:Math.round(e()*20-10),dy:Math.round(e()*16-8)});if(t.fixedTable)return t.table.map(l=>r(l,l.at));const a=new Set(Ke);typeof window<"u"&&window.innerWidth<520&&(a.delete("tc"),a.delete("mr"));const n=ut(t.table,e).sort((l,h)=>h.w-l.w),o=[];for(const l of n){const h=Ke.filter(f=>a.has(f)&&Mr[f]>=l.w),d=h.length?h[Math.floor(e()*h.length)]:a.has(l.at)?l.at:null;d&&(a.delete(d),o.push(r(l,d)))}return o}function $i(t,e){const r=!t.noMirror&&e()<.5;return t.floor.map(a=>({prop:a,side:r?a.side==="L"?"R":"L":a.side,rot:(a.rot??0)+(e()*24-12),dx:0,dy:0,top:Math.max(2,Math.min(84,a.top+(e()*8-4))),gap:Math.max(20,a.gap+Math.round(e()*40-15))}))}function gi(t,e=1){const r=Te[t],a=pe(e),i=$i(r,a).map(({prop:o,side:l,rot:h,top:d,gap:f},m)=>{const g=l==="L"?`calc(50% - 280px - ${f+o.w}px)`:`calc(50% + 280px + ${f}px)`,p=Ve(o,m+10);return`<div class="fp${p.cls}" style="left:${g};top:${d.toFixed(1)}%;width:${o.w}px;rotate:${h.toFixed(1)}deg${p.style}">${o.svg}${o.extra??""}</div>`}).join(""),n=ki(r,a).map(({prop:o,at:l,rot:h,dx:d,dy:f},m)=>{const g=Ve(o,m),p=l==="tc"?`;left:calc(50% - ${o.w/2}px)`:"";return`<div class="tp at-${l}${g.cls}" style="width:${o.w}px;rotate:${h.toFixed(1)}deg;translate:${d}px ${f}px${p}${g.style}">${o.svg}${o.extra??""}</div>`}).join("");return`<div class="floor">${r.under??""}${i}</div>
    <div class="scene-column"><div class="scene-table">${r.onTable??""}${n}<div class="lamp"></div></div></div>
    ${r.over??""}`}const jr="durak.best",s={screen:"title",run:null,setup:null,shop:null,pickOptions:[],selected:null,busy:!1,message:null,messageUntil:0,info:null,cheatUsed:!1,cheatMode:!1,peekBout:null,rewards:null,menuOpen:!1,rulesOpen:!1,stalled:!1,resumeScreen:null,tip:null,intro:null,meet:null,tophatUsed:!1,bossWin:null,bossFlash:!1};let M,z=!1,J,We=null,de=1;const Ze=()=>{de=Math.floor(Math.random()*2**31)};function kn(t){M=t,J=document.createElement("div"),J.id="scene",J.setAttribute("aria-hidden","true"),t.before(J),M.addEventListener("click",ji),M.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("visibilitychange",()=>document.hidden?mr():yr()),u()}const rt=()=>s.setup?.table??null;function S(t,e=1600){s.message=t,s.messageUntil=Date.now()+e,window.setTimeout(()=>{Date.now()>=s.messageUntil&&s.message===t&&(s.message=null,u())},e+20)}function Gt(){return it(jr,0)}function bi(t){t>Gt()&&Zt(jr,t)}const Ce="durak.stage",Sr="durak.unlocked";function it(t,e){return Number(Ut(t))||e}function Zt(t,e){St(t,String(e))}let Z=Math.min(j,it(Sr,1)),x=Math.min(Z,it(Ce,1)),Y=null;const Ct="durak.endlessBest";let zt=0;function Ye(t){x=Math.max(1,Math.min(j,t)),x<=Z&&Zt(Ce,x),b.click(),u()}function mi(t){t<Z||t>=j||(Z=t+1,Y=Z,Zt(Sr,Z),x=Z,Zt(Ce,x))}const Wt=()=>s.menuOpen||!!s.meet||qe||K||s.screen!=="table";function yi(){const t=rt();!s.stalled||!t||Wt()||(s.stalled=!1,s.busy=!1,Oe(t)||Yt())}function Je(){s.menuOpen=!1,s.rulesOpen=!1,u();const t=rt();!s.stalled||!t||s.screen!=="table"||(s.stalled=!1,s.busy=!1,Oe(t)||Yt())}function wi(){x>Z||(z=!1,Y=null,s.run=pr(x),s.resumeScreen=null,s.stalled=!1,s.setup=null,s.pickOptions=ua(s.run),s.screen="pick",zt=it(Ct,0),s.intro=ha()?null:0,u())}function Bt(t=!1){const e=s.run;Ze(),s.setup=ka(e),s.selected=null,s.cheatUsed=!1,s.cheatMode=!1,s.tophatUsed=!1,s.bossWin=null,s.bossFlash=!1,Zr(),s.peekBout=null,s.rewards=null,s.info=null,s.busy=!1,s.stalled=!1,s.screen="table",yt("table");const r=ia[s.setup.opponent.icon];s.meet=r?{line:t?r.rematch:r.intro[Math.floor(Math.random()*r.intro.length)],rematch:t}:null,s.meet?(s.setup.boss?b.bossMeet():b.meet(),u()):Tr()}function Tr(){const t=s.run,e=s.setup;s.meet=null;const r=pa(t);r?S(`Круг ${t.circle+1}: ${r.charAt(0).toLowerCase()}${r.slice(1)}`,3200):S(e.table.attacker===0?"Вы ходите первым":`${e.opponent.name} ходит первым`),u(),Yt()}function xi(t,e){e.type==="attack"?ir(t,e.card):e.type==="defend"?ke(t,e.pair,e.card):e.type==="transfer"?$e(t,e.card):e.type==="take"?nr(t):ge(t)}function Yt(){const t=s.setup,e=rt();if(!t||!e||e.phase==="over"||Q(e)!==1)return;s.busy=!0,u();const r=e.phase==="defend"?750:e.bout.length?600:850;window.setTimeout(()=>{if(!(s.setup!==t||e.phase==="over")){if(Wt()){s.stalled=!0;return}xi(e,ta(e,t.level,s.run.rnd)),R()}},r)}async function R(){const t=rt();if(!t)return;const e=s.setup.opponent.name,r=t.events.splice(0);for(const a of r)a.type==="attack"?b.card():a.type==="defend"?(b.beat(a.trump),a.trump&&pn()):a.type==="transfer"?(b.transfer(),S(a.seat===1?`${e} переводит!`:"Перевод!")):a.type==="take"?(b.take(),S(a.seat===1?`${e} забирает ${Xe(a.count)}`:`Вы забрали ${Xe(a.count)}`)):a.type==="bito"?b.bito():a.type==="trump"&&S(`Козырь теперь ${zr[a.suit]} ${Ur[a.suit]}`,2e3);if(r.some(a=>a.type==="bito")&&await fn(),s.busy=!1,s.selected=null,t.phase==="over"){vi(t);return}s.setup.boss&&t.deck.length===0&&Mi(),u(),Oe(t)||Yt()}function Oe(t){return Q(t)!==0||t.attacker!==0||!(t.phase==="attack"&&t.bout.length>0||t.phase==="pickup")||or(t).length>0?!1:(s.busy=!0,u(),window.setTimeout(()=>{if(!(rt()!==t||t.phase==="over")){if(Wt()){s.stalled=!0;return}ge(t),R()}},650),!0)}function vi(t){const e=s.run,r=s.setup.boss;Zr();const a=$a(e,t);if(ga(e,t.result,a),e.over&&!z&&H(e)?e.wins>it(Ct,0)&&Zt(Ct,e.wins):e.over&&!z&&bi(e.wins),e.over==="won"&&!z&&mi(e.stage),e.over&&!z&&H(e)&&A.submitScore(Math.max(e.wins,pt())),yt("table"),t.result==="win"&&r){s.bossWin={boss:r,rewards:e.over?[]:ba(e,r),taken:null},s.bossFlash=!0,b.bossDefeat(),u(),window.setTimeout(()=>{rt()===t&&(s.bossFlash=!1,s.rewards=a,u(),a.forEach((i,n)=>window.setTimeout(()=>b.coin(n+3),1400+n*260)))},1e3);return}s.rewards=a,t.result==="lose"?b.lose():b.win(),u(),a.forEach((i,n)=>window.setTimeout(()=>b.coin(n+2),500+n*260))}let ht=null;function Mi(){ht===null&&(ht=window.setInterval(()=>{Wt()||b.heartbeat()},1300))}function Zr(){ht!==null&&(window.clearInterval(ht),ht=null)}function Xe(t){const e=t%10,r=t%100;return e===1&&r!==11?`${t} карту`:e>=2&&e<=4&&(r<12||r>14)?`${t} карты`:`${t} карт`}function ji(t){Ca();const e=t.target.closest("[data-act]");if(!e)return;const r=e.dataset.act,a=e.dataset.arg??"";if(s.tip&&r!=="mute"&&(s.tip=null),!K)switch(r){case"new":return wi();case"stagePrev":return Ye(x-1);case"stageNext":return Ye(x+1);case"tipOk":return u();case"tipsToggle":return da(),u();case"introNext":return s.intro!==null&&s.intro<At.length-1?s.intro++:(s.intro=null,Be()),b.click(),u();case"introSkip":return s.intro=null,Be(),u();case"menu":return s.screen="title",s.setup=null,s.resumeScreen=null,u();case"openMenu":return s.menuOpen=!0,s.info=null,b.click(),u();case"closeMenu":return Je();case"rules":return s.rulesOpen=!s.rulesOpen,u();case"toTitle":return s.resumeScreen=s.screen,s.menuOpen=!1,s.rulesOpen=!1,s.screen="title",u();case"continue":return s.resumeScreen?(s.screen=s.resumeScreen,s.resumeScreen=null,Je()):Zi();case"mute":return Za(),u();case"pick":return s.run.jokers.push(a),Bt();case"card":return qi(a);case"pair":return Ei(Number(a));case"transfer":return Li();case"take":return Ri();case"finish":return Ai();case"info":{const[i,n]=a.split(":");return s.info={kind:i,id:n},u()}case"closeInfo":return s.info=null,u();case"use":return Hi();case"toShop":return void tr(()=>{Ze(),s.shop=Ma(s.run),Ot=!1,s.screen="shop",s.setup=null,yt("shop"),u()});case"replay":return void tr(()=>Bt(!0));case"revive":return void Si();case"freeReroll":return void Ti();case"board":return void Or();case"boardClose":return G=null,u();case"login":return void Ci();case"bossReward":{const i=s.bossWin;return!i||i.taken||!i.rewards.includes(a)?void 0:(ma(s.run,i.boss,a),i.taken=a,yt("table"),b.buy(),u())}case"meetGo":return b.click(),Tr();case"toEnd":return s.screen="end",s.setup=null,u();case"nextTable":return Bt();case"buy":{const i=s.shop.items[Number(a)];return Se(s.run,i)?(ja(s.run,i),b.buy()):b.error(),u()}case"reroll":return Sa(s.run,s.shop),b.card(),u();case"sell":return Ta(s.run,a),b.coin(0),u()}}let K=!1,qe=!1,Qe=0,Ot=!1,G="closed";A.onPause(t=>{qe=t,t?mr():(yr(),yi())});async function tr(t){Qe++,Qe>2&&!z&&(K=!0,u(),await A.interstitial(),K=!1),t()}async function Si(){const t=s.run;if(!t||t.reviveUsed)return;K=!0,u();const e=await A.rewarded();K=!1,e&&(ya(t),b.buy(),S("Жизнь возвращена!"),yt("table")),u()}async function Ti(){if(!s.run||!s.shop||Ot)return;K=!0,u();const t=await A.rewarded();K=!1,t&&(Ot=!0,va(s.run,s.shop),b.card(),yt("shop")),u()}const he="durak.run";function yt(t){const e=s.run;!e||z||(e.over?St(he,null):St(he,JSON.stringify(wa(e,t,t==="shop"?s.shop:null))))}function Cr(){try{const t=Ut(he),e=t?JSON.parse(t):null;return e?.v===1?e:null}catch{return null}}function Zi(){const t=Cr();if(!t)return;const{run:e,at:r,shop:a}=xa(t);s.run=e,z=!1,zt=it(Ct,0),r==="shop"&&a?(Ze(),s.shop=a,Ot=!1,s.screen="shop",u()):Bt()}async function Or(){G="loading",u(),G=await A.leaderboard(),u()}async function Ci(){if(await A.login()){const t=pt();t>0&&await A.submitScore(t)}await Or()}function Oi(){return""}function nt(){const t=rt();return!t||s.busy||t.phase==="over"||s.rewards||Q(t)!==0?null:t}function qi(t){const e=nt();if(!e)return;const r=e.hands[0].find(n=>n.id===t);if(!r)return;if(s.cheatMode)return cr(e,0,r)&&(s.cheatUsed=!0,b.card(),S("Карта подменена")),s.cheatMode=!1,u();if(e.phase==="attack"||e.phase==="pickup"){Vt(e,r)?(ir(e,r),R()):er(t,e.bout.length>=ue||tt(e).length>=e.hands[1].length?"Больше подкидывать нельзя":"Подкинуть можно только достоинства со стола");return}const a=e.bout.map((n,o)=>o).filter(n=>wt(e,n,r)),i=xt(e,r);if(a.length===0&&!i)return er(t,"Этой картой не побить");if(a.length===1&&!i)return ke(e,a[0],r),void R();if(a.length===0&&i)return $e(e,r),void R();s.selected=s.selected===t?null:t,u()}function Ei(t){const e=nt();if(!e||!s.selected)return;const r=e.hands[0].find(a=>a.id===s.selected);r&&wt(e,t,r)&&(ke(e,t,r),R())}function Li(){const t=nt(),e=t?.hands[0].find(r=>r.id===s.selected);t&&e&&xt(t,e)&&($e(t,e),R())}function Ri(){const t=nt();!t||t.phase!=="defend"||(nr(t),S("Вы берёте"),R())}function Ai(){const t=nt();!t||t.attacker!==0||(t.phase==="pickup"||t.phase==="attack"&&t.bout.length>0&&tt(t).length===0)&&(ge(t),R())}function er(t,e){b.error(),S(e),u(),M.querySelector(`.hand [data-card="${t}"]`)?.animate([{translate:"0"},{translate:"-6px"},{translate:"6px"},{translate:"-3px"},{translate:"0"}],{duration:260})}function rr(t,e){return e.rank+(I(t,e)?9:0)}function qr(t,e){return t.hands[0].filter(r=>!I(t,r)).sort((r,a)=>r.rank-a.rank).slice(0,e)}function ft(t,e){const r=nt();if(!r)return!1;if(t==="trophy")return mt(s.run,"tophat")&&!s.tophatUsed;if(t==="joker")return e==="cheat"&&!s.cheatUsed&&r.deck.length>=2;switch(e){case"changeTrump":return!0;case"reset":return r.deck.length>=3&&qr(r,2).length>0;case"peek":return s.peekBout!==r.bouts;case"parry":return r.phase==="defend"}}function Hi(){const t=s.info,e=nt();if(!t||!e||!ft(t.kind,t.id))return;if(s.info=null,t.kind==="trophy"){const a=C.map(i=>e.hands[0].filter(n=>n.suit===i).length);return Ae(e,C[a.indexOf(Math.max(...a))]),s.tophatUsed=!0,b.transfer(),void R()}if(t.kind==="joker")return s.cheatMode=!0,S("Выберите карту, которую сбросить",3e3),u();const r=s.run;switch(r.consumables.splice(r.consumables.indexOf(t.id),1),t.id){case"changeTrump":{const a=C.map(i=>e.hands[0].filter(n=>n.suit===i).length);Ae(e,C[a.indexOf(Math.max(...a))]);break}case"reset":for(const a of qr(e,2))cr(e,0,a);b.card(),S("Сброшено и добрано");break;case"peek":s.peekBout=e.bouts,S("Видны все карты соперника до конца отбоя",2200);break;case"parry":{const a=tt(e).sort((i,n)=>rr(e,n.attack)-rr(e,i.attack))[0];Qr(e,e.bout.indexOf(a)),b.bito(),S("Карта ушла в отбой");break}}R()}let Er=new Set,fe=new Set;function B(t){return fe.add(t),Er.has(t)?"":"anim"}function u(){const t=dn(),e=M.dataset.screen===s.screen,r=e?M.scrollTop:0;M.dataset.screen=s.screen,fe=new Set,Pi(),s.tip&&s.tip.screen!==s.screen&&(s.tip=null),s.tip||(s.tip=Bi()),M.innerHTML=Ii(),M.scrollTop=r,Er=fe,s.tip?.target&&M.querySelector(s.tip.target)?.classList.add("coach-target");const a=rt();A.gameplay(s.screen==="table"&&!!a&&a.phase!=="over"&&!s.menuOpen&&!s.meet&&!s.rewards&&!s.bossFlash&&!K&&!qe),e&&hn(t)}function Bi(){if(!fr()||s.menuOpen||s.info||s.rulesOpen||s.rewards||s.meet)return null;const t=i=>{const n=fa(i);return n?{...n,screen:s.screen}:null};if(s.screen==="shop")return t("shop");if(s.screen!=="table"||!s.setup||!s.run)return null;const e=s.setup.table;if(e.phase==="over")return null;const r=i=>ca(i),a=!s.busy&&Q(e)===0;return H(s.run)&&!r("endless")?t("endless"):s.setup.boss&&!r("boss")?t("boss"):!r("trump")&&e.trumpRevealed?t("trump"):a&&e.phase==="attack"&&e.bout.length===0&&!r("attack")?t("attack"):a&&e.phase==="defend"&&!r("defend")?t("defend"):a&&e.phase==="attack"&&e.bout.length>0&&!r("throw")?t("throw"):a&&e.phase==="pickup"&&!r("pickup")?t("pickup"):a&&e.bouts>=2&&s.run.jokers.length>0&&!r("belt")?t("belt"):a&&e.deck.length===0&&!r("endgame")?t("endgame"):null}function Lr(){const t=s.tip;return t?`<div class="coach ${t.place} ${B(`tip:${t.id}`)}" role="status">
    <span class="coach-icon">${k("bulb")}</span>
    <div class="coach-text"><b>${t.title}</b><span>${t.text}</span></div>
    <button class="btn small" data-act="tipOk">Понятно</button>
  </div>`:""}function Fi(){if(s.intro===null)return"";const t=At[s.intro],e=s.intro===At.length-1,r=t.art==="cards"?`<div class="intro-cards">${q({id:"i1",suit:"S",rank:9},"")}${q({id:"i2",suit:"S",rank:12},"trump")}</div>`:t.art==="hearts"?`<div class="intro-hearts">${Array.from({length:4},()=>`<span class="heart">${O("H")}</span>`).join("")}</div>`:`<span class="medal joker huge">${k("sixKiller")}</span>`,a=At.map((i,n)=>`<i class="${n===s.intro?"cur":""}"></i>`).join("");return`<div class="overlay ${B("intro")}">
    <div class="result intro">
      ${r}
      <h2 class="display">${t.title}</h2>
      <p>${t.text}</p>
      <div class="stage-pips intro-dots">${a}</div>
      <button class="btn primary big" data-act="introNext">${e?"Начать":"Дальше"}</button>
      ${e?"":'<button class="btn ghost" data-act="introSkip">Пропустить</button>'}
    </div>
  </div>`}function Pi(){const t=s.screen==="table"&&s.setup?s.setup.opponent.icon:s.screen==="shop"?"shop":null,e=pi(t)?t:null,r=e?`${e}:${de}`:null;if(r!==We){if(We=r,J.className=e?`on scene-${e}`:"",J.innerHTML=e?gi(e,de):"",J.removeAttribute("style"),e)for(const[a,i]of Object.entries(ui(e)))J.style.setProperty(a,i);document.body.classList.toggle("scened",!!e)}}function Ii(){switch(s.screen){case"title":return Gi();case"pick":return Vi();case"table":return Di();case"shop":return nn();case"end":return cn()}}const V='<i class="coin"></i>';function Ee(){return`<button class="icon-btn" data-act="mute" aria-label="Звук">${k(ce()?"soundOff":"soundOn")}</button>`}function Ni(){return`<button class="icon-btn" data-act="openMenu" aria-label="Меню">${k("menu")}</button>`}function X(t,e,r=""){return`<span class="medal ${e} ${r}">${k(t)}</span>`}function Jt(){return`<div class="orn" aria-hidden="true"><i></i>${O("S")}${O("H")}${O("D")}${O("C")}<i></i></div>`}function vt(t,e=""){return`<span class="avatar ${e}">${Ea(t)}</span>`}function qt(t){return t%10===1&&t%100!==11?"победа":t%10>=2&&t%10<=4&&(t%100<12||t%100>14)?"победы":"побед"}const _i=["Ходите картой — соперник бьёт старшей той же масти или козырем.","Подкидывать можно карты того же достоинства, что уже лежат на столе.","Нечем побить — «Беру». Всё побито — «Бито», и ход переходит.","Добирают до 6 карт. Колода кончилась — кто первым остался без карт, тот выиграл.","Забег: 3 круга, в каждом 2 стола и босс. Проиграли стол — минус жизнь, стол переигрывается.","За победу — монеты. В лавке на них покупают джокеров (действуют всегда) и приёмы (один раз).","Нажмите на джокера или приём внизу экрана, чтобы прочитать его и применить.","Прошли забег — открывается следующая ступень: она сохраняет все трудности прошлых и добавляет одну новую."];function pt(){return it(Ct,0)}function Rr(){return`<ol class="rules">${_i.map(t=>`<li>${t}</li>`).join("")}</ol>`}function Gi(){const t=Gt(),e=!!s.run&&!s.run.over&&!!s.resumeScreen||!s.run&&!!Cr(),a=x>Z?`<button class="btn big" disabled>${k("lock")}Пройдите ступень ${Math.min(x-1,me)}</button>`:`<button class="btn ${e?"":"primary"} big" data-act="new">Новый забег</button>`,i=e?`<button class="btn primary big" data-act="continue">${k("play")}Продолжить забег</button>${a}`:a;return`
  <div class="screen title-screen">
    <div class="title-top">${Ee()}</div>
    <div class="logo">
      <div class="logo-cards">
        ${q({id:"l1",suit:"S",rank:14},"logo-card a")}
        ${q({id:"l2",suit:"H",rank:6},"logo-card b trump")}
        ${q({id:"l3",suit:"D",rank:13},"logo-card c")}
      </div>
      <h1 class="display">Козырь в&nbsp;рукаве</h1>
      ${Jt()}
      <p class="tagline">Дурак-рогалик: джокеры ломают правила, боссы — тоже</p>
    </div>
    <div class="title-actions">
      ${Ui()}
      ${i}
      ${x===j&&Z>=j&&A.hasLeaderboard?`<button class="btn ghost" data-act="board">${k("trophy")}Таблица рекордов</button>`:""}
      <button class="btn ghost" data-act="rules">${k("book")}Как играть</button>
    </div>
    <p class="muted small">${x===j?`${pt()?`Рекорд: ${pt()} ${qt(pt())} · `:""}Круги без конца · 4 жизни`:`${t?`Лучший забег: ${t} ${qt(t)} · `:""}3 круга · по 2 стола и босс · ${et(x)} жизни`}</p>
    ${Oi()}
    ${G!=="closed"?zi():""}
    ${s.rulesOpen?`<div class="sheet-backdrop ${B("rules")}" data-act="rules"></div>
      <div class="sheet ${B("rules")}"><div class="sheet-grip"></div><h3 class="display sm">Как играть</h3>${Rr()}
      <div class="sheet-actions"><button class="btn primary" data-act="rules">Понятно</button></div></div>`:""}
  </div>`}function zi(){const t=B("board");let e;G==="loading"?e='<p class="muted center">Загружаем…</p>':!G||G==="closed"?e='<p class="muted center">Таблица рекордов сейчас недоступна — попробуйте позже.</p>':G.length===0?e='<p class="muted center">Пока пусто — станьте первым!</p>':e=`<ol class="board">${G.map(a=>`<li class="${a.me?"me":""}"><span class="b-rank">${a.rank}</span>
    <span class="b-name">${a.name}</span><b>${a.score}</b></li>`).join("")}</ol>`;const r=A.authorized()?"":'<p class="muted small center">Войдите в аккаунт Яндекса, чтобы ваш рекорд попал в таблицу</p><button class="btn primary" data-act="login">Войти</button>';return`<div class="sheet-backdrop ${t}" data-act="boardClose"></div>
    <div class="sheet ${t}">
      <div class="sheet-grip"></div>
      <h3 class="display sm">Таблица рекордов</h3>
      <p class="muted small center">Бесконечный режим · побед за столом</p>
      ${e}
      <div class="sheet-actions">${r}<button class="btn" data-act="boardClose">Закрыть</button></div>
    </div>`}function Ui(){const t=x===j,e=t?{...se}:at[x-1],r=x>Z,a=[...at.map(i=>i.n),j].map(i=>`<i class="${i===x?"cur":""} ${i>Z?"locked":""} ${i===j?"endless":""}"></i>`).join("");return`<div class="stage-picker ${r?"locked":""}">
    <button class="icon-btn" data-act="stagePrev" aria-label="Предыдущая ступень" ${x<=1?"disabled":""}>${k("back")}</button>
    <div class="stage-info">
      <small>${r?k("lock"):""}${t?"После всех ступеней":`Ступень ${x} из ${me}`}</small>
      <b>${e.name}</b>
      <span>${x===1||t?e.rule:`+ ${e.rule}`}</span>
      <div class="stage-pips">${a}</div>
    </div>
    <button class="icon-btn flip" data-act="stageNext" aria-label="Следующая ступень" ${x>=j?"disabled":""}>${k("back")}</button>
  </div>`}function Vi(){return`
  <div class="screen pick-screen">
    <div class="topbar"><button class="icon-btn" data-act="toTitle" aria-label="В меню">${k("back")}</button>${Ee()}</div>
    <h2 class="display">Первый джокер</h2>
    ${Jt()}
    <p class="muted">Джокер действует весь забег. Остальных можно купить в лавке между столами.</p>
    <div class="joker-row">
      ${s.pickOptions.map(t=>Ar(t,`data-act="pick" data-arg="${t}"`)).join("")}
    </div>
    ${Fi()}
  </div>`}function Ar(t,e){const r=L[t];return`<button class="joker-card" ${e}>
    <span class="jc-frame">
      ${X(r.icon,"joker","big")}
      <b class="jc-name">${r.name}</b>
      <span class="jc-desc">${r.desc}</span>
    </span>
  </button>`}function Hr(){const t=s.run,e=et(t.stage),r=Array.from({length:e},(i,n)=>`<span class="heart ${n<t.hearts?"":"lost"}">${O("H")}</span>`).join(""),a=t.step===2?"Босс":`Стол ${t.step+1}`;return`<header class="hud">
    ${Ni()}
    <span class="hearts">${r}</span>
    <span class="coins">${V}${t.coins}</span>
    <span class="where"><small>${H(t)?"Бесконечный":`Ступень ${t.stage}`}</small>Круг ${H(t)?t.circle+1:`${Math.min(t.circle+1,gt)}/${gt}`} · ${a}</span>
    ${Ee()}
  </header>`}function Di(){const t=s.setup,e=t.table,r=s.run,a=s.peekBout===e.bouts,n=!s.busy&&e.phase!=="over"&&Q(e)===0&&!s.rewards&&!s.cheatMode&&(e.trumpRevealed||!e.mods.hiddenTrump),o=e.hands[0].find(p=>p.id===s.selected)??null,l=t.boss?Me(t):$t[Math.min(r.circle,$t.length-1)],h=e.hands[1].map(p=>a||e.knownOpponent.has(p.id)?q(p,jt(e,p,1)):Ir(p.id)).join(""),d=e.bout.map((p,v)=>{const Et=!!o&&wt(e,v,o);return`<div class="pair ${Et?"target":""}" ${Et?`data-act="pair" data-arg="${v}"`:""}>
      ${q(p.attack,jt(e,p.attack,0))}
      ${p.defense?q(p.defense,`${jt(e,p.defense,0)} defense`):""}
      ${p.parried?`<span class="parried">${k("parry")}</span>`:""}
    </div>`}).join(""),f=ln(e,e.hands[0]),m=f.length>6?Math.min(46,(f.length-6)*8+14):8,g=f.map(p=>{let v=jt(e,p,0);return n&&Ji(e,p)&&(v+=" playable"),s.cheatMode&&(v+=" playable"),p.id===s.selected&&(v+=" selected"),q(p,v,`data-act="card" data-arg="${p.id}"`)}).join("");return`
  <div class="screen table-screen ${t.boss?"boss":""} ${ht!==null?"tense":""}">
    ${Hr()}
    <section class="opp">
      <div class="opp-head">
        ${vt(t.opponent.icon,t.boss?"boss":"")}
        <div class="opp-name"><b>${t.opponent.name}</b>${l?`<small>${l}</small>`:""}</div>
        <span class="count">${e.hands[1].length}<i class="mini-back"></i></span>
      </div>
      <div class="opp-hand">${h}</div>
    </section>
    <section class="mid">
      <div class="deck-area">${Yi(e)}</div>
      <div class="bout">${d||`<span class="empty-table">${Wi(e)}</span>`}</div>
    </section>
    <div class="status">${Xi(e)}</div>
    <div class="actions">${Qi(e,o)}</div>
    <section class="hand ${n?"hinting":""}" style="--overlap:-${m}px">${g}</section>
    ${tn()}
    ${Lr()}
    ${s.info?rn():""}
    ${s.menuOpen?Br():""}
    ${s.bossFlash?'<div class="boss-flash"></div>':""}
    ${s.rewards?an(e):""}
    ${s.meet?Ki():""}
  </div>`}function Ki(){const t=s.setup,e=s.run,r=!!t.boss,a=s.meet.line.split(" ").map((o,l)=>`<span style="animation-delay:${350+l*70}ms">${o}</span>`).join(" "),i=r?`Босс ${H(e)?"":`круга ${e.circle+1}`}`.trim():e.step===0&&e.circle===0?"Первый стол":`Стол ${e.step+1}`,n=r?Me(t):$t[Math.min(e.circle,$t.length-1)];return`<div class="overlay meet-overlay ${B("meet")}">
    <div class="meet ${r?"boss":""}">
      ${r?'<div class="meet-ribbon">Босс</div>':""}
      ${vt(t.opponent.icon,`meet-face ${r?"boss":""}`)}
      <small class="meet-sub">${s.meet.rematch?"Реванш":i}</small>
      <h2 class="display">${t.opponent.name}</h2>
      <div class="meet-bubble"><p>${a}</p></div>
      ${n?`<div class="meet-rule">${k(r?"alert":"transfer")}<span>${n}</span></div>`:""}
      <button class="btn primary big" data-act="meetGo">${r?"Принять вызов":"Сыграем!"}</button>
    </div>
  </div>`}function Wi(t){return`Колода: ${t.deck.length} · Бито: ${t.discard.length}`}function Yi(t){const e=t.trumpRevealed,r=t.trumpCard?e?q(t.trumpCard,"bottom-card"):Ir(t.trumpCard.id,"bottom-card"):"",a=t.deck.length>1?`<div class="deck">${t.deck.length}</div>`:t.deck.length===0?'<div class="deck empty">—</div>':"",i=e?`<span class="${ee(t.trumpSuit)?"red":""}">${O(t.trumpSuit)}</span>`:"<b>?</b>",n=t.mods.seats[0].extraTrump,o=s.run&&mt(s.run,"lantern")&&t.deck.length>1?q(t.deck[t.deck.length-1],`deck-top ${jt(t,t.deck[t.deck.length-1],0)}`):"";return`<div class="deck-wrap">${r}${a}${o}</div>
    <div class="trump-badge">Козырь ${i}</div>
    ${n?`<div class="trump-badge second">2-я масть <span class="${ee(n)?"red":""}">${O(n)}</span></div>`:""}`}function Ji(t,e){return t.phase==="defend"?t.bout.some((r,a)=>wt(t,a,e))||xt(t,e):Vt(t,e)}function Xi(t){if(s.message&&Date.now()<s.messageUntil)return s.message;const e=s.setup.opponent.name;return t.phase==="over"?"":s.cheatMode?"Выберите карту, которую сбросить":Q(t)===1?s.busy?`${e} думает…`:`Ход: ${e}`:t.phase==="defend"?s.selected?"Нажмите на карту на столе, которую бьёте":"Отбивайтесь или берите":t.phase==="pickup"?`${e} берёт — подкиньте вдогонку`:t.bout.length?"Подкиньте или скажите «Бито»":"Ваш ход — положите карту"}function Qi(t,e){if(s.busy||t.phase==="over"||s.rewards||Q(t)!==0)return"";const r=[];return t.phase==="defend"?(e&&xt(t,e)&&r.push(`<button class="btn" data-act="transfer">${k("transfer")}Перевести</button>`),r.push('<button class="btn danger" data-act="take">Беру</button>')):t.phase==="pickup"?r.push('<button class="btn" data-act="finish">Пусть берёт</button>'):t.bout.length>0&&r.push('<button class="btn primary" data-act="finish">Бито</button>'),r.join("")}function tn(){const t=s.run,e=Array.from({length:_t(t)},(i,n)=>{const o=t.jokers[n];if(!o)return'<span class="slot empty"></span>';const l=o==="cheat"&&s.cheatUsed,h=ft("joker",o);return`<button class="slot joker ${l?"used":""} ${h?"ready":""}" data-act="info" data-arg="joker:${o}" aria-label="${L[o].name}">${k(L[o].icon)}</button>`}).join(""),r=Array.from({length:It},(i,n)=>{const o=t.consumables[n];return o?`<button class="slot consumable ${ft("consumable",o)?"ready":""}" data-act="info" data-arg="consumable:${o}" aria-label="${U[o].name}">${k(U[o].icon)}</button>`:'<span class="slot empty"></span>'}).join(""),a=t.trophies.length?`<button class="slot trophy ${ft("trophy","tophat")?"ready":""}" data-act="info" data-arg="trophy:all" aria-label="Трофеи">${k("trophy")}<i class="slot-count">${t.trophies.length}</i></button>`:"";return`<footer class="belt"><div class="belt-group">${e}</div><div class="belt-group">${a}${r}</div></footer>`}function en(){const t=s.run,e=B("info:trophy"),r=t.trophies.map(i=>`<div class="trophy-row">${X(Rt[i].icon,"joker")}
    <div><b>${Rt[i].name}</b><span>${Rt[i].desc}</span></div></div>`).join(""),a=mt(t,"tophat")?ft("trophy","tophat")?'<button class="btn primary" data-act="use">Сменить козырь</button>':`<span class="muted small">${s.tophatUsed?"Цилиндр уже использован за этот стол":"Цилиндр — в свой ход"}</span>`:"";return`<div class="sheet-backdrop ${e}" data-act="closeInfo"></div>
    <div class="sheet ${e}">
      <div class="sheet-grip"></div>
      <div class="sheet-head">${X("trophy","joker","big")}<div><span class="pill">Трофеи боссов</span><h3>Ваши трофеи</h3></div></div>
      <div class="trophy-list">${r}</div>
      <div class="sheet-actions">${a}<button class="btn" data-act="closeInfo">Закрыть</button></div>
    </div>`}function rn(){const t=s.info;if(t.kind==="trophy")return en();const e=t.kind==="joker"?L[t.id]:U[t.id],r=t.kind,a=ft(t.kind,t.id),i=t.kind==="consumable"||t.id==="cheat";let n="";i&&(n=a?`<button class="btn primary" data-act="use">${t.kind==="joker"?"Подменить карту":"Применить"}</button>`:`<span class="muted small">${t.id==="cheat"&&s.cheatUsed?"Уже использован за этот стол":"Сейчас применить нельзя"}</span>`);const o=B(`info:${t.id}`);return`<div class="sheet-backdrop ${o}" data-act="closeInfo"></div>
    <div class="sheet ${o}">
      <div class="sheet-grip"></div>
      <div class="sheet-head">
        ${X(e.icon,r,"big")}
        <div><span class="pill ${t.kind}">${t.kind==="joker"?"Джокер · весь забег":"Приём · один раз"}</span><h3>${e.name}</h3></div>
      </div>
      <p class="sheet-desc">${e.desc}</p>
      <div class="sheet-actions">${n}<button class="btn" data-act="closeInfo">Закрыть</button></div>
    </div>`}function Br(){const t=B("menu");return`<div class="sheet-backdrop ${t}" data-act="closeMenu"></div>
    <div class="sheet menu-sheet ${t}">
      <div class="sheet-grip"></div>
      <h3 class="display sm">Пауза</h3>
      ${s.run?`<p class="muted small center">${Pr(s.run.stage)}</p>`:""}
      ${s.run&&!s.run.over&&(s.screen==="table"||s.screen==="shop")?Fr(s.run):""}
      <div class="menu-list">
        <button class="menu-row" data-act="closeMenu">${k("play")}<span>Продолжить</span></button>
        <button class="menu-row ${s.rulesOpen?"open":""}" data-act="rules">${k("book")}<span>Как играть</span></button>
        ${s.rulesOpen?Rr():""}
        <button class="menu-row" data-act="tipsToggle">${k("bulb")}<span>Подсказки</span><small>${fr()?"включены":"выключены"}</small></button>
        <button class="menu-row" data-act="mute">${k(ce()?"soundOff":"soundOn")}<span>Звук</span><small>${ce()?"выключен":"включён"}</small></button>
        <button class="menu-row" data-act="toTitle">${k("door")}<span>Выйти в меню</span><small>забег сохранится</small></button>
        
      </div>
    </div>`}function an(t){if(s.bossWin)return sn();const e=s.run,r=s.rewards,a=r.reduce((d,f)=>d+f.amount,0),i=t.result==="win"?"Победа!":t.result==="draw"?"Ничья":"Вы — дурак",n=t.result==="lose"?e.hearts>0?`Минус жизнь. Осталось ${e.hearts} из ${et(e.stage)}`:"Жизни кончились":t.result==="win"?`${s.setup.opponent.name} остаётся в дураках`:"Карты кончились у обоих разом";let o;const l=d=>`<button class="btn ${d?"primary big":"ghost"}" data-act="revive">${k("video")}${d?"Продолжить — вернуть жизнь":"Вернуть жизнь за рекламу"}</button>`;e.over==="lost"&&!e.reviveUsed?o=`<p class="muted small">Посмотрите рекламу — и забег продолжится</p>${l(!0)}<button class="btn ghost" data-act="toEnd">Итоги забега</button>`:e.over?o='<button class="btn primary big" data-act="toEnd">Итоги забега</button>':t.result==="lose"?o=`<button class="btn primary big" data-act="replay">Переиграть стол</button>${e.reviveUsed?"":l(!1)}`:o='<button class="btn primary big" data-act="toShop">В лавку</button>';const h=t.result==="win"?`<div class="burst" aria-hidden="true">${Array.from({length:14},(d,f)=>`<span style="--a:${f*25.7}deg;--d:${f%4*40}ms" class="${f%2?"red":""}">${O(C[f%4])}</span>`).join("")}</div>`:"";return`<div class="overlay ${B("result")}">
    <div class="result ${t.result}">
      ${h}
      ${vt(s.setup.opponent.icon,`result-face ${t.result}`)}
      <h2 class="display">${i}</h2>
      <p class="muted">${n}</p>
      ${r.length?`<ul class="receipt">
        ${r.map((d,f)=>`<li style="animation-delay:${500+f*260}ms"><span>${d.label}</span><i></i><b>+${d.amount}${V}</b></li>`).join("")}
      </ul>`:""}
      ${a?`<p class="total" style="animation-delay:${500+r.length*260}ms">Итого +${a}${V}</p>`:""}
      ${o}
    </div>
  </div>`}function sn(){const t=s.run,e=s.bossWin,r=s.rewards,a=r.reduce((f,m)=>f+m.amount,0),i=ye(e.boss),n=Array.from({length:26},(f,m)=>`<i style="--x:${m*37%100}%;--d:${m%9*120}ms;--t:${1600+m%5*220}ms;--r:${m%7*50-150}deg"></i>`).join(""),o=f=>{const m=e.taken===f,g=e.taken!==null&&!m,p=f==="trophy"?`${X(i.icon,"joker")}<div><small>Трофей босса</small><b>${i.name}</b><span>${i.desc}</span></div>`:f==="coins"?`<span class="medal joker">${V}</span><div><small>Трофей уже есть</small><b>+${$r} монет</b><span>Вместо второго ${i.name.toLowerCase()}</span></div>`:`<span class="medal consumable">${k("heartPlus")}</span><div><small>Отдышаться</small><b>Вернуть жизнь</b><span>Сейчас ${t.hearts} из ${et(t.stage)}</span></div>`;return`<button class="reward-tile ${m?"taken":""} ${g?"off":""}" data-act="bossReward" data-arg="${f}" ${e.taken?"disabled":""}>${p}${m?`<i class="taken-mark">${k("check")}</i>`:""}</button>`},l=e.rewards.length>0,h=!l||e.taken!==null,d=t.over?'<button class="btn primary big" data-act="toEnd">Итоги забега</button>':'<button class="btn primary big" data-act="toShop">В лавку</button>';return`<div class="overlay boss-win ${B("result")}">
    <div class="coin-rain" aria-hidden="true">${n}</div>
    <div class="result boss-defeat">
      <div class="defeat-face">
        ${vt(s.setup.opponent.icon,"result-face cracked")}
        <svg class="cracks" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M50 4 46 26 56 38 44 58 52 76 47 96"/><path d="M46 26 28 32 18 46"/><path d="M56 38 74 34 88 44"/>
          <path d="M44 58 26 66 14 62"/><path d="M52 76 70 80 82 92"/>
        </svg>
        <div class="stamp">Повержен</div>
      </div>
      <h2 class="display">Босс повержен!</h2>
      <div class="meet-bubble defeat"><p>${na[e.boss]}</p></div>
      ${r.length?`<ul class="receipt">
        ${r.map((f,m)=>`<li style="animation-delay:${1400+m*260}ms"><span>${f.label}</span><i></i><b>+${f.amount}${V}</b></li>`).join("")}
      </ul>`:""}
      ${a?`<p class="total" style="animation-delay:${1400+r.length*260}ms">Итого +${a}${V}</p>`:""}
      ${l?`<div class="rewards-choice">
        <small class="choice-title">${e.taken?"Награда получена":e.rewards.length>1?"Награда босса — выберите одно":"Награда босса"}</small>
        ${e.rewards.map(o).join("")}
      </div>`:""}
      ${h?d:""}
    </div>
  </div>`}function Fr(t){const e=[0,1,2].map(r=>{const a=r<t.step?"done":r===t.step?"cur":"todo",i=r===2,n=i?D[Kt(t,t.circle)]:ve({...t,step:r}),o=i&&t.step<2;return`<div class="cp-node ${a} ${i?"boss":""} ${o?"hidden":""}">
      <span class="cp-wrap">${vt(n.icon,"cp-face")}${a==="done"?`<i class="cp-check">${k("check")}</i>`:""}${o?'<i class="cp-q">?</i>':""}</span>
      <small>${i?"Босс":`Стол ${r+1}`}</small>
    </div>`}).join('<span class="cp-line"></span>');return`<div class="circle-path"><small class="cp-title">Круг ${t.circle+1}${H(t)?"":` из ${gt}`}</small>
    <div class="cp-row">${e}</div></div>`}function nn(){const t=s.run,e=s.shop,r=e.items.map((d,f)=>{const m=d.kind==="joker"?L[d.id]:U[d.id],g=Se(t,d),p=d.kind==="joker"?t.jokers.length>=_t(t):t.consumables.length>=It;return`<div class="shop-item ${d.sold?"sold":""} ${d.kind}">
      ${X(m.icon,d.kind)}
      <div class="shop-text"><span class="pill ${d.kind}">${d.kind==="joker"?"Джокер":"Приём"}</span><b>${m.name}</b><span>${m.desc}</span></div>
      ${d.sold?'<span class="sold-mark">Куплено</span>':`<button class="btn price ${g?"primary":""}" data-act="buy" data-arg="${f}" ${g?"":"disabled"}>${p?"Нет места":`${d.price}${V}`}</button>`}
    </div>`}).join(""),a=t.jokers.map(d=>`<div class="mine">${X(L[d].icon,"joker","sm")}<span>${L[d].name}</span>
      <button class="btn small" data-act="sell" data-arg="${d}">Продать +${gr(d)}${V}</button></div>`).join("")||'<p class="muted small">Пока нет</p>',i=t.consumables.map(d=>`<div class="mine">${X(U[d].icon,"consumable","sm")}<span>${U[d].name}</span></div>`).join("")||'<p class="muted small">Пока нет</p>',n=t.step===2?Kt(t,t.circle):null,o=n?D[n]:null,l=o?{name:o.name,icon:o.icon}:ve(t),h=n?Me({boss:n,bossExtra:kr(t,n)}):$t[Math.min(t.circle,$t.length-1)];return`
  <div class="screen shop-screen">
    ${Hr()}
    <h2 class="display">Лавка</h2>
    ${Jt()}
    <div class="shop-items">${r}</div>
    <div class="reroll-row">
      <button class="btn ghost" data-act="reroll" ${t.coins>=e.rerollCost?"":"disabled"}>${k("reroll")}Обновить — ${e.rerollCost}${V}</button>
      ${Ot?"":`<button class="btn ghost" data-act="freeReroll">${k("video")}Бесплатно</button>`}
    </div>
    <div class="panel">
      <h3>Ваши джокеры <small>${t.jokers.length}/${_t(t)}</small></h3>
      <div class="mine-list">${a}</div>
      <h3>Приёмы <small>${t.consumables.length}/${It}</small></h3>
      <div class="mine-list">${i}</div>
    </div>
    ${Fr(t)}
    <div class="next ${o?"boss":""}">
      ${vt(l.icon,o?"boss":"")}
      <div><small>${o?"Босс круга":"Следующий стол"}</small><b>${l.name}</b>${h?`<span>${h}</span>`:""}</div>
    </div>
    <button class="btn primary big" data-act="nextTable">За стол</button>
    ${Lr()}
    ${s.menuOpen?Br():""}
  </div>`}function Pr(t){return t===j?"Бесконечный режим":`Ступень ${t} · ${at[t-1].name}`}function on(t){const e=pt(),r=!z&&t.wins>zt&&t.wins>0;return`<p>Побед за столом: <b>${t.wins}</b> · Дошли до круга ${t.circle+1}</p>
    ${r?`<div class="unlocked">${k("trophy")}<div><small>Новый рекорд!</small><b>${t.wins} ${qt(t.wins)}</b>
      <span>Прошлый — ${zt}</span></div></div>`:`<p class="muted">Рекорд: ${e} ${qt(e)}</p>`}`}function cn(){const t=s.run,e=t.over==="won",r=H(t);return`
  <div class="screen end-screen">
    ${e?`<span class="medal joker huge">${k("trophy")}</span>`:""}
    <h1 class="display">${e?"Забег пройден!":"Забег окончен"}</h1>
    ${Jt()}
    <p>${Pr(t.stage)}</p>
    ${e&&Y&&Y<j?`<div class="unlocked">${k("trophy")}<div><small>Открыта ступень ${Y}</small>
      <b>${at[Y-1].name}</b><span>+ ${at[Y-1].rule}</span></div></div>`:""}
    ${e&&Y===j?`<div class="unlocked">${k("trophy")}<div><small>Все ступени пройдены — открыт</small>
      <b>${se.name} режим</b><span>${se.rule}</span></div></div>`:""}
    ${r?on(t):`<p>Побед за столом: <b>${t.wins}</b> · Дошли до круга ${Math.min(t.circle+1,gt)}</p>
    <p class="muted">Лучший забег: ${Gt()} ${qt(Gt())}</p>`}
    ${t.jokers.length?`<div class="joker-row small">${t.jokers.map(a=>Ar(a,"disabled")).join("")}</div>`:""}
    <button class="btn primary big" data-act="new">Ещё забег</button>
    <button class="btn ghost" data-act="menu">В меню</button>
  </div>`}function jt(t,e,r){let a="";return t.trumpRevealed&&e.suit===t.trumpSuit?a+=" trump":r===0&&t.mods.seats[0].extraTrump===e.suit&&(a+=" trump2"),a}function q(t,e="",r=""){return`<div class="card ${ee(t.suit)?"red":"black"} ${e}" data-card="${t.id}" ${r}>
    <span class="corner"><span class="rank">${Dr(t.rank)}</span>${O(t.suit)}</span>
    <span class="pip">${O(t.suit)}</span>
  </div>`}function Ir(t,e=""){return`<div class="card back ${e}" data-card="${t}"></div>`}function ln(t,e){const r=a=>a.suit===t.trumpSuit&&t.trumpRevealed?9:C.indexOf(a.suit);return e.slice().sort((a,i)=>r(a)-r(i)||a.rank-i.rank)}function dn(){const t=new Map;return M?.querySelectorAll("[data-card]").forEach(e=>t.set(e.dataset.card,e.getBoundingClientRect())),t}function hn(t){if(t.size===0)return;const e=M.querySelector(".deck-wrap")?.getBoundingClientRect();M.querySelectorAll("[data-card]").forEach(r=>{const a=r.getBoundingClientRect(),i=t.get(r.dataset.card)??e;if(!i)return;const n=i.left-a.left,o=i.top-a.top;Math.abs(n)<1&&Math.abs(o)<1||r.animate([{translate:`${n}px ${o}px`},{translate:"0 0"}],{duration:340,easing:"cubic-bezier(.2,.8,.2,1)"})})}function fn(){const t=M.querySelectorAll(".bout .pair");return t.forEach((e,r)=>e.animate([{translate:"0 0",opacity:1},{translate:"140% -20%",opacity:0,rotate:"25deg"}],{duration:300,delay:r*30,easing:"ease-in",fill:"forwards"})),new Promise(e=>window.setTimeout(e,t.length?320+t.length*30:0))}function pn(){M.querySelector(".bout")?.animate([{translate:"0 0"},{translate:"-4px 2px"},{translate:"4px -2px"},{translate:"0 0"}],{duration:200})}export{kn as mount};
