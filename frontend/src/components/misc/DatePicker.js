import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import moment from 'moment'


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

  constructor(props){
    super(props)

    this.state= {
      dateRange : null
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      dateRange : newProps.dateRange.map((date)=>{
        return moment(date)
      })
    })
  }

  render() {

    let {classes, onChange} = this.props

    return (
        <div className={classes.datePicker}>
            <DateRangePicker
              onChange={onChange}
              value={this.state.dateRange}
              calendarIcon={<CalendarTodayIcon/>}
              clearIcon={null}
              format={"dd/MM/yyyy"}
            />
        </div>
    );
  }
}


export default withStyles(styles)(DatePicker);