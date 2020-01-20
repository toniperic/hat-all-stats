package com.blackmorse.hattrick.api;

import com.blackmorse.hattrick.HattrickApi;
import com.blackmorse.hattrick.api.leaguedetails.model.LeagueDetails;
import com.blackmorse.hattrick.api.matchdetails.model.MatchDetails;
import com.blackmorse.hattrick.api.matchesarchive.model.MatchesArchive;
import com.blackmorse.hattrick.api.matchlineup.model.MatchLineUp;
import com.blackmorse.hattrick.api.nationalteamdetails.model.NationalTeamDetails;
import com.blackmorse.hattrick.api.search.model.Result;
import com.blackmorse.hattrick.api.search.model.Search;
import com.blackmorse.hattrick.api.worlddetails.model.WorldDetails;
import com.blackmorse.hattrick.exceptions.HattrickChppException;
import com.blackmorse.hattrick.exceptions.HattrickTransferException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class Hattrick {
    private static Map<Integer, String> arabNumbers = new HashMap<>();

    static {
        arabNumbers.put(2, "II");
        arabNumbers.put(3, "III");
        arabNumbers.put(4, "IV");
        arabNumbers.put(5, "V");
        arabNumbers.put(6, "VI");
        arabNumbers.put(7, "VII");
        arabNumbers.put(8, "VIII");
        arabNumbers.put(9, "IX");
        arabNumbers.put(10, "X");
        arabNumbers.put(11, "XI");
        arabNumbers.put(12, "XII");
        arabNumbers.put(13, "XIII");
        arabNumbers.put(14, "XIV");
        arabNumbers.put(15, "XV");
    }

    private final HattrickApi hattrickApi;


    @Autowired
    public Hattrick(HattrickApi hattrickApi) {
        this.hattrickApi = hattrickApi;
    }

    @Retryable(value = {HattrickChppException.class, HattrickTransferException.class}, maxAttempts = 5, backoff = @Backoff(delay = 15000L))
    public NationalTeamDetails getNationalTeamDetails(Integer countryTeamId) {
        return hattrickApi.nationalTeamDetails().teamId(countryTeamId).execute();
    }

    @Retryable(value = {HattrickChppException.class, HattrickTransferException.class}, maxAttempts = 5, backoff = @Backoff(delay = 15000L))
    public LeagueDetails getLeagueUnitByName(Integer leagueId, String leagueName) {
        Search search = hattrickApi.search().searchType(3).searchLeagueId(leagueId).searchString(leagueName).execute();
        return hattrickApi.leagueDetails().leagueLevelUnitId(search.getSearchResults().get(0).getResultId()).execute();
    }

    @Retryable(value = {HattrickChppException.class, HattrickTransferException.class}, maxAttempts = 5, backoff = @Backoff(delay = 15000L))
    public List<Long> getLeagueUnitIdsForLevel(int leagueId, int level) {
        List<Long> result = new ArrayList<>();

        Search leagueSearch = hattrickApi.search().searchLeagueId(leagueId).searchType(3).searchString(arabNumbers.get(level) + ".").execute();
        leagueSearch.getSearchResults().stream().map(Result::getResultId).forEach(result::add);

        for (int page = 1; page < leagueSearch.getPages(); page++) {
            Search leagueSearchPage = hattrickApi.search().searchLeagueId(leagueId).pageIndex(page).searchType(3).searchString(arabNumbers.get(level) + ".").execute();

            leagueSearchPage.getSearchResults().stream().map(Result::getResultId).forEach(result::add);
        }
        return result;
    }

    @Retryable(value = {HattrickChppException.class, HattrickTransferException.class}, maxAttempts = 5, backoff = @Backoff(delay = 15000L))
    public LeagueDetails getLeagueUnitById(long id) {
        return hattrickApi.leagueDetails().leagueLevelUnitId(id).execute();
    }

    @Retryable(value = {HattrickChppException.class, HattrickTransferException.class}, maxAttempts = 5, backoff = @Backoff(delay = 15000L))
    public MatchesArchive getArchiveMatches(Long teamId, Integer season) {
        return hattrickApi.matchesArchive().season(season).teamId(teamId).execute();
    }

    @Retryable(value = {HattrickChppException.class, HattrickTransferException.class}, maxAttempts = 5, backoff = @Backoff(delay = 15000L))
    public MatchLineUp getMatchLineUp(Long matchId, Long teamId) {
        return hattrickApi.matchLineUp().matchId(matchId).teamId(teamId).execute();
    }

    @Retryable(value = {HattrickChppException.class, HattrickTransferException.class}, maxAttempts = 5, backoff = @Backoff(delay = 15000L))
    public MatchDetails getMatchDetails(Long matchId) {
        return hattrickApi.matchDetails().matchId(matchId).execute();
    }

    @Retryable(value = {HattrickChppException.class, HattrickTransferException.class}, maxAttempts = 5, backoff = @Backoff(delay = 15000L))
    public WorldDetails getWorldDetails() {
        return hattrickApi.worldDetails().execute();
    }
}
