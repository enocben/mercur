import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

import { ProductCollectionRequestUpdatedEvent } from '@mercurjs/framework'
import {
  OnesignalNotificationTemplates,
  OnesignalSegmentsTo
} from '@mercurjs/onesignal'
export default async function productCollectionRequestCreatedHandler({
  container
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const notificationModule = container.resolve(Modules.NOTIFICATION)
  
  logger.info('Product Collection Request Created - Sending notification')

  try {
    await notificationModule.createNotifications({
      to: OnesignalSegmentsTo.ADMIN,
      channel: 'push',
      template: OnesignalNotificationTemplates.NEW_PRODUCT_COLLECTION,
      content: {
        text: 'New Product Collection Request',
        subject: 'A seller has created a new product collection request'
      }
    })
    logger.info('Product Collection Request notification sent successfully')
  } catch (error) {
    logger.error('Failed to send Product Collection Request notification:', error)
  }
}

export const config: SubscriberConfig = {
  event: ProductCollectionRequestUpdatedEvent.CREATED,
  context: {
    subscriberId: 'product-collection-request-created'
  }
}
