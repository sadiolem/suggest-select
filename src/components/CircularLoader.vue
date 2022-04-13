<template>
  <div class="input-loader" :style="{ width: width, height: width }" />
</template>

<script>
export default {
  name: 'CircularLoader',
  props: {
    width: {
      type: String,
      required: false,
      default: '18px',
    },
  },
};
</script>

<style lang="scss" scoped>
.input-loader {
  position: absolute;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
