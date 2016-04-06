import React, { Component, Image, PropTypes } from 'react-native';


class ImageContainer extends Component {
  static propTypes = {
    source: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    component: PropTypes.node,
    componentPreload: PropTypes.node,
  }

  static defaultProps = {
    source: '',
    width: -1,
    height: -1,
    component: null,
    componentPreload: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isErrored: false,
      imageWidth: props.width,
      imageHeight: props.height,
    };
  }

  componentDidMount() {
    Image.getSize(this.props.source, (width, height) => {
      this.setState({
        isLoading: false,
        imageWidth: (this.props.width < 0) ? width : this.props.width,
        imageHeight: (this.props.height < 0) ? height : this.props.height,
      });
    });
  }

  render() {
    if (!this.props.source) {
      return null;
    }

    if (this.state.isLoading) {
      return this.props.componentPreload;
    }

    return React.createElement(this.props.component, {
      width: this.state.imageWidth,
      height: this.state.imageHeight,
    });
  }
}

export default ImageContainer;
