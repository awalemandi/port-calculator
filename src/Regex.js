export const rangeSeparatorRegex = / to /gim;
export const portsSeparatorRegex = /-/gim;

export const portRangeRegex = /([0-9]+-[0-9]+)$/i;

//fucntion to return array of A and Z sides from a range(string)
export const getSides = (regex, range) => {
  if (regex.test(range)) {
    return range.split(regex);
  } else {
    console.log(`Range template invalid!`);
    return;
  }
};

//for patch panel, replace portRange with '' in
export const getPatchpanel = (regex, side) => {
  if (!regex.test(side)) {
    console.log('side template not matched!');
    return;
  };
  return side.replace(regex, '');
}

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
