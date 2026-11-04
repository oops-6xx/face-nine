/* FACE / NINE — 独立实现完整四阶段 TOP9 互动选拔。无外部依赖，可用 GitHub Pages 发布。
 * 算法：92人预选 → 三轮积分对决 → 前12保送+晋级线候选复赛取6 → 18人二元插入排序 → Top 9。
 * 注意：决赛比较偏好若不具备传递性，所得顺序仍是用户选择下的一种一致排序，而非客观分数。
 */
(() => {
'use strict';
const KEY='face-nine-complete-v1', HK='face-nine-undo-v1';
const byId=new Map(CANDIDATES.map(c=>[c.id,c]));
const $=q=>document.querySelector(q);
const h=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tr={
 zh:{language:'请选择语言',subtitle:'从92位候选人中，一步步选出你最喜欢的九张脸。',top:'我的心动 TOP9',start:'开始完整选拔',welcome:'你心中的排名，由你决定。',stages:['🌱 预选','🔥 本选','⚔️ 最终战','👑 决赛'],safe:'无需登录，投票记录保存在当前浏览器中。',undo:'上一步',home:'返回首页',restart:'全部重新开始',resume:'继续之前的进度',next:'下一组',back:'上一组',go:'开始',selected:'已选择',candidate:'位候选人',preTitle:'预选 · 直觉选择',preIntro:'从全部候选人中选择喜欢的面孔。每组可选0～3位，至少选18位才能进入完整决赛。',preRule:'每组4人，最多选3人。全部92人都将出现，不跳过、不删减。',preDone:'预选完成',preCount:'进入下一轮的候选人',preFew:'至少需要18位候选人才可以进入完整18人决赛。请返回上一组继续补选，或重新预选。',preGo:'进入本选',mainTitle:'本选 · 三轮对决',mainIntro:'候选人进行3轮一对一比较。每对先选第一喜欢，再选第二喜欢。每轮根据累计得分安排对手。',mainRule:'第一喜欢得2分，第二喜欢得1分；奇数人数的轮空者得1分。三轮后按照总分确定晋级线。',first:'① 先点选更喜欢的人',second:'② 再点选另一位，确认第二喜欢',round:'轮次',match:'对决',mainDone:'三轮本选完成',mainDoneMsg:'接下来前12名获得决赛席位，其余晋级线附近候选人争夺另外6个席位。',mainGo:'进入最终战',lastTitle:'最终战 · 争夺席位',lastIntro:'积分前12名直接晋级；排名第13～24名（或剩余全部）再进行两轮对比，竞争最后6个席位。',lastRule:'最终战每次只选更喜欢的一位。按胜场、本选积分依次决定出线资格，最终组成18位决赛候选人。',lastQuestion:'点击更想让谁进入决赛',lastDone:'18位决赛候选人已产生',lastDoneMsg:'所有18位将进入完整的二选一排名环节，决出真正的第1～9名。',lastGo:'进入决赛',finalTitle:'决赛 · TOP9 排位',finalIntro:'对18位决赛候选人进行两两比较，通过交互式排序生成完整名次，最终展示前9名。',finalRule:'每次只选你更喜欢的人。系统会根据已做出的选择安排下一组比较，不会用随机晋级代替排序。',finalQuestion:'二选一：谁在你的排名里更靠前？',finalProgress:'已经排定',finalDone:'排名已生成',finalists:'18位候选人',yourTop:'你的 TOP 9',resultHint:'每一个名次都来自你的选择。',copy:'复制结果文字',copied:'结果已复制',copyFail:'无法直接复制，请手动复制结果',reset:'再做一次',changeLang:'切换语言',prev:'返回上一阶段',minWarn:'请至少选择18位候选人',notReady:'没有需要恢复的进度',disclaimer:'独立制作的互动选拔网页。请使用已获授权的照片。',imageHint:'图片可以放进 images 文件夹；未放图片时显示姓名占位卡。',rounds:'阶段进度',finish:'查看结果',restartConfirm:'清除当前所有投票进度并重新开始？',saved:'已自动保存'},
 en:{language:'Choose your language',subtitle:'Choose the nine faces you love most from 92 candidates.',top:'MY FAVORITE TOP 9',start:'Start the full experience',welcome:'Your taste. Your ranking.',stages:['🌱 Preliminary','🔥 Main rounds','⚔️ Last battle','👑 Final'],safe:'No login. Your progress stays in this browser.',undo:'Undo',home:'Home',restart:'Start over',resume:'Resume progress',next:'Next group',back:'Previous group',go:'Start',selected:'Selected',candidate:'candidates',preTitle:'Preliminary · Follow your heart',preIntro:'Pick faces you like from all candidates. Choose 0–3 in each group; at least 18 are needed for the full final.',preRule:'Four per group. Choose up to three. All 92 candidates appear.',preDone:'Preliminary complete',preCount:'Candidates advancing',preFew:'Pick at least 18 to play the full 18-person final. Go back and select more, or restart.',preGo:'Go to main rounds',mainTitle:'Main rounds · Three rounds',mainIntro:'Three rounds of direct comparisons. Pick your first preference, then your second in each pair.',mainRule:'First pick earns 2 points, second earns 1. A bye earns 1 point. Later pairings favor comparable scores.',first:'① Pick your first choice',second:'② Pick the other as second choice',round:'Round',match:'Match',mainDone:'Three rounds complete',mainDoneMsg:'The top 12 earn guaranteed final spots. The next candidates compete for six remaining places.',mainGo:'Go to last battle',lastTitle:'Last battle · Fight for a spot',lastIntro:'The top 12 advance directly. Candidates ranked 13–24 (or all remaining) fight for six spots over two rounds.',lastRule:'Select one winner each time. Final spots are assigned by wins, followed by main-round score.',lastQuestion:'Who should reach the final?',lastDone:'18 finalists selected',lastDoneMsg:'All 18 enter head-to-head ordering to decide the final nine ranks.',lastGo:'Go to the final',finalTitle:'Final · TOP 9 ranking',finalIntro:'Order all 18 finalists via interactive pairwise comparisons; the first nine become your final TOP 9.',finalRule:'Pick your preferred face each time. Future comparisons adapt to your choices, without random elimination.',finalQuestion:'Who ranks higher for you?',finalProgress:'Ordered so far',finalDone:'Ranking complete',finalists:'18 finalists',yourTop:'YOUR TOP 9',resultHint:'Your choices created this ranking.',copy:'Copy ranking',copied:'Copied!',copyFail:'Could not copy automatically. Please copy manually.',reset:'Play again',changeLang:'Change language',prev:'Previous stage',minWarn:'Choose at least 18 people',notReady:'No saved progress to resume',disclaimer:'Independent fan-made website. Use images you are authorized to publish.',imageHint:'Put your photos in images/. Missing images show name placeholders.',rounds:'Stage progress',finish:'See results',restartConfirm:'Delete all your choices and start again?',saved:'Saved automatically'},
 ja:{language:'言語を選択',subtitle:'92人から、好きな顔のTOP9を決めよう。',top:'私の好き顔 TOP9',start:'フルゲームを始める',welcome:'あなたの好みで、ランキングを決めよう。',stages:['🌱 予選','🔥 本選','⚔️ 最終戦','👑 決勝'],safe:'ログイン不要。進行状況はこのブラウザに保存されます。',undo:'戻る',home:'ホーム',restart:'最初から',resume:'途中から再開',next:'次のグループ',back:'前のグループ',go:'始める',selected:'選択中',candidate:'人',preTitle:'予選 · 直感で選ぼう',preIntro:'各グループから0～3人選んでください。18人以上の選択で決勝に進めます。',preRule:'1グループ4人、最大3人。92人全員を表示します。',preDone:'予選終了',preCount:'次のステージに進む人数',preFew:'決勝には18人以上が必要です。前のグループに戻って追加してください。',preGo:'本選へ',mainTitle:'本選 · 3ラウンド',mainIntro:'各ペアの1位、次に2位を選びます。合計3ラウンド。',mainRule:'1位2点、2位1点。人数が奇数の場合は不戦の人に1点。',first:'① 1番好きな人を選んで',second:'② もう一人を2位として選んで',round:'ラウンド',match:'対戦',mainDone:'本選3ラウンド終了',mainDoneMsg:'上位12人は決勝確定。ボーダー付近の候補が残り6枠を争います。',mainGo:'最終戦へ',lastTitle:'最終戦 · 決勝への道',lastIntro:'上位12人は通過。13～24位の候補が2ラウンドで残り6枠を争います。',lastRule:'毎回好きな方を選択。勝利数と本選のポイントで決勝進出を決めます。',lastQuestion:'決勝に進んでほしいのは？',lastDone:'決勝進出18人が決定！',lastDoneMsg:'18人全員を直接比較して、好き顔TOP9を決定します。',lastGo:'決勝へ',finalTitle:'決勝 · TOP9を決める',finalIntro:'18人を二択で比較し、1位から9位までを決めます。',finalRule:'毎回好きな人を選ぶだけ。ランダムな勝ち抜きではなく、比較による並べ替えです。',finalQuestion:'あなたのランキングで上なのは？',finalProgress:'順位確定',finalDone:'ランキング完成',finalists:'決勝18人',yourTop:'あなたの TOP9',resultHint:'すべて、あなたの選択から生まれた順位です。',copy:'結果をコピー',copied:'コピーしました',copyFail:'コピーできません。手動でコピーしてください。',reset:'もう一度',changeLang:'言語を変更',prev:'前のステージ',minWarn:'18人以上選んでください',notReady:'保存済みの進行状況がありません',disclaimer:'非公式ファン制作サイトです。使用許可のある写真をご利用ください。',imageHint:'images/ に写真を配置できます。写真がない場合は名前を表示します。',rounds:'進行状況',finish:'結果を見る',restartConfirm:'これまでの選択を削除して最初からやり直しますか？',saved:'自動保存済み'}
};
const initial=(lang='zh')=>({v:1,lang,screen:'language',resumeScreen:null,prePage:0,preChoices:{},selected:[],scores:{},mainRound:1,mainPairs:[],mainIndex:0,mainFirst:null,mainPlayed:[],lastSecure:[],lastBubble:[],lastScores:{},lastRound:1,lastPairs:[],lastIndex:0,lastPlayed:[],finalists:[],ordered:[],insertIndex:0,lo:0,hi:0,ranking:[]});
function load(){try{const v=JSON.parse(localStorage.getItem(KEY));if(v&&v.v===1&&tr[v.lang]&&typeof v.screen==='string'&&Array.isArray(v.selected))return v}catch(e){}return initial()}
let S=load(), history=[];
try{const hh=JSON.parse(localStorage.getItem(HK));if(Array.isArray(hh))history=hh.slice(-120)}catch(e){}
const T=()=>tr[S.lang];
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));localStorage.setItem(HK,JSON.stringify(history))}catch(e){}};
const snapshot=()=>{history.push(JSON.parse(JSON.stringify(S)));if(history.length>120)history.shift();};
const commit=(fn)=>{snapshot();fn();save();render()};
const label=(k)=>h(T()[k]);
const entity=id=>byId.get(id);
const name=id=>(entity(id)||{}).name||'?';
function shuffled(ids){const a=ids.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function scoreSort(ids,scores){return ids.slice().sort((a,b)=>(scores[b]||0)-(scores[a]||0)||a-b)}
function makePairs(ids,scores,previous,grouped=false){
 const arr=grouped?scoreSort(shuffled(ids),scores):shuffled(ids);
 const used=new Set(),out=[],prior=new Set(previous.map(p=>[...p].sort((a,b)=>a-b).join(':')));
 for(let i=0;i<arr.length;i++){
  const a=arr[i];if(used.has(a))continue;used.add(a);
  const remaining=arr.filter(b=>!used.has(b));if(!remaining.length){out.push([a,null]);break}
  let b=remaining.find(b=>!prior.has([a,b].sort((x,y)=>x-y).join(':')));
  if(b===undefined)b=remaining[0];used.add(b);out.push([a,b]);
 }
 return out;
}
function preGroups(){const chunks=[];for(let i=0;i<CANDIDATES.length;i+=4)chunks.push(CANDIDATES.slice(i,i+4));return chunks}
const groups=preGroups();
function preIds(){return [...new Set(Object.values(S.preChoices).flat())]}
function personCard(id,act,selected=false){
 const p=entity(id);if(!p)return '';
 return `<button class="person-card ${selected?'selected':''}" data-act="${act}" data-id="${id}" type="button"><span class="portrait"><span class="fallback" aria-hidden="true">${h(p.name.slice(0,2).toUpperCase())}</span><img src="${h(p.image)}" alt="" loading="lazy" onerror="this.remove()"></span><span class="name">${h(p.name)}</span>${selected?'<span class="check">✓</span>':''}</button>`;
}
const btn=(action,text,kind='primary')=>`<button class="btn btn-${kind}" data-act="${action}">${text}</button>`;
const steps=()=>`<div class="steps">${T().stages.map(x=>`<div class="step">${h(x)}</div>`).join('')}</div>`;
const title=(ey,txt,desc)=>`<div class="round-header"><div class="eyebrow">${ey}</div><h2>${txt}</h2><div class="description">${desc}</div></div>`;
const progress=(done,total)=>`<div class="progress-head"><span>${label('rounds')}</span><span>${done} / ${total}</span></div><div class="progress-track"><div class="progress-fill" style="width:${total?100*done/total:0}%"></div></div>`;
const intro=(step,titleText,text,rule,start)=>`<section class="intro screen"><div class="eyebrow">${step}</div><div class="tiny-symbol" style="font-size:43px;margin-top:20px">${step.split(' ')[0]}</div><h2>${titleText}</h2><p class="lead">${text}</p><div class="rules">${rule}</div><div class="action-row">${btn(start,label('go')+' →')}${btn('home',label('home'),'secondary')}</div></section>`;
const notice=s=>`<div class="notice">${s}</div>`;
function resultCard(id,idx){const p=entity(id);return `<div class="result-card"><div class="portrait"><span class="fallback">${h(p.name.slice(0,2).toUpperCase())}</span><img src="${h(p.image)}" alt="" onerror="this.remove()"></div><div class="rank ${idx<3?'top':''}">${idx+1}</div><div class="name">${h(p.name)}</div></div>`}
function render(){
 document.documentElement.lang=S.lang==='zh'?'zh-Hans':S.lang;
 document.title=`FACE / NINE — ${T().top}`;
 $('#language-label').textContent=({zh:'中文',en:'EN',ja:'日本語'})[S.lang];
 $('#footer-disclaimer').textContent=T().disclaimer;
 $('#undo').hidden=!history.length;
 $('[data-t="undo"]').textContent=T().undo;
 const num=CANDIDATES.length;
 let html='';
 switch(S.screen){
 case 'language':html=`<section class="hero screen"><div class="eyebrow">FACE / NINE · INTERACTIVE RANKING</div><div class="tiny-symbol">✳ ♡ ✳</div><h1>FIND YOUR<br><em>TOP NINE.</em></h1><p class="lead">${label('language')}</p><div class="lang-buttons">${btn('lang-zh','🇨🇳 中文')}${btn('lang-en','🇬🇧 English')}${btn('lang-ja','🇯🇵 日本語')}</div></section>`;break;
 case 'home':html=`<section class="hero screen"><div class="eyebrow">THE THAI FACE SELECTION · ${num} EDITION</div><div class="tiny-symbol">✳ ♡ ♛</div><h1>YOUR FACE.<br><em>YOUR NINE.</em></h1><p class="lead">${label('welcome')}<br>${label('subtitle')}</p>${steps()}<div class="action-row">${btn('pre-intro',label('start')+' →')}${S.resumeScreen?btn('resume',label('resume'),'secondary'):''}</div><div class="statline">${label('safe')}</div></section>`;break;
 case 'preIntro':html=intro(T().stages[0],label('preTitle'),label('preIntro'),label('preRule'),'pre-start');break;
 case 'pre':{
 const i=S.prePage,g=groups[i]||[],picked=S.preChoices[i]||[];
 html=`<section class="screen">${title('01 / 04 · PRELIMINARY',label('preTitle'),`${label('selected')}: ${preIds().length} / ${num}`)}${progress(i+1,groups.length)}<div class="photo-grid">${g.map(p=>personCard(p.id,'pre-pick',picked.includes(p.id))).join('')}</div><div class="duel-info">${label('selected')}: ${picked.length} / 3 · ${label('candidate')}: ${preIds().length}</div><div class="action-row">${i>0?btn('pre-back','← '+label('back'),'secondary'):''}${btn('pre-next',(i===groups.length-1?label('finish'):label('next'))+' →')}</div></section>`;break;}
 case 'preDone':html=`<section class="intro screen"><div class="eyebrow">PRELIMINARY COMPLETE</div><h2>${label('preDone')}</h2><div class="big-count">${S.selected.length}</div><p class="lead">${label('preCount')}</p>${S.selected.length<18?notice(label('preFew')):''}<div class="action-row">${S.selected.length>=18?btn('main-intro',label('preGo')+' →'):btn('pre-return',label('back'),'secondary')}${btn('restart',label('restart'),'secondary')}</div></section>`;break;
 case 'mainIntro':html=intro(T().stages[1],label('mainTitle'),label('mainIntro'),label('mainRule'),'main-start');break;
 case 'main':{
 const p=S.mainPairs[S.mainIndex]||[],total=S.mainPairs.length;
 html=`<section class="screen">${title('02 / 04 · MAIN ROUNDS',label('mainTitle'),`${label('round')} ${S.mainRound} / 3`)}${progress((S.mainRound-1)*total+S.mainIndex,3*total)}<div class="duel-phase" style="text-align:center">${label('match')} ${S.mainIndex+1} / ${total}</div><div class="duel-question">${S.mainFirst===null?label('first'):label('second')}</div><div class="photo-grid two">${p.map(id=>personCard(id,'main-pick',S.mainFirst===id)).join('')}</div><div class="duel-info">${label('safe')}</div></section>`;break;}
 case 'mainDone':html=`<section class="intro screen"><div class="eyebrow">MAIN ROUNDS COMPLETE</div><h2>${label('mainDone')}</h2><p class="lead">${label('mainDoneMsg')}</p><div class="action-row">${btn('last-intro',label('mainGo')+' →')}</div></section>`;break;
 case 'lastIntro':html=intro(T().stages[2],label('lastTitle'),label('lastIntro'),label('lastRule'),'last-start');break;
 case 'last':{
 const p=S.lastPairs[S.lastIndex]||[],total=S.lastPairs.length;
 html=`<section class="screen">${title('03 / 04 · LAST BATTLE',label('lastTitle'),`${label('round')} ${S.lastRound} / 2`)}${progress((S.lastRound-1)*total+S.lastIndex,2*total)}<div class="duel-question">${label('lastQuestion')}</div><div class="photo-grid two">${p.map(id=>personCard(id,'last-pick')).join('')}</div><div class="duel-info">TOP 12 + WILDCARD 6 = TOP 18</div></section>`;break;}
 case 'lastDone':html=`<section class="intro screen"><div class="eyebrow">18 FINALISTS</div><h2>${label('lastDone')}</h2><div class="big-count">18</div><p class="lead">${label('lastDoneMsg')}</p><div class="action-row">${btn('final-intro',label('lastGo')+' →')}</div><div class="mini-cards">${S.finalists.map(id=>`<span class="mini-pill">${h(name(id))}</span>`).join('')}</div></section>`;break;
 case 'finalIntro':html=intro(T().stages[3],label('finalTitle'),label('finalIntro'),label('finalRule'),'final-start');break;
 case 'final':{
 const newPerson=S.finalists[S.insertIndex],mid=Math.floor((S.lo+S.hi)/2),oldPerson=S.ordered[mid];
 html=`<section class="screen">${title('04 / 04 · FINAL RANKING',label('finalTitle'),`${label('finalProgress')}: ${S.ordered.length} / 18`)}${progress(S.ordered.length,18)}<div class="duel-question">${label('finalQuestion')}</div><div class="photo-grid two">${personCard(newPerson,'final-pick')}${personCard(oldPerson,'final-pick')}</div><div class="duel-info">${label('safe')}</div></section>`;break;}
 case 'result':html=`<section class="screen"><div class="title-stack"><div class="eyebrow">RANKING COMPLETE · FACE / NINE</div><h1 style="font-size:clamp(36px,6vw,64px);letter-spacing:-.04em;margin:14px 0">${label('yourTop')} ♛</h1><p class="lead">${label('resultHint')}</p></div><div class="result-grid">${S.ranking.slice(0,9).map((id,idx)=>resultCard(id,idx)).join('')}</div><div class="action-row">${btn('copy',label('copy'))}${btn('restart',label('reset'),'secondary')}${btn('language',label('changeLang'),'secondary')}</div></section>`;break;
 default:S.screen='home';save();return render();
 }
 $('#app').innerHTML=html;window.scrollTo({top:0,behavior:'instant'});
}
const go=screen=>commit(()=>{if(screen==='home'&&!['home','language'].includes(S.screen))S.resumeScreen=S.screen;S.screen=screen});
function initMain(){S.scores=Object.fromEntries(S.selected.map(id=>[id,0]));S.mainRound=1;S.mainPlayed=[];prepareMain()}
function prepareMain(){S.mainPairs=makePairs(S.selected,S.scores,S.mainPlayed,S.mainRound>1);for(const [a,b] of S.mainPairs){if(b===null)S.scores[a]+=1}S.mainPairs=S.mainPairs.filter(p=>p[1]!==null);S.mainIndex=0;S.mainFirst=null}
function doMainPick(id){const p=S.mainPairs[S.mainIndex];if(!p||!p.includes(id))return;
 commit(()=>{
 if(S.mainFirst===null){S.mainFirst=id;return}
 if(id===S.mainFirst)return;
 S.scores[S.mainFirst]+=2;S.scores[id]+=1;S.mainPlayed.push(p);S.mainIndex++;S.mainFirst=null;
 if(S.mainIndex>=S.mainPairs.length){if(S.mainRound<3){S.mainRound++;prepareMain()}else S.screen='mainDone'}
 });
}
function initLast(){const sorted=scoreSort(S.selected,S.scores);S.lastSecure=sorted.slice(0,12);S.lastBubble=sorted.slice(12,24);S.lastScores=Object.fromEntries(S.lastBubble.map(id=>[id,0]));S.lastPlayed=[];S.lastRound=1;prepareLast()}
function prepareLast(){S.lastPairs=makePairs(S.lastBubble,S.lastScores,S.lastPlayed,S.lastRound>1);for(const [a,b] of S.lastPairs){if(b===null)S.lastScores[a]+=1}S.lastPairs=S.lastPairs.filter(p=>p[1]!==null);S.lastIndex=0}
function lastPick(id){const p=S.lastPairs[S.lastIndex];if(!p||!p.includes(id))return;
 commit(()=>{S.lastScores[id]+=1;S.lastPlayed.push(p);S.lastIndex++;
 if(S.lastIndex>=S.lastPairs.length){if(S.lastRound<2){S.lastRound++;prepareLast()}else{
 const bubbleSorted=S.lastBubble.slice().sort((a,b)=>(S.lastScores[b]-S.lastScores[a])||(S.scores[b]-S.scores[a])||(a-b));
 S.finalists=[...S.lastSecure,...bubbleSorted.slice(0,6)];S.screen='lastDone';
 }}
 });
}
function initFinal(){S.ordered=[S.finalists[0]];S.insertIndex=1;S.lo=0;S.hi=1;S.ranking=[]}
function finalPick(id){const newbie=S.finalists[S.insertIndex],mid=Math.floor((S.lo+S.hi)/2),older=S.ordered[mid];if(id!==newbie&&id!==older)return;
 commit(()=>{
 if(id===newbie)S.hi=mid;else S.lo=mid+1;
 if(S.lo===S.hi){S.ordered.splice(S.lo,0,newbie);S.insertIndex++;
 if(S.insertIndex>=S.finalists.length){S.ranking=S.ordered.slice();S.screen='result'}
 else{S.lo=0;S.hi=S.ordered.length}}
 });
}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('visible'),1800)}
async function copyResult(){const text=`${T().yourTop}\n`+S.ranking.slice(0,9).map((id,i)=>`${i+1}. ${name(id)}`).join('\n');try{await navigator.clipboard.writeText(text);toast(T().copied)}catch(e){const ta=document.createElement('textarea');ta.value=text;document.body.append(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch(e){}ta.remove();if(ok)toast(T().copied);else{window.prompt(T().copyFail,text)}}}
function dispatch(act,id){
 switch(act){
 case 'undo':if(history.length){S=history.pop();save();render()}return;
 case 'language':commit(()=>{if(!['home','language'].includes(S.screen))S.resumeScreen=S.screen;S.screen='language'});return;
 case 'lang-zh':case 'lang-en':case 'lang-ja':commit(()=>{S.lang=act.slice(5);S.screen='home'});return;
 case 'home':go('home');return;
 case 'resume':if(S.resumeScreen)go(S.resumeScreen);else toast(T().notReady);return;
 case 'pre-intro':go('preIntro');return;
 case 'pre-start':commit(()=>{S.prePage=0;S.preChoices={};S.selected=[];S.screen='pre'});return;
 case 'pre-pick':commit(()=>{const key=String(S.prePage),current=S.preChoices[key]||[];if(current.includes(id))S.preChoices[key]=current.filter(x=>x!==id);else if(current.length<3)S.preChoices[key]=[...current,id];else{history.pop();toast(T().preRule)}});return;
 case 'pre-next':commit(()=>{if(S.prePage<groups.length-1)S.prePage++;else{S.selected=preIds();S.screen='preDone'}});return;
 case 'pre-back':if(S.prePage>0)commit(()=>S.prePage--);return;
 case 'pre-return':commit(()=>{S.prePage=groups.length-1;S.screen='pre'});return;
 case 'main-intro':if(S.selected.length<18)return toast(T().minWarn);go('mainIntro');return;
 case 'main-start':commit(()=>{initMain();S.screen='main'});return;
 case 'main-pick':doMainPick(id);return;
 case 'last-intro':go('lastIntro');return;
 case 'last-start':commit(()=>{initLast();S.screen='last'});return;
 case 'last-pick':lastPick(id);return;
 case 'final-intro':go('finalIntro');return;
 case 'final-start':commit(()=>{initFinal();S.screen='final'});return;
 case 'final-pick':finalPick(id);return;
 case 'copy':copyResult();return;
 case 'restart':if(confirm(T().restartConfirm)){const lang=S.lang;S=initial(lang);S.screen='home';history=[];save();render()}return;
 }
}
document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el)return;const id=el.dataset.id===undefined?null:Number(el.dataset.id);dispatch(el.dataset.act,id)});
$('#brand').addEventListener('click',e=>{e.preventDefault();go('home')});
if(CANDIDATES.length<18){$('#app').textContent='完整版本至少需要18名候选人。请修改 candidates.js。'}else render();
})();
