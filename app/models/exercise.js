import moment from 'moment'

export default class Exercise {
  constructor({ id, name }) {
    this.id = id
    this.name = name
  }

  processData(singleSets) {
    this.singleSets = singleSets
    this.calculateOneRepMax()
  }

  calculateOneRepMax() {
    let { oneRepMaxPerDay, highestOneRepMax } = this._getMaxOneRepMaxPerDay()
    this.oneRepMaxPerDay = oneRepMaxPerDay
    this.highestOneRepMax = highestOneRepMax
  }

  // Manipulate `oneRepMaxPerDay` to a 2d array for highcharts
  // Returns an object in the format
  // [
  //   {
  //     data: [
  //       [<timestamp1>, <1rm>],
  //       [<timestamp2>, <1rm>],
  //       ...
  //     ]
  //   }
  // ]
  dataForChart() {
    if (this.chartData) {
      return this.chartData
    }

    this.chartData = [{
      data: Object.keys(this.oneRepMaxPerDay).map((timestamp) => {
        return [parseInt(timestamp), this.oneRepMaxPerDay[timestamp]]
      }).sort()
    }]

    return this.chartData;
  }

  // Given an array of single sets, where a day can sometimes have multiple 
  // sets, calculate the one rep max per set and assign the highest one rep 
  // max calculation to the given day
  // Returns an object in the format
  // {
  //   <timestamp1>: <1rm>,
  //   <timestamp2>: <1rm>,
  //   ...
  // }
  _getMaxOneRepMaxPerDay() {
    let highestOneRepMax = 0
    let oneRepMaxPerDay = this.singleSets.reduce((dates, singleSet) => {
      let date = moment(singleSet.performed_at).startOf('day').valueOf()
      let oneRM = this._brzycki(singleSet.weight, singleSet.reps)

      if (oneRM > highestOneRepMax) {
        highestOneRepMax = oneRM
      }

      if (!dates[date]) {
        dates[date] = oneRM
        return dates
      }

      if (dates[date] < oneRM) {
        dates[date] = oneRM
      }

      return dates;
    }, {})

    return { oneRepMaxPerDay, highestOneRepMax }
  }

  _brzycki(weight, reps) {
    return Number(((weight * 36) / (37 - reps)).toFixed(1));
  }
}