<template>
  <div id="app">
    <SuggestSelect
      label="Пользователь или компания"
      placeholder="Поиск по пользователю или компании..."
      :value.sync="value"
      :items="items"
      :loading="loading"
      @input="handleTyping"
    >
      <template #option="{ option }">
        <!-- TODO create separate components for user and company -->
        <!-- TODO use some default img if no avatar -->
        <img :src="option.avatar" height="48" width="48" alt="">
        <div>
          <span class="name">{{ option.name || `@${option.alias}` }}</span>
          <span class="additional-info">
            {{ option.type === 'company' ? 'Компания' : `@${option.alias}` }}
          </span>
        </div>
      </template>
    </SuggestSelect>
  </div>
</template>

<script>
import api from '@/api';
import SuggestSelect from './components/SuggestSelect.vue';

export default {
  name: 'App',
  components: {
    SuggestSelect,
  },
  data() {
    return {
      loading: false,
      searchKeyword: '',
      items: {},
      value: '',
    };
  },
  methods: {
    async fetchSuggestOptions() {
      this.loading = true;
      const { data, error } = await api.getSuggestOptions(this.value);
      this.loading = false;

      if (error) {
        alert(error.message);
        return;
      }

      this.items = data;
    },
    handleTyping({ target }) {
      if (target?.value?.length < 3) {
        this.items = {};
        return;
      }

      if (this.debounceTimer) clearTimeout(this.debounceTimer);

      this.debounceTimer = setTimeout(() => {
        this.fetchSuggestOptions();
        this.debounceTimer = null;
      }, 600);
    },
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
