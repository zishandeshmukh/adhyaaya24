import stylesheet_9 from '../stylesheets/9.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/sponsors/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.a91d6233.js","_app/immutable/chunks/index.5a650a7b.js","_app/immutable/chunks/index.82bf2e87.js"];
export const stylesheets = ["_app/immutable/assets/10.0fbda1fe.css"];
export const fonts = [];
export const inline_styles = () => ({
	"_app/immutable/assets/10.0fbda1fe.css": stylesheet_9
});
