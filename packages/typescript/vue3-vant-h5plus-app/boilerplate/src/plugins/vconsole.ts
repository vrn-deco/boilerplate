import VConsole from 'vconsole'
import config from '@/config'

if (config.APP.VCONSOLE_ENABLE) {
  new VConsole()
}
