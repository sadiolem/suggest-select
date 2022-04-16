<template>
  <div class="suggest-select-drop-down">
    <div
      v-for="(option, i) in options"
      :key="i"
      tabindex="0"
      class="suggest-option"
      @keypress.enter="selectOption(option)"
      @click="selectOption(option)"
    >
      <!-- TODO create separate components for user and company -->
      <!-- TODO use some default img if no avatar -->
      <img :src="option.avatar" height="48" width="48" alt="">
      <div>
        <span class="name">{{ option.name || `@${option.alias}` }}</span>
        <span class="additional-info">
            {{ option.type === 'company' ? 'Компания' : `@${option.alias}` }}
          </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuggestSelectDropDown',
  props: {
    options: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    selectOption(option) {
      this.$emit('selectOption', option);
    },
  },
};
</script>

<style lang="scss" scoped>
.suggest-select-drop-down {
  position: absolute;
  width: 100%;
  max-height: 282px;
  overflow: hidden;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 6px 10px 0 #ccc;

  .suggest-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    transition: background-color 0.2s ease;
    cursor: pointer;

    &:focus,
    &:hover {
      background-color: #f1f1f1;
    }

    .additional-info,
    .name {
      display: block;
    }

    .additional-info {
      color: #c3c3c3;
      font-size: 14px;
    }
  }
}
</style>
