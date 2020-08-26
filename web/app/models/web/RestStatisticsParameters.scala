package models.web

import play.api.mvc.QueryStringBindable

case class RestStatisticsParameters(page: Int, pageSize: Int, sortBy: String, sortingDirection: SortingDirection)

object RestStatisticsParameters {
  implicit def queryStringBindable(implicit stringBinder: QueryStringBindable[String]) = new QueryStringBindable[RestStatisticsParameters] {
    override def bind(key: String, params: Map[String, Seq[String]]): Option[Either[String, RestStatisticsParameters]] = {
      val pageOptionEither = stringBinder.bind("page", params).map(pageEither => pageEither.flatMap(page => {
        if (page forall Character.isDigit) {
          Right(page.toInt)
        } else {
          Left("Error while parsing page")
        }
      }))

      val pageSizeOptionEither = stringBinder.bind("pageSize", params)
        .map(pageSizeEither => pageSizeEither.flatMap(pageSize => {
          if (pageSize forall Character.isDigit) {
            Right(pageSize.toInt)
          } else {
            Left("Error while parsing page")
          }
        }))

      val sortByOptionEither = stringBinder.bind("sortBy", params)

      val directionOptionEither = stringBinder.bind("sortDirection", params)
        .map(directionEither => directionEither.flatMap(direction => {
          if (direction == "asc") {
            Right(Asc)
          } else if (direction == "desc") {
            Right(Desc)
          } else {
            Left("Unknown sorting direction")
          }
        }))

      for(pageSizeEither <- pageSizeOptionEither;
          pageEither <- pageOptionEither;
          sortByEither <- sortByOptionEither;
          directionEither <- directionOptionEither) yield {
        for(pageSize <- pageSizeEither;
            page <- pageEither;
            sortBy <- sortByEither;
            direction <- directionEither) yield {
          RestStatisticsParameters(page, pageSize, sortBy, direction)
        }
      }
    }

    override def unbind(key: String, value: RestStatisticsParameters): String = {
      stringBinder.unbind("page", value.page.toString) + "&" +
        stringBinder.unbind("pageSize", value.pageSize.toString) + "&" +
        stringBinder.unbind("sortBy", value.sortBy) + "&" +
        stringBinder.unbind("sortDirection",  if (value.sortingDirection == Asc)  "asc" else "desc" )
    }
  }
}
