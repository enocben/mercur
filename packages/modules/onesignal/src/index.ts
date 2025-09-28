import { ModuleProvider, Modules } from '@medusajs/framework/utils'

import OnesignalService from './service'
export * from './types'
export * from './templates'

export default ModuleProvider(Modules.NOTIFICATION, {
  services: [OnesignalService]
})
