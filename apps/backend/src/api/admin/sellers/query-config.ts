import { defaultAdminCustomerGroupFields } from '@medusajs/medusa/api/admin/customer-groups/query-config'
import { defaultAdminOrderFields } from '@medusajs/medusa/api/admin/orders/query-config'

export const adminSellerFields = [
  'id',
  'name',
  'handle',
  'description',
  'photo',
  'store_status',
  'email',
  'photo',
  '*members',
  'created_at',
  'updated_at',
  'phone',
  'address_line',
  'city',
  'country_code',
  'postal_code',
  'state',
  'tax_id'
]

export const adminSellerQueryConfig = {
  list: {
    defaults: adminSellerFields,
    isList: true
  },
  retrieve: {
    defaults: adminSellerFields,
    isList: false
  }
}

export const adminSellerOrdersQueryConfig = {
  list: {
    defaults: defaultAdminOrderFields,
    isList: true
  },
  retrieve: {
    defaults: defaultAdminOrderFields,
    isList: false
  }
}

export const adminSellerCustomerGroupsQueryConfig = {
  list: {
    defaults: defaultAdminCustomerGroupFields,
    isList: true
  },
  retrieve: {
    defaults: defaultAdminCustomerGroupFields,
    isList: false
  }
}
