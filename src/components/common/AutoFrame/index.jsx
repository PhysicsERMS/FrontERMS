import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';

class AutoFrame extends Component {
  static propTypes = {
    target: PropTypes.string,
  };

  static defaultProps = {
    target: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      target: '',
      frameHeight: 600,
      errorInfo: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentDidMount() {
    const isKbInput = document.getElementById('J_isFromKbServ');
    const isParentFrame = isKbInput && isKbInput.value === 'true' && window.parent;
    if (isParentFrame) {
      window.parent.addEventListener('scroll', this.handleScroll.bind(this, window.parent), false);
    } else {
      window.addEventListener('scroll', this.handleScroll.bind(this, window), false);
    }

    window.addEventListener('message', (e) => {
      if (e.data && typeof e.data === 'string') {
        const data = JSON.parse(e.data);
        const {pageHeight, scrollTop } = data;
        if (pageHeight) {
          this.setState({frameHeight: pageHeight});
        }
        if (!isNaN(Number(scrollTop))) {
          if (isParentFrame) {
            window.parent.scrollTo(0, scrollTop);
          } else {
            window.scrollTo(0, scrollTop);
          }
        }
      }
    }, false);
  }

  componentWillUnmount() {
    const isKbInput = document.getElementById('J_isFromKbServ');
    if (isKbInput && isKbInput.value === 'true' && window.parent) {
      window.parent.removeEventListener('scroll', this.handleScroll.bind(this, window.parent), false);
    } else {
      window.removeEventListener('scroll', this.handleScroll.bind(this, window), false);
    }
  }

  onError(errorInfo) {
    this.setState({errorInfo});
  }

  handleScroll(win) {
    const frame = ReactDom.findDOMNode(this.refs.frame);
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage(`{"scrollTop": ${win.pageYOffset || win.document.body.scrollTop}, "windowHeight": ${win.document.documentElement.clientHeight}}`, '*');
    }
  }

  render() {
    const { target } = this.props;
    const { frameHeight, errorInfo } = this.state;
    return (
        <div {...this.props}>
          {target && !errorInfo ? <iframe className="kb-index-frame" src={target} ref="frame" style={{height: frameHeight}} onError={this.onError} /> : null}
        </div>
    );
  }
}

export default AutoFrame;
