const API_KEY = 'RGAPI-5ba39a46-f9ef-468e-a8c4-bee10a58bc65';

export async function getID(summonername) {
  try {
    let response = await fetch(
      'https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
        summonername +
        '?api_key=' +
        API_KEY,
    );
    let json = await response.json();
    return json.id;
  } catch (err) {
    console.error(err);
  }
}

async function getVerificationCode(id) {
  try {
    let response = await fetch(
      'https://tr1.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/' +
        id +
        '?api_key=' +
        API_KEY,
    );
    let json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchStats(summonername) {
  try {
    let idResponse = await getID(summonername);
    let response = await fetch(
      'https://tr1.api.riotgames.com/lol/league/v4/entries/by-summoner/' +
        idResponse +
        '?api_key=' +
        API_KEY,
    );
    let respJson = await response.json();

    if (respJson[0]['queueType'] == 'RANKED_FLEX_SR') {
      // Solo Stats
      let SoloQueueRanked = respJson[1]['tier'] + ' ' + respJson[1]['rank'];

      // Flex Stats
      let FlexRanked = respJson[0]['tier'] + ' ' + respJson[0]['rank'];

      return [SoloQueueRanked, FlexRanked];
    } else if (respJson[0]['queueType'] == 'RANKED_SOLO_5x5') {
      // Solo Stats
      let SoloQueueRanked = respJson[0]['tier'] + ' ' + respJson[0]['rank'];

      // Flex Stats
      let FlexRanked = respJson[1]['tier'] + ' ' + respJson[1]['rank'];

      return [SoloQueueRanked, FlexRanked];
    }

    return [
      respJson[0]['tier'] + ' ' + respJson[0]['rank'],
      respJson[0]['leaguePoints'],
      respJson[0]['wins'],
      respJson[0]['losses'],
    ];
  } catch (err) {
    console.error(err);
  }
}

export async function getProfileIconId(summonername) {
  try {
    let response = await fetch(
      'https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
        summonername +
        '?api_key=' +
        API_KEY,
    );
    let json = await response.json();
    return json.profileIconId;
  } catch (err) {
    console.error(err);
  }
}

export async function checkVerificationCode(
  summonername,
  inputCode,
  success_callback,
  failed_callback,
) {
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
