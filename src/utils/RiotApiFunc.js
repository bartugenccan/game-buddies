const API_KEY = "RGAPI-c4f6a63e-2723-47cd-a8bf-1a1c4035bd3b";

async function getID(summonername) {
    try {
        let response = await fetch("https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonername + "?api_key=" + API_KEY);
        let json = await response.json();
        return json.id;
    } catch (err) {
        console.error(err);
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

export async function checkVerificationCode(summonername , inputCode , success_callback , failed_callback ) {
    try {
        let idResponse = await getID(summonername);
        let codeResponse = await getVerificationCode(idResponse);

        if (codeResponse == inputCode){
            success_callback();
        } else if (codeResponse != inputCode){
            failed_callback();
        }
        
    } catch (err) {
        failed_callback();
    }
}