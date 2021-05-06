import Container from '@/components/container'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/withStyles'

export default ({ css, mapStateToProps, mapDispatchToProps }: any, ActiveComponet: any) =>
  withStyles(css)(connect(mapStateToProps, mapDispatchToProps)(Container(ActiveComponet)))
