import React from "react";
import { Link } from "react-router-dom";
import { PokemonDetail } from "./PokemonDetail";

export const Card = ({ name, sprite, types, types_color, id, onClick }) => {
  const handleSelect = () => {
    onClick(id);
  };
  return (
    <div
      onClick={handleSelect}
      className="bg-white text-black rounded-md w-56 cursor-pointer hover:scale-105 duration-100 p-6 h-fit"
    >
      <img src={sprite} alt="image" className="w-full" />
      <p className="text-center text-2xl">{name}</p>
      <div className="grid grid-cols-2 gap-5 mt-2">
        {types.map((type) => (
          <p
            className={`${
              types_color[type.type.name]
            } text-black w-fit px-2 rounded-lg`}
            key={type.slot}
          >
            {type.type.name}
          </p>
        ))}
      </div>
    </div>
  );
};
