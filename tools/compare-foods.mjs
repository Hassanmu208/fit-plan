import fs from 'node:fs';
const s=fs.readFileSync('outputs/fitplan-maintainable-source/src/scripts/04-food-catalog.js','utf8');
const m=s.match(/const FORMETK_REVIEWED_FOODS = (\[[\s\S]*?\]);\s*const CATALOG/);
if(!m)throw Error('quick data extraction'); const q=JSON.parse(m[1]);
for(const c of [...new Set(q.map(x=>x.category))])console.log('\n'+c+': '+[...new Set(q.filter(x=>x.category===c).map(x=>x.nameAr))].join('، '));
