const audioData = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    key: "q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    key: "w",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    key: "e",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    key: "a",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    key: "s",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    key: "d",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    key: "z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    key: "x",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    key: "c",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  const [sequence, setSequence] = React.useState("");
  const [volume, setVolume] = React.useState(0.5);
  let chain = sequence.split(" ");

  function changeVolume(e) {
    setVolume(e.target.value);
  }

  function onPlays() {
    let index = 0;
    setInterval(() => {
      const x = document.getElementById(chain[index]);
      x.currenttime = 0;
      x.volume = volume;
      x.play();
      index++;
    }, 200);
  }

  function onClears(){
      setSequence("");
  }

  function backspace(){
      setSequence((prev)=>prev.slice(0,-2));
  }

  return (
    <div id="drum-machine" className="border border-danger text-center">
      <div className="pad-key">
      {audioData.map((e) => {
        return (
          <Pad key={e.id} keyS={e} volume={volume} setSequence={setSequence} />
        );
      })}
      </div>
      <br />
      <div className="volume-wrap">
        <h4>Volume</h4>
        <input
          type="range"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          max="1"
          min="0.01"
        />
      </div>
      <div className="sequence-wrap">
        <h4>Sequence:</h4>
        <span className="">{sequence}</span> <br />
        <button className="btn btn-success m-1" onClick={onPlays}>
          Play
        </button>
        <button className="btn btn-warning" onClick={backspace}>
          <i className="fas fa-backspace"></i>
        </button>
        <button className="btn btn-danger m-1" onClick={onClears}>
          Clear
        </button>
      </div>
    </div>
  );
}

function Pad({ keyS, volume, setSequence }) {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const handleKeyPress = (e) => {
    if (e.key === keyS.key) {
      playSound();
    }
  };

  function playSound() {
    const x = document.getElementById(keyS.keyTrigger);
    x.currenttime = 0;
    x.volume = volume;
    x.play();
    setActive(true);
    setTimeout(() => setActive(false), 200);
    setSequence((prev) => prev + keyS.keyTrigger + " ");
  }

  return (
    <div
      onClick={playSound}
      className={`btn p-3 m-4 ${active ? "btn-primary" : "btn-secondary"}`}
    >
      <audio className="drum-pad" id={keyS.keyTrigger} src={keyS.url} />
      {keyS.keyTrigger}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
