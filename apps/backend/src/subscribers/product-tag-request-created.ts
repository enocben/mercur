import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

import { ProductTagRequestUpdatedEvent } from '@mercurjs/framework'
import {
  OnesignalNotificationTemplates,
  OnesignalSegmentsTo
} from '@mercurjs/onesignal'
export default async function productTagRequestCreatedHandler({
  container
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const notificationModule = container.resolve(Modules.NOTIFICATION)
  
  logger.info('Product Tag Request Created - Sending notification')
  
  try {
    await notificationModule.createNotifications({
      to: OnesignalSegmentsTo.ADMIN,
      channel: 'push',
      template: OnesignalNotificationTemplates.NEW_PRODUCT_TAG,
      content: {
        text: 'New Product Tag Request',
        subject: 'A seller has created a new product tag request'
      }
    })
    logger.info('Product Tag Request notification sent successfully')
  } catch (error) {
    logger.error('Failed to send Product Tag Request notification:', error)
  }
}

export const config: SubscriberConfig = {
  event: ProductTagRequestUpdatedEvent.CREATED,
  context: {
    subscriberId: 'product-tag-request-created'
  }
}
