<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = '이메일과 비밀번호를 입력해주세요'
    return
  }

  isLoading.value = true

  // 임시 로그인 로직 ()
  try {
    setTimeout(() => {
      // 테스트 계정
      const accounts = {
        'admin@example.com': { password: '123', role: 'admin' },
        'driver@example.com': { password: '123', role: 'driver' },
        'dev@example.com': { password: '123', role: 'developer' },
      }

      const account = accounts[email.value]
      if (account && account.password === password.value) {
        localStorage.setItem('authToken', 'fake-token-' + Date.now())
        localStorage.setItem('userRole', account.role)
        router.push('/main')
      } else {
        error.value = '이메일 또는 비밀번호가 올바르지 않습니다'
      }
      isLoading.value = false
    }, 500)
  } catch {
    error.value = '로그인 중 오류가 발생했습니다'
    isLoading.value = false
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Enter') {
    handleLogin()
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen from-slate-100 bg-linear-to-br to-slate-200 dark:from-slate-900 dark:to-slate-800"
  >
    <div class="w-full max-w-md">
      <!-- 로그인 카드 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <!-- 헤더 -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold mb-2">🧊</h1>
          <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100">ChillBox</h2>
          <p class="text-slate-600 dark:text-slate-400 mt-2">관리자 시스템 로그인</p>
        </div>

        <!-- 폼 -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- 이메일 입력 -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              이메일
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="test@example.com"
              class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#296AF1] dark:focus:ring-[#3DD9B6]"
              @keydown="handleKeydown"
            />
          </div>

          <!-- 비밀번호 입력 -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              비밀번호
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#296AF1] dark:focus:ring-[#3DD9B6]"
              @keydown="handleKeydown"
            />
          </div>

          <!-- 에러 메시지 -->
          <div
            v-if="error"
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm"
          >
            {{ error }}
          </div>

          <!-- 로그인 버튼 -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-br from-[#296AF1] to-[#3DD9B6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">로그인</span>
            <span v-else>로그인 중...</span>
          </button>
        </form>

        <!-- 테스트 계정 안내 -->
        <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p class="text-center text-xs text-slate-600 dark:text-slate-400 mb-2">테스트 계정</p>
          <div
            class="bg-slate-50 dark:bg-slate-700/50 rounded p-3 text-xs text-slate-700 dark:text-slate-300 space-y-2"
          >
            <div>
              <p class="font-semibold text-slate-800 dark:text-slate-200">👨‍💼 관리자</p>
              <p><strong>이메일:</strong> admin@example.com</p>
              <p><strong>비밀번호:</strong> 123</p>
            </div>
            <div class="border-t border-slate-300 dark:border-slate-600 pt-2">
              <p class="font-semibold text-slate-800 dark:text-slate-200">🚗 기사</p>
              <p><strong>이메일:</strong> driver@example.com</p>
              <p><strong>비밀번호:</strong> 123</p>
            </div>
            <div class="border-t border-slate-300 dark:border-slate-600 pt-2">
              <p class="font-semibold text-slate-800 dark:text-slate-200">👨‍💻 개발자</p>
              <p><strong>이메일:</strong> dev@example.com</p>
              <p><strong>비밀번호:</strong> 123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
