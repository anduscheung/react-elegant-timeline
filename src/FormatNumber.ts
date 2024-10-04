export default function formatNumber(index: number): string {
  return index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
}
