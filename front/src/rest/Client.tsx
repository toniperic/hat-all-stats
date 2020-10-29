import axios from 'axios';
import LeagueData from './models/LeagueData'
import DivisionLevelData from './models/DivisionLevelData'
import TeamHatstats from './models/team/TeamHatstats'
import LeagueUnitRating from './models/LeagueUnitRating'
import StatisticsParameters, { StatsTypeEnum } from './StatisticsParameters'
import RestTableData from './RestTableData'
import LeagueUnitRequest from './models/request/LeagueUnitRequest'
import DivisionLevelRequest from './models/request/DivisionLevelRequest';
import LeagueRequest from './models/request/LeagueRequest'
import TeamRequest from './models/request/TeamRequest'
import LevelRequest from './models/request/LevelRequest';
import LeagueUnitData from './models/LeagueUnitData';
import TeamPosition from './models/TeamPosition';
import TeamData from './models/TeamData'
import PlayerStats from './models/PlayerStat'
import TeamRankingsStats from './models/TeamRankingsStats'
import { NearestMatches } from './models/NearestMatch';
import PlayerGoalGames from './models/player/PlayerGoalsGames'
import PlayerCards from './models/player/PlayerCards'
import PlayerSalaryTSI from './models/player/PlayerSalaryTSI'
import PlayerRating from './models/player/PlayerRating'
import PlayerInjury from './models/player/PlayerInjury'
import TeamSalaryTSI from './models/team/TeamSalaryTSI'
import TeamCards from './models/team/TeamCards'
import TeamRating from './models/team/TeamRating'
import TeamAgeInjury from './models/team/TeamAgeInjury'
import TeamGoalPoints from './models/team/TeamGoalPoints'
import TeamPowerRating from './models/team/TeamPowerRating'
import TeamFanclubFlags from './models/team/TeamFanclubFlags'
import TeamStreakTrophies from './models/team/TeamStreakTrophies'

export function getLeagueData(leagueId: number, callback: (leagueData: LeagueData) => void): void {
    axios.get<LeagueData>('/api/league/' + leagueId)
        .then(response => response.data)
        .then(callback)
}

export function getDivisionLevelData(leagueId: number, divisionLevel: number, 
        callback: (divisionLevelData: DivisionLevelData) => void): void {
    axios.get<DivisionLevelData>('/api/league/' + leagueId + '/divisionLevel/' + divisionLevel)   
    .then(response => {
        return response.data
    }).then(model => callback(model)) 
}

export function getLeagueUnitData(leagueUnitId: number, callback: (leagueUnitData: LeagueUnitData) => void): void {
    axios.get<LeagueUnitData>('/api/leagueUnit/' + leagueUnitId)
    .then(response => {
        return response.data
    }).then(model => callback(model))
}

export function getTeamHatstats(request: LevelRequest, 
        statisticsParameters: StatisticsParameters, 
        callback: (teamHatstats: RestTableData<TeamHatstats>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)    

    axios.get<RestTableData<TeamHatstats>>(startUrl(request) + '/teamHatstats?' + params.toString())
    .then(response => response.data)
    .then(model => callback(model))
    .catch(e => onError())
}

export function getLeagueUnits(request: LevelRequest,
        statisticsParameters: StatisticsParameters, 
        callback: (leagueUnits: RestTableData<LeagueUnitRating>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters) 
    
    axios.get<RestTableData<LeagueUnitRating>>(startUrl(request) + '/leagueUnits?' + params.toString())
    .then(response => response.data)
    .then(model =>  callback(model))
    .catch(e => onError())
}

export function getTeamPositions(request: LeagueUnitRequest, 
        statisticsParameters: StatisticsParameters,
        callback: (teamPositions: RestTableData<TeamPosition>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)

    axios.get<RestTableData<TeamPosition>>(startUrl(request) + '/teamPositions?' + params.toString())
        .then(response => response.data)
        .then(model => callback(model))
        .catch(e => onError())
}

export function getTeamData(leagueId: number, callback: (teamData: TeamData) => void): void {
    axios.get<TeamData>('/api/team/' + leagueId)
        .then(response => response.data)
        .then(callback)
}

export function getPlayerStats(request: LevelRequest, 
        statisticsParameters: StatisticsParameters,
        callback: (playerStats: RestTableData<PlayerStats>) => void,
        onError: () => void)  {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<PlayerStats>>(startUrl(request) + '/playerStats?' + params.toString())
        .then(response => response.data)
        .then(model => callback(model))
        .catch(e => onError())
    }

export function getTeamRankings(request: LevelRequest, 
        callback: (teamRankingsStats: TeamRankingsStats) => void,
        onError: () => void) {
    axios.get<TeamRankingsStats>(startUrl(request) + '/teamRankings')
        .then(response => response.data)
        .then(entities => callback(entities))
        .catch(e => onError())
}

interface LeagueUnitId {
    id: number
}

export function getLeagueUnitIdByName(leagueId: number, leagueUnitName: string, callback: (id: number) => void) {
    axios.get<LeagueUnitId>('/api/league/' + leagueId + '/leagueUnitName/' + leagueUnitName)
        .then(response => response.data)
        .then(leagueUnitId => callback(leagueUnitId.id))
}

export function getNearestMatches(request: TeamRequest, 
        callback: (nearestMatches: NearestMatches) => void,
        onError: () => void) {
    axios.get<NearestMatches>('/api/team/' + request.teamId + "/nearestMatches")
        .then(response => response.data)
        .then(nearestMatches => callback(nearestMatches))
        .catch(e => onError())
}

export function getPlayerGoalsGames(request: LevelRequest, 
        statisticsParameters: StatisticsParameters,
        callback: (playerStats: RestTableData<PlayerGoalGames>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<PlayerGoalGames>>(startUrl(request) + '/playerGoalGames?' + params.toString())
        .then(response => response.data)
        .then(playerGoalGames => callback(playerGoalGames))
        .catch(e => onError())
}

export function getPlayerCards(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (playerCards: RestTableData<PlayerCards>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<PlayerCards>>(startUrl(request) + '/playerCards?' + params.toString())
        .then(response => response.data)
        .then(playerCards => callback(playerCards))
        .catch(e => onError())
}

export function getPlayerSalaryTsi(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (playerSalaryTsis: RestTableData<PlayerSalaryTSI>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<PlayerSalaryTSI>>(startUrl(request) + '/playerTsiSalary?' + params.toString())
        .then(response => response.data)
        .then(playerSalaryTsis => callback(playerSalaryTsis))
        .catch(e => onError())
}

export function getPlayerRatings(request: LevelRequest,
            statisticsParameters: StatisticsParameters,
            callback: (playerRatings: RestTableData<PlayerRating>) => void,
            onError: () => void) {
        let params = createParameters(statisticsParameters)
        axios.get<RestTableData<PlayerRating>>(startUrl(request) + '/playerRatings?' + params.toString())
            .then(response => response.data)
            .then(playerRatings => callback(playerRatings))
            .catch(e => onError())
    }

export function getPlayerInjuries(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (playerInjuries: RestTableData<PlayerInjury>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<PlayerInjury>>(startUrl(request) + '/playerInjuries?' + params.toString())
        .then(response => response.data)
        .then(playerRatings => callback(playerRatings))
        .catch(e => onError())
}

export function getTeamSalaryTSI(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (teamSalaryTSIs: RestTableData<TeamSalaryTSI>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<TeamSalaryTSI>>(startUrl(request) + '/teamSalaryTsi?' + params.toString())
        .then(response => response.data)
        .then(teamSalaryTSIs => callback(teamSalaryTSIs))
        .catch(e => onError())
}

export function getTeamCards(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (teamCards: RestTableData<TeamCards>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<TeamCards>>(startUrl(request) + '/teamCards?' + params.toString())
        .then(response => response.data)
        .then(teamCards => callback(teamCards))
        .catch(e => onError())
}

export function getTeamRatings(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (teamRatings: RestTableData<TeamRating>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<TeamRating>>(startUrl(request) + '/teamRatings?' + params.toString())
        .then(response => response.data)
        .then(teamRatings => callback(teamRatings))
        .catch(e => onError())
}

export function getTeamAgeInjuries(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (teamAgeInjuries: RestTableData<TeamAgeInjury>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<TeamAgeInjury>>(startUrl(request) + '/teamAgeInjuries?' + params.toString())
        .then(response => response.data)
        .then(teamAgeInjuries => callback(teamAgeInjuries))
        .catch(e => onError())
}

export function getTeamGoalPoints(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (teamGoalPoints: RestTableData<TeamGoalPoints>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<TeamGoalPoints>>(startUrl(request) + '/teamGoalPoints?' + params.toString())
        .then(response => response.data)
        .then(teamGoalPoints => callback(teamGoalPoints))
        .catch(e => onError())
}

export function getTeamPowerRatings(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (teamPowerRatings: RestTableData<TeamPowerRating>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<TeamPowerRating>>(startUrl(request) + '/teamPowerRatings?' + params.toString())
        .then(response => response.data)
        .then(teamPowerRatings => callback(teamPowerRatings))
        .catch(e => onError())
}

export function getTeamFanclubFlags(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (teamFanclubFlags: RestTableData<TeamFanclubFlags>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<TeamFanclubFlags>>(startUrl(request) + '/teamFanclubFlags?' + params.toString())
        .then(response => response.data)
        .then(teamFanclubFlags => callback(teamFanclubFlags))
        .catch(e => onError())
}

export function getTeamStreakTrophies(request: LevelRequest,
        statisticsParameters: StatisticsParameters,
        callback: (teamStreakTrophies: RestTableData<TeamStreakTrophies>) => void,
        onError: () => void) {
    let params = createParameters(statisticsParameters)
    axios.get<RestTableData<TeamStreakTrophies>>(startUrl(request) + '/teamStreakTrophies?' + params.toString())
        .then(response => response.data)
        .then(teamStreakTrophies => callback(teamStreakTrophies))
        .catch(e => onError())
}

function startUrl(request: LevelRequest): string {
    if (request.type === 'LeagueRequest') {
        return '/api/league/' + (request as LeagueRequest).leagueId 
    } else if (request.type === 'DivisionLevelRequest') {
        return '/api/league/' + (request as DivisionLevelRequest).leagueId + '/divisionLevel/' 
            + (request as DivisionLevelRequest).divisionLevel
    } else if (request.type === 'LeagueUnitRequest') {
        return '/api/leagueUnit/' + (request as LeagueUnitRequest).leagueUnitId
    } else if(request.type === 'TeamRequest') { 
        return '/api/team/' + (request as TeamRequest).teamId
    } else {
        return ''
    }
}

function createParameters(statisticsParameters: StatisticsParameters) {
    var values: any = {}

    values.page = statisticsParameters.page.toString()
    values.pageSize = statisticsParameters.pageSize.toString()
    values.sortBy = statisticsParameters.sortingField
    values.sortDirection = statisticsParameters.sortingDirection
    values.statType = statisticsParameters.statsType.statType
    values.season = statisticsParameters.season

    if(statisticsParameters.statsType.statType === StatsTypeEnum.ROUND) {
        values.statRoundNumber = statisticsParameters.statsType.roundNumber
    }

    return new URLSearchParams(values).toString()
}