import config from '@/config'
import VConsole from 'vconsole'

if (config.APP.VCONSOLE_ENABLE) {
  new VConsole()
}
