<template>
  <div id="app" class="wrapper">
    <h2>You Can Test Your Component Here</h2>
    <div class="content"><Wang/></div>
  </div>
</template>

<script>
import Wang from "./components/Component.vue";

export default {
  name: "app",
  components: {
    Wang
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  .content {
    width: 1000px;
    height: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #e5dbdb;
  }
}
</style>
