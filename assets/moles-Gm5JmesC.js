import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{f as t,l as n,u as r}from"./r3f-C_NQXZok.js";import{$t as i,It as a,Qt as o,Yt as s,Zt as c,k as l,mt as u,pt as d}from"./useOutfitStore-8YgqQCm9.js";import{$ as f,H as p,_ as m,d as h,f as g,j as _,p as v}from"./three-CtratCIv.js";var y=e(t(),1),b=new WeakMap,x=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e||1e-9)));return r*r*(3-2*r)};function S(e){if(b.has(e))return b.get(e)??null;let t=C(e);return b.set(e,t),t}function C(e){let t=e.mesh,n=t.region,r=new Uint8Array(t.nTris);for(let e=0;e<t.nTris;e++){if(t.triGroup[e]!==0)continue;let i=t.idx[e*3],a=t.idx[e*3+1],o=t.idx[e*3+2];n.arm[i]>.5||n.arm[a]>.5||n.arm[o]>.5||n.head[i]>.5||n.head[a]>.5||n.head[o]>.5||(r[e]=1)}let a=new s({pos:t.pos,idx:t.idx},r),l=e.lm.crotch+3,u=e.lm.crotch-9,d=[],f=[],p=-1/0;for(let e=l;e>=u;e-=.25){let t=a.slice(e).filter(e=>Math.abs(c(e))>.3),n=1/0,r=1/0;for(let e of t){let t=i(e)[0],a=o(e);t>.3?n=Math.min(n,a.x0):t<-.3&&(r=Math.min(r,-a.x1))}Number.isFinite(n)&&Number.isFinite(r)&&(d.push(e),f.push(Math.max(0,Math.min(n,r))),e>p&&(p=e))}if(d.length<6)return null;let m=d.map((e,t)=>t).sort((e,t)=>d[e]-d[t]),h=m.map(e=>d[e]),g=m.map(e=>f[e]);for(let e=0;e<2;e++)g=g.map((e,t)=>(g[Math.max(0,t-1)]+e*2+g[Math.min(g.length-1,t+1)])/4);let _=e=>{if(e<=h[0])return g[0];if(e>=h[h.length-1])return g[g.length-1];let t=0;for(;h[t+1]<e;)t++;return g[t]+(g[t+1]-g[t])*((e-h[t])/(h[t+1]-h[t]))};p=h[h.length-1];let v=p-3.6,y=_(v),b=_(p),S=2.2,C=Float32Array.from(t.pos),w=0;for(let e=0;e<t.nBody;e++){let r=t.pos[e*3+1];if(r<v||r>p+S||n.arm[e]>.5||n.head[e]>.5||n.foot[e]>.5)continue;let i=t.pos[e*3],a=Math.abs(i),o,s;if(r<=p?(o=_(r),s=Math.min(o,y*(1-x(v,p,r)))):(o=b,s=b*x(p,p+S,r)),o<.05||s>=o-1e-4)continue;let c;if(a<=o)c=s/o*a;else if(a<o+5)c=s+(a-o)*(o+5-s)/5;else continue;C[e*3]=Math.sign(i)*c,w++}return w>0?C:null}var w=n(),T=12,E=`#d9d1c2`;function D(e,t=!1){let n=e.mesh,r=new g;r.setAttribute(`position`,new h(new Float32Array(S(e)??n.pos),3));let i=0;for(;i<n.nTris&&n.triGroup[i]===0;)i++;let a=[],o=0,s=Math.max(e.foot.ankleY-.4,e.foot.shoeTop-.3),c=n.region.foot,l=e=>t&&c[e]>.4&&n.pos[e*3+1]<s;for(let e=0;e<i;e++){let t=n.idx[e*3],r=n.idx[e*3+1],i=n.idx[e*3+2];l(t)&&l(r)&&l(i)||(a.push(t,r,i),o++)}for(let e=i*3;e<n.nTris*3;e++)a.push(n.idx[e]);return r.setIndex(new h(Uint16Array.from(a),1)),r.addGroup(0,o*3,0),r.addGroup(o*3,a.length-o*3,1),r.computeVertexNormals(),r.computeBoundingSphere(),r}function O(e,t){return t||(e<0?E:l[e]?.color??`#d9d1c2`)}var k=`
uniform vec4 uNeck;
uniform vec4 uNeck2;
uniform vec4 uArm;
uniform vec4 uArm2;
uniform vec4 uMole[12];
uniform vec4 uMoleC[12];
uniform float uMoleN;
varying float vField;
varying float vLow;
varying vec3 vOP;
float bwSS(float a, float b, float x) {
  float t = clamp((x - a) / (b - a), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}
float bwSeg(vec2 q, vec2 a, vec2 b) {
  vec2 d = b - a;
  float l2 = dot(d, d);
  float t = l2 > 0.0 ? clamp(dot(q - a, d) / l2, 0.0, 1.0) : 0.0;
  vec2 e = a + d * t - q;
  return dot(e, e);
}
float bwScoopCurve(float x, float w, float yTop, float depth) {
  float u = min(1.0, x / w);
  return yTop - depth * pow(max(0.0, 1.0 - pow(u, 2.1)), 1.0 / 2.1);
}
float bwScoop(float ax, float y, float depth) {
  float w = uNeck.x;
  float yTop = uNeck.y;
  float yHi = uNeck2.y;
  vec2 q = vec2(ax, y);
  float best = bwSeg(q, vec2(w, yTop), vec2(w, yHi));
  vec2 pv = vec2(0.0, bwScoopCurve(0.0, w, yTop, depth));
  for (int i = 1; i <= 28; i++) {
    float x = w * float(i) / 28.0;
    vec2 cv = vec2(x, bwScoopCurve(x, w, yTop, depth));
    best = min(best, bwSeg(q, pv, cv));
    pv = cv;
  }
  float d = sqrt(best);
  bool inside = ax < w && y > bwScoopCurve(ax, w, yTop, depth);
  return inside ? -d : d;
}
float bwArmX(float t) {
  return uArm.x + (uArm.y - uArm.x) * (1.0 - sqrt(max(0.0, 1.0 - t * t)));
}
float bwArm(float ax, float y, float z) {
  float xs = uArm.x;
  float xa = uArm.y;
  float yT = uArm.z;
  float yA = uArm.w;
  if (ax > xa + 0.3 && y > yA - 2.0) return -(ax - xa);
  float yAz = yA + uArm2.z * bwSS(0.25, 1.0, abs(z - uArm2.x) / uArm2.y);
  float yMap = yAz > yA ? yT - (yT - y) * (yT - yA) / (yT - yAz) : y;
  vec2 q = vec2(ax, yMap);
  float best = bwSeg(q, vec2(xs, yT + 14.0), vec2(xs, yT));
  vec2 pv = vec2(xs, yT);
  for (int i = 1; i <= 40; i++) {
    float t = float(i) / 40.0;
    vec2 cv = vec2(bwArmX(t), yT - (yT - yA) * t);
    best = min(best, bwSeg(q, pv, cv));
    pv = cv;
  }
  best = min(best, bwSeg(q, pv, vec2(xa + 0.3, yA)));
  float d = sqrt(best) * min(1.0, (yT - yAz) / (yT - yA) + 0.25);
  float t = clamp((yT - y) / (yT - yAz), 0.0, 1.0);
  bool inside = y > yAz && ax > bwArmX(t);
  return inside ? -d : d;
}
`,A=globalThis.__pf??6,j=globalThis.__pu??6;function M(){let e=new _({color:`#ffffff`,roughness:.58,metalness:0,clearcoat:.06,clearcoatRoughness:.6,sheen:.12,sheenColor:new m(`#ffffff`),sheenRoughness:.6,polygonOffset:!0,polygonOffsetFactor:A,polygonOffsetUnits:j}),t=()=>({value:new f}),n={uSkin:{value:new m},uSuit:{value:new m(d)},uOn:{value:1},uNeck:t(),uNeck2:t(),uArm:t(),uArm2:t(),uMole:{value:Array.from({length:T},()=>new f)},uMoleC:{value:Array.from({length:T},()=>new f)},uMoleN:{value:0}};return e.userData.uniforms=n,e.onBeforeCompile=e=>{Object.assign(e.uniforms,n),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float aField;
attribute float aLow;
varying float vField;
varying float vLow;
varying vec3 vOP;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vField = aField;
vLow = aLow;
vOP = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,[`#include <common>`,`uniform vec3 uSkin;`,`uniform vec3 uSuit;`,`uniform float uOn;`,k].join(`
`)).replace(`#include <color_fragment>`,`float bwW = clamp(fwidth(vField), 1e-3, 0.6);
        float bwF = vField;
        if (abs(vField) < 7.0) {
          float bwAx = abs(vOP.x);
          float bwIn = smoothstep(-8.0, 8.0, vOP.z - uNeck2.x);
          float bwN = bwScoop(bwAx, vOP.y, mix(uNeck.w, uNeck.z, bwIn));
          float bwA = bwArm(bwAx, vOP.y, vOP.z);
          bwF = min(min(bwN, bwA), vLow);
          bwF = min(bwF, uNeck2.z - vOP.y);
        }
        float bwM = smoothstep(-0.7 * bwW, 0.7 * bwW, bwF) * uOn;
        vec3 bwC = uSuit * (0.97 + 0.06 * fract(sin(dot(floor(vViewPosition.xy * 6.0), vec2(12.9898, 78.233))) * 43758.5453));
        // 縁取り(ヘム): 縁の内側 3mm をほんの少し濃くして、線をくっきり見せる
        bwC *= 1.0 - 0.1 * (1.0 - smoothstep(0.0, 0.32, bwF));
        diffuseColor.rgb = mix(uSkin, bwC, bwM);
        for (int mi = 0; mi < 12; mi++) {
          if (float(mi) >= uMoleN) break;
          float mr = uMole[mi].w;
          float md = distance(vOP, uMole[mi].xyz);
          float ma = (1.0 - smoothstep(mr * 0.55, mr, md)) * uMoleC[mi].a * (1.0 - bwM);
          diffuseColor.rgb = mix(diffuseColor.rgb, uMoleC[mi].rgb, ma);
        }`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, 0.86, bwM);`)},e.customProgramCacheKey=()=>`bodyBaseWear7`,e}function N({rig:e,skinTone:t,skinColor:n,hideFeet:r,baseWear:i=!0,moles:a}){let o=(0,y.useMemo)(()=>{let t=D(e,r),n=u(e);return t.setAttribute(`aField`,new h(Float32Array.from(n.field),1)),t.setAttribute(`aLow`,new h(Float32Array.from(n.low),1)),t},[e,r]),s=(0,y.useMemo)(()=>M(),[]),c=(0,y.useMemo)(()=>new _({color:`#ffffff`,roughness:.4,metalness:0}),[]),l=O(t,n);return(0,y.useEffect)(()=>{let e=s.userData.uniforms;e.uSkin.value.set(l),e.uOn.value=+!!i,c.color.set(l)},[s,c,l,i]),(0,y.useEffect)(()=>{let e=s.userData.uniforms,t=(a??[]).slice(0,T),n=new m;t.forEach((t,r)=>{e.uMole.value[r].set(t.p[0],t.p[1],t.p[2],t.r),n.set(t.color),e.uMoleC.value[r].set(n.r,n.g,n.b,t.a)}),e.uMoleN.value=t.length},[s,a]),(0,y.useEffect)(()=>{let t=s.userData.uniforms,n=u(e);t.uNeck.value.set(...n.neck),t.uNeck2.value.set(...n.neck2),t.uArm.value.set(...n.arm),t.uArm2.value.set(...n.arm2)},[s,e]),(0,y.useEffect)(()=>()=>o.dispose(),[o]),(0,y.useEffect)(()=>()=>{s.dispose(),c.dispose()},[s,c]),(0,w.jsx)(`group`,{name:`Body`,children:(0,w.jsxs)(`mesh`,{geometry:o,castShadow:!0,receiveShadow:!0,children:[(0,w.jsx)(`primitive`,{object:s,attach:`material-0`}),(0,w.jsx)(`primitive`,{object:c,attach:`material-1`})]})})}function P(e,t){let n=new Float32Array(e.length);for(let r=0;r<t.length;r+=3){let i=t[r]*3,a=t[r+1]*3,o=t[r+2]*3,s=e[a]-e[i],c=e[a+1]-e[i+1],l=e[a+2]-e[i+2],u=e[o]-e[i],d=e[o+1]-e[i+1],f=e[o+2]-e[i+2],p=c*f-l*d,m=l*u-s*f,h=s*d-c*u;for(let e of[i,a,o])n[e]+=p,n[e+1]+=m,n[e+2]+=h}for(let e=0;e<n.length;e+=3){let t=Math.hypot(n[e],n[e+1],n[e+2])||1;n[e]/=t,n[e+1]/=t,n[e+2]/=t}return n}function F(e){let{head:t,mesh:n}=e,r=t.top-t.chin,i=(n.eyeCenter.L[1]+n.eyeCenter.R[1])/2,a=t.chin+r*.25,o=.15;for(let e=t.chin+r*.14;e<=t.chin+r*.36;e+=.12){let n=Math.max(t.frontZ(0,e-.7),t.frontZ(0,e+.7))-t.frontZ(0,e);n>o&&(o=n,a=e)}let s=t.halfWidth*.98;return{x0:-s,x1:s,y0:t.chin-.2,y1:i+r*.3,eyeL:[n.eyeCenter.L[0],i],eyeR:[n.eyeCenter.R[0],i],mouthY:a,headW:t.halfWidth*2,headH:r}}function I(e,t){let n=e.mesh,r=P(n.pos,n.idx),i=new Uint8Array(n.nBody),a=e.head.cz;for(let e=0;e<n.nBody;e++){let o=n.pos[e*3],s=n.pos[e*3+1],c=n.pos[e*3+2];i[e]=+(n.region.head[e]>.35&&o>=t.x0&&o<=t.x1&&s>=t.y0&&s<=t.y1&&c>a-1&&r[e*3+2]>.05)}let o=new Map,s=[],c=[],l=[],u=[],d=.045,f=e=>{let i=o.get(e);if(i===void 0){i=s.length/3,o.set(e,i);let a=r[e*3],u=r[e*3+1],f=r[e*3+2],p=n.pos[e*3]+a*d,m=n.pos[e*3+1]+u*d,h=n.pos[e*3+2]+f*d;s.push(p,m,h),l.push(a,u,f),c.push((n.pos[e*3]-t.x0)/(t.x1-t.x0),(n.pos[e*3+1]-t.y0)/(t.y1-t.y0))}return i};for(let e=0;e<n.nTris;e++){if(n.triGroup[e]!==0)continue;let t=n.idx[e*3],r=n.idx[e*3+1],a=n.idx[e*3+2];i[t]&&i[r]&&i[a]&&u.push(f(t),f(r),f(a))}let p=new g;return p.setAttribute(`position`,new h(new Float32Array(s),3)),p.setAttribute(`normal`,new h(new Float32Array(l),3)),p.setAttribute(`uv`,new h(new Float32Array(c),2)),p.setIndex(u),p}var L=1024;function R(e,t,n){let r=new m(e),i=new m(t);return r.lerp(i,n),`#`+r.getHexString()}function z(e,t,n,r,i,a,o){let{ctx:s,px:c,py:l,s:u}=e,d=a.headH/22,f={natural:{len:3.4,h:2.35,ang:.1,arch:.35,th0:.5,th1:.32},thick:{len:3.6,h:2.2,ang:.06,arch:.25,th0:.85,th1:.6},thin:{len:3.5,h:2.5,ang:.14,arch:.45,th0:.26,th1:.16},flat:{len:3.4,h:2.3,ang:0,arch:.05,th0:.55,th1:.4},arch:{len:3.5,h:2.55,ang:.16,arch:.85,th0:.45,th1:.2},trouble:{len:3.3,h:2.45,ang:-.26,arch:.25,th0:.55,th1:.3},rise:{len:3.5,h:2.2,ang:.34,arch:.3,th0:.55,th1:.3}},p=f[t]??f.natural,m=n-i*1.2*d,h=[],g=[];for(let e=0;e<=16;e++){let t=e/16,n=m+i*t*p.len*d*1.15,a=Math.sin(Math.PI*Math.min(1,t*.95+.05))*p.arch*.5*d,o=r+(p.h+t*p.ang*p.len*.9)*d+a-.2*d,s=(p.th0+(p.th1-p.th0)*t**.8)*d*(t<.12?.7+t*2.5:1);h.push([n,o+s/2]),g.push([n,o-s/2])}s.beginPath(),s.moveTo(c(h[0][0]),l(h[0][1]));for(let[e,t]of h)s.lineTo(c(e),l(t));for(let e=g.length-1;e>=0;e--)s.lineTo(c(g[e][0]),l(g[e][1]));s.closePath(),s.fillStyle=o,s.filter=`blur(${u(.09)}px)`,s.fill(),s.filter=`none`}function B(e,t,n,r){let i=e.getContext(`2d`);i.clearRect(0,0,L,L);let a=t.x1-t.x0,o=t.y1-t.y0,s={ctx:i,px:e=>(e-t.x0)/a*L,py:e=>(1-(e-t.y0)/o)*L,s:e=>e/a*L},c=t.headH/22,l=R(r,`#3a2f28`,.42),u=n.makeup?R(r,`#33271f`,.85):R(r,`#4a3d33`,.66);for(let[e,r]of[[t.eyeL,1],[t.eyeR,-1]])z(s,n.brow,e[0],e[1],r,t,u);let d=(e,t,n,r,a,o,c)=>{i.save(),i.filter=`blur(${s.s(c)}px)`,i.globalAlpha=o,i.fillStyle=a,i.beginPath(),i.ellipse(s.px(e),s.py(t),s.s(n),s.s(r),0,0,Math.PI*2),i.fill(),i.restore()};if(n.blush||n.makeup){let e=n.makeup?`#e07a78`:`#e8a29b`;for(let[r,i]of[[t.eyeL,1],[t.eyeR,-1]])d(r[0]+i*1.7*c,r[1]-2.7*c,1.9*c,1.2*c,e,n.makeup?.36:.3,.8*c)}if(!n.makeup){let e={tsuri:.3,nagame:.16,tare:-.3,hosome:.05,maru:-.04,ookime:0,standard:.04},a={maru:.8,ookime:.88,hosome:.28,nagame:.42,tsuri:.5,tare:.55,standard:.52},o=e[n.eye]??.04,l=a[n.eye]??.5;for(let[e,n]of[[t.eyeL,1],[t.eyeR,-1]]){i.save(),i.strokeStyle=R(r,`#2f2622`,.78),i.globalAlpha=.55,i.lineCap=`round`,i.filter=`blur(${s.s(.05)}px)`,i.lineWidth=s.s(.13*c),i.beginPath();for(let t=0;t<=14;t++){let r=t/14,a=e[0]-n*1.45*c+n*r*3*c,u=e[1]+.2*c+l*c*Math.sin(Math.PI*Math.min(1,r*1.02))+o*r*1.6*c;t===0?i.moveTo(s.px(a),s.py(u)):i.lineTo(s.px(a),s.py(u))}i.stroke(),i.globalAlpha=.22,i.lineWidth=s.s(.09*c),i.beginPath();for(let t=0;t<=10;t++){let r=t/10,a=e[0]-n*1.2*c+n*r*2.5*c,l=e[1]+.05*c-.38*c*Math.sin(Math.PI*r)+o*r*1.1*c;t===0?i.moveTo(s.px(a),s.py(l)):i.lineTo(s.px(a),s.py(l))}i.stroke(),i.restore()}}if(n.makeup)for(let[e,n]of[[t.eyeL,1],[t.eyeR,-1]]){d(e[0],e[1]+.75*c,1.85*c,.75*c,R(r,`#b06a64`,.55),.38,.45*c),i.save(),i.strokeStyle=`#3a2a26`,i.globalAlpha=.85,i.lineCap=`round`,i.filter=`blur(${s.s(.06)}px)`,i.lineWidth=s.s(.2*c),i.beginPath();for(let t=0;t<=12;t++){let r=t/12,a=e[0]-n*1.5*c+n*r*3.1*c,o=e[1]+.52*c*Math.sin(Math.PI*Math.min(1,r*1.05))+n*0+(r>.85?(r-.85)*1.8*c:0);t===0?i.moveTo(s.px(a),s.py(o)):i.lineTo(s.px(a),s.py(o))}i.stroke(),i.restore()}{let e=t.mouthY,a=n.makeup?n.lipColor:R(r,`#9a6a5d`,.32);d(0,e-.12*c,2.2*c,.72*c,a,n.makeup?.78:.5,.2*c),i.save(),i.strokeStyle=n.makeup?R(n.lipColor,`#2a1210`,.45):l,i.globalAlpha=n.makeup?.7:.45,i.lineCap=`round`,i.filter=`blur(${s.s(.05)}px)`,i.lineWidth=s.s(.09*c),i.beginPath(),i.moveTo(s.px(-2.1*c),s.py(e+0)),i.quadraticCurveTo(s.px(0),s.py(e+.1*c),s.px(2.1*c),s.py(e+0)),i.stroke(),i.restore()}if(n.freckles){i.save(),i.fillStyle=R(r,`#6b4630`,.55);let e=12345,n=()=>(e=(e*1664525+1013904223)%4294967296)/4294967296;for(let e of[1,-1])for(let r=0;r<22;r++){let r=e*(.6+n()*3.4)*c,a=t.eyeL[1]-(1.7+n()*1.6)*c;i.globalAlpha=.28+n()*.3,i.beginPath(),i.arc(s.px(r),s.py(a),s.s((.07+n()*.08)*c),0,Math.PI*2),i.fill()}i.restore()}}function V({rig:e,face:t,skinTone:n,skinColor:r}){let i=(0,y.useMemo)(()=>F(e),[e]),a=(0,y.useMemo)(()=>I(e,i),[e,i]),o=O(n,r),s=(0,y.useMemo)(()=>{let e=document.createElement(`canvas`);e.width=L,e.height=L,B(e,i,t,o);let n=new v(e);return n.colorSpace=p,n.anisotropy=4,n},[i,t,o]);return(0,y.useEffect)(()=>()=>a.dispose(),[a]),(0,y.useEffect)(()=>()=>s.dispose(),[s]),(0,w.jsx)(`mesh`,{geometry:a,name:`FaceDecal`,renderOrder:2,children:(0,w.jsx)(`meshStandardMaterial`,{map:s,transparent:!0,depthWrite:!1,roughness:.55,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:2})})}var H=r(e=>({active:!1,selectedId:null,setActive:t=>e({active:t}),select:t=>e({selectedId:t})}));function U(e){let t=e.mesh,n=0;for(;n<t.nTris&&t.triGroup[n]===0;)n++;return n}function W(e,t,n,r){let i=e.mesh,a=i.pos,o=i.idx,s=U(e),c=null;for(let e=0;e<s;e++){let i=o[e*3]*3,s=o[e*3+1]*3,l=o[e*3+2]*3,u=a[s]-a[i],d=a[s+1]-a[i+1],f=a[s+2]-a[i+2],p=a[l]-a[i],m=a[l+1]-a[i+1],h=a[l+2]-a[i+2],g=n[1]*h-n[2]*m,_=n[2]*p-n[0]*h,v=n[0]*m-n[1]*p,y=u*g+d*_+f*v;if(Math.abs(y)<1e-9)continue;let b=1/y,x=t[0]-a[i],S=t[1]-a[i+1],C=t[2]-a[i+2],w=(x*g+S*_+C*v)*b;if(w<0||w>1)continue;let T=S*f-C*d,E=C*u-x*f,D=x*d-S*u,O=(n[0]*T+n[1]*E+n[2]*D)*b;if(O<0||w+O>1)continue;let k=(p*T+m*E+h*D)*b;if(k<=0||c&&k>=c.dist)continue;let A=[t[0]+n[0]*k,t[1]+n[1]*k,t[2]+n[2]*k];if(r?.minY!==void 0&&A[1]<r.minY||r?.maxY!==void 0&&A[1]>r.maxY)continue;let j=d*h-f*m,M=f*p-u*h,N=u*m-d*p,P=Math.hypot(j,M,N)||1;j/=P,M/=P,N/=P,j*n[0]+M*n[1]+N*n[2]>0&&(j=-j,M=-M,N=-N),c={tri:e,u:w,v:O,point:A,normal:[j,M,N],dist:k}}return c}var G=new WeakMap;function K(e){if(G.has(e))return G.get(e)??null;let t=F(e),n=t.headH/22,r=W(e,[-2.6*n,t.mouthY-1.15*n,e.head.cz+40],[0,0,-1],{minY:e.head.chin-1});return G.set(e,r),r}function q(e,t){let n=F(e),r=n.headH/22,i=[[-2.6,-1.15],[2.9,-.5],[-3.4,.9],[3.6,.6],[0,-3],[-1.2,2.6]],[a,o]=i[t%i.length];return W(e,[a*r,n.mouthY+o*r,e.head.cz+40],[0,0,-1],{minY:e.head.chin-1})}function J(e,t){let n=t.tri,r=t.u,i=t.v;if(n<0){let t=K(e);if(!t)return null;n=t.tri,r=t.u,i=t.v}if(!Number.isInteger(n)||n>=e.mesh.nTris||e.mesh.triGroup[n]!==0)return null;let a=e.mesh.idx,o=e.mesh.pos,s=a[n*3]*3,c=a[n*3+1]*3,l=a[n*3+2]*3,u=1-r-i;return[o[s]*u+o[c]*r+o[l]*i,o[s+1]*u+o[c+1]*r+o[l+1]*i,o[s+2]*u+o[c+2]*r+o[l+2]*i]}function Y(e,t){let n=t.tri;n<0&&(n=K(e)?.tri??0);let r=e.mesh.idx,i=e.mesh.pos,a=r[n*3]*3,o=r[n*3+1]*3,s=r[n*3+2]*3,c=[i[o]-i[a],i[o+1]-i[a+1],i[o+2]-i[a+2]],l=[i[s]-i[a],i[s+1]-i[a+1],i[s+2]-i[a+2]],u=[c[1]*l[2]-c[2]*l[1],c[2]*l[0]-c[0]*l[2],c[0]*l[1]-c[1]*l[0]],d=Math.hypot(u[0],u[1],u[2])||1;return[u[0]/d,u[1]/d,u[2]/d]}function X(e){return{id:`m${Date.now().toString(36)}${Math.floor(Math.random()*1296).toString(36)}`,tri:e?.tri??-1,u:e?.u??0,v:e?.v??0,size:a.default,color:`#4a342a`,strength:.85}}function Z(e,t){let n=[];for(let r of(t??[]).slice(0,12)){let t=J(e,r);t&&n.push({p:t,r:r.size/20,color:r.color,a:r.strength})}return n}export{Z as a,H as c,J as i,V as l,K as n,X as o,Y as r,W as s,q as t,N as u};