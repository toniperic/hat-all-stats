import React from 'react'
import ModelTable, { ModelTablePropsWrapper, SortingState, ModelTableProps } from '../../ModelTable';
import LevelData from '../../../rest/models/leveldata/LevelData';
import { StatsTypeEnum } from '../../../rest/StatisticsParameters';
import { getTeamFanclubFlags } from '../../../rest/Client';
import '../../../i18n'
import { Translation } from 'react-i18next'
import ModelTableTh from '../../ModelTableTh'
import LeagueUnitLink from '../../links/LeagueUnitLink';
import TeamLink from '../../links/TeamLink'
import TeamFanclubFlags from '../../../rest/models/team/TeamFanclubFlags';

abstract class TeamFanclubFlagsTable<Data extends LevelData, TableProps extends ModelTableProps<Data>>
    extends ModelTable<Data, TableProps, TeamFanclubFlags> {

    constructor(props: ModelTablePropsWrapper<Data, TableProps>) {
        super(props, 'fanclub_size', {statType: StatsTypeEnum.ROUND, roundNumber: props.modelTableProps.currentRound()},
            [StatsTypeEnum.ROUND])
    }

    fetchDataFunction = getTeamFanclubFlags

    columnHeaders(sortingState: SortingState): JSX.Element {
        return <Translation>
            {
            (t, { i18n }) =>
            <tr>
                <th className="position hint" popped-hint={t('table.position')}>{t('table.position_abbr')}</th>
                <th>{t('table.team')}</th>
                <th className="value">{t('table.league')}</th>
                <ModelTableTh title='table.fanclub_size' sortingField='fanclub_size' sortingState={sortingState} />
                <ModelTableTh title='table.home_flags' sortingField='home_flags' sortingState={sortingState} />
                <ModelTableTh title='table.away_flags' sortingField='away_flags' sortingState={sortingState} />
                <ModelTableTh title='table.all_flags' sortingField='all_flags' sortingState={sortingState} />
            </tr>
        }
        </Translation>
    }

    columnValues(index: number, teamFanclubFlags: TeamFanclubFlags): JSX.Element {
        let teamSortingKey = teamFanclubFlags.teamSortingKey
        return <tr key={"team_ratings_row_" + index}>
            <td>{index + 1}</td>
            <td><TeamLink id={teamSortingKey.teamId} name={teamSortingKey.teamName} /></td>
            <td className="value"><LeagueUnitLink id={teamSortingKey.leagueUnitId} name={teamSortingKey.leagueUnitName}/></td>
            <td className="value">{teamFanclubFlags.fanclubSize}</td>
            <td className="value">{teamFanclubFlags.homeFlags}</td>
            <td className="value">{teamFanclubFlags.awayFlags}</td>
            <td className="value">{teamFanclubFlags.allFlags}</td>
        </tr>
    }
}

export default TeamFanclubFlagsTable