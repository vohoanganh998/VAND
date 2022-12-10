<template>
  <teleport to="#modal">
    <div v-click-outside-teleport="onCloseModal">
      <transition
        enter-active-class="duration-300"
        leave-active-class="duration-200"
      >
        <div
          class="
            fixed
            bottom-0
            inset-x-0
            px-4
            pb-4
            sm:inset-0 sm:flex sm:items-center sm:justify-center
            z-10
          "
          v-show="showModalSync"
        >
          <transition
            enter-active-class="duration-300 ease-out opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              class="fixed inset-0 transition-opacity"
              v-show="showModalSync"
            >
              <div class="absolute inset-0 bg-neutrals-900 opacity-60"></div>
            </div>
          </transition>
          <transition
            enter-active-class="duration-300 ease-out translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
            enter-to-class="translate-y-0 opacity-100 sm:scale-100"
            leave-active-class="duration-200 ease-in"
            leave-class="translate-y-0 opacity-100 sm:scale-100"
            leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="
                modal__wrapper
                bg-white
                rounded-lg
                overflow-hidden
                shadow-lg
                transform
                transition-all
              "
              role="dialog"
              :style="`width:${width}`"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="flex justify-between border-b px-6 py-4 items-center">
                <div class="inline-block">
                  <p class="text-xl">Detail Country</p>
                </div>
                <div>
                  <icon-component
                    color="neutrals-400"
                    class="cursor-pointer"
                    name="close"
                    @click="onCloseModal"
                  ></icon-component>
                </div>
              </div>
              <div
                class="modal-body relative px-6 py-4 bg-neutrals-100"
                :style="`max-height:${maxHeight}`"
              >
                <div class="flex justify-center mb-1">
                  <img
                    :src="country.flags.png"
                    :alt="country.name.commom"
                    width="100"
                  />
                </div>
                <div>Name: {{ country.name.official }}</div>
                <div>
                  Population: {{ country.population.toLocaleString("en-US") }}
                </div>
                <div v-if="country.capital">
                  {{ country.capital.length > 1 ? "Capitals" : "Capital" }}:
                  <span
                    v-for="(capital, idxCap) in country.capital"
                    :key="idxCap"
                    >{{ capital }}</span
                  >
                </div>
                <div>Region: {{ country.region }}</div>
                <div>Subregion: {{ country.subregion }}</div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </teleport>
</template>
<script>
import { computed, defineComponent } from "@vue/runtime-core";
import IconComponent from "@components/ui/IconComponent.vue";

export default defineComponent({
  name: "PopupDetailCountry",
  components: { IconComponent },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    country: {
      type: Object,
      default: () => {
        return {
          flags: {},
          name: {},
          population: 0,
          capital: [],
          region: "",
          subregion: "",
        };
      },
    },
    width: {
      type: String,
      default: "500px",
    },
    maxHeight: {
      type: String,
      default: "500px",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const showModalSync = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });
    const onCloseModal = () => {
      showModalSync.value = !showModalSync.value;
    };
    return { showModalSync, onCloseModal };
  },
});
</script>