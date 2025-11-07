<template>
  <div class="self-modifying-counter">
    <h2>自我修改的计数器</h2>
    <div class="counter-display">{{ count }}</div>
    <div class="button-group">
      <button @click="increment">增加</button>
      <button @click="decrement">减少</button>
      <button @click="reset">重置</button>
    </div>
    <div class="info-display">
      <h3>当前状态</h3>
      <p>步长: {{ step }}</p>
      <p>增加按钮功能: {{ increment.toString().includes('+') ? '增加' : '减少' }}</p>
      <p>减少按钮功能: {{ decrement.toString().includes('+') ? '增加' : '减少' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelfModifyingCounter',
  data() {
    return {
      count: 0,
      step: 1
    }
  },
  methods: {
    increment() {
      this.count += this.step
      this.modifyComponent()
    },
    decrement() {
      this.count -= this.step
      this.modifyComponent()
    },
    reset() {
      this.count = 0
      this.modifyComponent()
    },
    modifyComponent() {
      // 随机选择修改类型
      const modificationType = Math.random() < 0.5 ? 'swapActions' : 'changeStep'
      
      if (modificationType === 'swapActions') {
        // 真正交换增减按钮的功能
        const temp = this.increment
        this.increment = this.decrement
        this.decrement = temp
      } else {
        // 改变步长
        this.step = Math.floor(Math.random() * 5) + 1 // 步长在1-5之间随机变化
      }
    }
  }
}
</script>'

<style scoped>
.self-modifying-counter {
  text-align: center;
  padding: 20px;
}

.counter-display {
  font-size: 48px;
  margin: 20px 0;
  font-weight: bold;
}

.button-group {
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 0 5px;
  cursor: pointer;
}

.code-display {
  margin-top: 30px;
  text-align: left;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
}
</style>
      `).trim()
    }
  }
}
</script>

<style scoped>
.self-modifying-counter {
  text-align: center;
  padding: 20px;
}

.counter-display {
  font-size: 48px;
  margin: 20px 0;
  font-weight: bold;
}

.button-group {
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 0 5px;
  cursor: pointer;
}

.code-display {
  margin-top: 30px;
  text-align: left;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
}
</style>