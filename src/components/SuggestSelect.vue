<template>
  <div class="suggest-select">
    <label v-if="label" for="select" class="select-label">
      {{ label }}
    </label>
    <div class="input-wrapper">
      <!-- TODO keyboard accessibility (arrow key up/down -> focus options) -->
      <input
        v-model.trim="inputValue"
        id="select"
        type="text"
        autocomplete="off"
        :readonly="isInputReadonly"
        :placeholder="placeholder"
        class="select-input"
        @input="$emit('input', $event)"
      >

      <!-- TODO focused and backspace pressed -> remove -->
      <InputChip
        v-if="selectedOption"
        :value="`@${selectedOption.alias}`"
        class="chip"
        @removeChip="clearSelectedOption"
      />

      <CircularLoader v-if="loading" class="loader" />

      <div v-if="isShowOptions" class="suggest-select-drop-down">
        <div
          v-for="(option, i) in items"
          :key="i"
          tabindex="0"
          class="suggest-option"
          @keypress.enter="selectOption(option)"
          @click="selectOption(option)"
        >
          <slot name="option" :option="option" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputChip from '@/components/InputChip.vue';
import CircularLoader from '@/components/CircularLoader.vue';

export default {
  name: 'SuggestSelect',
  components: {
    InputChip,
    CircularLoader,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    items: {
      type: [Array, Object],
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      suggestOptions: {},
      debounceTimer: null,
      selectedOption: null,
      isInputReadonly: false,
      isShowOptions: false,
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        if (value) this.isShowOptions = true;
        this.$emit('update:value', value);
      },
    },
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.inputValue = this.selectedOption.alias;
      this.isInputReadonly = true;
      this.isShowOptions = false;
    },
    clearSelectedOption() {
      this.selectedOption = null;
      this.inputValue = '';
      this.isInputReadonly = false;
    },
  },
};
</script>

<style scoped lang="scss">
.suggest-select {
  position: relative;

  .select-label {
    display: block;
    margin-bottom: 5px;
  }

  .input-wrapper {
    position: relative;

    .select-input {
      width: 300px;
      padding: 10px;
      border: 1px solid;
      border-radius: 0;
    }

    .chip {
      position: absolute;
      top: 4px;
      left: 5px;
    }

    .loader {
      top: 8px;
      right: 10px;
    }
  }

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
}
</style>
