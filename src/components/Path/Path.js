import React, { PropTypes, Component } from 'react'

export default class Path extends Component {
  static propTypes = {
    color: PropTypes.string,
    points: PropTypes.array,
    size: PropTypes.number,
    mask: PropTypes.string
  };

  transform = { translate: [0,0], rotate: 0 };

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
  }
   // TODO: Actual translate doesn't need the current cursor position
   // every frame needs initial offset, then dx, dy as the cursor
   // position changes.
  translate(pos) {
    if(!pos) return
    const [x0, y0] = this.props.points[0]
    var x1 = pos[0] && pos[0] || x0
    var y1 = pos[1] && pos[1] - this.height/2 || y0

    this.transform.translate = [(x1-x0), y1-y0]
  }

  componentWillReceiveProps(props) {
    this.translate(props.translate);
  }

  render() {
    const { mask, size, color, points, select } = this.props
    const { translate, rotate } = this.transform

    return (<polyline
              key={Math.random()*Date.now()}
              mask={mask && `url(#${mask})` || null}
              fill="none"
              onClick={(e) => { this.selected = true; select(); }}
              transform={`translate(${translate[0]}, ${translate[1]})`}
              stroke={color}
              strokeWidth={size}
              points={points.map(p=>p.join(',')).join(' ')} />);
  }
}