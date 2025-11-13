<template>
  <div class="component-demo">
    <div class="component-demo__header">
      <h1>컴포넌트 데모</h1>
      <DarkModeToggle />
    </div>

    <section class="demo-section">
      <h2>StatusChip 컴포넌트</h2>
      <div class="demo-section__content">
        <StatusChip status="available" />
        <StatusChip status="in-use" />
        <StatusChip status="broken" />
        <StatusChip status="maintenance" />
      </div>
    </section>

    <section class="demo-section">
      <h2>BaseButton 컴포넌트</h2>
      <div class="demo-section__content">
        <BaseButton variant="primary">Primary Button</BaseButton>
        <BaseButton variant="secondary">Secondary Button</BaseButton>
        <BaseButton variant="danger">Danger Button</BaseButton>
        <BaseButton variant="primary" disabled>Disabled Button</BaseButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>아이콘이 있는 버튼</h2>
      <div class="demo-section__content">
        <BaseButton variant="primary">
          <template #icon>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </template>
          추가하기
        </BaseButton>
        <BaseButton variant="secondary">
          <template #icon>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </template>
          수정하기
        </BaseButton>
        <BaseButton variant="danger">
          <template #icon>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </template>
          삭제하기
        </BaseButton>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import StatusChip from '@/components/common/StatusChip.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import DarkModeToggle from '@/components/common/DarkModeToggle.vue'
import { useDarkMode } from '@/composables/useDarkMode'

const { initDarkMode } = useDarkMode()

onMounted(() => {
  initDarkMode()
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.component-demo {
  min-height: 100vh;
  padding: $spacing-8;
  background-color: $color-background;
  transition: background-color $transition-base;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-12;

    h1 {
      font-size: $font-size-4xl;
      font-weight: $font-weight-bold;
      color: $color-gray-900;
      margin: 0;
    }
  }
}

.demo-section {
  margin-bottom: $spacing-12;
  padding: $spacing-8;
  background-color: $color-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-base;

  h2 {
    font-size: $font-size-2xl;
    font-weight: $font-weight-semibold;
    color: $color-gray-900;
    margin: 0 0 $spacing-6 0;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-4;
  }
}

// Dark mode styles
:global(.dark) {
  .component-demo {
    background-color: $color-dark-bg;

    &__header h1 {
      color: $color-dark-text-primary;
    }
  }

  .demo-section {
    background-color: $color-dark-bg-secondary;

    h2 {
      color: $color-dark-text-primary;
    }
  }
}
</style>
