<template>
  <v-app>
    <cda-header></cda-header>
    <v-main>
      <router-view class="container"></router-view>
    </v-main>
    <!-- <cda-footer></cda-footer> -->
  </v-app>
</template>

<script>
import CdaHeader from '@/components/CdaHeader.vue';

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
</style>
