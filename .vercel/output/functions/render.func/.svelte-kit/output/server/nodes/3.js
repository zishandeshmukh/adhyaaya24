import * as universal from '../entries/pages/(app)/events/_page.ts.js';
import stylesheet_7 from '../stylesheets/7.js';
import stylesheet_3 from '../stylesheets/3.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/events/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/(app)/events/+page.ts";
export const imports = ["_app/immutable/nodes/3.9080ef77.js","_app/immutable/chunks/events.dca832d9.js","_app/immutable/chunks/index.6031e960.js","_app/immutable/chunks/store.610523bc.js","_app/immutable/chunks/index.2d608655.js","_app/immutable/chunks/EventInfoModal.d73c2490.js","_app/immutable/chunks/navigation.32451dd4.js","_app/immutable/chunks/singletons.6858b344.js","_app/immutable/chunks/util.36820054.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.d8a9503c.js","_app/immutable/chunks/stores.76222807.js"];
export const stylesheets = ["_app/immutable/assets/3.b976b217.css","_app/immutable/assets/EventInfoModal.fbc88251.css","_app/immutable/assets/Toaster.5032d475.css"];
export const fonts = [];
export const inline_styles = () => ({
	"_app/immutable/assets/3.b976b217.css": stylesheet_7,
	"_app/immutable/assets/EventInfoModal.fbc88251.css": stylesheet_3
});
