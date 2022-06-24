import React from "react";
import Pikaday from "pikaday";
import moment from "moment";
import { useRef, useCallback, useEffect } from "react";
import { useState } from "react";
import { editCard } from "../../features/cards/cards";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const DueDatePopover = (props) => {
    const {id} = useParams()
    const dateInput = useRef(null);
    const calendar = useRef(null);
    // const [formDate, setFormDate ] = useState("")
    const dispatch = useDispatch()

    const defaultMoment = useCallback(() => {
      if (props.dueDate) {
        return moment(props.dueDate);
      } else {
        const time = moment().add(1, "day");
  
        time.set({
          hour: 12,
          minute: 0,
          second: 0,
        });
  
        return time;
      }
    }, [props.dueDate]);
  
    const defaultDate = useCallback(() => {
      defaultMoment().toDate();
    }, [defaultMoment]);
  
    useEffect(() => {
      console.log("useEffect in duedate pop")
      const picker = new Pikaday({
        field: dateInput.current,
        bound: false,
        container: calendar.current,
        firstDay: 1,
        yearRange: 10,
        defaultDate: defaultDate(),
        setDefaultDate: true,
        format: "M/D/YYYY",
        i18n: {
          previousMonth: "Prev",
          nextMonth: "Next",
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          weekdays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        },
        keyboardInput: false,
        toString(date, format) {
          return moment(date).format(format);
        },
      });
      picker.show();
    }, [defaultDate]);

    const handleClose = (e) => {
      e.preventDefault();
      props.setPopover({type: "due-date", attachedTo: e.target, visible: false });
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(editCard(
        {
        cardId: id,
        updatedCard: {
          card: { dueDate: `${e.target.date.value} ${e.target.time.value}`}
        },
        // callback: (e)=> handleClose(e)
      }))
      
      handleClose(e)
    }
    const handleReset = (e) => {
      e.preventDefault()
    }

    return (
      <div>
        <header>
          <span>Change due date</span>
          <a href="#" className="icon-sm icon-close" onClick={ handleClose }></a>
        </header>
        <div className="content">
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="datepicker-select">
              <div className="datepicker-select-date">
                <label>
                  Date
                  <input
                    type="text"
                    placeholder="Enter date"
                    autoFocus={true}
                    ref={dateInput}
                    defaultValue={defaultMoment().format("M/D/YYYY")}
                    name="date"
                    // onSelect={ (e) => setFormDate(e.target.value)}
                  />
                </label>
              </div>
              <div className="datepicker-select-time">
                <label>
                  Time
                  <input
                    type="text"
                    placeholder="Enter time"
                    name="time"
                    defaultValue={defaultMoment().format("h:mm A")}
                  />
                </label>
              </div>
              <div id="calendar-widget" ref={calendar}></div>
            </div>
            <button className="button" type="submit">
              Save
            </button>
            <button className="button red-button" type="reset">
              Remove
            </button>
          </form>
        </div>
      </div>
    );
  };
  
export default DueDatePopover;
