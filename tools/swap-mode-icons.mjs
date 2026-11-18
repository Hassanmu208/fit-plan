import fs from 'node:fs/promises';
const p='src/scripts/04b-cooking-catalog.js'; let s=await fs.readFile(p,'utf8');
const m=s.match(/const FC_MODE_ICONS = (\{[^\n]+\});/); if(!m) throw new Error('mode icon map not found');
const icons=JSON.parse(m[1]); [icons.quick,icons.cook]=[icons.cook,icons.quick];
s=s.replace(m[0],'const FC_MODE_ICONS = '+JSON.stringify(icons)+';');
await fs.writeFile(p,s,'utf8'); console.log('Swapped quick and cook icons');
