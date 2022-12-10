<template>
  <div class="px-40">
    <Table
      :columns="columnsData"
      :data-soucre="countries"
      :showDetailItem="showPopupDetailCountry"
      :loading="loadingCountries"
    />
    <Popup v-model="showPopupDetail" :country="country"/>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

import Table from "@components/ui/TableComponent.vue";
import Popup from "@modules/country/components/PopupDetailCountry.vue";

export default {
  name: "Countries",
  components: { Table, Popup },
  setup() {
    const store = useStore();
    const countries = computed(
      () => store.getters["countryModule/getCountries"]
    );
    const loadingCountries = ref(true);
    const showPopupDetail = ref(false);
    const loadingDetailCountry = ref(false);
    const country = ref({
      flags: {},
      name: {},
      population: 0,
      capital: [],
      region: "",
      subregion: "",
    });

    const columnsData = ref([
      {
        key: "Country",
        title: "Country",
        type: "string",
        sort: false,
      },
      {
        key: "TotalDeaths",
        title: "Total Deaths",
        type: "number",
        sort: true,
      },
      {
        key: "TotalConfirmed",
        title: "Total Confirmed",
        type: "number",
        sort: true,
      },
      {
        key: "TotalRecovered",
        title: "Total Recovered",
        type: "number",
        sort: true,
      },
    ]);

    const showPopupDetailCountry = async (item) => {
      if(loadingDetailCountry.value) return
      loadingDetailCountry.value = true
      const res = await store.dispatch("countryModule/getCountry", item.CountryCode);
      country.value = res[0]
      showPopupDetail.value = !showPopupDetail.value;
      loadingDetailCountry.value = false
    };

    onMounted( async() => {
      await store.dispatch("countryModule/getCountries");
      loadingCountries.value = false
    })
    return {
      columnsData,
      countries,
      showPopupDetailCountry,
      showPopupDetail,
      country,
      loadingCountries
    };
  },
};
</script>
