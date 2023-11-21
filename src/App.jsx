import { Component } from "react";
import PinInput from "react-pin-input";
import moment from "moment";
import swal from "sweetalert";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      currentTime: moment().format("LT"),
      pinTime: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      pinTime: new Date(),
    });
  }

  onChange(value) {
    this.setState({ value: value });
  }

  onKeyPress(button) {
    console.log("onKeyPress", button);
    if (button === "{clear}" || button === "{bksp}") {
      this.handleClear();
    } else {
      if (this.pin.elements[2].state.value) {
        this.pin.elements[3].state.value = button;
        setTimeout(this.onSubmitHandler, 1000);
        return;
      }
      if (this.pin.elements[1].state.value) {
        this.pin.elements[2].state.value = button;
        return;
      }
      if (this.pin.elements[0].state.value) {
        this.pin.elements[1].state.value = button;
        return;
      }
      this.pin.elements[0].state.value = button;
    }
  }

  handleClear() {
    console.log("handleClear");
    this.setState(
      {
        value: null,
      },
      () => {
        this.keyboard.clearInput();
      },
    );
    this.pin.elements[0].state.value = "";
    this.pin.elements[1].state.value = "";
    this.pin.elements[2].state.value = "";
    this.pin.elements[3].state.value = "";

    console.log("handleClear after");
  }

  onChangeInput = (event) => {
    let value = event.target.value;
    this.setState(
      {
        value: value,
      },
      () => {
        this.keyboard.setInput(value);
      },
    );
  };

  onClear = () => {
    this.setState({
      value: null,
    });
  };

  onSubmitHandler() {
    this.pin.values = this.state.value;
    console.log("state value", this.state.value);
    console.log("pin values", this.pin);
    console.log("pin join value", this.pin.values);

    console.log("store before", window.localStorage);
    window.localStorage.setItem("pin", this.pin.values);
    console.log("store after", window.localStorage);

    if (this.state.value == "1234") {
      console.debug(this.pin.values);
      window.localStorage.setItem("pin", this.pin.values);
      window.location.href = "https://3mo8xm.csb.app/home";

      //this.props.history.push("/home");
    } else {
      swal("Invalid PIN!", "Pin you enter didn't match. Try again", "error");
      window.location.reload();
    }

    // it doesn't execute.
  }

  render() {
    return (
      <div className="Pin home-container">
        <div className="text white-text">
          <h2 id="todaysDate">{this.state.pinTime.toLocaleTimeString()}</h2>
        </div>
        <PinInput
          length={4}
          //focus
          ref={(p) => (this.pin = p)}
          type="numeric"
          inputMode="number"
          onChange={this.onChange}
          onComplete={this.onSubmitHandler}
        />

        <Keyboard
          keyboardRef={(r) => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          theme={
            "hg-theme-default hg-theme-numeric hg-layout-numeric numeric-theme"
          }
          layout={{
            default: ["1 2 3", "4 5 6", "7 8 9", "{clear} 0 {bksp}"],
          }}
          mergeDisplay
          display={{
            "{clear}": "Clear",
            "{bksp}": "&#8592",
          }}
          maxLength={4}
          onChange={(input) => this.onChange(input)}
          onKeyPress={(button) => this.onKeyPress(button)}
          onComplete={this.onSubmitHandler}
        />

        <div className="confetti" style={{ pointerEvents: "none" }}>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
        </div>
        <div className="fireworks">
          <div className="wish"></div>
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
