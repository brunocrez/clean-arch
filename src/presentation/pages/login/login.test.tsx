import React from 'react'
import { getByTestId, render } from '@testing-library/react'
import Login from './login'

describe('Login Component', () => {
  test('should not render spinner and error message at first', () => {
    const { container } = render(<Login />)
    const bottomWrapper = getByTestId(container, 'bottom-wrapper')
    expect(bottomWrapper.childElementCount).toBe(0)
  })
})
