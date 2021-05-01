export const lolLeagueImageSelector = (l) => {
    switch (l) {
        case "IRON I":
        case "IRON II":
        case "IRON III":
        case "IRON IV":
            return require("../assets/images/LOLLeagueEmblems/Emblem_Iron.png")

        case "BRONZE I":
        case "BRONZE II":
        case "BRONZE III":
        case "BRONZE IV":
            return require("../assets/images/LOLLeagueEmblems/Emblem_Bronze.png")

        case "SILVER I":
        case "SILVER II":
        case "SILVER III":
        case "SILVER IV":
            return require("../assets/images/LOLLeagueEmblems/Emblem_Silver.png")

        case "GOLD I":
        case "GOLD II":
        case "GOLD III":
        case "GOLD IV":
            return require("../assets/images/LOLLeagueEmblems/Emblem_Gold.png")

        case "GOLD I":
        case "GOLD II":
        case "GOLD III":
        case "GOLD IV":
            return require("../assets/images/LOLLeagueEmblems/Emblem_Gold.png")

        case "PLATINUM I":
        case "PLATINUM II":
        case "PLATINUM III":
        case "PLATINUM IV":
            return require("../assets/images/LOLLeagueEmblems/Emblem_Platinum.png")

        case "DIAMOND I":
        case "DIAMOND II":
        case "DIAMOND III":
        case "DIAMOND IV":
            return require("../assets/images/LOLLeagueEmblems/Emblem_Platinum.png")

        case "MASTER I":
            return require("../assets/images/LOLLeagueEmblems/Emblem_Master.png")

        case "GRANDMASTER I":
            return require("../assets/images/LOLLeagueEmblems/Emblem_Grandmaster.png")

        case "CHALLENGER I":
            return require("../assets/images/LOLLeagueEmblems/Emblem_Challenger.png")

        default:
            return false;
    }
}

export const valorantImageSelector = (l) => {
    switch (l) {
        case "IRON I":
            return require("../assets/images/ValorantRanksAssets/Valorant_Iron1.png")
        case "IRON II":
            return require("../assets/images/ValorantRanksAssets/Valorant_Iron2.png")
        case "IRON III":
            return require("../assets/images/ValorantRanksAssets/Valorant_Iron3.png")

        case "BRONZE I":
            return require("../assets/images/ValorantRanksAssets/Valorant_Bronze1.png")
        case "BRONZE II":
            return require("../assets/images/ValorantRanksAssets/Valorant_Bronze2.png")
        case "BRONZE III":
            return require("../assets/images/ValorantRanksAssets/Valorant_Bronze3.png")

        case "SILVER I":
            return require("../assets/images/ValorantRanksAssets/Valorant_Silver1.png")
        case "SILVER II":
            return require("../assets/images/ValorantRanksAssets/Valorant_Silver2.png")
        case "SILVER III":
            return require("../assets/images/ValorantRanksAssets/Valorant_Silver3.png")

        case "GOLD I":
            return require("../assets/images/ValorantRanksAssets/Valorant_Gold1.png")
        case "GOLD II":
            return require("../assets/images/ValorantRanksAssets/Valorant_Gold2.png")
        case "GOLD III":
            return require("../assets/images/ValorantRanksAssets/Valorant_Gold3.png")


        case "PLATINUM I":
            return require("../assets/images/ValorantRanksAssets/Valorant_Platinum1.png")
        case "PLATINUM II":
            return require("../assets/images/ValorantRanksAssets/Valorant_Platinum2.png")
        case "PLATINUM III":
            return require("../assets/images/ValorantRanksAssets/Valorant_Platinum3.png")

        case "DIAMOND I":
            return require("../assets/images/ValorantRanksAssets/Valorant_Diamond1.png")
        case "DIAMOND II":
            return require("../assets/images/ValorantRanksAssets/Valorant_Diamond2.png")
        case "DIAMOND III":
            return require("../assets/images/ValorantRanksAssets/Valorant_Diamond3.png")

        case "IMMORTAL I":
            return require("../assets/images/ValorantRanksAssets/Valorant_Immortal1.png")
        case "IMMORTAL II":
            return require("../assets/images/ValorantRanksAssets/Valorant_Immortal2.png")
        case "IMMORTAL III":
            return require("../assets/images/ValorantRanksAssets/Valorant_Immortal3.png")

        case "RADIANT I":
            return require("../assets/images/ValorantRanksAssets/Valorant_Radiant.png")

        default:
            return false;
    }
}

export const apexImageSelector = (l) => {
    switch (l) {
        case "BRONZE":
            return require("../assets/images/ApexRankEmbles/Ranked_Tier1_Bronze.png")

        case "SILVER":
            return require("../assets/images/ApexRankEmbles/Ranked_Tier2_Silver.png")

        case "GOLD":
            return require("../assets/images/ApexRankEmbles/Ranked_Tier3_Gold.png")

        case "PLATINUM":
            return require("../assets/images/ApexRankEmbles/Ranked_Tier4_Platinum.png")

        case "DIAMOND":
            return require("../assets/images/ApexRankEmbles/Ranked_Tier5_Diamond.png")

        case "MASTER":
            return require("../assets/images/ApexRankEmbles/Ranked_Tier6_Master.png")

        case "APEX PREDATOR":
            return require("../assets/images/ApexRankEmbles/Ranked_Tier7_Apex_Predator.png")


        default:
            return false;
    }
}