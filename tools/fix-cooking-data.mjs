import fs from 'node:fs/promises';
const p='outputs/fitplan-maintainable-source/src/scripts/04b-cooking-catalog.js'; let s=await fs.readFile(p,'utf8');
const match=s.match(/const FC_RAW_CATALOG = (.*);\s*$/s); if(!match) throw new Error('raw catalog data missing');
const data=JSON.parse(match[1]); for(const x of data) x.needsReview = typeof x.kcal !== 'number' || typeof x.protein !== 'number' || typeof x.carbs !== 'number' || typeof x.fat !== 'number';
s=s.replace(match[0], 'const FC_RAW_CATALOG = '+JSON.stringify(data)+';'); await fs.writeFile(p,s,'utf8'); console.log('records='+data.length+'; pending nutrition values='+data.filter(x=>x.needsReview).length);
