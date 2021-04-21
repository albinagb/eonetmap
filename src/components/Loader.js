import { Component } from "react";

class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.time = setInterval(
      () =>
        this.setState({
          date: new Date(),
        }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.time);
  }

  render() {
    return (
      <div className="loader">
        Loading: {this.state.date.toLocaleTimeString()}
      </div>
    );
  }
}

export default Loader;
