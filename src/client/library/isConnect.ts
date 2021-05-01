import Container from '@/components/container'
import { connect } from 'react-redux'
// @ts-ignore
import withStyles from 'isomorphic-style-loader/withStyles'

export default (
  { css, mapStateToProps, mapDispatchToProps }: any,
  ActiveComponet: any
) => {
  return withStyles(css)(
    connect(mapStateToProps, mapDispatchToProps)(Container(ActiveComponet))
  )
}
