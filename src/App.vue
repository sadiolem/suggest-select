<template>
  <div id="app">
    <SuggestSelect
      label="Пользователь или компания"
      placeholder="Поиск по пользователю или компании..."
    />
  </div>
</template>

<script>
import SuggestSelect from './components/SuggestSelect.vue';

export default {
  name: 'App',
  components: {
    SuggestSelect,
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
