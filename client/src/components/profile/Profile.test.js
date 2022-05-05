/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Profile from './Profile'

describe('Profile Page Feature', () => {
  test('render the empty Profile component', () => {
    render(<Profile />)
    expect(screen.getByTestId('empty')).toBeEmptyDOMElement()
  })

  test('render the navbar in profile component', () => {
    render(<Profile />)
    expect(screen.getByTestId('empty')).toContainHTML(
      '<div className={styles.navbar}></div>',
    )
  })
})
