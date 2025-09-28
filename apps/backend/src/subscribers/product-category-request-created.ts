import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

import { ProductCategoryRequestUpdatedEvent } from '@mercurjs/framework'
import {
  OnesignalNotificationTemplates,
  OnesignalSegmentsTo
} from '@mercurjs/onesignal'
export default async function productCategoryRequestCreatedHandler({
  container
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const notificationModule = container.resolve(Modules.NOTIFICATION)
  
  logger.info('Product Category Request Created - Sending notification')

  try {
    await notificationModule.createNotifications({
      to: OnesignalSegmentsTo.ADMIN,
      channel: 'push',
      template: OnesignalNotificationTemplates.NEW_PRODUCT_CATEGORY,
      content: {
        text: 'New Product Category Request',
        subject: 'A seller has created a new product category request'
      }
    })
    logger.info('Product Category Request notification sent successfully')
  } catch (error) {
    logger.error('Failed to send Product Category Request notification:', error)
  }
}

export const config: SubscriberConfig = {
  event: ProductCategoryRequestUpdatedEvent.CREATED,
  context: {
    subscriberId: 'product-category-request-created'
  }
}
