import React from 'react';
import TableSection, { SortingState } from '../../../common/sections/TableSection';
import LevelDataProps, { LevelDataPropsWrapper } from '../../LevelDataProps'
import LevelData from '../../../rest/models/leveldata/LevelData';
import TeamSalaryTSI from '../../../rest/models/team/TeamSalaryTSI';
import { getTeamSalaryTSI } from '../../../rest/Client';
import '../../../i18n'
import { Translation } from 'react-i18next'
import ModelTableTh from '../../../common/elements/SortingTableTh'
import LeagueUnitLink from '../../links/LeagueUnitLink';
import TeamLink from '../../links/TeamLink'
import { commasSeparated } from '../../Formatters'
import { StatsTypeEnum } from '../../../rest/models/StatisticsParameters';

abstract class TeamSalaryTSITable<Data extends LevelData, TableProps extends LevelDataProps<Data>>
    extends TableSection<Data, TableProps, TeamSalaryTSI> {

    constructor(props: LevelDataPropsWrapper<Data, TableProps>) {
        super(props, 'salary', {statType: StatsTypeEnum.ROUND, roundNumber: props.levelDataProps.currentRound()},
            [StatsTypeEnum.ROUND])
    }

    fetchDataFunction = getTeamSalaryTSI

    columnHeaders(sortingState: SortingState): JSX.Element {
        return <Translation>
            {
            (t, { i18n }) =>
            <tr>
                <th className="position hint" popped-hint={t('table.position')}>{t('table.position_abbr')}</th>
                <th>{t('table.team')}</th>
                <th className="value">{t('table.league')}</th>
                <ModelTableTh title='table.tsi' sortingField='tsi' sortingState={sortingState} />
                <ModelTableTh title='table.salary' sortingField='salary' titlePostfix={', ' + this.props.levelDataProps.currency()}
                     sortingState={sortingState} />
            </tr>
        }
        </Translation>
    }

    columnValues(index: number, teamSalaryTSI: TeamSalaryTSI): JSX.Element {
        let teamSortingKey = teamSalaryTSI.teamSortingKey
        return <>
            <td>{index + 1}</td>
            <td><TeamLink id={teamSortingKey.teamId} text={teamSortingKey.teamName} /></td>
            <td className="value"><LeagueUnitLink id={teamSortingKey.leagueUnitId} text={teamSortingKey.leagueUnitName}/></td>
            <td className="value">{commasSeparated(teamSalaryTSI.tsi)}</td>
            <td className="value">{commasSeparated(teamSalaryTSI.salary / this.props.levelDataProps.currencyRate())}</td>
        </>
    }
}

export default TeamSalaryTSITable