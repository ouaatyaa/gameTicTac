"use client";

import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";

type ListType = {
  ichecked: boolean;
  title: string;
  id: number;
};

const lists: ListType[] = [
  {
    ichecked: false,
    title: "",
    id: 1,
  },
  {
    ichecked: false,
    title: "",
    id: 2,
  },
  {
    ichecked: false,
    title: "",
    id: 3,
  },
  {
    ichecked: false,
    title: "",
    id: 4,
  },
  {
    ichecked: false,
    title: "",
    id: 5,
  },
  {
    ichecked: false,
    title: "",
    id: 6,
  },
  {
    ichecked: false,
    title: "",
    id: 7,
  },
  {
    ichecked: false,
    title: "",
    id: 8,
  },
  {
    ichecked: false,
    title: "",
    id: 9,
  },
];

export default function Home() {
  const [player, setPlayer] = useState("Player1");
  const initialBoard = Array(9).fill(null);
  const [data, setData] = useState(lists);
  const [countP1, setCountP1] = useState(0);
  const [countP2, setCountP2] = useState(0);
  const [board, setBoard] = useState(Array(9).fill(null));

  const handleSquare = (i: number) => {
    if (!lists[i].ichecked) {
      if (player === "Player1") {
        setData((prev) => {
          return {
            ...prev,
            ...(lists[i] = { id: i, title: "X", ichecked: true }),
          };
        });
        setPlayer("Player2");
        setCountP1((priv) => {
          return priv + 1;
        });
        newBoard[i] = "X";
        setBoard(newBoard);
      } else if (player === "Player2") {
        setData((prev) => {
          return {
            ...prev,
            ...(lists[i] = { id: i, title: "O", ichecked: true }),
          };
        });
        setPlayer("Player1");
        setCountP2((priv) => {
          return priv + 1;
        });
        newBoard[i] = "O";
        setBoard(newBoard);
      }
    }
    // check for winner
    const win = calculateWinner(newBoard);

    if (win === "O") {
      toast.success("Player 2 wins!");
      //alert("Player 2 wins!");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
    if (win === "X") {
      toast.success("Player 1 wins!");
      //alert("Player 1 wins!");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }

    if (!win && countP1 + countP2 >= 8) {
      toast.info("No One wins!");
      //alert("Player 1 wins!");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
  };

  const newBoard = [...board];

  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <main className="flex min-h-screen min-w-60 flex-col items-center justify-between p-24">
      <div className=" grid grid-cols-3 gap-2 border shadow-xl p-2">
        {lists.map((list, i) => (
          <div
            key={i}
            onClick={() => handleSquare(i)}
            className={clsx(
              "w-10 h-10 md:w-20 md:h-20 cursor-pointer rounded-lg border font-bold bg-muted flex justify-center items-center",
              list.title === "X" ? " text-red-500" : " text-green-500"
            )}
          >
            {list.title}
          </div>
        ))}
      </div>
      <div className=" flex justify-center md:justify-between items-center w-full p-4 ">
        <h1>Player1 :{countP1}</h1>
        <h1>Player2 :{countP2}</h1>
      </div>
    </main>
  );
}
