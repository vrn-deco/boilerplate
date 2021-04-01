import AxiosTest from './AxiosTest.vue'
import FormTest from './FormTest.vue'
import mockTest from './mockTest.vue'

export default [
  {
    path: '/axiostest',
    name: 'axiostest',
    component: AxiosTest
  },
  {
    path: '/form',
    name: 'formtest',
    component: FormTest
  },
  {
    path: '/mock',
    name: 'mock',
    component: mockTest
  }
]
