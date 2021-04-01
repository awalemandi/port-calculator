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
