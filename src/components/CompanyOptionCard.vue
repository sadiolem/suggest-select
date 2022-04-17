<template>
  <div class="company-option-card">
    <img :src="company.avatar || '/img/default-company-img.png'" height="48" width="48" alt="">
    <div>
      <span class="name">{{ company.name || `@${company.alias}` }}</span>
      <span class="additional-info">
        Компания
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyOptionCard',
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.company-option-card {
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
</style>
