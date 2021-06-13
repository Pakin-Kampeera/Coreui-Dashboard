import React, { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

const WordClouds = () => {
  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
  };

  const canvas = useRef();
  const responsive = useRef(0);

  useEffect(() => {
    WordCloud(canvas.current, {
      list: [
        ["foo", 12],
        ["bar", 6],
      ],
      weightFactor: 5,
      fontFamily: "Times, serif",
      color: function (word, weight) {
        return weight === 12 ? "#f02222" : "#c09292";
      },
      rotateRatio: 0.5,
      rotationSteps: 2,
      backgroundColor: "#ffe0e0",
    });
  });

  return (
    <div style={styles} ref={responsive}>
      <canvas ref={canvas} weight={responsive.current.offsetWidth}></canvas>
    </div>
  );
};

export default WordClouds;
