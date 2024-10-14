import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTimerStart: false,
      counterTimerSec: 0,
      counterTimeMin: 25,
      timerLimit: 25,
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    const {counterTimerSec, counterTimeMin, isTimerStart} = this.state

    if (isTimerStart) {
      if (counterTimerSec === 0 && counterTimeMin === 0) {
        clearInterval(this.timerID)
        this.setState({isTimerStart: false})
      } else if (counterTimerSec === 0) {
        this.setState(prevState => ({
          counterTimeMin: prevState.counterTimeMin - 1,
          counterTimerSec: 59,
        }))
      } else {
        this.setState(prevState => ({
          counterTimerSec: prevState.counterTimerSec - 1,
        }))
      }
    }
  }

  toggleTimerStart = () => {
    const {isTimerStart} = this.state

    if (isTimerStart) {
      clearInterval(this.timerID)
    } else {
      this.timerID = setInterval(this.tick, 1000)
    }
    this.setState(prevState => ({isTimerStart: !prevState.isTimerStart}))
  }

  resetTimer = () => {
    clearInterval(this.timerID)
    this.setState({
      isTimerStart: false,
      counterTimerSec: 0,
      counterTimeMin: 25,
      timerLimit: 25,
    })
  }

  incrementTimerLimit = () => {
    const {isTimerStart} = this.state
    if (!isTimerStart) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit + 1,
        counterTimeMin: prevState.timerLimit + 1,
      }))
    }
  }

  decrementTimerLimit = () => {
    const {timerLimit, isTimerStart} = this.state
    if (timerLimit > 1 && !isTimerStart) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
        counterTimeMin: prevState.timerLimit - 1,
      }))
    }
  }

  render() {
    const {counterTimeMin, counterTimerSec, isTimerStart, timerLimit} =
      this.state
    const formattedSec =
      counterTimerSec < 10 ? `0${counterTimerSec}` : counterTimerSec
    const formattedMin =
      counterTimeMin < 10 ? `0${counterTimeMin}` : counterTimeMin

    const startOrPauseIcon = isTimerStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerStart ? 'pause icon' : 'play icon'
    const timerStatusText = isTimerStart ? 'Running' : 'Paused'

    return (
      <div className="page-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-content">
          <div className="timer-container">
            <div className="counter-container">
              <h1 className="timer">
                {formattedMin}:{formattedSec}
              </h1>
              <p className="run-timer">{timerStatusText}</p>
            </div>
          </div>
          <div className="counter-setting-container">
            <div className="icon-buttons-container">
              <div className="icon-container">
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.toggleTimerStart}
                >
                  <img
                    src={startOrPauseIcon}
                    alt={startOrPauseAltText}
                    className="icon"
                  />
                </button>
                <button type="button" className="icon-button icon-name">
                  <p>{isTimerStart ? 'Pause' : 'Start'}</p>
                </button>
              </div>
              <div className="icon-container">
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.resetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                </button>
                <button className="icon-button icon-name" type="button">
                  <p>Reset</p>
                </button>
              </div>
            </div>
            <p>Set Timer limit</p>
            <div className="set-timer-container">
              <button
                className="adjust-buttons"
                type="button"
                onClick={this.decrementTimerLimit}
              >
                -
              </button>
              <div className="time-in-minutes">
                <p>{timerLimit}</p>
              </div>
              <button
                className="adjust-buttons"
                type="button"
                onClick={this.incrementTimerLimit}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
