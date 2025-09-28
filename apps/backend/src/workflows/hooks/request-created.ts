import { Modules } from '@medusajs/framework/utils'

import { REQUESTS_MODULE, RequestsModuleService } from '@mercurjs/requests'

import { createRequestWorkflow } from '../requests/workflows'

createRequestWorkflow.hooks.requestCreated(
  async ({ requestId }, { container }) => {
    const service = container.resolve<RequestsModuleService>(REQUESTS_MODULE)
    const eventBus = container.resolve(Modules.EVENT_BUS)

    const request = await service.retrieveRequest(requestId)

    // Emit specific events based on request type
    let specificEventName: string

    switch (request.type) {
      case 'product':
        specificEventName = 'requests.product.created'
        break
      case 'product_update':
        specificEventName = 'requests.product_update.created'
        break
      case 'product_type':
        specificEventName = 'requests.product_type.created'
        break
      case 'product_tag':
        specificEventName = 'requests.product_tag.created'
        break
      case 'product_collection':
        specificEventName = 'requests.product_collection.created'
        break
      case 'product_category':
        specificEventName = 'requests.product_category.created'
        break
      case 'seller':
        specificEventName = 'requests.seller.created'
        break
      default:
        return
    }

    await eventBus.emit({
      name: specificEventName,
      data: { id: requestId }
    })
  }
)
