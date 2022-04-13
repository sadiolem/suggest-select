<template>
  <div class="option-chip">
    {{ value }}
    <button class="delete-btn" @click="$emit('removeChip')">x</button>
  </div>
</template>

<script>
export default {
  name: 'InputChip',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.option-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  padding: 5px;
  color: #fff;
  background-color: #3498db;

  .delete-btn {
    color: #fff;
    border: none;
    background: transparent;
    cursor: pointer;
  }
}
</style>
