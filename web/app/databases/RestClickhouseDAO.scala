package databases

import anorm.{Row, RowParser, SimpleSql}
import javax.inject.{Inject, Singleton}
import play.api.db.DBApi

import scala.concurrent.Future

@Singleton
class RestClickhouseDAO @Inject()(dbApi: DBApi)(implicit ec: DatabaseExecutionContext) {
  private val db = dbApi.database("default")

  def execute[T](simpleRow: SimpleSql[Row],
                 rowParser: RowParser[T]): Future[List[T]] = Future {
    db.withConnection{ implicit connection =>
      simpleRow.as(rowParser.*)
    }
  }
}
