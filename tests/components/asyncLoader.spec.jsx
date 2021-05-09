import proConfig from '../../config/pro-config'
import asyncLoader from '../../src/client/components/asyncLoader'

describe('test AsyncBundle component', () => {
  it('should return the correct result when call asyncLoader', () => {
    const loader = new Promise(resolve => {
      resolve(null)
    })
    const asyncFn = asyncLoader(loader)
    expect(asyncFn[proConfig.asyncComponentKey]).toBeTruthy()
    const result = asyncFn()
    expect(result).toHaveProperty('ref', null)
    expect(result).toHaveProperty('$$typeof', Symbol.for('react.element'))
  })
})
