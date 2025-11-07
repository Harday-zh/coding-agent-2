<template>
  <div class="student-manage">
    <div class="container">
      <h2>学生信息管理</h2>
      <div class="action-bar">
        <button class="btn btn-primary" @click="showAddModal = true">添加学生</button>
      </div>
      <div class="table-container">
        <table class="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>班级</th>
              <th>姓名</th>
              <th>年龄</th>
              <th>性别</th>
              <th>学科</th>
              <th>成绩</th>
              <th>爱好</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.class }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.age }}</td>
              <td>{{ student.gender }}</td>
              <td>{{ student.subject }}</td>
              <td>{{ student.score }}</td>
              <td>{{ student.hobby.join(', ') }}</td>
              <td>
                <button class="btn btn-edit" @click="editStudent(student)">编辑</button>
                <button class="btn btn-delete" @click="deleteStudent(student.id)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 添加/编辑模态框 -->
    <div class="modal" v-if="showAddModal || showEditModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>{{ showEditModal ? '编辑学生' : '添加学生' }}</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label>班级:</label>
            <input v-model="formData.class" type="text" required>
          </div>
          <div class="form-group">
            <label>姓名:</label>
            <input v-model="formData.name" type="text" required>
          </div>
          <div class="form-group">
            <label>年龄:</label>
            <input v-model.number="formData.age" type="number" min="6" max="12" required>
          </div>
          <div class="form-group">
            <label>性别:</label>
            <select v-model="formData.gender" required>
              <option value="">请选择</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div class="form-group">
            <label>学科:</label>
            <select v-model="formData.subject" required>
              <option value="">请选择</option>
              <option value="语文">语文</option>
              <option value="数学">数学</option>
              <option value="英语">英语</option>
              <option value="科学">科学</option>
              <option value="音乐">音乐</option>
              <option value="美术">美术</option>
              <option value="体育">体育</option>
            </select>
          </div>
          <div class="form-group">
            <label>成绩:</label>
            <input v-model.number="formData.score" type="number" min="0" max="100" required>
          </div>
          <div class="form-group">
            <label>爱好:</label>
            <div class="checkbox-group">
              <label v-for="hobby in hobbies" :key="hobby">
                <input type="checkbox" :value="hobby" v-model="formData.hobby">
                {{ hobby }}
              </label>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-cancel" @click="closeModal">取消</button>
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      students: [],
      showAddModal: false,
      showEditModal: false,
      formData: {
        class: '',
        name: '',
        age: '',
        gender: '',
        subject: '',
        score: '',
        hobby: []
      },
      hobbies: ['看书', '画画', '音乐', '运动', '编程', '游戏', '旅游']
    }
  },
  mounted() {
    this.fetchStudents()
  },
  methods: {
    fetchStudents() {
      this.$store.dispatch('fetchStudents')
      this.students = this.$store.getters.allStudents
    },
    editStudent(student) {
      this.showEditModal = true
      this.formData = { ...student }
    },
    deleteStudent(id) {
      if (confirm('确定要删除该学生吗？')) {
        this.$store.dispatch('deleteStudent', id)
        this.fetchStudents()
      }
    },
    submitForm() {
      if (this.showEditModal) {
        this.$store.dispatch('updateStudent', this.formData)
      } else {
        this.$store.dispatch('addStudent', this.formData)
      }
      this.closeModal()
      this.fetchStudents()
    },
    closeModal() {
      this.showAddModal = false
      this.showEditModal = false
      this.formData = {
        class: '',
        name: '',
        age: '',
        gender: '',
        subject: '',
        score: '',
        hobby: []
      }
    }
  },
  computed: {
    ...mapGetters(['allStudents', 'studentCount'])
  }
}
</script>

<style scoped>
.student-manage {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.action-bar {
  margin-bottom: 20px;
  text-align: right;
}

.table-container {
  overflow-x: auto;
}

.student-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.student-table th,
.student-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.student-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
}

.btn-primary {
  background-color: #409EFF;
  color: white;
}

.btn-edit {
  background-color: #67C23A;
  color: white;
}

.btn-delete {
  background-color: #F56C6C;
  color: white;
}

.btn-cancel {
  background-color: #909399;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close {
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

.checkbox-group label {
  margin-right: 20px;
  margin-bottom: 5px;
  font-weight: normal;
}

.form-actions {
  text-align: right;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .student-table {
    font-size: 12px;
  }
  .student-table th,
  .student-table td {
    padding: 8px;
  }
  .btn {
    padding: 6px 12px;
    font-size: 12px;
  }
  .modal-content {
    width: 95%;
    margin: 10px;
  }
}
</style>