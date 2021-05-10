// Little Function For Time Difference
export function timeDifference(date1, date2) {
  var difference = date1.getTime() - date2.toDate();

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  var secondsDifference = Math.floor(difference / 1000);

  if (daysDifference != 0) {
    let resStr = daysDifference + ' gün önce';
    return resStr;
  } else if (daysDifference === 0 && hoursDifference != 0) {
    let resStr = hoursDifference + ' saat önce';
    return resStr;
  } else if (
    daysDifference == 0 &&
    hoursDifference == 0 &&
    minutesDifference != 0
  ) {
    let resStr = minutesDifference + ' dakika önce';
    return resStr;
  } else if (
    daysDifference == 0 &&
    hoursDifference == 0 &&
    minutesDifference == 0 &&
    secondsDifference != 0
  ) {
    let resStr = secondsDifference + ' saniye önce';
    return resStr;
  }
}

// Lane Formatter Func
export const LolLaneFormatter = arr => {
  const tempDoc = [];

  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '0':
        tempDoc.push('Doldur');
        break;
      case '1':
        tempDoc.push('Destek');
        break;
      case '2':
        tempDoc.push('Nişancı');
        break;
      case '3':
        tempDoc.push('Orta');
        break;
      case '4':
        tempDoc.push('Ormancı');
        break;
      case '5':
        tempDoc.push('Üst');
        break;
    }
  }

  return tempDoc;
};
