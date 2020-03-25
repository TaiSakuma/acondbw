import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";

import SimulationItemCard from "@/components/SimulationItemCard.vue";
import router from "@/router";

Vue.use(Vuetify);
Vue.use(VueRouter);

describe("SimulationItemCard.vue", () => {
  let localVue;
  let vuetify;

  function createWrapper({ loading = false, propsData } = {}) {
    const mutate = jest.fn();
    let wrapper = mount(SimulationItemCard, {
      localVue,
      router,
      vuetify,
      mocks: {
        $apollo: {
          queries: {
            simulation: {
              loading: loading
            }
          },
          mutate
        }
      },
      propsData: {
        simulationName: "lat20200201",
        ...propsData
      }
    });

    return wrapper;
  }

  const simulation = {
    id: "U2ltdWxhdGlvbjoxMDAx",
    simulationId: "1001",
    name: "xyz-s1234-20200101",
    datePosted: "2019-03-15",
    mapper: "abc-def",
    note: "- note 1\n- note 2"
  };

  beforeEach(function() {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  it("loading", async () => {
    const loading = true;
    const wrapper = createWrapper({ loading });
    await Vue.nextTick();
    expect(wrapper.find(".v-progress-circular").exists()).toBe(true);
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
    await Vue.nextTick();
    expect(wrapper.text()).toContain("Nothing to show here");
  });

  it("match snapshot", async () => {
    const wrapper = createWrapper();
    wrapper.setData({
      simulation: simulation
    });
    await Vue.nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it.each([
    [true, true, false],
    [true, false, true],
    [false, true, true],
    [false, false, true]
  ])(
    "collapsed - {collapsible: %p, collapsed: %p, visible: %p}",
    async (collapsible, collapsed, visible) => {
      const wrapper = createWrapper({
        propsData: { collapsed: collapsed, collapsible: collapsible }
      });
      wrapper.setData({
        simulation: simulation
      });
      await Vue.nextTick();
      expect(wrapper.find(".collapsible").isVisible()).toBe(visible);
    }
  );
});