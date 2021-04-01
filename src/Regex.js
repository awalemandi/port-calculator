export const rangeSeparatorRegex = / to /gim;

//fucntion to return array of A and Z sides from a range(string)
const getSides = (regex, range) => {
  if (regex.test(range)) {
    let sidesArray = range.split(regex);
    return sidesArray;
  } else {
    console.log(`Range template invalid!`);
    return;
  }
};

export const portRangeRegex = /([0-9]+-[0-9]+)$/i;

//for patch panel, replace portRange with '' in

//function to return the regex match as string
export const getRegexMatch = (regex, inputString) => {
  if (regex.test(inputString)) {
    let matchArray = inputString.match(regex);
    return matchArray[0];
  } else {
    console.log(`No regex match found!`);
    return;
  }
};

//function to get A and Z sides
export const getAside = range => {
  //return A side
};
export const getZside = range => {
  //return Z side
};
