import { acceptProductRequestWorkflow } from '#/workflows/requests/workflows'

import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

import {
  CONFIGURATION_MODULE,
  ConfigurationModuleService
} from '@mercurjs/configuration'
import {
  ConfigurationRuleType,
  ProductRequestUpdatedEvent
} from '@mercurjs/framework'
import {
  OnesignalNotificationTemplates,
  OnesignalSegmentsTo
} from '@mercurjs/onesignal'
import { REQUESTS_MODULE, RequestsModuleService } from '@mercurjs/requests'

export default async function productRequestCreatedHandler({
  event,
  container
}: SubscriberArgs<{ id: string }>) {
  const { id } = event.data
  const service = container.resolve<RequestsModuleService>(REQUESTS_MODULE)
  const configuration =
    container.resolve<ConfigurationModuleService>(CONFIGURATION_MODULE)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const notificationModule = container.resolve(Modules.NOTIFICATION)

  const request = await service.retrieveRequest(id)

  if (
    request.status !== 'draft' &&
    !(await configuration.isRuleEnabled(
      ConfigurationRuleType.REQUIRE_PRODUCT_APPROVAL
    ))
  ) {
    logger.info(`${request.id}: Request automatically accepted`)
    await acceptProductRequestWorkflow.run({
      container,
      input: {
        data: request.data,
        id: request.id,
        reviewer_id: 'system',
        reviewer_note: 'auto accepted',
        status: 'accepted'
      }
    })
  }

  await notificationModule.createNotifications({
    to: OnesignalSegmentsTo.ADMIN,
    channel: 'push',
    template: OnesignalNotificationTemplates.NEW_PRODUCT,
    content: {
      text: 'New Product',
      subject: 'New Product'
    }
  })
}

export const config: SubscriberConfig = {
  event: ProductRequestUpdatedEvent.CREATED,
  context: {
    subscriberId: 'product-request-created'
  }
}
