import Highcharts from 'ember-highcharts/components/high-charts';
import moment from 'moment'

const LABEL_COLOR = '#ffffff'

export default class OneRepMaxChart extends Highcharts {
  chartOptions = {
    chart: {
      type: 'area',
      backgroundColor: '#242a2e'
    },
    colors: ['#4ec183'],
    legend: {
      enabled: false
    },
    title: {
      text: ''
    },
    tooltip: {
      formatter: function() {
        let dateFormat = "MM/DD/YYYY"
        return `${moment(this.x).format(dateFormat)}<br />One Rep Max: <b>${this.y} lbs</b>`
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        style: {
          color: LABEL_COLOR
        }
      }

    },
    yAxis: {
      title: {
        text: 'Weight (lbs)',
        style: {
          color: LABEL_COLOR
        }
      },
      labels: {
        style: {
          color: LABEL_COLOR
        }
      }
    }
  }

  content = []
}
