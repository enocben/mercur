import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

import { ProductTypeRequestUpdatedEvent } from '@mercurjs/framework'
import {
  OnesignalNotificationTemplates,
  OnesignalSegmentsTo
} from '@mercurjs/onesignal'
export default async function productTypeRequestCreatedHandler({
  container
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const notificationModule = container.resolve(Modules.NOTIFICATION)
  
  logger.info('Product Type Request Created - Sending notification')

  try {
    await notificationModule.createNotifications({
      to: OnesignalSegmentsTo.ADMIN,
      channel: 'push',
      template: OnesignalNotificationTemplates.NEW_PRODUCT_TYPE,
      content: {
        text: 'New Product Type Request',
        subject: 'A seller has created a new product type request'
      }
    })
    logger.info('Product Type Request notification sent successfully')
  } catch (error) {
    logger.error('Failed to send Product Type Request notification:', error)
  }
}

export const config: SubscriberConfig = {
  event: ProductTypeRequestUpdatedEvent.CREATED,
  context: {
    subscriberId: 'product-type-request-created'
  }
}
