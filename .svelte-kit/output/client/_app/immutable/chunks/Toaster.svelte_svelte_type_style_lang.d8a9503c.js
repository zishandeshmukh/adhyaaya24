import{d as P,w as D}from"./index.2d608655.js";import{v as b}from"./index.6031e960.js";function Q(e,t,r,n){var s,f,_=!1,M=r.length>=2,S=(a,u,d)=>{if(s=u,M&&(f=a),!_){let l=t(a,u,d);if(t.length<2)u(l);else return l}_=!1},y=P(e,S,n),A=!Array.isArray(e);function R(a){var u=r(a,f);A?(_=!0,e.set(u)):u.forEach((d,l)=>{_=!0,e[l].set(d)}),_=!1}var m=!1;function h(a){var u,d,l,o;if(m){o=a(b(y)),s(o);return}var V=y.subscribe(E=>{m?u?d=!0:u=!0:l=E});o=a(l),m=!0,s(o),V(),m=!1,d&&(o=b(y)),u&&R(o)}return{subscribe:y.subscribe,set(a){h(()=>a)},update:h}}const x=20,c=D([]),T=D(null),g=new Map,p=e=>{if(g.has(e))return;const t=setTimeout(()=>{g.delete(e),k(e)},1e3);g.set(e,t)},B=e=>{const t=g.get(e);t&&clearTimeout(t)};function L(e){e.id&&B(e.id),c.update(t=>t.map(r=>r.id===e.id?{...r,...e}:r))}function W(e){c.update(t=>[e,...t].slice(0,x))}function j(e){b(c).find(t=>t.id===e.id)?L(e):W(e)}function C(e){c.update(t=>(e?p(e):t.forEach(r=>{p(r.id)}),t.map(r=>r.id===e||e===void 0?{...r,visible:!1}:r)))}function k(e){c.update(t=>e===void 0?[]:t.filter(r=>r.id!==e))}function F(e){T.set(e)}function G(e){let t;T.update(r=>(t=e-(r||0),null)),c.update(r=>r.map(n=>({...n,pauseDuration:n.pauseDuration+t})))}const H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3};function J(e={}){return{toasts:Q(c,r=>r.map(n=>{var s,f;return{...e,...e[n.type],...n,duration:n.duration||((s=e[n.type])==null?void 0:s.duration)||(e==null?void 0:e.duration)||H[n.type],style:[e.style,(f=e[n.type])==null?void 0:f.style,n.style].join(";")}}),r=>r),pausedAt:T}}const I=e=>typeof e=="function",w=(e,t)=>I(e)?e(t):e,N=(()=>{let e=0;return()=>(e+=1,e.toString())})(),K=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){const t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),U=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||N()}),v=e=>(t,r)=>{const n=U(t,e,r);return j(n),n.id},i=(e,t)=>v("blank")(e,t);i.error=v("error");i.success=v("success");i.loading=v("loading");i.custom=v("custom");i.dismiss=e=>{C(e)};i.remove=e=>k(e);i.promise=(e,t,r)=>{const n=i.loading(t.loading,{...r,...r==null?void 0:r.loading});return e.then(s=>(i.success(w(t.success,s),{id:n,...r,...r==null?void 0:r.success}),s)).catch(s=>{i.error(w(t.error,s),{id:n,...r,...r==null?void 0:r.error})}),e};export{L as a,G as e,K as p,F as s,i as t,J as u};
