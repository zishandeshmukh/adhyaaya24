import * as universal from '../entries/pages/(app)/register/_page.ts.js';
import * as server from '../entries/pages/(app)/register/_page.server.ts.js';
import stylesheet_6 from '../stylesheets/6.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/register/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/(app)/register/+page.ts";
export { server };
export const server_id = "src/routes/(app)/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.a6181c1d.js","_app/immutable/chunks/index.8f2ca6db.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/chunks/events.dca832d9.js","_app/immutable/chunks/index.d9bcf563.js","_app/immutable/chunks/forms.abbcba17.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.4cde7222.js","_app/immutable/chunks/index.9a7c0c1f.js","_app/immutable/chunks/paths.42f15c2a.js","_app/immutable/chunks/navigation.553eb401.js","_app/immutable/chunks/index.82bf2e87.js","_app/immutable/chunks/iconify-icon.6d541906.js","_app/immutable/chunks/util.d4eb44f1.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.6afbda2d.js","_app/immutable/chunks/store.4eb84912.js","_app/immutable/chunks/stores.e5e137fe.js"];
export const stylesheets = ["_app/immutable/assets/9.1a496daa.css","_app/immutable/assets/Toaster.5032d475.css"];
export const fonts = [];
export const inline_styles = () => ({
	"_app/immutable/assets/9.1a496daa.css": stylesheet_6
});
