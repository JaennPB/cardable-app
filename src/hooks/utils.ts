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
