<template>
  <header>
    <div class="container">
      <div class="header-wrapper">
        <NuxtLink to="/" class="header-logo">Logo</NuxtLink>
        <div class="header-nav">
          <NuxtLink to="/">Home</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup></script>

<style scoped>
header {
  background-color: #fff;
  padding: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.header-logo {
  font-weight: bold;
  font-size: 24px;
  text-decoration: none;
  color: #000;
}
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-nav {
  display: flex;
  gap: 20px;
}

.header-nav a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}
.header-nav a:hover {
  color: #f00;
}
</style>
