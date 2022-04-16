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

      <!-- TODO use slot -->
      <SuggestSelectDropDown v-if="isShowOptions" :options="items" @selectOption="selectOption" />
    </div>
  </div>
</template>

<script>
import InputChip from '@/components/InputChip.vue';
import CircularLoader from '@/components/CircularLoader.vue';
import SuggestSelectDropDown from '@/components/SuggestSelectDropDown.vue';

export default {
  name: 'SuggestSelect',
  components: {
    InputChip,
    CircularLoader,
    SuggestSelectDropDown,
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
}
</style>
