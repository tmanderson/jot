import { merge } from 'lodash'
import React, { PropTypes, Component } from 'react'

export default class Path extends Component {
  static propTypes = {
    color: PropTypes.string,
    points: PropTypes.array,
    size: PropTypes.number,
    mask: PropTypes.string,
    selected: PropTypes.bool,
    translate: PropTypes.array
  };

  static defaultProps = { points: [], translate: [0, 0] }

  get height() {
    const { points } = this.props
    const min = Math.min.apply(null, points.map(p=>p[1]))
    const max = Math.max.apply(null, points.map(p=>p[1]))
    return max - min
  }

  get width() {
    const { points } = this.props
    const min = Math.min.apply(null, points.map(p=>p[0]))
    const max = Math.max.apply(null, points.map(p=>p[0]))
    return max - min
  }

  get points() {
    return this.props.points
  }

  constructor(props) {
    super(props)
    this.clone = this.clone.bind(this)
  }

  componentWillReceiveProps(props) {

  }

  render() {
    const { mask, size, color, points, selected, translate, onClick } = this.props

    return (<polyline
              mask={mask && `url(#${mask})`}
              fill="none"
              onClick={onClick}
              transform={`translate(${translate[0]}, ${translate[1]})`}
              stroke={selected ? 'blue' : color}
              strokeWidth={size}
              points={points.map(p=>p.join(',')).join(' ')} />);
  }

  clone(props) {
    return React.cloneElement(this, merge(this.props, props || {}))
  }
}
