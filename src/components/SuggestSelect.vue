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
        :readonly="isInputIsReadonly"
        :placeholder="placeholder"
        class="select-input"
        @input="handleTyping"
      >

      <!-- TODO focused and backspace pressed -> remove -->
      <div v-if="selectedOption" class="option-chip">
        {{ `@${selectedOption.alias}` }}
        <button class="delete-btn" @click="clearSelectedOption">x</button>
      </div>

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
        <img :src="option.avatar" height="48" width="48" alt="">
        <div>
          <span class="name">{{ option.name || `@${option.alias}` }}</span>
          <span class="alias">{{ `@${option.alias}` || option.name }}</span>
          <span v-if="option.type === 'company'" class="company-name">Компания</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import CircularLoader from '@/components/CircularLoader.vue';

export default {
  name: 'SuggestSelect',
  components: {
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
      kek: true,
      isInputIsReadonly: false,
    };
  },
  methods: {
    async fetchSuggestOptions() {
      this.loading = true;
      const { data } = await api.getSuggestSearch(this.inputValue);
      this.loading = false;

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
      this.isInputIsReadonly = true;
      this.clearOptions();
    },
    clearOptions() {
      this.suggestOptions = {};
    },
    clearSelectedOption() {
      this.selectedOption = null;
      this.inputValue = '';
      this.isInputIsReadonly = false;
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

    .option-chip {
      position: absolute;
      top: 4px;
      left: 5px;
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

      &:hover {
        background-color: #f1f1f1;
      }

      .alias,
      .name {
        display: block;
      }

      .company-name,
      .alias {
        color: #c3c3c3;
        font-size: 14px;
      }
    }
  }
}
</style>
