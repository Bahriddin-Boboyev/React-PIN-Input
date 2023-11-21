import { Component } from "react";
import PinInput from "react-pin-input";
import moment from "moment";
import swal from "sweetalert";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import "./App.css";

class Pin extends Component {
  state = {
    value: "",
    currentTime: moment().format("LT"),
  };

  componentDidMount() {
    function doDate() {
      var str = "";
      var now = new Date();

      str = now.toDateString() + " " + now.toLocaleTimeString();

      var pinTime = moment(str).format("hh:mm:ss A");
      document.getElementById("todaysDate").innerHTML = pinTime;
    }
    setInterval(doDate, 1000);

    function addClass() {
      const firstLi = document.querySelector(
        ".pincode-input-container input:nth-of-type(1)",
      );
      firstLi.setAttribute("id", "input-1");

      const secondLi = document.querySelector(
        ".pincode-input-container input:nth-of-type(2)",
      );
      secondLi.setAttribute("id", "input-2");

      const thirdLi = document.querySelector(
        ".pincode-input-container input:nth-of-type(3)",
      );
      thirdLi.setAttribute("id", "input-3");

      const fourthLi = document.querySelector(
        ".pincode-input-container input:nth-of-type(4)",
      );
      fourthLi.setAttribute("id", "input-4");
    }

    setTimeout(addClass, 1000);
  }

  onChange = (value) => {
    this.setState({ value: value });

    const msg = this.state.value;

    console.log("change", this.state.value);

    if (value.length == 1) {
      document.getElementById("input-1").setAttribute("value", msg[0]);
    }
    if (value.length == 2) {
      document.getElementById("input-2").setAttribute("value", msg[1]);
    }
    if (value.length == 3) {
      document.getElementById("input-3").setAttribute("value", msg[2]);
    }
    if (value.length == 4) {
      document.getElementById("input-4").setAttribute("value", msg[3]);
    }

    if (value.length == 4) {
      this.onSubmitHandler(value);
    }
  };

  onKeyPress = (button) => {
    console.log("onKeyPress", button);
    if (button === "{clear}") {
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
  };

  handleClear = () => {
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
  };

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

  onSubmitHandler = () => {
    this.pin.values = this.state.value;
    console.log("state value", this.state.value);
    console.log("pin values", this.pin);
    console.log("pin join value", this.pin.values);

    console.log("store before", window.localStorage);
    window.localStorage.setItem("pin", this.pin.values);
    console.log("store after", window.localStorage);

    if (this.state.value == "1234") {
      window.localStorage.setItem("pin", this.pin.values);
      window.location.href = "https://3mo8xm.csb.app/home";

      //this.props.history.push("/home");
    } else {
      swal("Invalid PIN!", "Pin you enter didn't match. Try again", "error");
      window.location.reload();
    }

    // it doesn't execute.
  };

  render() {
    return (
      <div className="Pin home-container">
        <div className="text white-text">
          <h2 id="todaysDate"> </h2>
        </div>
        <PinInput
          length={4}
          focus
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
      </div>
    );
  }
}
export default Pin;
