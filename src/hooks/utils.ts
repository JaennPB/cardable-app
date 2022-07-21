const BOXES = ["Box 1", "Box 2", "Box 3", "Add box"];

export function useItemSeparator(index: number, width: number) {
  const marginX = width * 0.15;
  const marginBetween = width * 0.1;

  if (index === 0) {
    return { marginLeft: marginX };
  }

  if (index === BOXES.length - 1) {
    return { marginRight: marginX, marginLeft: marginBetween };
  }

  if (index > 0 && index < BOXES.length - 1) {
    return { marginLeft: marginBetween };
  }
}
