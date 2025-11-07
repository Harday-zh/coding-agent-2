import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    students: []
  },
  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students
    },
    ADD_STUDENT(state, student) {
      state.students.push(student)
    },
    UPDATE_STUDENT(state, student) {
      const index = state.students.findIndex(s => s.id === student.id)
      if (index !== -1) {
        state.students[index] = student
      }
    },
    DELETE_STUDENT(state, id) {
      state.students = state.students.filter(s => s.id !== id)
    }
  },
  actions: {
    fetchStudents({ commit }) {
      // 从mock获取学生数据
      const students = require('../mock/data').students
      commit('SET_STUDENTS', students)
    },
    addStudent({ commit }, student) {
      // 模拟添加学生
      const newStudent = { ...student, id: Date.now() }
      commit('ADD_STUDENT', newStudent)
      return newStudent
    },
    updateStudent({ commit }, student) {
      commit('UPDATE_STUDENT', student)
      return student
    },
    deleteStudent({ commit }, id) {
      commit('DELETE_STUDENT', id)
      return id
    }
  },
  getters: {
    allStudents: state => state.students,
    studentCount: state => state.students.length
  }
})