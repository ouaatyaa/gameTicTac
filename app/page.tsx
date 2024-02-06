"use client";

import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import Confetti from "react-confetti";

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
  const [winner, setWinner] = useState(false);

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
      setWinner(true);
      toast.success("Player 2 wins!");
      //alert("Player 2 wins!");
      setTimeout(function () {
        window.location.reload();
      }, 4000);
    }
    if (win === "X") {
      setWinner(true);
      toast.success("Player 1 wins!");
      //alert("Player 1 wins!");
      setTimeout(function () {
        window.location.reload();
      }, 4000);
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
    <main className="  w-full  flex md:min-h-screen  flex-col items-center md:justify-between py-8">
      {winner && <Confetti />}
      <div className=" w-[280px] grid grid-cols-3 gap-2 border shadow-xl p-4">
        {lists.map((list, i) => (
          <div
            key={i}
            onClick={() => handleSquare(i)}
            className={clsx(
              "w-20 h-20 text-3xl cursor-pointer rounded-lg border font-bold bg-muted flex justify-center items-center",
              list.title === "X" ? " text-red-500" : " text-green-500"
            )}
          >
            {list.title}
          </div>
        ))}
      </div>
      <div className=" flex flex-col  justify-center   items-center w-full p-4 ">
        <h1 className={player === "Player1" ? "text-red-500" : "text-black"}>
          Player1 :{" "}
          <span className="font-bold text-muted-foreground">{countP1}</span>
        </h1>
        <h1 className={player === "Player2" ? "text-green-500" : "text-black"}>
          Player2 :{" "}
          <span className=" font-bold text-muted-foreground">{countP2}</span>
        </h1>
      </div>
    </main>
  );
}
