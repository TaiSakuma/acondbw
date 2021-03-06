import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";

import App from "@/App.vue";
import router from "@/router";

Vue.use(Vuetify);
Vue.use(VueRouter);

describe("App.vue", () => {
  let localVue;
  let vuetify;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    wrapper = shallowMount(App, {
      localVue,
      vuetify,
      router,
      stubs: ["router-link", "router-view"]
    });
  });

  it("match snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("transition initial", async () => {
    const trans_attrs = wrapper.find('transition-stub').attributes();
    expect(trans_attrs.name).toBe('fade-app-across');
    expect(trans_attrs.mode).toBe('out-in');
  });

  it("transition across", async () => {
    await router.push("/maps");
    await router.push("/");
    const trans_attrs = wrapper.find('transition-stub').attributes();
    expect(trans_attrs.name).toBe('fade-app-across');
    expect(trans_attrs.mode).toBe('out-in');
  });

  it("transition within", async () => {
    await router.push("/maps");
    await router.push("/maps/item/map001");
    const trans_attrs = wrapper.find('transition-stub').attributes();
    expect(trans_attrs.name).toBe('fade-app-within');
    expect(trans_attrs.mode).toBe('out-in');
  });
});
