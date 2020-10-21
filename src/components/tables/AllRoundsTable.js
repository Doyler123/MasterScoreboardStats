import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { MS_DATE_FORMAT } from '../../constants/constants'
import { useStateValue, actions } from '../../state'

function createData(comp, date, holes, gross, birdies, pars, bogeys, worse) {
  return { comp, date, holes, gross, birdies, pars, bogeys, worse};
}

function desc(a, b, orderBy) {
    if(orderBy === "date"){
        let dateA = moment(a[orderBy], MS_DATE_FORMAT);
        let dateB = moment(b[orderBy], MS_DATE_FORMAT);
        if(dateB.isBefore(dateA)){
            return -1
        }
        if(dateA.isBefore(dateB)){
            return 1
        }
    }else{
        let itemA = isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy])
        let itemB = isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy])
        if (itemB < itemA) {
          return -1;
        }
        if (itemB > itemA) {
          return 1;
        }
    }
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'comp', numeric: false, disablePadding: false, label: 'Comp', mobile: true},
  { id: 'date', numeric: false, disablePadding: false, label: 'Date', mobile: true },
  { id: 'Holes', numeric: true, disablePadding: false, label: 'Holes', mobile: true },
  { id: 'birdies', numeric: true, disablePadding: false, label: 'Birdies', mobile: true },
  { id: 'pars', numeric: true, disablePadding: false, label: 'Pars', mobile: true },
  { id: 'bogeys', numeric: true, disablePadding: false, label: 'Bogeys', mobile: true },
  { id: 'worse', numeric: true, disablePadding: false, label: 'Bogey+', mobile: true },
  { id: 'gross', numeric: true, disablePadding: false, label: 'Gross', mobile: true },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, mobile } = props;
  
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  

  return (
    <TableHead>
      <TableRow className={classes.tableRow}>
        {headCells.map(headCell => {
          if(!mobile || (mobile && headCell.mobile)){
             return(
              <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={order}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
             )  
          }else{
            return null
          }
          
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, rounds } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
        {`Rounds Played (${rounds})`}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        null
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableRow:{
    "& td, th,> :last-child": {
      padding: "6px 6px 6px 6px",
      [theme.breakpoints.up('sm')]: {
        padding: "6px 24px 6px 16px",
      },
    }
  }
}));

const AllRoundsTable = ({data}) => {
  
  const [{}, dispatch ] = useStateValue();

  let count = 0;
  data.forEach(course => {
      count += course.Competitions.length;
  })  

  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('total');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(count > 10 ? 10 : count);

  useEffect(() => {
      setRowsPerPage(count > 10 ? 10 : count)
  }, [data])

  useEffect(() => {
      handleRequestSort(null, 'date')
  }, [])

  const rows = [] 
  
  data.forEach(course => {
      course.Competitions.forEach((comp, inedx) => {
        rows.push(createData(comp.Name, comp.Date, comp.NumHolesPlayed, comp.Gross, comp.birdies, comp.pars, comp.bogeys, (comp.doubles + comp.triples + comp.scratches)));
      })
  });

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const handleClick = (row) => {
    dispatch({
      type: actions.SELECT_COMP,
      selectedComp: row.date
    })
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const pageStartPosition = page * rowsPerPage

  return (
    <div className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} rounds={rows.length}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              mobile={false}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => {handleClick(row)}}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.comp + index}
                      selected={isItemSelected}
                      style={{cursor: 'pointer'}}
                      className={classes.tableRow}
                    >
                      <TableCell id={labelId}>{row.comp}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell align="right">{row.holes}</TableCell>
                      <TableCell align="right">{row.birdies}</TableCell>
                      <TableCell align="right">{row.pars}</TableCell>
                      <TableCell align="right">{row.bogeys}</TableCell>
                      <TableCell align="right">{row.worse}</TableCell>
                      <TableCell align="right">{`${row.gross > 0 ? '+' : ''}${row.gross}`}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {
            rows.length > rowsPerPage
        ? <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage={"Rows"}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
        : null
        }
    </div>
  );
}

export default AllRoundsTable