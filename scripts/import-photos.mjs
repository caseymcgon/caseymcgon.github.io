import sharp from 'sharp';
import {readdir,mkdir,readFile,writeFile,access} from 'node:fs/promises';
import {resolve,join,extname,basename} from 'node:path';
const [folder,trip]=process.argv.slice(2);
if(!folder||!trip||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trip)){console.error('Usage: pnpm import:photos "/path/to/photos" <trip-slug>');process.exit(1);}
const catalogPath='src/content/photos/photos.json';const catalog=JSON.parse(await readFile(catalogPath,'utf8'));
const dest=resolve('src/assets',trip);await mkdir(dest,{recursive:true});
const files=(await readdir(folder)).filter(f=>/\.(tiff?|jpe?g|png|webp)$/i.test(f)).sort();
let count=0;
for(const f of files){const stem=basename(f,extname(f)).toLowerCase().replace(/[^a-z0-9-]/g,'-');const id=`${trip}-${stem}`;const output=join(dest,`${stem}.jpg`);
 if(catalog.some(p=>p.id===id)){console.log(`Skipped existing ${id}`);continue;}
 try{await access(output);throw new Error(`Refusing to overwrite ${output}`);}catch(e){if(e.code!=='ENOENT')throw e;}
 await sharp(join(resolve(folder),f)).rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).jpeg({quality:88,mozjpeg:true}).toFile(output);
 catalog.push({id,src:`../../assets/${trip}/${stem}.jpg`,alt:`Describe this photograph: ${stem}`,trip,selected:false,order:catalog.length});
 await writeFile(catalogPath,JSON.stringify(catalog,null,2)+'\n');count++;
}
console.log(`Imported ${count} photo(s). Edit alt text and captions in ${catalogPath}. Original files were left untouched.`);
