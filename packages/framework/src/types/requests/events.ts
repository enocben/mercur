export enum SellerAccountRequestUpdatedEvent {
  ACCEPTED = "requests.seller.accepted",
  REJECTED = "requests.seller.rejected",
}

export enum SellerRequest {
  CREATED = "requests.seller.created",
}

export enum RequestUpdated {
  CREATED = "requests.*.created",
}

export enum ProductCategoryRequestUpdatedEvent {
  CREATED = "requests.product_category.created",
  ACCEPTED = "requests.product_category.accepted",
  REJECTED = "requests.product_category.rejected",
}

export enum ProductCollectionRequestUpdatedEvent {
  CREATED = "requests.product_collection.created",
  ACCEPTED = "requests.product_collection.accepted",
  REJECTED = "requests.product_collection.rejected",
}

export enum ProductRequestUpdatedEvent {
  CREATED = "requests.product.created",
  ACCEPTED = "requests.product.accepted",
  REJECTED = "requests.product.rejected",
}

export enum ProductUpdateRequestUpdatedEvent {
  CREATED = "requests.product_update.created",
  ACCEPTED = "requests.product_update.accepted",
  REJECTED = "requests.product_update.rejected",
}

export enum SellerTeamInviteEvent {
  CREATED = "seller.team.invite.created",
}

export enum ProductTypeRequestUpdatedEvent {
  CREATED = "requests.product_type.created",
  ACCEPTED = "requests.product_type.accepted",
  REJECTED = "requests.product_type.rejected",
}

export enum ProductTagRequestUpdatedEvent {
  CREATED = "requests.product_tag.created",
  ACCEPTED = "requests.product_tag.accepted",
  REJECTED = "requests.product_tag.rejected",
}
