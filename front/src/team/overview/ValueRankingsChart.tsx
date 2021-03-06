import TeamRanking from '../../rest/models/team/TeamRanking'
import React from 'react';
import PlotlyChart from 'react-plotlyjs-ts';
import i18n from '../../i18n';

interface Props {
  leagueRankings: Array<TeamRanking>,
  valueFunc: (teamRanking: TeamRanking) => number,
  title: string,
  formatterFunc?: (n: number) => number
}

class RankingsChart extends React.Component<Props, {}> {

    render() {
        
        let x = this.props.leagueRankings.map(l => l.round)
        let yy = this.props.leagueRankings.map(this.props.valueFunc)
        let y = (this.props.formatterFunc !== undefined) ? yy.map(this.props.formatterFunc) : yy
        console.log(y)
        let chartData = [{
            type: 'scatter',
            x: x,
            y: y,
            marker: {
              color: 'green'
            }
        }]

        var layout = {
            title: {
              text: this.props.title
            },
            showlegend: false,
            xaxis: {
              dtick: 1,
              title: {
                text: i18n.t('chart.round')
              }
            },
            yaxis: {
              title: {
                text: this.props.title
              }
            }
          };

        return <PlotlyChart
        data={chartData}
        layout={layout}
      />
    }
}

export default RankingsChart