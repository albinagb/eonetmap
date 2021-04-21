import { Component } from "react";

let num = 0;

class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = { timer: num };
  }

  componentDidMount() {
    this.count = setInterval(
      () =>
        this.setState({
          timer: setTimeout(num),
        }),
      12
    );
  }

  componentWillUnmount() {
    clearInterval(this.count);
  }

  render() {
    return (
      <div className="loader">
        <p>
          Loading: <span id="timer">{this.state.timer}</span>
        </p>
      </div>
    );
  }
}

export default Loader;
