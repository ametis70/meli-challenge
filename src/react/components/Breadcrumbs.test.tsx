/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Breadcrumbs from './Breadcrumbs'

describe('Breadcrumbs component', () => {
  it('Should return null if segments prop is empty', () => {
    const { container } = render(<Breadcrumbs segments={[]} />)
    expect(container.childElementCount).toBe(0)
  })

  it('Should return a list with N children equal to segments.length', () => {
    const { container } = render(<Breadcrumbs segments={['cat1', 'cat2']} />, {
      wrapper: MemoryRouter,
    })
    expect(container.querySelector('ol').children.length).toBe(2)
  })
})
