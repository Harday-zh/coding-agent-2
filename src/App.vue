<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <h1 class="logo">学生管理系统</h1>
        <div class="nav-links">
          <router-link to="/student" class="nav-link" :class="{ active: $route.path === '/student' }">学生管理</router-link>
          <router-link to="/visualization" class="nav-link" :class="{ active: $route.path === '/visualization' }">数据可视化</router-link>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f7fa;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #409EFF;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar .container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.main-content {
  flex: 1;
  padding: 20px;
}

@media (max-width: 768px) {
  .navbar .container {
    flex-direction: column;
    gap: 15px;
  }
  .nav-links {
    gap: 15px;
  }
  .logo {
    font-size: 20px;
  }
  .nav-link {
    font-size: 14px;
  }
}
</style>
