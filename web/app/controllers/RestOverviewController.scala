package controllers

import databases.RestClickhouseDAO
import io.swagger.annotations.Api
import javax.inject.Inject
import models.web.rest.LevelData
import models.web.rest.LevelData.Rounds
import play.api.libs.json.Json
import play.api.mvc.ControllerComponents
import service.{LeagueInfoService, RestOverviewStatsService}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

case class WorldData(countries: Seq[(Int, String)],
                     seasonOffset: Int,
                     seasonRoundInfo: Seq[(Int, Rounds)],
                     currency: String,
                     currencyRate: Double) extends LevelData

object WorldData {
  implicit val writes = Json.writes[WorldData]
}

@Api(produces = "application/json")
class RestOverviewController @Inject()(val controllerComponents: ControllerComponents,
                                       implicit val restClickhouseDAO: RestClickhouseDAO,
                                       val restOverviewStatsService: RestOverviewStatsService,
                                       val leagueInfoService: LeagueInfoService)
                                  extends RestController {
  private val lastLeagueId = 100

  def getWorldData() = Action.async{implicit request =>
    val countries = leagueInfoService.leagueInfo.leagueInfo
        .toSeq
      .map{case(leagueId, leagueInfo) => (leagueId, leagueInfo.league.getEnglishName)}
      .sortBy(_._2)

    val worldData = WorldData(countries = countries,
      seasonOffset = 0,
      seasonRoundInfo = leagueInfoService.leagueInfo.seasonRoundInfo(lastLeagueId),
      currency = "$",
      currencyRate = 10.0d
      )

    Future(Ok(Json.toJson(worldData)))
  }

  def numberOverview(season: Int, round: Int, leagueId: Option[Int], divisionLevel: Option[Int]) = Action.async { implicit request =>
    restOverviewStatsService.numberOverview(season, round, leagueId, divisionLevel)
      .map(numberOverview => Ok(Json.toJson(numberOverview)))
  }

  def formations(season: Int, round: Int, leagueId: Option[Int], divisionLevel: Option[Int]) = Action.async{ implicit request =>
    restOverviewStatsService.formations(season, round, leagueId, divisionLevel)
      .map(formations => Ok(Json.toJson(formations)))
  }

  def averagesOverview(season: Int, round: Int, leagueId: Option[Int], divisionLevel: Option[Int]) = Action.async { implicit request =>
    restOverviewStatsService.averageOverview(season, round, leagueId, divisionLevel)
      .map(averages => Ok(Json.toJson(averages)))
  }

  def surprisingMatches(season: Int, round: Int, leagueId: Option[Int], divisionLevel: Option[Int]) = Action.async {implicit request =>
    restOverviewStatsService.surprisingMatches(season, round, leagueId, divisionLevel)
      .map(matches => Ok(Json.toJson(matches)))
  }

  def topHatstatsTeams(season: Int, round: Int, leagueId: Option[Int], divisionLevel: Option[Int]) = Action.async {implicit request =>
    restOverviewStatsService.topHatstatsTeams(season, round, leagueId, divisionLevel)
      .map(teams => Ok(Json.toJson(teams)))
  }

  def topSalaryTeams(season: Int, round: Int, leagueId: Option[Int], divisionLevel: Option[Int]) = Action.async{implicit request =>
    restOverviewStatsService.topSalaryTeams(season, round, leagueId, divisionLevel)
      .map(teams => Ok(Json.toJson(teams)))
  }

  def topMatches(season: Int, round: Int, leagueId: Option[Int], divisionLevel: Option[Int]) = Action.async{implicit request =>
    restOverviewStatsService.topMatches(season, round, leagueId, divisionLevel)
      .map(matches => Ok(Json.toJson(matches)))
  }

  def topSalaryPlayers(season: Int, round: Int, leagueId: Option[Int], divisionLevel: Option[Int]) = Action.async{implicit request =>
    restOverviewStatsService.topSalaryPlayers(season, round, leagueId, divisionLevel)
      .map(players => Ok(Json.toJson(players)))
  }

  def topRatingPlayers(season: Int, round: Int, leagueId: Option[Int], divisionLevel: Option[Int]) = Action.async { implicit request =>
    restOverviewStatsService.topRatingPlayers(season, round, leagueId, divisionLevel)
      .map(players => Ok(Json.toJson(players)))
  }

  def totalOverview(season: Int, round: Int, leagueId: Option[Int], divisionLevel: Option[Int]) = Action.async { implicit request =>
    restOverviewStatsService.totalOverview(season, round, leagueId, divisionLevel)
      .map(totalOverview => Ok(Json.toJson(totalOverview)))
  }
}
