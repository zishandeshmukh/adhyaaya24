import * as universal from '../entries/pages/(app)/guide/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/guide/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/(app)/guide/+page.ts";
export const imports = ["_app/immutable/nodes/6.f9e2d724.js","_app/immutable/chunks/index.fd2af49c.js","_app/immutable/chunks/events.dca832d9.js"];
export const stylesheets = [];
export const fonts = [];
