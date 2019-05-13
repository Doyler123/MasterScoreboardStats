import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


const styles = theme => ({
  'datePicker': {
    '& .react-daterange-picker__wrapper' : {
      border: 'none',
      lineHeight: '30px'
    },
    '& .react-daterange-picker' :{
      paddingTop: '8px',
      '& input' : {
        color : 'white',
        cursor : 'pointer'
      },
      '& svg' : {
        color : 'white'
      },
    },
    '& .react-calendar__month-view__weekdays': {
      color: 'black'
    },
    '& .react-daterange-picker__calendar': {
      zIndex: 5
    }
  }
});



class DatePicker extends React.Component {

  render() {

    let {dateRange, onChange} = this.props

    return (
        <div>
            <DateRangePicker
              onChange={onChange}
              value={dateRange}
              calendarIcon={<CalendarTodayIcon/>}
              clearIcon={null}
            />
        </div>
    );
  }
}


export default withStyles(styles)(DatePicker);