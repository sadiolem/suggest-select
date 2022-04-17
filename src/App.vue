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
        <CompanyOptionCard v-if="option.type === 'company'" :company="option"/>
        <UserOptionCard v-else :user="option" />
      </template>
    </SuggestSelect>
  </div>
</template>

<script>
import api from '@/api';
import UserOptionCard from '@/components/UserOptionCard.vue';
import CompanyOptionCard from '@/components/CompanyOptionCard.vue';
import SuggestSelect from './components/SuggestSelect.vue';

export default {
  name: 'App',
  components: {
    CompanyOptionCard,
    SuggestSelect,
    UserOptionCard,
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
