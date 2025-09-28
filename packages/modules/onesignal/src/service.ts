import { AbstractNotificationProviderService, MedusaError } from '@medusajs/framework/utils'
import { ProviderSendNotificationDTO, ProviderSendNotificationResultsDTO } from '@medusajs/framework/types'
import * as Onesignal from '@onesignal/node-onesignal'
import { onesignalTemplates } from './templates'


type OnesignalOptions = {
  url: string;
  app_id: string;
  secret_key: string;
};

class OnesignalService extends AbstractNotificationProviderService {
  static identifier = 'notification-onesignal'
  private options: OnesignalOptions
  private readonly configuration: Onesignal.Configuration
  private client: Onesignal.DefaultApi

  constructor(_: any, options: OnesignalOptions) {
    super()
    this.validateModuleOptions(options)
    this.options = options
    this.configuration = Onesignal.createConfiguration({
      restApiKey: this.options.secret_key
    })
    this.client = new Onesignal.DefaultApi(this.configuration)
  }

  validateModuleOptions(options: OnesignalOptions) {
    for (const key in options) {
      if (!options[key]) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `No ${key} was provided in the ${OnesignalService.identifier} options. Please add one.`
        )
      }
    }
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    const notify = new Onesignal.Notification()
    const templateId = onesignalTemplates[notification.template]
    if (!templateId) {
      notify.name = notification.content?.text
      notify.contents = {
        en: notification.content?.subject
      }
      notify.headings = {
        en: notification.content?.subject
      }
    }

    if (templateId)
      notify.template_id = templateId

    notify.app_id = this.options.app_id
    notify.included_segments = [
      notification.to
    ]
    const { id, errors } = await this.client.createNotification(notify)

    if (errors) {
      throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, errors[0])
    }

    if (!id) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        'No data returned by resend client'
      )
    }
    return { id: id }
  }
}

export default OnesignalService
