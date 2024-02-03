import { y as assign, z as now, A as loop, B as identity, c as create_ssr_component, s as subscribe, e as escape, d as each, f as add_attribute, v as validate_component } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index3.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { p as page } from "../../chunks/stores.js";
import { E as EVENTS } from "../../chunks/events.js";
import "../../chunks/Toaster.svelte_svelte_type_style_lang.js";
/* empty css                                                         */import "devalue";
import { a as adhyaaya_solid_logo } from "../../chunks/solid-resize.js";
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const drone = "/_app/immutable/assets/drone.5226bdc2.glb";
const nova = "/_app/immutable/assets/sb.94b83198.glb";
class Sketch {
  scene;
  camera;
  renderer;
  model1;
  model2;
  floatingSpeed = 2e-3;
  scrollPosition = 0;
  lastScrollPosition = 0;
  loaded = false;
  constructor(canvas) {
    this.scene = new THREE.Scene();
    this.model1 = new THREE.Object3D();
    this.model2 = new THREE.Object3D();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
    this.camera.position.z = 6;
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const loader1 = new GLTFLoader();
    loader1.load(drone, (gltf) => {
      this.model1 = gltf.scene;
      if (window.innerWidth < 1024) {
        this.model1.position.set(0, 0, 5);
        this.model1.scale.set(0.15, 0.15, 0.15);
      } else {
        this.model1.position.set(0.4, 0, 5.5);
        this.model1.scale.set(0.1, 0.1, 0.1);
      }
      this.scene.add(this.model1);
      this.loaded = true;
    });
    const loader2 = new GLTFLoader();
    loader2.load(nova, (gltf) => {
      this.model2 = gltf.scene;
      if (window.innerWidth < 1024) {
        this.model2.position.set(0, 0, 5);
      } else {
        this.model2.position.set(0, 0, 5);
      }
      this.model2.rotation.x = -1.3;
      this.scene.add(this.model2);
      this.loaded = true;
    });
    const ambientLight = new THREE.AmbientLight(4210752);
    ambientLight.intensity = 10;
    this.scene.add(ambientLight);
    this.animate();
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      if (window.innerWidth < 1024) {
        this.model1.position.set(0, 0, 5);
        this.model1.scale.set(0.15, 0.15, 0.15);
      } else {
        this.model1.position.set(0.4, 0, 5.5);
        this.model1.scale.set(0.1, 0.1, 0.1);
      }
    });
  }
  handleScroll = () => {
    this.scrollPosition = window.scrollY;
    const normalizedScroll = this.scrollPosition / (document.body.scrollHeight - window.innerHeight);
    this.model1.rotation.y = 90 + normalizedScroll * Math.PI * -2;
    this.model2.rotation.y = 90 + normalizedScroll * Math.PI * -2;
    this.model2.rotation.x = 90 + normalizedScroll * Math.PI * -2;
    this.model2.rotation.z = 90 + normalizedScroll * Math.PI * -2;
  };
  animate = () => {
    this.handleScroll();
    requestAnimationFrame(this.animate);
    if (this.model1) {
      this.model1.position.y = Math.cos(Date.now() * this.floatingSpeed) * 0.01;
      this.camera.position.y = Math.sin(Date.now() * this.floatingSpeed) * 0.02;
    }
    if (this.model2)
      ;
    this.renderer.render(this.scene, this.camera);
  };
}
const Home_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".big-text.svelte-f1c7x3{background-size:200% 200%;background-position:100% 100%;background-color:#8ec5fc;background-image:linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);transition-property:all;transition-duration:300ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.big-text.svelte-f1c7x3:hover{background-position:0% 0%}",
  map: null
};
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { scrollPos = 0 } = $$props;
  if ($$props.scrollPos === void 0 && $$bindings.scrollPos && scrollPos !== void 0)
    $$bindings.scrollPos(scrollPos);
  $$result.css.add(css$6);
  $$unsubscribe_page();
  return `${$page.url.pathname === "/" ? `<div class="wrapper w-full h-full flex items-center text-left relative"><div class="main w-full ml-[8.33333333333333334%] md:ml-[16.66666666667%]"><div class="big-text w-5/6 md:w-7/12 text-3xl xl:text-5xl 2xl:text-6xl bg-clip-text text-transparent hemnder font-bold leading-[3.5rem] xl:leading-[5.5rem] 2xl:leading-[7rem] svelte-f1c7x3">Embark on an interstellar journey to space with Adhyaaya where innovation meets the infinite!
		</div></div>
	
	${scrollPos < 35 ? `<div class="scroll-text absolute left-[8.33333333333333334%] md:left-[16.66666666667%] bottom-0 text-2xl font-normal text-white opacity-60">SCROLL TO EXPLORE
			<div class="scroll-line mt-2 h-24 w-1 bg-blue-300/80 "></div></div>` : ``}</div>` : ``}

`;
});
const EventsCarousel_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "@keyframes svelte-1mhxldn-scroll{0%{transform:translateX(0)}100%{transform:translateX(calc(-250px * 6))}}@keyframes svelte-1mhxldn-scroll-alt{0%{transform:translateX(0)}100%{transform:translateX(calc(250px * 6))}}.slider.svelte-1mhxldn.svelte-1mhxldn{box-shadow:0 10px 20px -5px rgba(0, 0, 0, 0.125);height:100px;overflow:hidden;position:relative;display:flex;height:10rem;width:100%;align-items:center;justify-content:center;border-radius:1rem;--tw-shadow:0 25px 50px -12px rgb(0 0 0 / 0.25);--tw-shadow-colored:0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.slider.svelte-1mhxldn.svelte-1mhxldn::before,.slider.svelte-1mhxldn.svelte-1mhxldn::after{content:'';height:100px;position:absolute;width:200px;z-index:2;background-color:transparent}.slider.svelte-1mhxldn.svelte-1mhxldn::after{right:0;top:0;transform:rotateZ(180deg)}.slider.svelte-1mhxldn.svelte-1mhxldn::before{left:0;top:0}.slider.svelte-1mhxldn .slide-track.svelte-1mhxldn{animation:svelte-1mhxldn-scroll 40s linear infinite forwards;display:flex;width:calc(250px * var(--width, 18))}.slider.svelte-1mhxldn .slide-track.true.svelte-1mhxldn{animation:svelte-1mhxldn-scroll-alt 40s linear infinite forwards;display:flex;width:calc(250px * var(--width, 18))}.slider.svelte-1mhxldn .slide.svelte-1mhxldn{height:100px;width:250px}",
  map: null
};
function shuffle(array) {
  array = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const EventsCarousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { alt = false } = $$props;
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  $$result.css.add(css$5);
  return `<div class="slider svelte-1mhxldn"><div style="${"--width: " + escape(EVENTS.length, true)}" class="${"slide-track " + escape(alt, true) + " svelte-1mhxldn"}">${each(shuffle(EVENTS.filter((e) => e.is_active)), (event) => {
    return `<div class="slide inline-flex items-center justify-center svelte-1mhxldn"><button class="flex flex-col items-center justify-center h-full text-xl">${event.icon.includes("url::") ? `<img class="h-full lg:h-12 w-9 lg:w-12 object-contain transition-transform ease-in-out duration-300 transform hover:scale-110"${add_attribute("src", event.icon.replace("url::", ""), 0)} alt="">` : `<iconify-icon class="text-6xl"${add_attribute("icon", event.icon, 0)}></iconify-icon>`}
					<p>${escape(event.name)}</p></button>
			</div>`;
  })}</div>
</div>`;
});
const Events_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "@keyframes svelte-nb17le-move-da-button{0%,100%{background-position:left center}50%{background-position:right center}}.da-button.svelte-nb17le{background-size:200% auto;animation:svelte-nb17le-move-da-button 10s ease infinite}.da-button.svelte-nb17le::before{background-size:200% auto;animation:svelte-nb17le-move-da-button 10s ease infinite;z-index:-1;content:'';position:absolute;height:100%;width:100%;max-width:32rem;--tw-scale-x:1.05;--tw-scale-y:1.05;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:0.75rem;background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:#ec4899 var(--tw-gradient-from-position);--tw-gradient-to:rgb(236 72 153 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:rgb(217 70 239 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #d946ef var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-to:#0ea5e9 var(--tw-gradient-to-position);padding:1rem;text-align:center;opacity:0.5;--tw-blur:blur(16px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:300ms}",
  map: null
};
const Events = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<div class="mini-events-container flex flex-col h-full w-full justify-evenly items-center md:px-20 lg:px-40">${validate_component(EventsCarousel, "EventsCarousel").$$render($$result, {}, {}, {})}

	<div class="middle-container text-xl lg:text-3xl flex items-center flex-col">
		
		<a href="/events" class="da-button relative lg:p-8 max-w-xs lg:max-w-lg text-center bg-gradient-to-r from-pink-500 via-fuchsia-500 to-sky-500 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 active:opacity-90 inline-flex items-center justify-center gap-3 text-white svelte-nb17le"><span>EXPLORE OUR EVENTS</span> <iconify-icon icon="mdi:arrow-right"></iconify-icon></a>
		</div>

	${validate_component(EventsCarousel, "EventsCarousel").$$render($$result, { alt: true }, {}, {})}
</div>`;
});
const ContactUs_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".section.svelte-neitl1{-webkit-backdrop-filter:blur(0px);backdrop-filter:blur(0px)}.card-title.svelte-neitl1{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}",
  map: null
};
const ContactUs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<div class="h-auto md:h-auto h-[200vh] w-full flex flex-col justify-between"><div class="w-full h-[100vh] "><div class="w-full md:w-5/6 m-auto md:h-full flex flex-col md:flex-row justify-center items-center p-10 text-white"><div class="section md:w-1/2 md:h-full w-full h-5/6 md:bg-black/20 py-3 md:py-0 rounded-lg md:rounded-r-none md:border border-white svelte-neitl1"><form class="p-2 md:p-10 h-full w-full flex flex-col items-center justify-evenly" method="POST" action="/forms/contact_us">
			<div class="relative z-0 mb-3 w-full group"><input type="text" name="name" id="name" class="nunu block py-2 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 appearance-none border-gray-400 focus:outline-none focus:ring-0 peer text-xl" placeholder=" " required>
				<label for="name" class="peer-focus:font-medium absolute text-xl text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label></div>
			<div class="relative z-0 mb-3 w-full group"><input type="email" name="email" id="email" class="nunu block py-2 px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 appearance-none border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required>
				<label for="email" class="peer-focus:font-medium absolute text-xl text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label></div>
			<div class="relative z-0 mb-2 w-full group pb-10"><textarea name="message" id="message" class="nunu block py-2 px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 appearance-none border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required></textarea>
				<label for="message" class="peer-focus:font-medium absolute text-xl text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label></div>
			<button ${""} class="btn btn-outline btn-block bg-black/25 hover:scale-105 hover:bg-white active:opacity-90 active:scale-95 text-xl" type="submit">Submit</button>
			<div class="info-container w-full flex-col items-center justify-center px-4 xl:px-10 hidden lg:flex pt-4"></div></form></div>
	<div id="center-console" class="section w-full md:w-1/2 m-auto h-auto md:h-full flex flex-col items-center justify-between py-3 md:py-0 rounded-lg rounded-l-none md:border-l-0 md:border md:border-white p-6 svelte-neitl1"><h3 class="text-5xl pt-0 md:pt-7">Contact Us</h3>
		<div class="contact-info px-4 pt-2 flex flex-col gap-1 items-start"><div class="card card-compact mx-auto shadow-xl container"><div class="card-body"><h2 class="card-title nunu svelte-neitl1">For Technical Queries,</h2>
					<p class="nunu text-2xl">Mohit Deotare</p>
					<a href="https://api.whatsapp.com/send?phone=+7517345309&text=Hello!" class="nunu inline-flex items-center gap-2 text-lg"><iconify-icon icon="mdi:whatsapp"></iconify-icon>75173 45309</a>
					<a href="mailto:pavandeotare1@gmail.com" class="nunu inline-flex items-center gap-2 overflow-clip text-ellipsis text-lg"><iconify-icon icon="mdi:email-outline"></iconify-icon>pavandeotare1@gmail.com</a></div></div>
			
			<div class="card card-compact mx-auto shadow-xl w-full"><div class="card-body "><h2 class="card-title nunu svelte-neitl1">For Event-Related Queries,</h2>
					<p class="nunu text-2xl">Sushrut Kohale</p>
					<a href="tel:+919096831236" class="inline-flex items-center gap-2 nunu text-lg"><iconify-icon icon="mdi:phone-outline"></iconify-icon> 97666 55788</a>
					<a href="mailto:sushrutkohale123@gmail.com" class="inline-flex items-center gap-2 nunu text-lg"><iconify-icon icon="mdi:email-outline"></iconify-icon>sushrutkohale123@gmail.com</a></div></div>
			</div>
		<div class="contact-links"></div></div></div></div>




	<div class="w-full md:h-[100vh] h-[150vh]"><div class="section md:p-6 md:gap-8 h-full w-full md:h-full md:w-full flex flex-col justify-end md:flex-row svelte-neitl1"><div class="section w-5/6 md:h-full h-1/5 md:w-1/3 mx-auto py-3 md:py-0 rounded-lg md:border border-white svelte-neitl1"><iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/YiVULH51pJA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
		
			<div class="section w-5/6 h-1/5 md:h-full md:w-1/3 mx-auto flex flex-col items-center justify-between py-3 md:py-0 rounded-lg md:border md:border-white svelte-neitl1"><div class="h-5/6 w-full bg-black/50"><iframe title="Google Map for GCOEN" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.525563997084!2d79.05785451517583!3d21.051661192371412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4be5e617378eb%3A0x682e0bc768d22adb!2sGovernment%20Engineering%20College%2CNagpur!5e0!3m2!1sen!2sin!4v1674120640996!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="h-full w-full z-[220] rounded-lg"></iframe></div>
			<div class="h-1/6 w-full flex flex-row items-center justify-evenly py-8 text-white"><a href="mailto:adhyaaya.gcoen@gmail.com" class="email h-8 w-8 lg:h-12 lg:w-12 bg-red-500 rounded-full text-2xl lg:text-4xl inline-flex items-center justify-center hover:scale-105 active:scale-95 active:opacity-95 transition-all duration-300 ease-in-out"><iconify-icon icon="mdi:email-outline"></iconify-icon></a>
				<a href="https://www.linkedin.com/company/adhyaaya/" class="linkedin h-8 w-8 lg:h-12 lg:w-12 bg-blue-600 rounded-full text-2xl lg:text-4xl inline-flex items-center justify-center hover:scale-105 active:scale-95 active:opacity-95 transition-all duration-300 ease-in-out"><iconify-icon icon="mdi:linkedin"></iconify-icon></a>
				<a href="https://instagram.com/adhyaaya.gcoen" class="instagram h-8 w-8 bg-pink-600 lg:h-12 lg:w-12 rounded-full text-2xl lg:text-4xl inline-flex items-center justify-center hover:scale-105 active:scale-95 active:opacity-95 transition-all duration-300 ease-in-out"><iconify-icon icon="mdi:instagram"></iconify-icon></a>
				<a href="https://www.youtube.com/@ADHYAAYAGCOEN" class="youtube h-8 w-8 lg:h-12 lg:w-12 bg-red-600 rounded-full text-2xl lg:text-4xl inline-flex items-center justify-center hover:scale-105 active:scale-95 active:opacity-95 transition-all duration-300 ease-in-out"><iconify-icon icon="mdi:youtube"></iconify-icon></a></div></div>
				<div class="section w-5/6 md:h-full h-auto md:w-1/3 mx-auto flex flex-col items-center py-3 md:py-0 bg-black/40 rounded-lg md:border md:border-white pd-10 svelte-neitl1"><div class="flex flex-col w-4/6 items-stretch pd-0 p-4 pb-0 pt-4 gap-2"><div class="heading pt-0 text-3xl btn btn-ghost btn-lg transition-none hover:scale-100 active:scale-100 hover:bg-opacity-0 cursor-auto border-0 border-b-2 rounded-b-none border-white hover:text-white ">Sitemap
				</div>
				<a href="/" class="btn btn-ghost btn-sm text-xl text-white font-normal hover:bg-white hover:text-black">Home</a>
				<a href="/events" class="btn btn-sm btn-ghost text-xl text-white font-normal hover:bg-white hover:text-black">Events</a>
				<a data-sveltekit-reload href="/team" class="btn btn-sm btn-ghost text-xl text-white font-normal hover:bg-white hover:text-black">Team</a>
				<a href="/sponsors" class="btn btn-sm btn-ghost text-xl text-white font-normal hover:bg-white hover:text-black">Sponsors</a>
				<a href="/gallery" data-sveltekit-reload class="btn btn-sm btn-ghost text-xl text-white font-normal hover:bg-white hover:text-black">Gallery</a></div>
			<div class="flex flex-col w-4/6 pt-4 items-stretch justify-evenly gap-1"><div class="heading text-3xl btn btn-ghost btn-lg transition-none hover:scale-100 active:scale-100 hover:bg-opacity-0 cursor-auto border-0 border-b-2 rounded-b-none border-white hover:text-white ">Legal
				</div>
				<a href="/legal/terms_and_conditions" class="btn btn-sm btn-ghost text-white text-xl font-normal hover:bg-white hover:text-black">T &amp; C</a>
				<a href="/legal/privacy_policy" class="btn btn-sm btn-ghost text-white text-xl font-normal hover:bg-white hover:text-black">Privacy Policy</a>
				<a href="/legal/contact_info" class="btn btn-sm btn-ghost text-white text-xl font-normal hover:bg-white hover:text-black">Legal Contact</a></div></div></div></div></div>	

`;
});
const gcoen = "/_app/immutable/assets/gcoen-knockout-resize.f1397a58.webp";
const AboutUs_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".team-button.svelte-7mr9id::before{content:'';z-index:-1;position:absolute;height:100%;width:100%;--tw-translate-x:-7.5%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:0.5rem;background-image:linear-gradient(to top right, var(--tw-gradient-stops));--tw-gradient-from:#ec4899 var(--tw-gradient-from-position);--tw-gradient-to:rgb(236 72 153 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:rgb(239 68 68 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #ef4444 var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-to:#eab308 var(--tw-gradient-to-position);opacity:0.5;--tw-blur:blur(16px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}",
  map: null
};
const AboutUs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="about-us-container md:w-5/6 flex flex-col items-center justify-evenly md:py-10 mx-auto px-2"><div class="title h-1/6 pb-10"><span class="text-4xl lg:text-6xl text-white opacity-90">About Us</span></div>
	<div class="content flex flex-col w-full h-4/6 gap-20"><div class="us w-full max-w-2xl xl:w-1/2 flex flex-col items-center justify-evenly h-auto text-justify backdrop-blur-none bg-opacity-0 rounded-lg lg:rounded-l-none p-6 gap-2 mx-auto"><img loading="lazy"${add_attribute("src", adhyaaya_solid_logo, 0)} class="h-28" height="112" width="202" alt="">
			<p class="max-w-lg md:text-2xl nunu">Adhyaaya is a premier technical festival, hosting a variety of events for students and
				professionals to showcase their talents in technology and the sciences. The annual
				symposium, organized by the Government College of Engineering in Nagpur, features lectures
				from renowned experts and attracts participants from across the region. Join us at Adhyaaya
				for a journey of innovation and creativity.
			</p>
			<a data-sveltekit-reload href="/team" class="team-button relative text-white px-5 py-3 text-2xl bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-lg inline-flex items-center uppercase gap-2 hover:scale-110 active:scale-90 active:opacity-90 transition-all duration-300 ease-in-out mb-8 svelte-7mr9id">Meet The Team <iconify-icon icon="mdi:arrow-right"></iconify-icon></a></div>
		<div class="us w-full max-w-2xl xl:w-1/2 flex flex-col items-center justify-evenly h-auto text-justify backdrop-blur-none rounded-lg lg:rounded-l-none p-6 gap-2 mx-auto"><img loading="lazy"${add_attribute("src", gcoen, 0)} class="h-28" height="112" width="355" alt="">
			<p class="max-w-lg md:text-2xl nunu">Government College of Engineering, Nagpur is a premier engineering institute established in
				2016, affiliated to Rashtrasant Tukadoji Maharaj Nagpur University and mentored by
				Visvesvaraya National Institute of Technology. The campus is situated at New Khapri, Nagpur,
				providing a top-notch engineering education to its students.
			</p>
			<a data-sveltekit-reload href="https://gcoen.ac.in/" target="_blank" rel="noreferrer" class="college-button relative bg-gradient-to-bl from-black via-blue-400 to-purple-400 text-white text-2xl py-3 px-5 rounded-lg inline-flex items-center uppercase font-medium gap-2 hover:scale-110 active:scale-90 active:opacity-90 transition-all duration-300 ease-in-out mb-4 mt-4">Our College <iconify-icon icon="mdi:arrow-right"></iconify-icon></a></div></div>
	<div class="flex flex-col items-center justify-center pt-10"><lite-youtube-embed videoid="DeRLoZuCKfs"></lite-youtube-embed>
		<lite-youtube videoid="DeRLoZuCKfs" playlabel="Adhyaaya'20 Aftermovie" class="w-[80vw] lg:w-[50vw] rounded-lg"></lite-youtube></div>
	<div class="gallery-button flex flex-col items-center justify-evenly text-justify pt-8"><a data-sveltekit-reload href="/gallery" class="gallery-button uppercase relative bg-gradient-to-bl from-rose-400 via-fuchsia-500 to-indigo-500 text-white text-2xl py-5 px-8 rounded-lg inline-flex items-center gap-2 hover:scale-110 active:scale-90 active:opacity-90 transition-all duration-300 ease-in-out">Image Gallery <iconify-icon icon="mdi:arrow-right"></iconify-icon></a></div>
</div>`;
});
const Sponsors_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "@keyframes svelte-p0c6z0-move-da-button{0%,100%{background-position:left center}50%{background-position:right center}}.da-button.svelte-p0c6z0{background-size:200% auto;animation:svelte-p0c6z0-move-da-button 10s ease infinite}.da-button.svelte-p0c6z0::before{background-size:200% auto;animation:svelte-p0c6z0-move-da-button 10s ease infinite;z-index:-1;content:'';position:absolute;height:100%;width:100%;max-width:32rem;--tw-scale-x:1.05;--tw-scale-y:1.05;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:0.75rem;background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:#ec4899 var(--tw-gradient-from-position);--tw-gradient-to:rgb(236 72 153 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:rgb(217 70 239 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #d946ef var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-to:#0ea5e9 var(--tw-gradient-to-position);padding:2rem;text-align:center;--tw-blur:blur(40px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:300ms}",
  map: null
};
const Sponsors = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="us w-full max-w-4xl xl:w-1/2 flex flex-col items-center justify-evenly h-auto text-justify rounded-lg lg:rounded-l-none p-6 gap-2 mx-auto"><div class="text-content h-1/2 w-full text-justify text-sm md:text-lg xl:text-2xl flex flex-col items-center justify-center bg-clip-text text-pink-200 bg-gradient-to-tr from-pink-200 via-fuchsia-200 to-sky-200 font-thin"><div class="max-w-2xl lg:max-w-4xl mx-auto px-8 pt-4 md:pl-10 pb-4 nunu font-thin backdrop-blur-none rounded-lg mb-12 text-xl md:text-2xl">Over the past years Adhyaaya has had the privilege to have hosted a number of sponsors which
			provided a very entertaining experience to our visitors as well as the brand. The crowd
			engagement, media exposure, sampling and brand building opportunities offered at Adhyaaya are
			unparalleled. The fest has always been a platform for several brands to engage in unique crowd
			engaging activations which has proved to deliver a strong sponsor take back value.
		</div>
		<a href="/sponsors" class="da-button text-white mb-10 lg:mt-10 mt-auto mx-auto text-2xl lg:text-3xl relative p-4 lg:p-6 max-w-lg text-center bg-gradient-to-r from-pink-500 via-fuchsia-500 to-sky-500 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 active:opacity-90 inline-flex items-center justify-center gap-3  svelte-p0c6z0"><span>View Sponsors</span> <iconify-icon icon="mdi:arrow-right"></iconify-icon></a></div>
	<div class="xl:w-1/3"></div>
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "#dna-bg.svelte-1py5h9v{filter:saturate(1.2) brightness(1.1) contrast(1.2)}.preloader.svelte-1py5h9v{display:flex}.loader.svelte-1py5h9v{font:1em Dosis, sans-serif;line-height:1.5;perspective:40em;z-index:9999;height:100vh;width:100vw}.preloader.svelte-1py5h9v{flex-direction:column;justify-content:center;align-items:center;margin:auto;width:17em;height:17em}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const duration = tweened(0, { duration: 1500 });
  let loaded = false;
  let scrollY;
  if (typeof window !== "undefined") {
    const canvas = document.getElementById("mascotid");
    new Sketch(canvas);
  }
  setTimeout(
    () => {
      loaded = true;
      duration.set(0);
    },
    2500
  );
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-i7tcdq_START --><link rel="preload"><link rel="preload" href="/draco/draco_decoder.wasm"><link rel="preload" href="/draco/draco_wasm_wrapper.js"><link rel="preload" href="/draco/draco_decoder.js">${$$result.title = `<title>Adhyaaya&#39;24</title>`, ""}<!-- HEAD_svelte-i7tcdq_END -->`, ""}



<div id="dna-bg" class="fixed scale-110 overflow-clip h-screen w-screen -z-50 bg-[#0d0028] svelte-1py5h9v"></div>

 ${!loaded ? `<div class="loader h-screen w-screen bg-[#0d0028] fixed z-[9999] flex items-center justify-center svelte-1py5h9v"><div class="preloader svelte-1py5h9v"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent; display: block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="6.451612903225806" cy="50" r="3" fill="#941946"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-0.5s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="0s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#941946;#243f7d;#941946" dur="2s" repeatCount="indefinite" begin="-0.5s"></animate></circle><circle cx="6.451612903225806" cy="50" r="3" fill="#1fdfdf"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.5s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#1fdfdf;#164ba3;#1fdfdf" dur="2s" repeatCount="indefinite" begin="-0.5s"></animate></circle><circle cx="16.129032258064512" cy="50" r="3" fill="#941946"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-0.7s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#941946;#243f7d;#941946" dur="2s" repeatCount="indefinite" begin="-0.7s"></animate></circle><circle cx="16.129032258064512" cy="50" r="3" fill="#1fdfdf"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.7s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#1fdfdf;#164ba3;#1fdfdf" dur="2s" repeatCount="indefinite" begin="-0.7s"></animate></circle><circle cx="25.806451612903224" cy="50" r="3" fill="#941946"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-0.9s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#941946;#243f7d;#941946" dur="2s" repeatCount="indefinite" begin="-0.9s"></animate></circle><circle cx="25.806451612903224" cy="50" r="3" fill="#1fdfdf"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.9s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#1fdfdf;#164ba3;#1fdfdf" dur="2s" repeatCount="indefinite" begin="-0.9s"></animate></circle><circle cx="35.48387096774193" cy="50" r="3" fill="#941946"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.1s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#941946;#243f7d;#941946" dur="2s" repeatCount="indefinite" begin="-1.1s"></animate></circle><circle cx="35.48387096774193" cy="50" r="3" fill="#1fdfdf"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.1s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#1fdfdf;#164ba3;#1fdfdf" dur="2s" repeatCount="indefinite" begin="-1.1s"></animate></circle><circle cx="45.16129032258064" cy="50" r="3" fill="#941946"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.3s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#941946;#243f7d;#941946" dur="2s" repeatCount="indefinite" begin="-1.3s"></animate></circle><circle cx="45.16129032258064" cy="50" r="3" fill="#1fdfdf"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.3s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#1fdfdf;#164ba3;#1fdfdf" dur="2s" repeatCount="indefinite" begin="-1.3s"></animate></circle><circle cx="54.838709677419345" cy="50" r="3" fill="#941946"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.5s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#941946;#243f7d;#941946" dur="2s" repeatCount="indefinite" begin="-1.5s"></animate></circle><circle cx="54.838709677419345" cy="50" r="3" fill="#1fdfdf"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.5s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#1fdfdf;#164ba3;#1fdfdf" dur="2s" repeatCount="indefinite" begin="-1.5s"></animate></circle><circle cx="64.51612903225805" cy="50" r="3" fill="#941946"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.7s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#941946;#243f7d;#941946" dur="2s" repeatCount="indefinite" begin="-1.7s"></animate></circle><circle cx="64.51612903225805" cy="50" r="3" fill="#1fdfdf"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.7s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#1fdfdf;#164ba3;#1fdfdf" dur="2s" repeatCount="indefinite" begin="-1.7s"></animate></circle><circle cx="74.19354838709677" cy="50" r="3" fill="#941946"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.9s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#941946;#243f7d;#941946" dur="2s" repeatCount="indefinite" begin="-1.9s"></animate></circle><circle cx="74.19354838709677" cy="50" r="3" fill="#1fdfdf"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.9s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#1fdfdf;#164ba3;#1fdfdf" dur="2s" repeatCount="indefinite" begin="-1.9s"></animate></circle><circle cx="83.87096774193547" cy="50" r="3" fill="#941946"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.1s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#941946;#243f7d;#941946" dur="2s" repeatCount="indefinite" begin="-2.1s"></animate></circle><circle cx="83.87096774193547" cy="50" r="3" fill="#1fdfdf"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-3.1s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#1fdfdf;#164ba3;#1fdfdf" dur="2s" repeatCount="indefinite" begin="-2.1s"></animate></circle><circle cx="93.54838709677418" cy="50" r="3" fill="#941946"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.3s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#941946;#243f7d;#941946" dur="2s" repeatCount="indefinite" begin="-2.3s"></animate></circle><circle cx="93.54838709677418" cy="50" r="3" fill="#1fdfdf"><animate attributeName="r" times="0;0.5;1" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-3.3s"></animate><animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate><animate attributeName="fill" keyTimes="0;0.5;1" values="#1fdfdf;#164ba3;#1fdfdf" dur="2s" repeatCount="indefinite" begin="-2.3s"></animate></circle></svg></div></div>` : ``} 



${validate_component(Home, "Home").$$render($$result, { scrollPos: scrollY }, {}, {})}
${validate_component(Events, "Events").$$render($$result, {}, {}, {})}
${validate_component(AboutUs, "AboutUs").$$render($$result, {}, {}, {})}
${validate_component(Sponsors, "Sponsors").$$render($$result, {}, {}, {})}
${validate_component(ContactUs, "ContactUs").$$render($$result, {}, {}, {})}

`;
});
export {
  Page as default
};
