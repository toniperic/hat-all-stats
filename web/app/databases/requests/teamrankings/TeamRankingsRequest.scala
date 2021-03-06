package databases.requests.teamrankings

import anorm.RowParser
import databases.{RestClickhouseDAO, SqlBuilder}
import databases.requests.{ClickhouseRequest, OrderingKeyPath}
import models.clickhouse.TeamRankings

import scala.concurrent.Future

object TeamRankingsRequest extends ClickhouseRequest[TeamRankings]{
  val request: String = """
    |SELECT
       |    team_id,
       |    team_name,
       |    round,
       |    rank_type,
       |    match_id,
       |    hatstats,
       |    hatstats_position,
       |    attack,
       |    attack_position,
       |    midfield,
       |    midfield_position,
       |    defense,
       |    defense_position,
       |    tsi,
       |    tsi_position,
       |    salary,
       |    salary_position,
       |    rating,
       |    rating_position,
       |    rating_end_of_match,
       |    rating_end_of_match_position,
       |    toInt32(age) as age,
       |    age_position,
       |    injury,
       |    injury_position,
       |    injury_count,
       |    injury_count_position,
       |    power_rating,
       |    power_rating_position
       |FROM hattrick.team_rankings
       | __where__
       |ORDER BY
       |    rank_type ASC,
       |    round ASC""".stripMargin

  override val rowParser: RowParser[TeamRankings] = TeamRankings.teamRankingsMapper

  def execute(orderingKeyPath: OrderingKeyPath)
             (implicit restClickhouseDAO: RestClickhouseDAO): Future[List[TeamRankings]] =
    restClickhouseDAO.execute(SqlBuilder(request)
      .season(orderingKeyPath.season.get)
      .leagueId(orderingKeyPath.leagueId.get)
      .teamId(orderingKeyPath.teamId.get)
      .build, rowParser)
}
