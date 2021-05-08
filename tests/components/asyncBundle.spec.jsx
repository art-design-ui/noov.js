import React from 'react'
import { render, screen } from '@testing-library/react'
import AsyncBundle from '../../src/client/components/asyncBundle'

describe('test AsyncBundle component', () => {
  it('should render the correct default AsyncBundle when load is not exist should return null', () => {
    const loader = new Promise(resolve => {
      resolve(null)
    })
    const wrapper = render(<AsyncBundle load={() => loader} />)
    const element = wrapper.container.querySelector('.loading')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('DIV')
    expect(element.className).toEqual('loading')
    expect(element.innerHTML).toEqual('loading......')
  })

  it('should render the correct default AsyncBundle when load is exist should return component', async () => {
    function component() {
      return <p className="load-component">component</p>
    }
    const loader = new Promise(resolve => {
      resolve(component)
    })
    const { rerender } = render(
      <AsyncBundle load={() => loader}>{Comp => <Comp />}</AsyncBundle>
    )
    await rerender(<AsyncBundle load={() => loader}>{Comp => <Comp />}</AsyncBundle>)
    const element = screen.getByText('component')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('P')
    expect(element.className).toEqual('load-component')
    expect(element).toMatchSnapshot()
  })
})
