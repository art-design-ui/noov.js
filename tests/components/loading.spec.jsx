import React from 'react'
import { render } from '@testing-library/react'
import Loading from '../../src/client/components/loading'

describe('test Loading component', () => {
  it('should render the correct default loading', () => {
    const wrapper = render(<Loading />)
    const element = wrapper.container.querySelector('.loading')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('DIV')
    expect(element.className).toEqual('loading')
    expect(element.innerHTML).toEqual('loading......')
  })
})
