function k(){}const ct=t=>t;function Et(t,e){for(const n in e)t[n]=e[n];return t}function At(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function ot(t){return t()}function nt(){return Object.create(null)}function E(t){t.forEach(ot)}function P(t){return typeof t=="function"}function te(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let R;function ee(t,e){return R||(R=document.createElement("a")),R.href=e,t===R.href}function Nt(t){return Object.keys(t).length===0}function lt(t,...e){if(t==null)return k;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function ne(t){let e;return lt(t,n=>e=n)(),e}function ie(t,e,n){t.$$.on_destroy.push(lt(e,n))}function se(t,e,n,i){if(t){const s=at(t,e,n,i);return t[0](s)}}function at(t,e,n,i){return t[1]&&i?Et(n.ctx.slice(),t[1](i(e))):n.ctx}function re(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const r=[],c=Math.max(e.dirty.length,s.length);for(let a=0;a<c;a+=1)r[a]=e.dirty[a]|s[a];return r}return e.dirty|s}return e.dirty}function ce(t,e,n,i,s,r){if(s){const c=at(e,n,i,r);t.p(c,s)}}function oe(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function le(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function ae(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function ue(t){return t??""}function fe(t,e,n){return t.set(n),e}function _e(t){return t&&P(t.destroy)?t.destroy:k}const ut=typeof window<"u";let ft=ut?()=>window.performance.now():()=>Date.now(),Q=ut?t=>requestAnimationFrame(t):k;const j=new Set;function _t(t){j.forEach(e=>{e.c(t)||(j.delete(e),e.f())}),j.size!==0&&Q(_t)}function dt(t){let e;return j.size===0&&Q(_t),{promise:new Promise(n=>{j.add(e={c:t,f:n})}),abort(){j.delete(e)}}}const de=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;let I=!1;function St(){I=!0}function jt(){I=!1}function Ct(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function Dt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const l=e[o].claim_order,f=(s>0&&e[n[s]].claim_order<=l?s+1:Ct(1,s,_=>e[n[_]].claim_order,l))-1;i[o]=n[f]+1;const u=f+1;n[u]=o,s=Math.max(u,s)}const r=[],c=[];let a=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(r.push(e[o-1]);a>=o;a--)c.push(e[a]);a--}for(;a>=0;a--)c.push(e[a]);r.reverse(),c.sort((o,l)=>o.claim_order-l.claim_order);for(let o=0,l=0;o<c.length;o++){for(;l<r.length&&c[o].claim_order>=r[l].claim_order;)l++;const f=l<r.length?r[l]:null;t.insertBefore(c[o],f)}}function ht(t,e){t.appendChild(e)}function mt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Mt(t){const e=X("style");return Ot(mt(t),e),e.sheet}function Ot(t,e){return ht(t.head||t,e),e.sheet}function Tt(t,e){if(I){for(Dt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function he(t,e,n){I&&!n?Tt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function V(t){t.parentNode&&t.parentNode.removeChild(t)}function me(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function X(t){return document.createElement(t)}function Y(t){return document.createTextNode(t)}function pe(){return Y(" ")}function ye(){return Y("")}function it(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function ge(t){return function(e){return e.preventDefault(),t.call(this,e)}}function pt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const zt=["width","height"];function Pt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&zt.indexOf(i)===-1?t[i]=e[i]:pt(t,i,e[i])}function qt(t,e){Object.keys(e).forEach(n=>{Rt(t,n,e[n])})}function Rt(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:pt(t,e,n)}function be(t){return/-/.test(t)?qt:Pt}function we(t){return t===""?null:+t}function Lt(t){return Array.from(t.childNodes)}function Wt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function yt(t,e,n,i,s=!1){Wt(t);const r=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const a=t[c];if(e(a)){const o=n(a);return o===void 0?t.splice(c,1):t[c]=o,s||(t.claim_info.last_index=c),a}}for(let c=t.claim_info.last_index-1;c>=0;c--){const a=t[c];if(e(a)){const o=n(a);return o===void 0?t.splice(c,1):t[c]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,a}}return i()})();return r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,r}function Bt(t,e,n,i){return yt(t,s=>s.nodeName===e,s=>{const r=[];for(let c=0;c<s.attributes.length;c++){const a=s.attributes[c];n[a.name]||r.push(a.name)}r.forEach(c=>s.removeAttribute(c))},()=>i(e))}function xe(t,e,n){return Bt(t,e,n,X)}function Ht(t,e){return yt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>Y(e),!0)}function $e(t){return Ht(t," ")}function ke(t,e){e=""+e,t.data!==e&&(t.data=e)}function ve(t,e){t.value=e??""}function Ee(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Ae(t,e,n){for(let i=0;i<t.options.length;i+=1){const s=t.options[i];if(s.__value===e){s.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Ne(t){const e=t.querySelector(":checked");return e&&e.__value}let L;function Ft(){if(L===void 0){L=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{L=!0}}return L}function Se(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=X("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=Ft();let r;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=it(window,"message",c=>{c.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{r=it(i.contentWindow,"resize",e),e()}),ht(t,i),()=>{(s||r&&i.contentWindow)&&r(),V(i)}}function je(t,e,n){t.classList[n?"add":"remove"](e)}function gt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function Ce(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const r=s.textContent.trim();r===`HEAD_${t}_END`?(i-=1,n.push(s)):r===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}function De(t,e){return new t(e)}const B=new Map;let H=0;function It(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ut(t,e){const n={stylesheet:Mt(e),rules:{}};return B.set(t,n),n}function bt(t,e,n,i,s,r,c,a=0){const o=16.666/i;let l=`{
`;for(let p=0;p<=1;p+=o){const y=e+(n-e)*r(p);l+=p*100+`%{${c(y,1-y)}}
`}const f=l+`100% {${c(n,1-n)}}
}`,u=`__svelte_${It(f)}_${a}`,_=mt(t),{stylesheet:h,rules:d}=B.get(_)||Ut(_,t);d[u]||(d[u]=!0,h.insertRule(`@keyframes ${u} ${f}`,h.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${u} ${i}ms linear ${s}ms 1 both`,H+=1,u}function J(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?r=>r.indexOf(e)<0:r=>r.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),H-=s,H||Gt())}function Gt(){Q(()=>{H||(B.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&V(e)}),B.clear())})}let T;function x(t){T=t}function v(){if(!T)throw new Error("Function called outside component initialization");return T}function Me(t){v().$$.before_update.push(t)}function Oe(t){v().$$.on_mount.push(t)}function Te(t){v().$$.after_update.push(t)}function ze(t){v().$$.on_destroy.push(t)}function Pe(){const t=v();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const r=gt(e,n,{cancelable:i});return s.slice().forEach(c=>{c.call(t,r)}),!r.defaultPrevented}return!0}}function qe(t,e){return v().$$.context.set(t,e),e}function Re(t){return v().$$.context.get(t)}const S=[],st=[];let C=[];const rt=[],wt=Promise.resolve();let K=!1;function xt(){K||(K=!0,wt.then(Z))}function Le(){return xt(),wt}function z(t){C.push(t)}const G=new Set;let N=0;function Z(){if(N!==0)return;const t=T;do{try{for(;N<S.length;){const e=S[N];N++,x(e),Jt(e.$$)}}catch(e){throw S.length=0,N=0,e}for(x(null),S.length=0,N=0;st.length;)st.pop()();for(let e=0;e<C.length;e+=1){const n=C[e];G.has(n)||(G.add(n),n())}C.length=0}while(S.length);for(;rt.length;)rt.pop()();K=!1,G.clear(),x(t)}function Jt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(z)}}function Kt(t){const e=[],n=[];C.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),C=e}let O;function $t(){return O||(O=Promise.resolve(),O.then(()=>{O=null})),O}function F(t,e,n){t.dispatchEvent(gt(`${e?"intro":"outro"}${n}`))}const W=new Set;let $;function Qt(){$={r:0,c:[],p:$}}function Vt(){$.r||E($.c),$=$.p}function tt(t,e){t&&t.i&&(W.delete(t),t.i(e))}function kt(t,e,n,i){if(t&&t.o){if(W.has(t))return;W.add(t),$.c.push(()=>{W.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const vt={duration:0};function We(t,e,n){const i={direction:"in"};let s=e(t,n,i),r=!1,c,a,o=0;function l(){c&&J(t,c)}function f(){const{delay:_=0,duration:h=300,easing:d=ct,tick:g=k,css:p}=s||vt;p&&(c=bt(t,0,1,h,_,d,p,o++)),g(0,1);const y=ft()+_,D=y+h;a&&a.abort(),r=!0,z(()=>F(t,!0,"start")),a=dt(A=>{if(r){if(A>=D)return g(1,0),F(t,!0,"end"),l(),r=!1;if(A>=y){const M=d((A-y)/h);g(M,1-M)}}return r})}let u=!1;return{start(){u||(u=!0,J(t),P(s)?(s=s(i),$t().then(f)):f())},invalidate(){u=!1},end(){r&&(l(),r=!1)}}}function Be(t,e,n){const i={direction:"out"};let s=e(t,n,i),r=!0,c;const a=$;a.r+=1;function o(){const{delay:l=0,duration:f=300,easing:u=ct,tick:_=k,css:h}=s||vt;h&&(c=bt(t,1,0,f,l,u,h));const d=ft()+l,g=d+f;z(()=>F(t,!1,"start")),dt(p=>{if(r){if(p>=g)return _(0,1),F(t,!1,"end"),--a.r||E(a.c),!1;if(p>=d){const y=u((p-d)/f);_(1-y,y)}}return r})}return P(s)?$t().then(()=>{s=s(i),o()}):o(),{end(l){l&&s.tick&&s.tick(1,0),r&&(c&&J(t,c),r=!1)}}}function He(t,e){const n=e.token={};function i(s,r,c,a){if(e.token!==n)return;e.resolved=a;let o=e.ctx;c!==void 0&&(o=o.slice(),o[c]=a);const l=s&&(e.current=s)(o);let f=!1;e.block&&(e.blocks?e.blocks.forEach((u,_)=>{_!==r&&u&&(Qt(),kt(u,1,1,()=>{e.blocks[_]===u&&(e.blocks[_]=null)}),Vt())}):e.block.d(1),l.c(),tt(l,1),l.m(e.mount(),e.anchor),f=!0),e.block=l,e.blocks&&(e.blocks[r]=l),f&&Z()}if(At(t)){const s=v();if(t.then(r=>{x(s),i(e.then,1,e.value,r),x(null)},r=>{if(x(s),i(e.catch,2,e.error,r),x(null),!e.hasCatch)throw r}),e.current!==e.pending)return i(e.pending,0),!0}else{if(e.current!==e.then)return i(e.then,1,e.value,t),!0;e.resolved=t}}function Fe(t,e,n){const i=e.slice(),{resolved:s}=t;t.current===t.then&&(i[t.value]=s),t.current===t.catch&&(i[t.error]=s),t.block.p(i,n)}function Ie(t,e){kt(t,1,1,()=>{e.delete(t.key)})}function Ue(t,e,n,i,s,r,c,a,o,l,f,u){let _=t.length,h=r.length,d=_;const g={};for(;d--;)g[t[d].key]=d;const p=[],y=new Map,D=new Map,A=[];for(d=h;d--;){const m=u(s,r,d),b=n(m);let w=c.get(b);w?i&&A.push(()=>w.p(m,e)):(w=l(b,m),w.c()),y.set(b,p[d]=w),b in g&&D.set(b,Math.abs(d-g[b]))}const M=new Set,et=new Set;function U(m){tt(m,1),m.m(a,f),c.set(m.key,m),f=m.first,h--}for(;_&&h;){const m=p[h-1],b=t[_-1],w=m.key,q=b.key;m===b?(f=m.first,_--,h--):y.has(q)?!c.has(w)||M.has(w)?U(m):et.has(q)?_--:D.get(w)>D.get(q)?(et.add(w),U(m)):(M.add(q),_--):(o(b,c),_--)}for(;_--;){const m=t[_];y.has(m.key)||o(m,c)}for(;h;)U(p[h-1]);return E(A),p}function Ge(t,e){const n={},i={},s={$$scope:1};let r=t.length;for(;r--;){const c=t[r],a=e[r];if(a){for(const o in c)o in a||(i[o]=1);for(const o in a)s[o]||(n[o]=a[o],s[o]=1);t[r]=a}else for(const o in c)s[o]=1}for(const c in i)c in n||(n[c]=void 0);return n}function Je(t){return typeof t=="object"&&t!==null?t:{}}function Ke(t){t&&t.c()}function Qe(t,e){t&&t.l(e)}function Xt(t,e,n,i){const{fragment:s,after_update:r}=t.$$;s&&s.m(e,n),i||z(()=>{const c=t.$$.on_mount.map(ot).filter(P);t.$$.on_destroy?t.$$.on_destroy.push(...c):E(c),t.$$.on_mount=[]}),r.forEach(z)}function Yt(t,e){const n=t.$$;n.fragment!==null&&(Kt(n.after_update),E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Zt(t,e){t.$$.dirty[0]===-1&&(S.push(t),xt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ve(t,e,n,i,s,r,c,a=[-1]){const o=T;x(t);const l=t.$$={fragment:null,ctx:[],props:r,update:k,not_equal:s,bound:nt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:nt(),dirty:a,skip_bound:!1,root:e.target||o.$$.root};c&&c(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(u,_,...h)=>{const d=h.length?h[0]:_;return l.ctx&&s(l.ctx[u],l.ctx[u]=d)&&(!l.skip_bound&&l.bound[u]&&l.bound[u](d),f&&Zt(t,u)),_}):[],l.update(),f=!0,E(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){St();const u=Lt(e.target);l.fragment&&l.fragment.l(u),u.forEach(V)}else l.fragment&&l.fragment.c();e.intro&&tt(t.$$.fragment),Xt(t,e.target,e.anchor,e.customElement),jt(),Z()}x(o)}class Xe{$destroy(){Yt(this,1),this.$destroy=k}$on(e,n){if(!P(n))return k;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!Nt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Pt as $,ye as A,kt as B,Vt as C,tt as D,Te as E,Ee as F,Qt as G,Le as H,st as I,De as J,Ke as K,Qe as L,Xt as M,Yt as N,z as O,Se as P,_e as Q,Rt as R,Xe as S,ve as T,we as U,ue as V,Ae as W,Ne as X,de as Y,Z,Et as _,pe as a,Ge as a0,ae as a1,Pe as a2,le as a3,se as a4,ce as a5,oe as a6,re as a7,ze as a8,Je as a9,je as aa,Ue as ab,Ie as ac,fe as ad,He as ae,Fe as af,ft as ag,dt as ah,ct as ai,We as aj,Be as ak,qe as al,be as am,Re as an,Me as ao,Lt as b,xe as c,Ht as d,X as e,V as f,$e as g,he as h,Ve as i,Tt as j,ke as k,ie as l,Ce as m,k as n,ee as o,pt as p,it as q,ge as r,te as s,Y as t,Oe as u,ne as v,lt as w,E as x,P as y,me as z};
