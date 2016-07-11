import React, { PropTypes, Component } from 'react'

import Path from '../Path/Path'

export default class Mask extends Component {
  static propTypes = {
    id: PropTypes.string,
    paths: PropTypes.array,
    size: PropTypes.number
  };

  static defaultProps = { paths: [] }

  constructor(props) {
    super(props)
    this.addPath = this.addPath.bind(this)
    this.updatePath = this.updatePath.bind(this)
    this.addPath()
  }

  addPath(size=this.props.size) {
    const key = this.props.paths && this.props.paths.length || 0
    this.props.paths.push(<Path key={key} size={size} color="black" points={[]} />)
    return this
  }

  updatePath(points, index=(this.props.paths.length-1)) {
    this.props.paths[index].points = this.props.paths[index].points.concat(points)
    return this;
  }

  render() {
    const { id, paths, size } = this.props

    return (
      <mask id={id} key={id}>
        <rect width="100%" height="100%" fill="white" />
        { paths }
      </mask>
    )
  }
}