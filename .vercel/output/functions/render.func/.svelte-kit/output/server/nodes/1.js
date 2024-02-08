

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.12018140.js","_app/immutable/chunks/index.d9bcf563.js","_app/immutable/chunks/stores.e5e137fe.js","_app/immutable/chunks/singletons.4cde7222.js","_app/immutable/chunks/index.9a7c0c1f.js","_app/immutable/chunks/paths.42f15c2a.js"];
export const stylesheets = [];
export const fonts = [];
