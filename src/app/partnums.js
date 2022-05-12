export function getMilitaryPartNum(opts) {
  const {shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender} = opts;

  let partNum = "D38999/";

  switch (shellStyle) {
    case 'straight-plug':
      partNum += '26';
      break;
    case 'jam-nut-receptacle':
      partNum += '24';
      break;
    case 'wall-mount-receptacle':
      partNum += '20';
      break;
    default:
      console.error("Invalid shell style.");
      break;
  }

  switch (shellFinish) {
    case 'any':
      partNum += '*';
      break;
    case 'electroless-nickel':
      partNum += 'F';
      break;
    case 'olive-drab-cadmium':
      partNum += 'W';
      break;
    case 'durmalon':
      partNum += 'T';
      break;
    case 'zinc-nickel':
      partNum += 'Z';
      break;
    default:
      console.error("Invalid shell finish.");
      break;
  }

  switch (shellSize) {
    case 9:
      partNum += 'A';
      break;
    case 11:
      partNum += 'B';
      break;
    case 13:
      partNum += 'C';
      break;
    case 15:
      partNum += 'D';
      break;
    case 17:
      partNum += 'E';
      break;
    case 19:
      partNum += 'F';
      break;
    case 21:
      partNum += 'G';
      break;
    case 23:
      partNum += 'H';
      break;
    case 25:
      partNum += 'J';
      break;
    default:
      console.error("Invalid shell size.");
      break;
  }

  partNum += String(insertArrangement);
  partNum += gender.toUpperCase();
  partNum += keyArrangement.toUpperCase();

  return partNum;
}

export function getCommercialPartNum(opts) {
  const {shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender} = opts;

  let partNum = "";

  switch (shellStyle) {
    case 'straight-plug':
      partNum += 'TV06';
      break;
    case 'jam-nut-receptacle':
      partNum += 'TV07';
      break;
    case 'wall-mount-receptacle':
      partNum += 'TVP00';
      break;
    default:
      console.error("Invalid shell style.");
      break;
  }

  switch (shellFinish) {
    case 'any':
      partNum += '**';
      break;
    case 'electroless-nickel':
      partNum += 'RF';
      break;
    case 'olive-drab-cadmium':
      partNum += 'RW';
      break;
    case 'durmalon':
      partNum += 'DT';
      break;
    case 'zinc-nickel':
      partNum += 'DZ';
      break;
    default:
      console.error("Invalid shell finish.");
      break;
  }

  partNum += '-';
  partNum += String(shellSize);
  partNum += '-';
  partNum += String(insertArrangement);
  partNum += gender.toUpperCase();
  partNum += (keyArrangement !== 'n') ? keyArrangement.toUpperCase() : '';

  return partNum;
}

export function getPartNums(opts) {
  const {militaryType, commercialType, shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender} = opts;

  const partNums = [];
  const rows = [];
  let finishes = [];

  if (shellFinish === 'any') {
    finishes = ['electroless-nickel', 'olive-drab-cadmium', 'durmalon', 'zinc-nickel'];
  } else {
    finishes = [shellFinish];
  }

  if (militaryType) {
    finishes.forEach(finish => {
      const partNum = getMilitaryPartNum({shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish: finish, gender})
      partNums.push(partNum);
      partNums.push(partNum + "-LC");
    });
  }

  if (commercialType) {
    finishes.forEach(finish => {
      const partNum = getCommercialPartNum({shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish: finish, gender})
      partNums.push(partNum);
      partNums.push(partNum + "-LC");
    });
  }

  partNums.forEach(function (partNum, i) {
    rows.push({id: i, partNum: partNum, mfgr: 'placeholder', qty: 0, price: 0.00, vendor: 'placeholder'});
  });

  return rows;
}