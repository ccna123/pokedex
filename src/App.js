import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { PokemonDetail } from "./components/PokemonDetail";

const TYPES_COLOR = {
  water: "bg-blue-600",
  fire: "bg-blue-600",
  bug: "bg-lime-400",
  poison: "bg-fuchsia-600",
  grass: "bg-green-600",
  flying: "bg-amber-200",
  normal: "bg-neutral-500",
  fairy: "bg-purple-400",
  ground: "bg-yellow-600",
  electric: "bg-yellow-400",
  fighting: "bg-slate-500",
  rock: "bg-stone-500",
  psychic: "bg-pink-600",
  ghost: "bg-indigo-600",
  ice: "bg-sky-500",
  steel: "bg-zinc-600",
  dragon: "bg-orange-500",
};

function App() {
  return (
    <div className="App bg-slate-800 min-h-max w-full text-white font-mono">
      <Main />
    </div>
  );
}

export default App;
