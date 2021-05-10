export default function filterFunction(
  realArr,
  leagueArr,
  laneArr,
  voiceChatBool,
) {
  if (leagueArr.length == 0 && laneArr.length == 0) {
    return realArr.filter(elem => elem.voice_chat == voiceChatBool);
  } else if (leagueArr.length != 0 && laneArr.length == 0) {
    return realArr.filter(elem => leagueFilter(elem.league, leagueArr));
  }
}

function leagueFilter(realArr, leagueArr) {
  var i, j;
  for (i = 0; i < leagueArr.length; i++) {
    for (j = 0; j < realArr.length; j++) {
      if (leagueArr[i] == realArr[f]) {
        return true;
      }
    }
  }

  return false;
}
