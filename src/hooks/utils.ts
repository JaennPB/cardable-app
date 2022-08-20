export function useItemSeparator(
  index: number,
  width: number,
  arrayLength: number
) {
  const marginX = width * 0.15;
  const marginBetween = width * 0.1;

  if (index === 0) {
    return { marginLeft: marginX };
  }

  if (index === arrayLength - 1) {
    return { marginRight: marginX, marginLeft: marginBetween };
  }

  if (index > 0 && index < arrayLength - 1) {
    return { marginLeft: marginBetween };
  }
}

export const LEITNER_SCHEDULE = {
  "1": [1, 2],
  "2": [1, 3],
  "3": [1, 2],
  "4": [1, 4],
  "5": [1, 2],
  "6": [1, 3],
  "7": [1, 2],
  "8": [1],
  "9": [1, 2],
  "10": [1, 3],
  "11": [1, 2],
  "12": [1, 5],
  "13": [1, 2, 4],
  "14": [1, 3],
  "15": [1, 2],
  "16": [1],
  "17": [1, 2],
  "18": [1, 3],
  "19": [1, 2],
  "20": [1, 4],
};
