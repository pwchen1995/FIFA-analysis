/* AppMode: The enumerated type for AppMode. */

const AppMode = {
    LEAGUE: "LeagueMode",
    TEAMS: "TeamsMode",
    SEASONS: "SeasonsMode"
};

Object.freeze(AppMode); //This ensures that the object is immutable.

export default AppMode;