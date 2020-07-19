import React, { Component } from "react";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clearReminder } from "../actions";
import moment from "moment";
import "../index.css";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      dueDate: "",
    };
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
    this.setState({ text: "", dueDate: "" });
  }
  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {reminders.map((reminder) => {
          return (
            <li
              key={reminder.id}
              className="list-group-item"
              // style={{ background: "white" }}
            >
              <div className="list-item">
                <div>
                  <span className="text-primary text-uppercase ">
                    {reminder.text}
                  </span>
                </div>
                <div className="text-success">
                  <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
                </div>
              </div>
              <div
                onClick={() => this.deleteReminder(reminder.id)}
                className="list-item delete-button"
                style={{ cursor: "pointer" }}
              >
                <span className="text-danger h4">&#x2715;</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  render() {
    return (
      <div className="App">
        <div className="title">Reminder</div>
        <div>
          Created By <span className="text-primary">Manohar Sirvi</span>
        </div>

        <div className="row">
          <div className="form-inline">
            <div className="form-group">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="I have to..."
                  value={this.state.text}
                  onChange={(event) =>
                    this.setState({ text: event.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <input
                  placeholder="Select Date"
                  type="datetime-local"
                  className="form-control"
                  value={this.state.dueDate}
                  onChange={(event) =>
                    this.setState({ dueDate: event.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <button
                  className="btn btn-success ml"
                  type="button"
                  disabled={this.state.text.length >= 1 ? false : true}
                  onClick={() => this.addReminder()}
                >
                  Add Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.renderReminders()}
        {this.props.reminders.length > 0 ? (
          <div
            className="btn btn-danger mtx"
            onClick={() => this.props.clearReminder()}
          >
            CLEAR REMINDERS
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reminders: state,
});
export default connect(mapStateToProps, {
  addReminder,
  deleteReminder,
  clearReminder,
})(App);
