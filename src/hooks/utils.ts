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
  day1: [1, 2],
  day2: [1, 3],
  day3: [1, 2],
  day4: [1, 4],
  day5: [1, 2],
  day6: [1, 3],
  day7: [1, 2],
};
