import { getCollection } from 'astro:content';
export async function publishedTrips(){ return (await getCollection('trips')).filter(t=>!t.data.draft).sort((a,b)=>b.data.sortDate.getTime()-a.data.sortDate.getTime()); }
export async function visiblePhotos(){
 const allTrips=await getCollection('trips');const trips=await publishedTrips();const ids=new Set(trips.map(t=>t.id));
 const photos=await getCollection('photos');
 for(const t of trips){if(!photos.some(p=>p.id===t.data.coverId && p.data.trip===t.id))throw new Error(`Missing cover ${t.data.coverId} for ${t.id}`);}
 for(const p of photos){if(p.data.trip && !allTrips.some(t=>t.id===p.data.trip))throw new Error(`Unknown trip ${p.data.trip}`);}
 return photos.filter(p=>!p.data.trip||ids.has(p.data.trip)).sort((a,b)=>a.data.order-b.data.order);
}
