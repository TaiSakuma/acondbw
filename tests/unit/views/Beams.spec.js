import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";

import Beams from "@/views/Beams.vue";

import router from "@/router";

Vue.use(Vuetify);
Vue.use(VueRouter);

describe("Beams.vue", () => {
  let localVue;

  function createWrapper(loading = false) {
    return mount(Beams, {
      localVue,
      router,
      mocks: {
        $apollo: {
          queries: {
            allBeams: {
              loading: loading
            }
          }
        }
      },
      stubs: {
        BeamItemCard: true,
      }
    });
  }

  const allBeams = {
    edges: [
      {
        node: {
          id: "QmVhbToxMTUw",
          name: "20200207"
        }
      },
      {
        node: {
          id: "QmVhbToxMTMw",
          name: "20200123"
        }
      },
      {
        node: {
          id: "QmVhbToxMTIw",
          name: "20190607"
        }
      },
      {
        node: {
          id: "QmVhbToxMDcw",
          name: "20190304"
        }
      },
      {
        node: {
          id: "QmVhbToxMDEw",
          name: "20180101"
        }
      }
    ]
  };

  beforeEach(function() {
    localVue = createLocalVue();
  });

  it("match snapshot", async () => {
    const wrapper = createWrapper();
    wrapper.setData({
      allBeams: allBeams
    });
    await Vue.nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("loading", async () => {
    const loading = true;
    const wrapper = createWrapper(loading);
    await Vue.nextTick();
    expect(wrapper.text()).toContain("loading");
  });

  it("error", async () => {
    const wrapper = createWrapper();
    wrapper.setData({
      error: true
    });
    await Vue.nextTick();
    expect(wrapper.text()).toContain("Error: cannot load data");
  });

  it("none", async () => {
    const wrapper = createWrapper();
    wrapper.setData({
      allBeams: { edges: [] }
    });
    await Vue.nextTick();
    expect(wrapper.text()).toContain("Nothing to show here");
  });
});