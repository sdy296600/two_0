<template>
  <div class="dashboard">
    <h1>ChillBox 관리자 대시보드</h1>

    <!-- 통계 카드 -->
    <section class="stats-section">
      <h2>주요 통계</h2>
      <div v-if="statsLoading" class="loading">통계 로딩 중...</div>
      <div v-else-if="statsError" class="error">{{ statsError }}</div>
      <div v-else class="stats-grid">
        <div class="stat-card">
          <div class="stat-card__label">전체 사물함</div>
          <div class="stat-card__value">{{ dashboardStats.totalLockers }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__label">사용 중</div>
          <div class="stat-card__value">{{ dashboardStats.inUseLockers }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__label">사용 가능</div>
          <div class="stat-card__value">{{ dashboardStats.availableLockers }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__label">사용률</div>
          <div class="stat-card__value">{{ dashboardStats.usageRate }}%</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__label">오늘 예약</div>
          <div class="stat-card__value">{{ dashboardStats.todayReservations }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__label">활성 예약</div>
          <div class="stat-card__value">{{ dashboardStats.activeReservations }}</div>
        </div>
      </div>
    </section>

    <!-- 사물함 목록 -->
    <section class="lockers-section">
      <div class="section-header">
        <h2>사물함 현황</h2>
        <div class="filter-controls">
          <select v-model="lockerFilter" @change="fetchLockers">
            <option value="">전체</option>
            <option value="available">사용 가능</option>
            <option value="in-use">사용 중</option>
            <option value="maintenance">점검 중</option>
            <option value="broken">고장</option>
          </select>
        </div>
      </div>

      <div v-if="lockersLoading" class="loading">사물함 로딩 중...</div>
      <div v-else-if="lockersError" class="error">{{ lockersError }}</div>
      <div v-else class="lockers-grid">
        <div v-for="locker in lockers" :key="locker.id" class="locker-card">
          <div class="locker-card__header">
            <span class="locker-card__number">{{ locker.number }}</span>
            <StatusChip :status="locker.status" />
          </div>
          <div class="locker-card__info">
            <div class="info-row">
              <span class="label">크기:</span>
              <span class="value">{{ getSizeLabel(locker.size) }}</span>
            </div>
            <div class="info-row">
              <span class="label">위치:</span>
              <span class="value">{{ locker.location }}</span>
            </div>
            <div v-if="locker.temperature" class="info-row">
              <span class="label">온도:</span>
              <span class="value">{{ locker.temperature }}°C</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 최근 예약 -->
    <section class="reservations-section">
      <h2>최근 예약</h2>
      <div v-if="reservationsLoading" class="loading">예약 로딩 중...</div>
      <div v-else-if="reservationsError" class="error">{{ reservationsError }}</div>
      <table v-else class="reservations-table">
        <thead>
          <tr>
            <th>예약번호</th>
            <th>고객명</th>
            <th>사물함</th>
            <th>시작시간</th>
            <th>종료시간</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in recentReservations" :key="reservation.id">
            <td>{{ reservation.id }}</td>
            <td>{{ reservation.customerName }}</td>
            <td>{{ reservation.lockerNumber }}</td>
            <td>{{ formatDateTime(reservation.startTime) }}</td>
            <td>{{ formatDateTime(reservation.endTime) }}</td>
            <td>
              <StatusChip :status="getReservationStatus(reservation.status)" />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { lockerService } from '@/api/lockerService'
import { reservationService } from '@/api/reservationService'
import { statsService } from '@/api/statsService'
import StatusChip from '@/components/common/StatusChip.vue'

// 상태 관리
const dashboardStats = ref({})
const lockers = ref([])
const recentReservations = ref([])
const lockerFilter = ref('')

// 로딩 상태
const statsLoading = ref(false)
const lockersLoading = ref(false)
const reservationsLoading = ref(false)

// 에러 상태
const statsError = ref(null)
const lockersError = ref(null)
const reservationsError = ref(null)

// 통계 조회
const fetchDashboardStats = async () => {
  statsLoading.value = true
  statsError.value = null

  try {
    const response = await statsService.getDashboard()
    dashboardStats.value = response.data
  } catch (err) {
    statsError.value = '통계를 불러오는데 실패했습니다.'
    console.error(err)
  } finally {
    statsLoading.value = false
  }
}

// 사물함 조회
const fetchLockers = async () => {
  lockersLoading.value = true
  lockersError.value = null

  try {
    const params = {}
    if (lockerFilter.value) {
      params.status = lockerFilter.value
    }

    const response = await lockerService.getAll(params)
    lockers.value = response.data
  } catch (err) {
    lockersError.value = '사물함 목록을 불러오는데 실패했습니다.'
    console.error(err)
  } finally {
    lockersLoading.value = false
  }
}

// 예약 조회
const fetchReservations = async () => {
  reservationsLoading.value = true
  reservationsError.value = null

  try {
    const response = await reservationService.getAll()
    // 최근 10개만 표시
    recentReservations.value = response.data.slice(0, 10)
  } catch (err) {
    reservationsError.value = '예약 목록을 불러오는데 실패했습니다.'
    console.error(err)
  } finally {
    reservationsLoading.value = false
  }
}

// 유틸리티 함수
const getSizeLabel = (size) => {
  const sizeMap = {
    small: '소형',
    medium: '중형',
    large: '대형',
  }
  return sizeMap[size] || size
}

const getReservationStatus = (status) => {
  const statusMap = {
    active: 'in-use',
    completed: 'available',
    cancelled: 'broken',
    expired: 'maintenance',
  }
  return statusMap[status] || status
}

const formatDateTime = (dateTimeStr) => {
  const date = new Date(dateTimeStr)
  return date.toLocaleString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 초기 데이터 로드
onMounted(() => {
  fetchDashboardStats()
  fetchLockers()
  fetchReservations()
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.dashboard {
  padding: $spacing-8;
  background-color: $color-background;
  min-height: 100vh;

  h1 {
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-gray-900;
    margin-bottom: $spacing-8;
  }

  h2 {
    font-size: $font-size-2xl;
    font-weight: $font-weight-semibold;
    color: $color-gray-900;
    margin-bottom: $spacing-6;
  }
}

.stats-section,
.lockers-section,
.reservations-section {
  margin-bottom: $spacing-12;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-6;
}

.stat-card {
  background: $color-white;
  padding: $spacing-6;
  border-radius: $radius-lg;
  box-shadow: $shadow-base;

  &__label {
    font-size: $font-size-sm;
    color: $color-gray-600;
    margin-bottom: $spacing-2;
  }

  &__value {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $color-primary;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-6;

  select {
    padding: $spacing-2 $spacing-4;
    border: 1px solid $color-gray-200;
    border-radius: $radius-base;
    font-size: $font-size-base;
    background-color: $color-white;
    cursor: pointer;

    &:focus {
      outline: 2px solid $color-primary;
      outline-offset: 2px;
    }
  }
}

.lockers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: $spacing-6;
}

.locker-card {
  background: $color-white;
  padding: $spacing-6;
  border-radius: $radius-lg;
  box-shadow: $shadow-base;
  transition: transform $transition-base;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-4;
  }

  &__number {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-gray-900;
  }

  &__info {
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: $spacing-2;
      font-size: $font-size-sm;

      .label {
        color: $color-gray-600;
      }

      .value {
        color: $color-gray-900;
        font-weight: $font-weight-medium;
      }
    }
  }
}

.reservations-table {
  width: 100%;
  background: $color-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-base;
  overflow: hidden;

  thead {
    background-color: $color-gray-200;

    th {
      padding: $spacing-4;
      text-align: left;
      font-size: $font-size-sm;
      font-weight: $font-weight-semibold;
      color: $color-gray-900;
    }
  }

  tbody {
    td {
      padding: $spacing-4;
      font-size: $font-size-sm;
      color: $color-gray-900;
      border-top: 1px solid $color-gray-200;
    }
  }
}

.loading,
.error {
  padding: $spacing-6;
  text-align: center;
  background: $color-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-base;
}

.loading {
  color: $color-gray-600;
}

.error {
  color: $color-error;
}

// Dark mode
:global(.dark) {
  .dashboard {
    background-color: $color-dark-bg;

    h1,
    h2 {
      color: $color-dark-text-primary;
    }
  }

  .stat-card,
  .locker-card,
  .reservations-table,
  .loading,
  .error {
    background-color: $color-dark-bg-secondary;
  }

  .stat-card__label,
  .locker-card__info .label {
    color: $color-dark-text-secondary;
  }

  .stat-card__value,
  .locker-card__number,
  .locker-card__info .value,
  .reservations-table td {
    color: $color-dark-text-primary;
  }

  .reservations-table {
    thead {
      background-color: $color-dark-bg-tertiary;

      th {
        color: $color-dark-text-primary;
      }
    }

    tbody td {
      border-top-color: $color-dark-border;
    }
  }

  .section-header select {
    background-color: $color-dark-bg-tertiary;
    border-color: $color-dark-border;
    color: $color-dark-text-primary;
  }
}
</style>
