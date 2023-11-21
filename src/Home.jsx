import { Component } from "react";
import "./Home.css";
import "./App.css";
import { WebcamCapture } from "./Webcam/Webcam";
import moment from "moment";

import { Tabs, Tab } from "react-bootstrap";

class Home extends Component {
  state = {
    currentTime: moment().format("LT"),
    name: "",
    lat: "",
    lng: "",
    user: { name: "" },
    timesheets: [],
    isActive: "",
    tabLength: "",
    birthday: false,
  };

  onClick = (e) => {
    document.getElementById("webcam-btn").click();
    console.log(e);
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

    if (this.state.tabLength == 0) {
      this.setState({
        isActive: "start",
      });
    } else if (this.state.tabLength == 1 || this.state.tabLength == 2) {
      this.setState({
        isActive: "break",
      });
    } else {
      this.setState({
        isActive: "end",
      });
    }
    if (this.state.timesheets.length == 1) {
      console.log("true");
    } else {
      console.log("false");
    }
    console.log(this.state.user.dob);
  }

  render() {
    if (localStorage.getItem("pin") === null) {
      // eslint-disable-next-line react/prop-types
      // this.props.history.push("/");
    }

    const isActive = this.state.isActive;

    const Month = moment(this.state.user.dob).format("MM");
    const Day = moment(this.state.user.dob).format("DD");
    const todayMonth = moment(new Date()).format("MM");
    const todayDay = moment(new Date()).format("DD");

    setTimeout(() => {
      if (
        Number(todayMonth) === Number(Month) &&
        Number(todayDay) === Number(Day)
      ) {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.birthday = true;
      }
    }, 1000);

    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="text white-text">
            <h2 id="todaysDate"> </h2>
            <div className="big-screen">
              <div className="row">
                <div className="col-lg-5 col-sm-12">
                  <div className="video-wrapper">
                    <div className="user-detail-login">
                      <h4 className="name">{this.state.user.name}</h4>
                      <h4 className="role">{this.state.user.role}</h4>
                    </div>

                    <div className="user-home-clocksheet">
                      {this.state?.timesheets?.map((timesheet, id) => {
                        return (
                          <>
                            <span key={id} className={timesheet.type}>
                              {moment(timesheet.time).format("LT")}
                            </span>
                            <span
                              className={`timesheet-type clock-${timesheet.type}`}
                            >
                              {timesheet.type == "in" ? "Clocked In" : null}
                              {timesheet.type == "break" ? "On Break" : null}
                              {timesheet.type == "endBreak"
                                ? "Break End"
                                : null}
                              {timesheet.type == "out" ? "Clocked Out" : null}
                            </span>
                          </>
                        );
                      })}
                    </div>
                    <WebcamCapture id="webimage" />
                  </div>
                </div>
                <div className="col-lg-7 col-sm-12">
                  <div className="record-slider ">
                    <Tabs defaultActiveKey={isActive}>
                      {console.log("active tab", isActive)}
                      <Tab
                        eventKey="start"
                        title="START"
                        disabled={
                          this.state.timesheets.length > 0 ? true : false
                        }
                      >
                        <div className="btn-outline-success left">
                          <input
                            type="radio"
                            className="btn-check"
                            name="options"
                            id="option1"
                            autoComplete="off"
                            checked
                            onChange={(e) => e.target.value}
                            onClick={() => this.onClick("in")}
                          />
                          <label htmlFor="option1">Clock In</label>
                        </div>
                      </Tab>
                      <Tab
                        eventKey="break"
                        title={
                          this.state.timesheets.length == 2
                            ? "END BREAK"
                            : "BREAK"
                        }
                        disabled={
                          this.state.timesheets.length > 2 ? true : false
                        }
                      >
                        <div
                          className={`btn-outline-warning middle ${
                            this.state.timesheets.length == 1
                              ? "not-active"
                              : "tooltip"
                          }`}
                        >
                          <input
                            type="radio"
                            className="btn-check"
                            name="option2"
                            id="option2"
                            autoComplete="off"
                            onChange={(e) => e.target.value}
                            onClick={() => this.onClick("break")}
                          />
                          <label htmlFor="option2">START BREAK</label>
                        </div>

                        <div
                          className={`btn-outline-warning middle ${
                            this.state.timesheets.length == 2
                              ? "not-active"
                              : "tooltip"
                          }`}
                        >
                          <label htmlFor="option1d">END BREAK</label>
                          <input
                            type="radio"
                            className="btn-check"
                            name="option1d"
                            id="option1d"
                            autoComplete="off"
                            onChange={(e) => e.target.value}
                            onClick={() => this.onClick("endBreak")}
                          />
                        </div>
                      </Tab>
                      <Tab
                        eventKey="end"
                        title="FINISH"
                        disabled={
                          this.state.timesheets.length > 4 ? true : false
                        }
                      >
                        <div className="btn-outline-danger right">
                          <label htmlFor="option3">Clock Out</label>
                          <input
                            type="radio"
                            className="btn-check"
                            name="options"
                            id="option3"
                            autoComplete="off"
                            onChange={(e) => e.target.value}
                            onClick={() => this.onClick("out")}
                          />
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div
                    className={
                      this.state.birthday ? "fireworks" : "hide tooltip"
                    }
                  >
                    <div className="wish">
                      Happy BirthDay {this.state.user.name}
                    </div>
                    <div className="pyro">
                      <div className="before"></div>
                      <div className="after"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
