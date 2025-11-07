<template>
  <div class="visualization">
    <div class="container">
      <h2>学生信息可视化</h2>
      <div class="chart-container">
        <div class="chart-item">
          <h3>班级学生数量统计</h3>
          <div id="classChart" ref="classChart" style="width: 100%; height: 400px;"></div>
        </div>
        <div class="chart-item">
          <h3>性别比例</h3>
          <div id="genderChart" ref="genderChart" style="width: 100%; height: 400px;"></div>
        </div>
        <div class="chart-item">
          <h3>学科成绩分布</h3>
          <div id="subjectChart" ref="subjectChart" style="width: 100%; height: 400px;"></div>
        </div>
        <div class="chart-item">
          <h3>成绩分数段统计</h3>
          <div id="scoreChart" ref="scoreChart" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      students: []
    }
  },
  mounted() {
    this.fetchStudents()
  },
  methods: {
    fetchStudents() {
      this.$store.dispatch('fetchStudents')
      this.students = this.$store.getters.allStudents
      this.$nextTick(() => {
        this.initCharts()
      })
    },
    initCharts() {
      this.initClassChart()
      this.initGenderChart()
      this.initSubjectChart()
      this.initScoreChart()
    },
    initClassChart() {
      const classData = this.getClassData()
      const chart = echarts.init(this.$refs.classChart)
      const option = {
        title: {
          text: '班级学生数量'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: classData.classes
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: classData.counts,
            type: 'bar',
            itemStyle: {
              color: '#409EFF'
            }
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    },
    initGenderChart() {
      const genderData = this.getGenderData()
      const chart = echarts.init(this.$refs.genderChart)
      const option = {
        title: {
          text: '性别比例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '性别',
            type: 'pie',
            radius: '50%',
            data: [
              { value: genderData.male, name: '男' },
              { value: genderData.female, name: '女' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    },
    initSubjectChart() {
      const subjectData = this.getSubjectData()
      const chart = echarts.init(this.$refs.subjectChart)
      const option = {
        title: {
          text: '学科成绩分布'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['平均分', '最高分', '最低分']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: subjectData.subjects
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '平均分',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64, 158, 255, 0.5)' },
                { offset: 1, color: 'rgba(64, 158, 255, 0.2)' }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: subjectData.average
          },
          {
            name: '最高分',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(103, 194, 58, 0.5)' },
                { offset: 1, color: 'rgba(103, 194, 58, 0.2)' }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: subjectData.max
          },
          {
            name: '最低分',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(245, 108, 108, 0.5)' },
                { offset: 1, color: 'rgba(245, 108, 108, 0.2)' }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: subjectData.min
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    },
    initScoreChart() {
      const scoreData = this.getScoreData()
      const chart = echarts.init(this.$refs.scoreChart)
      const option = {
        title: {
          text: '成绩分数段统计'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}人'
        },
        xAxis: {
          type: 'category',
          data: scoreData.intervals
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: scoreData.counts,
            type: 'bar',
            itemStyle: {
              color: function(params) {
                const colors = ['#F56C6C', '#E6A23C', '#67C23A', '#409EFF', '#909399']
                return colors[params.dataIndex % colors.length]
              }
            }
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    },
    getClassData() {
      const classMap = new Map()
      this.students.forEach(student => {
        const className = student.class
        classMap.set(className, (classMap.get(className) || 0) + 1)
      })
      return {
        classes: Array.from(classMap.keys()),
        counts: Array.from(classMap.values())
      }
    },
    getGenderData() {
      let male = 0
      let female = 0
      this.students.forEach(student => {
        if (student.gender === '男') {
          male++
        } else {
          female++
        }
      })
      return { male, female }
    },
    getSubjectData() {
      const subjectMap = new Map()
      this.students.forEach(student => {
        const subject = student.subject
        if (!subjectMap.has(subject)) {
          subjectMap.set(subject, { sum: 0, count: 0, max: 0, min: 100 })
        }
        const data = subjectMap.get(subject)
        data.sum += student.score
        data.count += 1
        data.max = Math.max(data.max, student.score)
        data.min = Math.min(data.min, student.score)
        subjectMap.set(subject, data)
      })
      const subjects = Array.from(subjectMap.keys())
      const average = subjects.map(subject => {
        const data = subjectMap.get(subject)
        return Math.round(data.sum / data.count)
      })
      const max = subjects.map(subject => subjectMap.get(subject).max)
      const min = subjects.map(subject => subjectMap.get(subject).min)
      return { subjects, average, max, min }
    },
    getScoreData() {
      const intervals = ['60分以下', '60-70分', '70-80分', '80-90分', '90-100分']
      const counts = [0, 0, 0, 0, 0]
      this.students.forEach(student => {
        const score = student.score
        if (score < 60) counts[0]++
        else if (score < 70) counts[1]++
        else if (score < 80) counts[2]++
        else if (score < 90) counts[3]++
        else counts[4]++
      })
      return { intervals, counts }
    }
  },
  computed: {
    ...mapGetters(['allStudents', 'studentCount'])
  }
}
</script>

<style scoped>
.visualization {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.chart-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
}

.chart-item {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.chart-item h3 {
  margin-bottom: 20px;
  color: #666;
  text-align: center;
}

@media (max-width: 768px) {
  .chart-container {
    grid-template-columns: 1fr;
  }
  .chart-item {
    padding: 15px;
  }
  #classChart,
  #genderChart,
  #subjectChart,
  #scoreChart {
    height: 300px !important;
  }
}
</style>