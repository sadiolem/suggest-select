<template>
  <div class="app-select">
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
        @input="handleTyping"
      >

      <!-- TODO focused and backspace pressed -> remove -->
      <InputChip
        v-if="selectedOption"
        :value="`@${selectedOption.alias}`"
        class="chip"
        @removeChip="clearSelectedOption"
      />

      <CircularLoader v-if="loading" class="loader" />
    </div>

    <div id="suggest-options" class="suggest-options-list">
      <div
        v-for="(option, i) in suggestOptions"
        :key="i"
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
  </div>
</template>

<script>
import api from '@/api';
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
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      suggestOptions: {},
      debounceTimer: null,
      selectedOption: null,
      inputValue: '',
      isInputReadonly: false,
      apiURL: 'https://habr.com/kek/v2/publication/suggest-mention?q=',
    };
  },
  methods: {
    async fetchSuggestOptions() {
      this.loading = true;
      const { data, error } = await api.getSuggestOptions(this.apiURL, this.inputValue);
      this.loading = false;

      if (error) {
        alert(error.message);
        return;
      }

      this.suggestOptions = data;
    },
    handleTyping() {
      if (this.inputValue.length < 3) {
        this.clearOptions();
        return;
      }

      if (this.debounceTimer) clearTimeout(this.debounceTimer);

      this.debounceTimer = setTimeout(() => {
        this.fetchSuggestOptions();
        this.debounceTimer = null;
      }, 600);
    },
    selectOption(option) {
      this.selectedOption = option;
      this.inputValue = this.selectedOption.alias;
      this.isInputReadonly = true;
      this.clearOptions();
    },
    clearOptions() {
      this.suggestOptions = {};
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
.app-select {
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

  .suggest-options-list {
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
