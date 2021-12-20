// ML API types

// NOTE: These types are probably wrong (no union types, optional
// properties, etc.) as they were generated using cURL and jq, but
// for the purposes of the challenge they should be good enough

declare type MLItemsQueryResponse = {
  site_id: string
  country_default_time_zone: string
  query: string
  paging: {
    total: number
    primary_results: number
    offset: number
    limit: number
  }
  results: Array<{
    accepts_mercadopago: boolean
    address: {
      state_id: string
      state_name: string
      city_id: string
      city_name: string
    }
    attributes: Array<{
      attribute_group_id: string
      attribute_group_name: string
      id: string
      name: string
      source: number
      value_id: string
      value_name: string
      value_struct: {
        number: number
        unit: string
      }
      values: Array<{
        id: string
        name: string
        source: number
        struct: {
          number: number
          unit: string
        }
      }>
    }>
    available_quantity: number
    buying_mode: string
    catalog_listing: object
    catalog_product_id: string
    category_id: string
    condition: string
    currency_id: string
    differential_pricing: object
    domain_id: string
    id: string
    installments: {
      quantity: number
      amount: number
      rate: number
      currency_id: string
    }
    listing_type_id: string
    match_score: null
    offer_score: null
    offer_share: null
    official_store_id: number
    order_backend: number
    original_price: number
    permalink: string
    price: number
    prices: {
      id: string
      payment_method_prices: Array
      presentation: {
        display_currency: string
      }
      prices: Array<{
        amount: number
        conditions: {
          context_restrictions: object
          eligible: boolean
          end_time: string
          start_time: string
        }
        currency_id: string
        exchange_rate_context: string
        id: string
        last_updated: string
        metadata: {
          campaign_id: object
          promotion_id: object
          promotion_type: object
        }
        regular_amount: number
        type: string
      }>
      purchase_discounts: Array
      reference_prices: object
    }
    sale_price: null
    seller: {
      car_dealer: boolean
      eshop: object
      id: number
      permalink: string
      real_estate_agency: boolean
      registration_date: string
      seller_reputation: {
        power_seller_status: string
        level_id: string
        metrics: {
          cancellations: {
            period: string
            rate: number
            value: number
          }
          claims: {
            period: string
            rate: number
            value: number
          }
          delayed_handling_time: {
            period: string
            rate: number
            value: number
          }
          sales: {
            period: string
            completed: number
          }
        }
        transactions: {
          canceled: number
          period: string
          total: number
          ratings: {
            negative: number
            neutral: number
            positive: number
          }
          completed: number
        }
      }
      tags: string[]
    }
    seller_address: {
      id: string
      comment: string
      address_line: string
      zip_code: string
      country: {
        id: string
        name: string
      }
      state: {
        id: string
        name: string
      }
      city: {
        id: string
        name: string
      }
      latitude: string
      longitude: string
    }
    shipping: {
      free_shipping: boolean
      mode: string
      tags: string[]
      logistic_type: string
      store_pick_up: boolean
    }
    site_id: string
    sold_quantity: number
    stop_time: string
    tags: string[]
    thumbnail: string
    thumbnail_id: string
    title: string
    use_thumbnail_id: boolean
    winner_item_id: null
  }>
  sort: {
    id: string
    name: string
  }
  available_sorts: Array<{
    id: string
    name: string
  }>
  filters: Array<{
    id: string
    name: string
    type: string
    values: Array<{
      id: string
      name: string
      path_from_root: Array
    }>
  }>
  available_filters: Array<{
    id: string
    name: string
    type: string
    values: Array<{
      id: string
      name: string
      results: number
    }>
  }>
}

declare type MLItem = {
  id: string
  site_id: string
  title: string
  subtitle: null
  seller_id: number
  category_id: string
  official_store_id: null
  price: number
  base_price: number
  original_price: number
  currency_id: string
  initial_quantity: number
  available_quantity: number
  sold_quantity: number
  sale_terms: Array<{
    id: string
    name: string
    value_id: string
    value_name: string
    value_struct: {
      number: number
      unit: string
    }
    values: Array<{
      id: string
      name: string
      struct: {
        number: number
        unit: string
      }
    }>
  }>
  buying_mode: string
  listing_type_id: string
  start_time: string
  stop_time: string
  condition: string
  permalink: string
  thumbnail_id: string
  thumbnail: string
  secure_thumbnail: string
  pictures: Array<{
    id: string
    url: string
    secure_url: string
    size: string
    max_size: string
    quality: string
  }>
  video_id: null
  descriptions: Array
  accepts_mercadopago: boolean
  non_mercado_pago_payment_methods: Array
  shipping: {
    mode: string
    free_methods: Array<{
      id: number
      rule: {
        default: boolean
        free_mode: string
        free_shipping_flag: boolean
        value: null
      }
    }>
    tags: [string]
    dimensions: null
    local_pick_up: boolean
    free_shipping: boolean
    logistic_type: string
    store_pick_up: boolean
  }
  international_delivery_mode: string
  seller_address: {
    city: {
      name: string
    }
    state: {
      id: string
      name: string
    }
    country: {
      id: string
      name: string
    }
    search_location: {
      neighborhood: {
        id: string
        name: string
      }
      city: {
        id: string
        name: string
      }
      state: {
        id: string
        name: string
      }
    }
    id: number
  }
  seller_contact: null
  location: {}
  coverage_areas: Array
  attributes: Array<{
    attribute_group_id: string
    attribute_group_name: string
    id: string
    name: string
    value_id: string
    value_name: string
    value_struct: {
      number: number
      unit: string
    }
    values: Array<{
      id: string
      name: string
      struct: {
        number: number
        unit: string
      }
    }>
  }>
  warnings: Array
  listing_source: string
  variations: Array
  status: string
  sub_status: Array
  tags: string[]
  warranty: string
  catalog_product_id: string
  domain_id: string
  parent_item_id: null
  differential_pricing: null
  deal_ids: Array
  automatic_relist: boolean
  date_created: string
  last_updated: string
  health: null
  catalog_listing: boolean
  channels: string[]
}

declare type MLDescription = {
  text: string
  plain_text: string
  last_updated: string
  date_created: string
  snapshot: {
    url: string
    width: number
    height: number
    status: string
  }
}

declare type MLError = {
  error: string
  message: string
}

// App API types

declare type Author = {
  name: string
  lastname: string
}

declare type ItemsQueryResponse = {
  author: Author
  categories: string[]
  items: Array<{
    id: string
    title: string
    price: {
      currency: string
      amount: number
      decimals: number
    }
    picture: string
    condition: string
    free_shipping: boolean
  }>
}

declare type ItemResponse = {
  author: Author
  item: {
    id: string
    title: string
    price: {
      currency: string
      amount: number
      decimals: number
    }
    picture: string
    condition: string
    free_shipping: boolean
    sold_quantity: number
    description: string
  }
}
