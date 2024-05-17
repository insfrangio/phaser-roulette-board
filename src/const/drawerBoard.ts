const generateRow = (start: number, end: number) => {
  const row = [];

  for (let i = start; i <= end; i++) {
    row.push({
      label: i.toString(),
      value: i,
    });
  }

  return row;
};

const firstRow = generateRow(0, 11);

const secondRow = [
  {
    label: "3",
    value: 3,
  },
  {
    label: "6",
    value: 6,
  },
  {
    label: "9",
    value: 9,
  },
  {
    label: "12",
    value: 12,
  },
  {
    label: "15",
    value: 15,
  },
  {
    label: "18",
    value: 18,
  },
  {
    label: "21",
    value: 21,
  },
  {
    label: "24",
    value: 24,
  },
  {
    label: "27",
    value: 27,
  },
  {
    label: "30",
    value: 30,
  },
  {
    label: "33",
    value: 33,
  },
  {
    label: "36",
    value: 36,
  },
];

// const rows = [firstRow];

const A = [
  {
    label: "0",
    value: 0,
  },
];
const BA = [firstRow, secondRow];
const BB = generateRow(13, 24);
const BC = generateRow(25, 36);

const B = [BA, BB, BC];
const C = [
  {
    label: "X",
    value: 11,
  },
];

const mainColBRows = [
  {
    label: "BA",
    value: 0,
    height: 254,
    y: 0,
    x: 0,
  },
  {
    label: "BB",
    value: 1,
    height: 50,
    y: 254,
    x: 10,
    col: [
      { label: "BBA", value: 0, height: 254, y: 0 },
      { label: "BBC", value: 0, height: 254, y: 0 },
      { label: "BBD", value: 0, height: 254, y: 0 },
    ],
  },
  { label: "BC", value: 2, height: 64, y: 50 + 254, x: 10 },
];

const mainColCRows = [
  { label: "CA", value: 0, height: 82, y: 0 },
  { label: "CB", value: 1, height: 82, y: 82 },
  { label: "CC", value: 2, height: 82, y: 82 + 82 },
];

const mainCols = [
  {
    label: "A",
    type: "triangle",
    width: 58,
    height: 246,
    x: 0,
  },
  {
    label: "B",
    col: mainColBRows,
    type: "rectangle",
    width: 962,
    height: 369,
    x: 58,
  },
  {
    label: "C",
    col: mainColCRows,
    type: "verticalRectangle",
    width: 72,
    height: 246,
    x: 58 + 962,
  },
];

export const drawerBoard = mainCols;
