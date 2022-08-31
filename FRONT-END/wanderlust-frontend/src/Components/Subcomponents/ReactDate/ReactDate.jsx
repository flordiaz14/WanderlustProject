import React, {useState} from 'react';
import DatePicker,  { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReactDate = ({setDateRange, setErrorForm, excludeDates}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const listExcludeDates= excludeDates?.map(e=>({start:new Date(e?.inicio_periodo), end: new Date(e?.fin_periodo)}));

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

registerLocale('es', {
  localize: {
    month: n => months[n],
    day: n => days[n]
  },
  formatLong:{
    date: () => 'dd-MM-yyyy'
  }
});

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
      setEndDate(end);
    if (setDateRange) {   
      if (end!==null) {
        if (end.getTime()===start.getTime()) {
          setEndDate(end.getDate()+1);
          const newDate= end.getDate()+1;
          setDateRange([start, new Date(end.setDate(newDate))]);
        }else{
            setDateRange([start, end]);
        }
        }
    }
    if (setErrorForm) {
      setErrorForm(null)      
    }
};


    return (
      <DatePicker
      locale= 'es' 
      selected={startDate}
      startDate={startDate}
      endDate={endDate} 
      onChange={onChange}
      selectsRange
      renderCustomHeader={({
        monthDate,
        customHeaderCount,
        decreaseMonth,
        increaseMonth,
      }) => (
        <div>
          <button
            aria-label="Previous Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--previous"
            }
            style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
            onClick={decreaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              }
            >
              {"<"}
            </span>
          </button>
          <span className="react-datepicker__current-month">
            {monthDate.toLocaleString("es", {
              month: "long",
              //year: "numeric",
            }).charAt(0).toUpperCase() + monthDate.toLocaleString("es", {
              month: "long",
              //year: "numeric",
            }).slice(1)}
          </span>
          <button
            aria-label="Next Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--next"
            }
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span>
          </button>
        </div>
      )}
      monthsShown={2}
      dateFormat="dd-MMMM"
      minDate={new Date()}
      excludeDateIntervals={listExcludeDates}
      inline
      >
      </DatePicker>
    );
}

export default ReactDate;