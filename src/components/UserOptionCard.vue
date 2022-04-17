<template>
  <div class="user-option-card">
    <img :src="user.avatar || '/img/default-user-img.jpeg'" height="48" width="48" alt="">
    <div>
      <span class="name">{{ user.name || `@${user.alias}` }}</span>
      <span class="additional-info">
        {{ `@${user.alias}` }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserOptionCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-option-card {
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
