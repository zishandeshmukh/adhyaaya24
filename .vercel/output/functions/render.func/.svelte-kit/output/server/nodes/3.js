import * as universal from '../entries/pages/(app)/events/_page.ts.js';
import stylesheet_7 from '../stylesheets/7.js';
import stylesheet_3 from '../stylesheets/3.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/events/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/(app)/events/+page.ts";
export const imports = ["_app/immutable/nodes/3.429709f5.js","_app/immutable/chunks/events.dca832d9.js","_app/immutable/chunks/index.d9bcf563.js","_app/immutable/chunks/store.4eb84912.js","_app/immutable/chunks/index.9a7c0c1f.js","_app/immutable/chunks/EventInfoModal.ce4b383c.js","_app/immutable/chunks/navigation.553eb401.js","_app/immutable/chunks/singletons.4cde7222.js","_app/immutable/chunks/paths.42f15c2a.js","_app/immutable/chunks/util.d4eb44f1.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.6afbda2d.js","_app/immutable/chunks/stores.e5e137fe.js"];
export const stylesheets = ["_app/immutable/assets/3.51006094.css","_app/immutable/assets/EventInfoModal.fbc88251.css","_app/immutable/assets/Toaster.5032d475.css"];
export const fonts = [];
export const inline_styles = () => ({
	"_app/immutable/assets/3.51006094.css": stylesheet_7,
	"_app/immutable/assets/EventInfoModal.fbc88251.css": stylesheet_3
});
