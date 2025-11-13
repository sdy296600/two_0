<script setup>
defineProps({
  to: { type: String, required: true },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="to">
    <div
      class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
    >
      <h3 class="text-xl font-semibold text-[#296AF1] dark:text-[#3DD9B6] mb-3">
        {{ icon }} {{ title }}
      </h3>
      <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        {{ description }}
      </p>
    </div>
  </RouterLink>
</template>
