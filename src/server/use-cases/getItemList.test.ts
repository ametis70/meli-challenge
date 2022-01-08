import axios from 'axios'

import makeGetItemList from './getItemList'

jest.mock('axios')

describe('Item details getter', () => {
  it('Should return a valid Item instance if API response is valid', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      statusText: 'success',
      data: {
        filters: [
          {
            id: 'category',
            values: [
              {
                path_from_root: [
                  {
                    name: 'Specific category',
                  },
                ],
              },
            ],
          },
        ],
        results: [
          {
            id: '123',
            title: 'Producto',
            thumbnail: 'http://example.com',
            currency_id: 'ARS',
            price: 100.5,
            condition: 'new',
            shipping: {
              free_shipping: true,
            },
          },
        ],
      },
    })

    const getItemList = makeGetItemList(axios, 'test')

    expect(getItemList('success')).resolves.toStrictEqual({
      author: { name: 'Ian', lastname: 'Mancini' },
      categories: ['Specific category'],
      items: [
        {
          id: '123',
          title: 'Producto',
          price: { currency: 'ARS', amount: 100, decimals: 50 },
          picture: 'https://example.com',
          condition: 'new',
          free_shipping: true,
        },
      ],
    })
  })

  it('Should throw an error when HTTP status code >= 400', async () => {
    axios.get.mockResolvedValue({
      status: 500,
    })

    const getItemList = makeGetItemList(axios, 'test')

    expect(getItemList('success')).rejects.toThrow('Error in HTTP request: 500')
  })

  it('Should throw an error when there are no results', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      statusText: 'sucess',
      data: {
        filters: [],
        results: [],
      },
    })

    const getItemList = makeGetItemList(axios, 'test')

    expect(getItemList('success')).rejects.toThrow('No results for search query')
  })
})
