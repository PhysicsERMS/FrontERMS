import React, { PropTypes, Component } from 'react';

const NOT_STARTED = 1;
const STARTED = 2;
const FINISHED = 3;

const DAY_SECONDS = 86400;
const HOUR_SECONDS = 3600;
const MINUTE_SECONDS = 60;
const FORMATTER_DEFAULT = 'd天hh时mm分ss秒';
const FORMATTER_REGEXP = /(\\)?(dd*|hh?|mm?|ss?)/gi;

export default class Countdown extends Component {
  static propTypes = {
    endDate: PropTypes.number,
    interval: PropTypes.number,
    startDelay: PropTypes.number,
    onFinished: PropTypes.func,
    format: PropTypes.string,
  };

  static defaultProps = {
    interval: 1000,
    startDelay: 0,
    format: {
      hour: '小时',
      minute: '分',
      second: '秒',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      remainingTime: 0,
      status: NOT_STARTED,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        status: STARTED
      });

      if (this.tick()) {
        this.timer = setInterval(() => {
          this.tick()
        }, this.props.interval)
      }
    }, this.props.startDelay);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatDateTime(data, formatter) {
    return formatter.replace(FORMATTER_REGEXP, (m) => {
      let len = m.length, firstChar = m.charAt(0);

      //escape character
      if (firstChar === '\\') return m.replace('\\', '');
      let value = (firstChar === 'd' ? data.days :
              firstChar === 'h' ? data.hours :
                  firstChar === 'm' ? data.minutes :
                      firstChar === 's' ? data.seconds : 0) + '';

      //5 zero should be enough
      return ('00000' + value).substr(-Math.max(value.length, len));
    });
  }

  tick() {
    let data = {days: 0, hours: 0, minutes: 0, seconds: 0},
        now = +new Date(),
        diff = Math.max(0, Math.round((this.props.endDate - now) / 1000));

    data.totalSeconds = diff;
    diff -= (data.days = Math.floor(diff / DAY_SECONDS)) * DAY_SECONDS;
    diff -= (data.hours = Math.floor(diff / HOUR_SECONDS)) * HOUR_SECONDS;
    diff -= (data.minutes = Math.floor(diff / MINUTE_SECONDS)) * MINUTE_SECONDS;
    data.seconds = diff;

    this.setState({
      remainingTime: this.formatDateTime(data, this.props.format || FORMATTER_DEFAULT),
    });

    if (data.totalSeconds <= 0) {
      this.setState({
        status: FINISHED,
      });

      if (this.props.onFinished) {
        this.props.onFinished();
      }

      clearInterval(this.timer);

      return false;
    }

    return true;
  }

  render() {
    const { status } = this.state;

    return (
        status !== NOT_STARTED && status !== FINISHED ?
            <span className="rest-time">{ this.state.remainingTime }</span> : <span></span>
    );
  }
}
