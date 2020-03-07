import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";

import Maps from "@/views/Maps.vue";
import MapItemCard from "@/components/MapItemCard.vue";

import router from "@/router";

Vue.use(Vuetify);
Vue.use(VueRouter);

describe("Maps.vue", () => {
  let localVue;

  function createWrapper(loading = false) {
    return mount(Maps, {
      localVue,
      router,
      mocks: {
        $apollo: {
          queries: {
            allMaps: {
              loading: loading
            }
          }
        }
      },
      stubs: {
        MapItemCard: true,
        MapSubmitFormDialog: true
      }
    });
  }

  const allMaps = {
    edges: [
      {
        node: {
          id: "TWFwOjEwMTM=",
          name: "lat20200201"
        }
      },
      {
        node: {
          id: "TWFwOjEwMTI=",
          name: "lat20200120"
        }
      },
      {
        node: {
          id: "TWFwOjEwMDE=",
          name: "lat20190213"
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
      allMaps: allMaps
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
      allMaps: { edges: [] }
    });
    await Vue.nextTick();
    expect(wrapper.text()).toContain("Nothing to show here");
  });
});