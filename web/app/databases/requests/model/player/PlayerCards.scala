package databases.requests.model.player

import anorm.SqlParser.get
import anorm.~
import play.api.libs.json.Json

case class PlayerCards(playerSortingKey: PlayerSortingKey, games: Int, playedMinutes: Int, yellowCards: Int, redCards: Int)

object PlayerCards {
  implicit val writes = Json.writes[PlayerCards]

  val mapper = {
    get[Long]("player_id") ~
    get[String]("first_name") ~
    get[String]("last_name") ~
    get[Long]("team_id") ~
    get[String]("team_name") ~
    get[Long]("league_unit_id") ~
    get[String]("league_unit_name") ~
    get[Int]("games") ~
    get[Int]("played") ~
    get[Int]("yellow_cards") ~
    get[Int]("red_cards") map {
      case playerId ~ firstName ~ lastName ~ teamId ~ teamName ~
        leagueUnitId ~ leagueUnitName ~ games ~ playedMinutes ~ yellowCards ~ redCards =>
        val playerSortingKey = PlayerSortingKey(playerId, firstName, lastName, teamId, teamName,
          leagueUnitId, leagueUnitName)
        PlayerCards(playerSortingKey, games, playedMinutes, yellowCards, redCards)
    }
  }
}
