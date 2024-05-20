import { BoardContainer } from "../types";

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
    height: 246,
    y: 0,
    x: 0,
    col: [
      {
        label: "BAA",
        value: 0,
        height: 0,
        y: 0,
        row: [
          {
            label: "BAAA",
            value: 0,
            height: 71,
            y: 0,
            col: [
              {
                label: "1",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "2",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "3",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "4",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "5",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "6",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "7",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "8",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "9",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "10",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "11",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "12",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "13",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "14",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "15",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "16",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "17",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "18",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "19",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "20",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "21",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "22",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "23",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "24",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
            ],
          },
          {
            label: "BAAB",
            value: 0,
            y: 0,
            col: [
              {
                label: "1",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "2",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "3",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "4",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "5",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "6",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "7",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "8",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "9",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "10",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "11",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "12",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "13",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "14",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "15",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "16",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "17",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "18",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "19",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "20",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "21",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "22",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "23",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "24",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
            ],
          },
          {
            label: "BAAC",
            value: 0,
            y: 0,
            col: [
              {
                label: "1",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "2",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "3",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "4",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "5",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "6",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "7",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "8",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "9",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "10",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "11",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "12",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "13",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "14",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "15",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "16",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "17",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "18",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "19",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "20",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "21",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "22",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
              {
                label: "23",
                value: 0,
                width: 20,
                height: 254,
                y: 0,
              },
              {
                label: "24",
                value: 0,
                width: 60,
                height: 254,
                y: 0,
              },
            ],
          },
          {
            label: "BAAD",
            value: 0,
            y: 0,
            col: [
              {
                label: "BAADA",
                value: 0,
                height: 254,
                y: 0,
              },
            ],
          },
          {
            label: "BAAE",
            value: 0,
            y: 0,
            col: [
              {
                label: "BAAEA",
                value: 0,
                height: 254,
                y: 0,
              },
            ],
          },
          {
            label: "BAAF",
            value: 0,
            y: 0,
            col: [
              {
                label: "BAAFA",
                value: 0,
                height: 254,
                y: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "BB",
    value: 1,
    height: 51,
    width: 942,
    y: 246,
    x: 10,
    col: [
      { label: "BBA", value: 0, height: 254, y: 0 },
      { label: "BBB", value: 0, height: 254, y: 0 },
      { label: "BBC", value: 0, height: 254, y: 0 },
    ],
  },
  {
    label: "BC",
    value: 2,
    height: 64,
    width: 942,
    y: 51 + 246,
    x: 10,
    col: [
      { label: "BCA", value: 0, height: 254, y: 0 },
      { label: "BCB", value: 0, height: 254, y: 0 },
      { label: "BCC", value: 0, height: 254, y: 0 },
      { label: "BCD", value: 0, height: 254, y: 0 },
      { label: "BCE", value: 0, height: 254, y: 0 },
      { label: "BCF", value: 0, height: 254, y: 0 },
    ],
  },
];

const mainColCRows = [
  { label: "CA", value: 0, height: 82, y: 0, x: 0 },
  { label: "CB", value: 1, height: 82, y: 82, x: 0 },
  { label: "CC", value: 2, height: 82, y: 82 + 82, x: 0 },
];

const mainCols = [
  {
    label: "A",
    type: "triangle",
    width: 58,
    height: 240,
    x: 0,
  },
  {
    label: "B",
    row: mainColBRows,
    type: "rectangle",
    width: 962,
    x: 58,
  },
  {
    label: "C",
    row: mainColCRows,
    type: "verticalRectangle",
    width: 72,
    height: 240,
    x: 58 + 962,
  },
];

export const drawerBoard = mainCols;

//  label: string;
//  value: number;
//  height: number;
//  y: number;
//  x: number;
