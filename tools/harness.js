// Runs model() from index.html in Node against a stubbed DOM.
// usage: node tools/harness.js [overrides as id=value ...]  e.g. node tools/harness.js i_qr=0.5
const fs=require('fs'), path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
let src=scripts[scripts.length-1];
// keep everything up to the RENDER section; render() needs Chart.js and real layout
src=src.split('// ═════════ RENDER ═════════')[0];
// collect default values of every input in the HTML
const vals={};
for(const m of html.matchAll(/<input[^>]*id="([^"]+)"[^>]*value="([^"]+)"/g)) vals[m[1]]=m[2];
for(const m of html.matchAll(/<select[^>]*id="([^"]+)"/g)){ const opt=/<option[^>]*selected[^>]*value="([^"]*)"/.exec(html.slice(m.index,m.index+800)); vals[m[1]]=opt?opt[1]:'0'; }
const els={};
const document={getElementById:id=>{ if(!els[id]) els[id]={id,_v:vals[id]??'0',innerHTML:'',textContent:'',
    get value(){return this._v}, set value(v){this._v=String(v)}, checked:false}; return els[id]; },
  querySelectorAll:()=>[], addEventListener:()=>{}};
const sandbox={document,console,Math};
const fn=new Function('document', src+'\n;return {model,buildGrid,readSegs,V,SEG,GROWTH,ROLES,NY};');
const M=fn(document);
M.buildGrid();
// buildGrid wrote innerHTML with inputs; harvest their defaults
for(const id in els){ for(const m of els[id].innerHTML.matchAll(/<input[^>]*id="([^"]+)"[^>]*value="([^"]+)"/g)) vals[m[1]]=m[2]; }
for(const a of process.argv.slice(2)){ const [k,v]=a.split('='); document.getElementById(k).value=v; }
const m=M.model();
module.exports=m;
if(require.main===module){
  const f=v=>(v/1e6).toFixed(2);
  console.log('EV', f(m.EV),'M  raEV',f(m.raEV),'M  BE yr',m.be);
  console.log('yr  cust     rev    cNim   mNim   payM   payNet  aumRev  ebitda   margin  arpu  ltv:cac');
  for(const y of m.Y) console.log(String(y.y).padStart(2),String(Math.round(y.cust)).padStart(9),
    f(y.rev).padStart(8),f(y.cNim).padStart(7),f(y.mNim).padStart(7),f(y.payM).padStart(7),
    f(y.payNet??y.payIC??0).padStart(7),f(y.aumRev).padStart(7),f(y.ebitda).padStart(8),
    (y.rev?(100*y.ebitda/y.rev).toFixed(0)+'%':'').padStart(6),(y.rev/y.cust).toFixed(0).padStart(6),y.ue.ratio.toFixed(2).padStart(6));
}
