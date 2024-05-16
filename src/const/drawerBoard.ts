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

const cols = [
  {
    col: A,
    type: "triangle",
  },
  {
    col: B,
    type: "rectangle",
  },
  {
    col: C,
    type: "verticalRectangle",
  },
];

export const drawerBoard = cols;
