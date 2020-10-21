export const SCORES = {
  SCRATCH: "Scratch", 
  TRIPLE:  "Triple",
  DOUBLE: "Double",
  BOGEY: "Bogey",
  PAR: "Par",
  BIRDIE: "Birde",
  EAGLE: "Eagle",
  NA: "N/A",
  NR: "NR"
}

export const RESULTS = [
  "Scratch",
  "Triple",
  "Double",
  "Bogey",
  "Par",
  "Birde",
  "Eagle",
  "N/A"
]

export const SCORES_TO_CODES = {
  "Scratch" : 0,
  "Triple"  : 1,
  "Double"  : 2,
  "Bogey"   : 3,
  "Par"     : 4,
  "Birde"   : 5,
  "Eagle"   : 6,
  "N/A"     : 7
}

export const CODES_TO_SCORES = {
    0 : "Scratch",
    1 : "Triple",
    2 : "Double",
    3 : "Bogey",
    4 : "Par",
    5 : "Birde",
    6 : "Eagle",
    7 : "N/A"
  }

  export const SCORES_TO_COLOURS = {
    "Scratch" : "#636363",
    "Triple"  : "#6E6E6E",
    "Double"  : "#0033CC",
    "Bogey"   : "#008AD8",
    "Par"     : "#CC9900",
    "Birde"   : "#CC0033",
    "Eagle"   : "#F25F5F"
  }

  export const RESULT_VALUES = {
    "Scratch" : 2,
    "Triple"  : 3,
    "Double"  : 2,
    "Bogey"   : 1,
    "Par"     : 0,
    "Birde"   : -1,
    "Eagle"   : -2,
    "N/A"     : 0
  }

  export const VALUE_RESULTS = {
     '3' : "Triple",
     '2' : "Double",
     '1' : "Bogey",
     '0' : "Par",
     '-1': "Birde",
     '-2': "Eagle"   
  }

  export const ALL = "all"
  export const COMBINED = "combined"

  export const NA = "N/A"


export const DEFAULT_ALL_HOLES_TAB = 'TotalToPar'
export const BIRDE = 'Birde'
export const BOGEY = 'Bogey'

export const ENVS = {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
    TEST: 'test'
}

export const MS_DATE_FORMAT = 'DD MMM YY';
export const HDID_DATE_FORMAT = 'DD/MM/YYYY';