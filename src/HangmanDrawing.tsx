const HEAD = (
  <div
    style={{
      width: "33px",
      height: "33px",
      borderRadius: "50%",
      border: "5px solid white",
      position: "absolute",
      top: "25px",
      right: "-14px",
    }}
  />
);

const BODY = (
  <div
    style={{
      width: "5px",
      height: "50px",
      position: "absolute",
      top: "58px",
      right: 0,
      background: "white",
    }}
  />
);

const RIGHT_ARM = (
  <div
    style={{
      width: "50px",
      height: "5px",
      position: "absolute",
      top: "75px",
      right: "-50px",
      background: "white",
      rotate: "-30deg",
      transformOrigin: "left bottom",
    }}
  />
);

const LEFT_ARM = (
  <div
    style={{
      width: "50px",
      height: "5px",
      position: "absolute",
      top: "75px",
      right: "5px",
      background: "white",
      rotate: "30deg",
      transformOrigin: "right bottom",
    }}
  />
);

const RIGHT_LEG = (
  <div
    style={{
      width: "50px",
      height: "5px",
      position: "absolute",
      top: "102px",
      right: "-45px",
      background: "white",
      rotate: "60deg",
      transformOrigin: "left bottom",
    }}
  />
);

const LEFT_LEG = (
  <div
    style={{
      width: "50px",
      height: "5px",
      position: "absolute",
      top: "102px",
      right: 0,
      background: "white",
      rotate: "-60deg",
      transformOrigin: "right bottom",
    }}
  />
);

type HangManDrawingProps = {
  numberOfGuesses: number;
};
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];
const HangmanDrawing = ({ numberOfGuesses }: HangManDrawingProps) => {
  return (
    <div style={{ position: "relative" }}>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div
        style={{
          height: "25px",
          width: "5px",
          background: "white",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
      <div
        style={{
          height: "5px",
          width: "200px",
          background: "white",
          marginLeft: "120px",
        }}
      />
      <div
        style={{
          height: "200px",
          width: "5px",
          background: "white",
          marginLeft: "120px",
        }}
      />
      <div style={{ height: "5px", width: "250px", background: "white" }} />
    </div>
  );
};

export default HangmanDrawing;
