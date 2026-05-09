<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')
const activeTab = ref('海贼王')
const activeNav = ref('home')

const tabs = ['海贼王', '宝可梦', '洛卡纳']

interface Product {
  id: string
  name: string
  price: number
  image: string
  rarity: string
}

const products = ref<Product[]>([
  { id: 'OP06-027', name: 'モンキー・D・ルフィ', price: 410, image: '', rarity: 'SR' },
  { id: 'OP06-043', name: 'ロロノア・ゾロ', price: 230, image: '', rarity: 'R' },
  { id: 'OP06-101', name: 'サンジ', price: 380, image: '', rarity: 'SR' },
  { id: 'OP06-056', name: 'トラファルガー・ロー', price: 520, image: '', rarity: 'SEC' },
  { id: 'OP06-078', name: 'ポートガス・D・エース', price: 680, image: '', rarity: 'SR' },
  { id: 'OP06-033', name: 'ナミ', price: 150, image: '', rarity: 'R' },
])

const formatPrice = (price: number) => `¥${price.toLocaleString()}`
</script>

<template>
  <div class="app-container">
    <!-- 顶部搜索栏 -->
    <header class="search-header">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          v-model="searchText"
          type="text"
          class="search-input"
          placeholder="搜索卡牌"
        />
      </div>
    </header>

    <!-- 分类标签 -->
    <nav class="category-tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="tab-btn"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </nav>

    <!-- 商品卡片网格 -->
    <main class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="card-image-wrap">
          <div class="card-image-placeholder">
            <span class="card-id-text">{{ product.id }}</span>
          </div>
          <span class="rarity-badge">{{ product.rarity }}</span>
        </div>
        <div class="card-info">
          <p class="card-name">{{ product.name }}</p>
          <p class="card-price">{{ formatPrice(product.price) }}</p>
        </div>
      </div>
    </main>

    <!-- 底部导航 -->
    <footer class="bottom-nav">
      <button
        class="nav-item"
        :class="{ active: activeNav === 'home' }"
        @click="activeNav = 'home'"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span class="nav-label">首页</span>
      </button>
      <button
        class="nav-item"
        :class="{ active: activeNav === 'profile' }"
        @click="activeNav = 'profile'"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span class="nav-label">我的</span>
      </button>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background: #f5f5f5;
  overflow: hidden;
}

/* 搜索栏 */
.search-header {
  padding: 12px 16px;
  background: #ffffff;
  flex-shrink: 0;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 20px;
  padding: 8px 14px;
  gap: 8px;
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #999;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #333;
}

.search-input::placeholder {
  color: #b0b0b0;
}

/* 分类标签 */
.category-tabs {
  display: flex;
  gap: 10px;
  padding: 10px 16px;
  background: #ffffff;
  overflow-x: auto;
  flex-shrink: 0;
  border-bottom: 1px solid #f0f0f0;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  padding: 6px 18px;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  color: #666;
  font-size: 13px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #1a1a1a;
  color: #ffffff;
  border-color: #1a1a1a;
}

/* 商品网格 */
.product-grid {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-content: start;
}

.product-card {
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
}

.card-image-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-id-text {
  font-size: 13px;
  color: #999;
  font-weight: 500;
}

.rarity-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.card-info {
  padding: 8px 10px 10px;
}

.card-name {
  font-size: 12px;
  color: #333;
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-price {
  font-size: 15px;
  color: #e53935;
  font-weight: 700;
  margin: 4px 0 0;
}

/* 底部导航 */
.bottom-nav {
  display: flex;
  background: #ffffff;
  border-top: 1px solid #e8e8e8;
  flex-shrink: 0;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0 6px;
  border: none;
  background: transparent;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
}

.nav-item.active {
  color: #1a1a1a;
}

.nav-icon {
  width: 22px;
  height: 22px;
  margin-bottom: 2px;
}

.nav-label {
  font-size: 10px;
}
</style>