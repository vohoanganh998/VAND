<template>
  <i>
    <component :is="iconName"> </component>
  </i>
</template>
<script>
import { computed, defineComponent } from "@vue/runtime-core";
import ArrowUp from "@/components/icons/ArrowUp.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import Close from "@/components/icons/Close.vue";

export default defineComponent({
  name: "IconComponent",
  components: {
    ArrowUp,
    ArrowDown,
    Close
  },
  props: {
    name: {
      type: String,
    },
  },

  setup(props) {
    const iconName = computed(() => {
      return props.name ? props.name : "";
    });
    return { iconName };
  },
});
</script>