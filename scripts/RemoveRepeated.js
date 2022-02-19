export default function RemoveRepeated(array) {
  return array.reduce((acc, item) => {
    if (acc.find((i) => i === item)) {
      return acc;
    }

    acc.push(item);
    return acc;
  }, []);
}
