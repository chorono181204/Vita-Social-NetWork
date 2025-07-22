// capitalize first letter
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// capitalize first letter of each word
export const capitalizeEachWord = (str: string) => {
  return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
};

// capitalize first letter of each word