import fs from 'node:fs/promises';
const paths={quick:'C:/Users/Hasan/OneDrive/Desktop/FitPlan/الصفحات و الادوات/fast-cook-svgrepo-com.svg',cook:'C:/Users/Hasan/OneDrive/Desktop/FitPlan/الصفحات و الادوات/cook-by-myslef-tray-svgrepo-com.svg'};
const icons={};
for(const [key,path] of Object.entries(paths)){
 const raw=await fs.readFile(path,'utf8'); const viewBox=raw.match(/viewBox="([^"]+)"/i)?.[1]; const inner=raw.match(/<g>([\s\S]*?)<\/g>/i)?.[1];
 if(!viewBox||!inner) throw new Error('SVG structure not recognized: '+path);
 icons[key]=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor" aria-hidden="true">${inner.replace(/\s+/g,' ').trim()}</svg>`;
}
const p='outputs/fitplan-maintainable-source/src/scripts/04b-cooking-catalog.js';let s=await fs.readFile(p,'utf8');
const marker='        const FC_RAW_CATALOG = ';
if(!s.includes(marker))throw new Error('raw catalog insertion point missing');
s=s.replace(marker,'        const FC_MODE_ICONS = '+JSON.stringify(icons)+';\n'+marker);
await fs.writeFile(p,s,'utf8');
const q='outputs/fitplan-maintainable-source/src/scripts/05-food-preferences.js';let w=await fs.readFile(q,'utf8');
const from="[['quick','fc_mode_quick','fc_mode_quick_desc','◷'],['cook','fc_mode_cook','fc_mode_cook_desc','✳']].map(([v,title,desc,icon]) => '<button type=\"button\" class=\"card fc-mode-card' + (current === v ? ' is-selected' : '') + '\" data-act=\"ob-pref-mode\" data-v=\"' + v + '\" aria-pressed=\"' + (current === v) + '\"><span class=\"fc-mode-icon\" aria-hidden=\"true\">' + icon + '</span><b>' + t(title)";
const to="[['quick','fc_mode_quick','fc_mode_quick_desc'],['cook','fc_mode_cook','fc_mode_cook_desc']].map(([v,title,desc]) => '<button type=\"button\" class=\"card fc-mode-card' + (current === v ? ' is-selected' : '') + '\" data-act=\"ob-pref-mode\" data-v=\"' + v + '\" aria-pressed=\"' + (current === v) + '\"><span class=\"fc-mode-icon\" aria-hidden=\"true\">' + FC_MODE_ICONS[v] + '</span><b>' + t(title)";
if(!w.includes(from))throw new Error('mode card markup not found');w=w.replace(from,to);
w=w.replace('.fc-mode-card small{color:var(--muted);line-height:1.5}', '.fc-mode-card small{color:var(--muted);line-height:1.5}.fc-mode-icon svg{display:block;width:28px;height:28px;fill:currentColor}');
await fs.writeFile(q,w,'utf8');console.log('Added both SVGs as theme-aware inline icons.');
