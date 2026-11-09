import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';
const trips = defineCollection({
 loader:glob({pattern:'**/*.{md,mdx}',base:'./src/content/trips'}),
 schema:z.object({title:z.string(),description:z.string(),period:z.string(),sortDate:z.coerce.date(),location:z.string(),coverId:z.string(),featured:z.boolean().default(false),draft:z.boolean().default(false),tags:z.array(z.string()).default([])})
});
const photos = defineCollection({
 loader:file('src/content/photos/photos.json', {parser: text => {
  const entries = JSON.parse(text);
  const ids = new Set<string>();
  for (const entry of entries) {
    if (ids.has(entry.id)) throw new Error(`Duplicate photo ID: ${entry.id}`);
    ids.add(entry.id);
  }
  return entries;
 }}),
 schema:({image})=>z.object({src:image(),alt:z.string().min(1),caption:z.string().optional(),trip:z.string().optional(),selected:z.boolean().default(false),order:z.number().default(0)})
});
export const collections={trips,photos};
