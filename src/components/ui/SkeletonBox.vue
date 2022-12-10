<template>
    <div :style="{ height, width }" :class="[type, classBgColor]" />
</template>

<script>
import { defineComponent, computed } from '@vue/runtime-core';
export default defineComponent({
    name: `SkeletonBox`,
    props: {
        height: {
            default: `8px`,
            type: String,
        },
        width: {
            default: null,
            type: String,
        },
        type: {
            default: null,
            type: String,
        },
        classBgColor: {
            type: String,
            default: 'bg-neutrals-100',
        }
    },
    setup(props) {
        const computedWidth = computed(() => {
            return props.width;
        });

        return {
            computedWidth,
        }
    },
});
</script>

