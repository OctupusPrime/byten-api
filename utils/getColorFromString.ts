const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "magenta",
  "cyan",
  "orange",
  "purple",
  "dark-green",
  "navy",
];

const getColorFromString = (str: string) => {
  const numericValue = str
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Calculate an index based on the numeric value
  const index = numericValue % colors.length;

  return colors[index];
};

export default getColorFromString;
