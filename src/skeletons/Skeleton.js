import React from "react";
import "./Skeleton.css";
import { motion } from "framer-motion";

export const Skeleton = ({ type, onClose }) => {
  return (
    <div className="bg-white text-black rounded-lg w-full mx-4  p-4 flex flex-col justify-center items-center">
      <div className="relative w-48 h-48 rounded-full bg-gray-300">
        <motion.div
          className="absolute top-0 left-0 w-48 h-48 rounded-full bg-slate-100 bg-opacity-50"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            backgroundPosition: "100% 50%",
          }}
          animate={{ backgroundPosition: "0% 50%" }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        ></motion.div>
      </div>

      <div className="w-full flex justify-between p-4">
        <div className="mr-4 flex flex-col gap-4">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <p
              key={n}
              className="bg-gray-300 px-12 rounded-lg w-48 h-4 relative"
            >
              <motion.p
                className="absolute top-0 left-0 h-full w-full -skew-x-12 bg-slate-100 bg-opacity-50"
                style={{
                  background:
                    "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "100% 50%",
                }}
                animate={{ backgroundPosition: "0% 50%" }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              ></motion.p>
            </p>
          ))}
        </div>
        <div className="w-[70%] flex flex-col gap-4">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="relative rounded-full bg-gray-300 h-4">
              <motion.p
                className="absolute top-0 left-0 h-full w-full -skew-x-12 bg-slate-100 bg-opacity-50"
                style={{
                  background:
                    "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "100% 50%",
                }}
                animate={{ backgroundPosition: "0% 50%" }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              ></motion.p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-4 bg-amber-400 rounded-full hover:scale-105 duration-100 px-4 py-2"
      >
        Close
      </button>
    </div>
  );
};
