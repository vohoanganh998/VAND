<template>
  <div class="relative h-full">
    <div
      class="
        relative
        scrollbar--transparent
        border border-neutrals-100
        overflow-auto
        table-component__fixed
      "
    >
      <table
        class="
          w-full
          scrollbar-tranparent
          overflow-hidden
          rounded
          b-r-none
          table-fixed
        "
      >
        <thead class="bg-neutrals-50">
          <tr>
            <th
              class="
                bg-neutrals-50
                whitespace-nowrap
                overflow-hidden
                px-16p
                py-12p
                text-16 text-neutrals-500
                font-bold
                text-left
                border-b border-neutrals-100
              "
              v-for="col in columns"
              :key="col.key"
              width="282px"
            >
              <!-- @click="sortData(item.key, item.type || 'number')" -->
              <div class="flex items-center truncate" @click="sortData(col)">
                <span class="truncate">
                  {{ col.title }}
                </span>
                <IconComponent
                  v-if="col.sort && keySort === col.key"
                  :name="typeSort ? 'arrowDown' : 'arrowUp'"
                ></IconComponent>
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <tr
            class="hover:bg-neutrals-50 active:bg-neutrals-100 text-left"
            v-for="itemRow in dataTable"
            :key="itemRow.ID"
            @click="showDetailItem(itemRow)"
          >
            <template v-for="(col, idxCol) in columns" :key="col.key">
              <td
                v-if="idxCol != 0"
                class="border-b border-neutrals-100 text-14 p-16p"
              >
                {{
                  itemRow[col.key] && Number(itemRow[col.key])
                    ? itemRow[col.key].toLocaleString("en-US")
                    : itemRow[col.key]
                }}
              </td>
              <template v-else>
                <th
                  class="border-b border-neutrals-100 p-16p text-14 bg-white"
                  width="282px"
                >
                  {{
                    itemRow[col.key] && Number(itemRow[col.key])
                      ? itemRow[col.key].toLocaleString("en-US")
                      : itemRow[col.key]
                  }}
                </th>
              </template>
            </template>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            class="hover:bg-neutrals-50 active:bg-neutrals-100 text-left"
            v-for="index in 4"
            :key="index"
          >
            <template v-for="(col, idxCol) in columns" :key="col.key">
              <td
                v-if="idxCol != 0"
                class="border-b border-neutrals-100 text-14 p-16p"
              >
                <skeleton-box width="100px" />
              </td>
              <template v-else>
                <th
                  class="border-b border-neutrals-100 p-16p text-14 bg-white"
                  width="282px"
                >
                  <skeleton-box width="200px" />
                </th>
              </template>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script>
import { ref, watch } from "@vue/runtime-core";
import IconComponent from "./IconComponent.vue";
import SkeletonBox from "./SkeletonBox.vue";
export default {
  name: "ComponentTable",
  components: { IconComponent, SkeletonBox },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    dataSoucre: {
      type: Array,
      default: () => [],
    },
    showDetailItem: {
      type: Function,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const dataTable = ref([]);
    const keySort = ref("");
    /*value false is sort up | value true is sort down*/
    const typeSort = ref(false);

    /*Sort data table*/
    const sortFunc = (type = "number") => {
      if (type === "number") {
        dataTable.value.sort((a, b) =>
          typeSort.value
            ? b[keySort.value] - a[keySort.value]
            : a[keySort.value] - b[keySort.value]
        );
      } else if (type === "string") {
        dataTable.value.sort((a, b) =>
          typeSort.value
            ? b[keySort.value].localeCompare(a[keySort.value])
            : a[keySort.value].localeCompare(b[keySort.value])
        );
      }
    };

    const sortData = (item) => {
      if (item.sort) {
        if (item.key !== keySort.value) {
          keySort.value = item.key;
          typeSort.value = false;
        } else {
          typeSort.value = !typeSort.value;
        }
        sortFunc(item.type);
      }
    };

    watch(
      () => props.dataSoucre,
      (newVal) => {
        dataTable.value = newVal;
        if (keySort.value) sortFunc();
      }
    );

    return { sortData, keySort, typeSort, dataTable };
  },
};
</script>

<style lang="scss" scoped>
.table-component {
  &__fixed {
    &-col {
      // height: calc(100vh - 240px);
      max-height: inherit;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      box-shadow: 5px 0px 10px -5px rgb(0 0 0 / 10%);
      opacity: 0;
    }
    table {
      max-height: inherit;
      overflow-x: auto;
      white-space: nowrap;
      margin: 0;
      border-collapse: separate;
      border-spacing: 0;
      // table-layout: fixed;
    }
    table thead th {
      position: sticky;
      top: 0;
      z-index: 1;
      // background: white;
    }
    table thead th:not(:first-child) {
      width: 160px;
      max-width: 240px;
    }

    table tbody tr {
      &:hover {
        background: #f6f6f8;
        th {
          background: #f6f6f8;
        }
      }
      &:active {
        background: #e9e9ec;
        th {
          background: #e9e9ec;
        }
      }
      &.table__nodata {
        &:hover {
          background: transparent;
          th {
            background: transparent;
          }
        }
      }
    }

    table tbody th {
      position: relative;
      z-index: 2;
    }
    table thead th:first-child {
      position: sticky;
      left: 0;
      z-index: 3;
    }
    table tbody th {
      position: sticky;
      left: 0;
      z-index: 2;
    }
  }
  table {
    max-height: inherit;
    overflow-x: auto;
    white-space: nowrap;
    margin: 0;
    border-collapse: separate;
    border-spacing: 0;
    // table-layout: fixed;
  }

  table thead th {
    position: sticky;
    top: 0;
    z-index: 1;
    // background: white;
    &.notFixed {
      position: unset;
    }
  }
}
/* width */
::-webkit-scrollbar {
  width: 0;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
  width: 0;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
  border: 4px solid #fff;
}
</style>
  