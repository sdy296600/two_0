<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
// import FeatureCard from '@/components/common/FeatureCard.vue'

const userRole = ref('developer')

const allFeatures = {
  //관리자용 진입
  admin: [
    {
      to: '/admin',
      icon: '👨‍💼',
      title: '관리자 시스템',
      description: '20개의 냉장 사물함을 실시간으로 모니터링하고 관리하세요',
    },
  ],
  //기사용 진입
  // driver: [
  //   {
  //     to: '/driver',
  //     icon: '🚗',
  //     title: '사용자 시스템(기사)',
  //     description: '배정된 배송을 관리하고 추적하세요',
  //   },
  // ],
  //개발용 진입
  developer: [
    {
      to: '/admin',
      icon: '👨‍💼',
      title: '관리자 시스템',
      description: '20개의 냉장 사물함을 실시간으로 모니터링하고 관리하세요',
    },
    // {
    //   to: '/driver',
    //   icon: '🚗',
    //   title: '사용자 시스템(기사)',
    //   description: '배정된 배송을 관리하고 추적하세요',
    // },
    {
      to: '/demo',
      icon: '📊',
      title: '데모',
      description: '',
    },
  ],
}

const features = computed(() => allFeatures[userRole.value] || allFeatures.developer)

onMounted(() => {
  const role = localStorage.getItem('userRole')
  if (role) {
    userRole.value = role
  }
})
</script>

<template>
  <main class="px-8 py-12 max-w-[1200px] mx-auto">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
        🧊 ChillBox
        <span v-if="userRole === 'admin'">관리자 시스템</span>
        <span v-else-if="userRole === 'driver'">사용자 시스템</span>
        <span v-else>통합 관리 시스템</span>
      </h1>
      <p class="text-xl text-slate-600 dark:text-slate-300 mb-12">
        <span v-if="userRole === 'admin'">냉장 사물함을 관리하는 관리자 페이지입니다</span>
        <span v-else-if="userRole === 'driver'">배송 업무를 관리하는 기사 페이지입니다</span>
        <span v-else>모든 시스템에 접근할 수 있는 개발자 페이지입니다</span>
      </p>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-12">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
        >
          <RouterLink :to="feature.to" class="no-underline">
            <h3 class="text-2xl font-semibold text-[#296AF1] dark:text-[#3DD9B6] mb-3">
              {{ feature.icon }} {{ feature.title }}
            </h3>
            <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ feature.description }}
            </p>
          </RouterLink>
        </div>
      </div>

      <div class="flex gap-4 justify-center flex-wrap">
        <RouterLink
          to="/demo"
          class="px-8 py-4 rounded-lg text-lg font-semibold no-underline transition-all duration-200 inline-block bg-white dark:bg-slate-800 text-[#296AF1] dark:text-[#3DD9B6] border-2 border-[#296AF1] dark:border-[#3DD9B6] hover:bg-[#296AF1] hover:text-white dark:hover:bg-[#3DD9B6] dark:hover:text-slate-900"
        >
          컴포넌트 데모
        </RouterLink>
      </div>
    </div>
  </main>
</template>
