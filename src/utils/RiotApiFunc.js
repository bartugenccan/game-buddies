const API_KEY = "RGAPI-c4f6a63e-2723-47cd-a8bf-1a1c4035bd3b";

export async function getID(summonername) {
    try {
        let response = await fetch("https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonername + "?api_key=" + API_KEY);
        let json = await response.json();
        return json.id;
    } catch (err) {
        console.error(err);
    }
}

export async function getLevel(summonerName) {
    try {
        let response = await fetch("https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + API_KEY);
        let json = await response.json();
        return json.summonerLevel;
    } catch (err) {
        console.log(err)
    }

}

async function getVerificationCode(id) {
    try {
        let response = await fetch("https://tr1.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/" + id + "?api_key=" + API_KEY);
        let json = await response.json();
        return json;
    } catch (err) {
        console.error(err);
    }

}

export async function fetchStats(summonername) {
    try {

        let idResponse = await getID(summonername);
        let response = await fetch("https://tr1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + idResponse + "?api_key=" + API_KEY);
        let respJson = await response.json();

        if (respJson[0]["queueType"] == "RANKED_FLEX_SR") {

            console.log("Flex wins" + respJson[0]["wins"]);

            // Solo Stats
            let SoloQueueRanked = respJson[1]["tier"] + " " + respJson[1]["rank"];
            let SoloQueueLP = respJson[1]["leaguePoints"];
            let SoloQueueWins = respJson[1]["wins"];
            let SoloQueueLosses = respJson[1]["losses"];

            // Flex Stats
            let FlexRanked = respJson[0]["tier"] + " " + respJson[0]["rank"];
            let FlexRankedLP = respJson[0]["leaguePoints"];
            let FlexWins = respJson[0]["wins"];
            let FlexLosses = respJson[0]["losses"];

            return [SoloQueueRanked, SoloQueueLP, SoloQueueWins, SoloQueueLosses, FlexRanked, FlexRankedLP, FlexWins, FlexLosses];

        } else if (respJson[0]["queueType"] == "RANKED_SOLO_5x5") {

            console.log("Solo wins" + respJson[0]["wins"]);

            // Solo Stats
            let SoloQueueRanked = respJson[0]["tier"] + " " + respJson[0]["rank"];
            let SoloQueueLP = respJson[0]["leaguePoints"];
            let SoloQueueWins = respJson[0]["wins"];
            let SoloQueueLosses = respJson[0]["losses"];

            // Flex Stats
            let FlexRanked = respJson[1]["tier"] + " " + respJson[1]["rank"];
            let FlexRankedLP = respJson[1]["leaguePoints"];
            let FlexWins = respJson[1]["wins"];
            let FlexLosses = respJson[1]["losses"];

            return [SoloQueueRanked, SoloQueueLP, SoloQueueWins, SoloQueueLosses, FlexRanked, FlexRankedLP, FlexWins, FlexLosses];

        }


        return [respJson[0]["tier"] + " " + respJson[0]["rank"], respJson[0]["leaguePoints"], respJson[0]["wins"], respJson[0]["losses"]];

    } catch (err) {
        console.error(err);
    }
}

export async function getProfileIconId(summonername) {
    try {
        let response = await fetch("https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonername + "?api_key=" + API_KEY);
        let json = await response.json();
        return json.profileIconId;
    } catch (err) {
        console.error(err);
    }
}

export async function checkVerificationCode(summonername, inputCode, success_callback, failed_callback) {
    try {
        let idResponse = await getID(summonername);
        let codeResponse = await getVerificationCode(idResponse);

        if (codeResponse == inputCode) {
            success_callback();
        } else if (codeResponse != inputCode) {
            failed_callback();
        }

    } catch (err) {
        failed_callback();
    }
}


