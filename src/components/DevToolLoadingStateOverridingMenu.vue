<template>
<div v-if="enabled">
  <v-menu right bottom offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn absolute style="top: -15px; right: -10px" icon v-on="on">
        <v-icon x-small color="grey lighten-1">mdi-nut</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-subheader>Dev Tools</v-subheader>
      <v-list-item-group v-model="state">
        <v-list-item :value="State.LOADING">
          <v-list-item-title>loading</v-list-item-title>
        </v-list-item>
        <v-list-item :value="State.ERROR">
          <v-list-item-title>error</v-list-item-title>
        </v-list-item>
        <v-list-item :value="State.EMPTY">
          <v-list-item-title>empty</v-list-item-title>
        </v-list-item>
        <v-list-item :value="State.NONE">
          <v-list-item-title>none</v-list-item-title>
        </v-list-item>
        <v-list-item value="off">
          <v-list-item-title>off</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</div>
</template>

<script>
import State from "@/utils/LoadingState.js";

export default {
  name: "DevToolLoadingStateOverridingMenu",
  data() {
    return {
      enabled : process.env.VUE_APP_ACONDBW_DEVTOOL_LOADINGSTATE == "true",
      state: "off",
      State: State
    };
  },
  watch: {
      state: function() {
          const s = this.state == "off" ? null : this.state;
          this.$emit("state", s);
      }
  }
};
</script>
