import React, { Component } from "react";
import { db } from "../components/Firebase";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import "../css/reports.css";

export default class AllReports extends Component {
  state = {
    notes: [],
    expanded: null
  };

  componentWillMount() {
    db.ref("CityPopSERVER/Notes").on("value", notes => {
      notes = Object.values(notes.val());

      this.setState({
        ...this.state,
        notes: notes
          .filter(note => note.fullAddress.includes(this.props.city))
          .sort(function(a, b) {
            a = a.openingDate
              .split(".")
              .reverse()
              .join("");
            b = b.openingDate
              .split(".")
              .reverse()
              .join("");
            return a < b ? 1 : a > b ? -1 : 0;
          })
      });
    });
    console.log(this.state.notes);
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  getAllReports() {
    const reports = [];
    const status = { open: "פתוח", treat: "בטיפול", done: "סגור" };
    const statusColor = { open: "red", treat: "#f2e100", done: "#00cf00" };
    this.state.notes.forEach((note, index) =>
      reports.push(
        <ExpansionPanel
          expanded={this.state.expanded === "panel" + index}
          onChange={this.handleChange("panel" + index)}
        >
          <ExpansionPanelSummary className={"note-item"}>
            <Typography className={"note-address column1"}>
              {note.fullAddress}
            </Typography>
            <Typography className={"note-date column2"}>
              בתאריך:&nbsp;&nbsp; {note.openingDate}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; בשעה:
              &nbsp;&nbsp; {note.openingTime}
            </Typography>
            <Typography className={"note-status column3"}>
              סטטוס:{" "}
              <span
                style={{ color: statusColor[note.status], fontSize: "20px" }}
              >
                {status[note.status]}
              </span>
            </Typography>
          </ExpansionPanelSummary>
          <hr />
          <ExpansionPanelDetails>
            <img src={note.imageUrl} alt="" className={"note-img"} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    );
    return reports;
  }

  render() {
    return <div dir="rtl">{this.getAllReports()}</div>;
  }
}
