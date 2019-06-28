import AxiosTest from './AxiosTest.vue'
import FormTest from './FormTest.vue'

export default [
  {
    path: '/axiostest',
    name: 'axiostest',
    component: AxiosTest
  },
  {
    path: '/form/:id',
    name: 'formtest',
    component: FormTest
  }
]
