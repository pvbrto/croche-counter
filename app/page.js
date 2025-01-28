"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [pontos, setPontos] = useState(0);
  const [carreira, setCarreira] = useState(0);
  const [history, setHistory] = useState([]);
  const [pontosCarreira, setPontosCarreira] = useState(0);
  const [autoIncrementar, setAutoIncrementar] = useState(false);

  useEffect(() => {
    const storedPontos = parseInt(localStorage.getItem("pontos"), 10);
    const storedCarreira = parseInt(localStorage.getItem("carreira"), 10);
    const storedPontosCarreira = parseInt(localStorage.getItem("pontosCarreira"), 10);
    const storedAutoIncrementar = localStorage.getItem("autoIncrementar") === "true";
  
    setPontos(!isNaN(storedPontos) ? storedPontos : 0);
    setCarreira(!isNaN(storedCarreira) ? storedCarreira : 0);
    setPontosCarreira(!isNaN(storedPontosCarreira) ? storedPontosCarreira : 0);
    setAutoIncrementar(storedAutoIncrementar);
  
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        pontos: !isNaN(storedPontos) ? storedPontos : 0,
        carreira: !isNaN(storedCarreira) ? storedCarreira : 0,
      },
    ]);
  }, []);

  useEffect(() => {
    console.log("History", history);
  }, [history]);
  
  const incrementarPontos = () => {
    const novoPontos = pontos + 1;
  
    setPontos(novoPontos);
    localStorage.setItem("pontos", novoPontos);
  
    if (pontosCarreira !== 0 && autoIncrementar && novoPontos >= pontosCarreira) {
      incrementarCarreira();
      return;
    }
  
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        pontos: novoPontos,
        carreira,
      },
    ]);
  };

  const incrementarCarreira = () => {
    if (pontos !== 0) {
      setPontos(0);
      localStorage.setItem("pontos", 0);
    }
  
    const novaCarreira = carreira + 1;
    setCarreira(novaCarreira);
    localStorage.setItem("carreira", novaCarreira);
  
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        pontos: 0,
        carreira: novaCarreira,
      },
    ]);
  };

  const zerar = () => {
    setPontos(0);
    localStorage.setItem("pontos", 0);
    setCarreira(0);
    localStorage.setItem("carreira", 0);
  
  };
  
  const editarValores = () => {
    let pontos = parseInt(prompt("Digite o valor dos pontos"), 10);
    let carreira = parseInt(prompt("Digite o valor da carreira"), 10);
  
    pontos = !isNaN(pontos) ? pontos : 0;
    carreira = !isNaN(carreira) ? carreira : 0;
  
    setPontos(pontos);
    localStorage.setItem("pontos", pontos);
    setCarreira(carreira);
    localStorage.setItem("carreira", carreira);
  
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        pontos,
        carreira,
      },
    ]);
  };
  
  const voltar = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length <= 1) return prevHistory;
  
      const lastState = prevHistory[prevHistory.length - 2];
      if (lastState) {
        setPontos(lastState.pontos);
        setCarreira(lastState.carreira);
        localStorage.setItem("pontos", lastState.pontos);
        localStorage.setItem("carreira", lastState.carreira);
      }
  
      return prevHistory.slice(0, -1);
    });
  };

  return (
    <div className="bg-[#EEEEEE] w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-[#D4BEE4] w-5/6 h-32 flex flex-col justify-center items-center rounded-lg">
        <div className="flex flex-row justify-center items-center mb-4">
          <input type="number" className="w-12 h-12 rounded-lg mr-4" value={pontosCarreira} onChange={(e) => {
  const value = parseInt(e.target.value, 10) || 0; // Parse to a number, fallback to 0
  setPontosCarreira(value);
  localStorage.setItem("pontosCarreira", value);
}} />
          <p className="text-md text-[#3B1E54]">Pontos por carreira</p>
        </div>

        <div className="flex flex-row justify-center items-center">
          <input type="checkbox" className="mr-4" checked={autoIncrementar} onChange={() => {setAutoIncrementar(!autoIncrementar), localStorage.setItem("autoIncrementar", !autoIncrementar);}} />
          <p className="text-md text-[#3B1E54]">
            Auto-incrementar carreira ao completar pontos
          </p>
        </div>
      </div>

      <div className="flex flex-row w-full justify-evenly items-center mt-12">
        <div
          className="bg-[#D4BEE4] w-40 h-24 cursor-pointer text-white flex flex-col justify-center items-center border-2 border-[#9B7EBD] font-bold py-2 px-4 rounded-md mt-4"
          onClick={incrementarPontos}
        >
          <p className="text-2xl text-[#3B1E54] font-thin">{pontos}</p>
          <p className="text-2xl text-[#3B1E54] font-thin">Pontos</p>
        </div>

        <div
          className="bg-[#D4BEE4] w-40 h-24 text-white cursor-pointer flex flex-col justify-center items-center border-2 border-[#9B7EBD] font-bold py-2 px-4 rounded-md mt-4"
          onClick={incrementarCarreira}
        >
          <p className="text-2xl text-[#3B1E54] font-thin">{carreira}</p>
          <p className="text-2xl text-[#3B1E54] font-thin">Carreiras</p>
        </div>
      </div>

      <div className="flex flex-row w-full justify-evenly items-center mt-12">
        <div className="bg-[#D4BEE4] w-40 h-12 cursor-pointer text-white flex flex-col justify-center items-center border-2 border-[#9B7EBD] font-bold py-2 px-4 rounded-md mt-4"
          onClick={voltar}>
          <p className="text-2xl text-[#3B1E54] font-thin">Voltar</p>
        </div>

        <div className="bg-[#D4BEE4] w-40 h-12 text-white cursor-pointer flex flex-col justify-center items-center border-2 border-[#9B7EBD] font-bold py-2 px-4 rounded-md mt-4"
          onClick={zerar}>
          <p className="text-2xl text-[#3B1E54] font-thin">Zerar</p>
        </div>
      </div>

      <div className="flex flex-row w-full justify-evenly items-center mt-12">
        <div className="bg-[#D4BEE4] w-60 h-12 text-white cursor-pointer flex flex-col justify-center items-center border-2 border-[#9B7EBD] font-bold py-2 px-4 rounded-md mt-4"
          onClick={editarValores}>
          <p className="text-2xl text-[#3B1E54] font-thin">Editar Valores</p>
        </div>
      </div>
    </div>
  );
}
