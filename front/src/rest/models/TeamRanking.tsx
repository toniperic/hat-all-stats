interface TeamRanking {
    teamId: number,
    teamName: string,
    round: number,
    rank_type: string,
    hatstats: number,
    hatstatsPosition: number,
    attack: number,
    attackPosition: number,
    midfield: number,
    midfieldPosition: number,
    defense: number,
    defensePosition: number,
    tsi: number,
    tsiPosition: number,
    salary: number,
    salaryPosition: number,
    rating: number,
    ratingPosition: number,
    ratingEndOfMatch: number,
    ratingEndOfMatchPosition: number,
    age: number,
    agePosition: number,
    injury: number,
    injuryPosition: number,
    injuryCount: number,
    injuryCountPosition: number,
    powerRating: number,
    powerRatingPosition: number
}

export default TeamRanking