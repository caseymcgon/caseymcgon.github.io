import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
const [slug,title='Untitled trip']=process.argv.slice(2);
if(!slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)){console.error('Usage: pnpm new:trip <lowercase-slug> "Trip title"');process.exit(1);}
const file=resolve('src/content/trips',slug,'index.mdx');
await mkdir(dirname(file),{recursive:true});
await writeFile(file,`---\ntitle: ${JSON.stringify(title)}\ndescription: "Add a short summary."\nperiod: "Add the trip dates"\nsortDate: ${new Date().toISOString().slice(0,10)}\nlocation: "Add the location"\ncoverId: "replace-with-photo-id"\nfeatured: false\ndraft: true\ntags: []\n---\n\n## The story\n\nStart writing here.\n`.replaceAll('\\n','\n'),{flag:'wx'});
console.log(`Created ${file}. Add photos and a coverId, then set draft: false when ready.`);
