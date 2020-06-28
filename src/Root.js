import React, { useContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "./theme";
import "./styles.css";
const ThemeContext = React.createContext();
const FontContext = React.createContext();
function ThemeButton() {
  const theme = useContext(ThemeContext);
  const font = useContext(FontContext);
  const [text, setText] = useState("");
  useEffect(() => {
    setText(theme.name);
    console.log("useEffect has called");
  }, [theme]);
  return (
    <>
      <br />
      Selected Theme : {text}
      <br />
      <input
        style={{ background: theme.background, fontStyle: font }}
        type="button"
        value="Context button"
      />
    </>
  );
}
function Container() {
  const [fontStyle, setFontStyle] = useState("normal");
  return (
    <FontContext.Provider value={fontStyle}>
      <div>
        <label for="normal">Normal Font</label>
        <input
          type="radio"
          onChange={() => {
            setFontStyle("normal");
          }}
          name="fontStyle"
          checked={fontStyle == "normal"}
        />
        <label for="normal">Italic Font</label>
        <input
          type="radio"
          onChange={() => {
            setFontStyle("italic");
          }}
          name="fontStyle"
          checked={fontStyle == "italic"}
        />
      </div>
      <ThemeButton />
    </FontContext.Provider>
  );
}
export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTheme: lightTheme,
      fontStyle: "normal"
    };
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state.selectedTheme}>
        <h1>Context Learning</h1>
        <div>
          <label for="light">Light Theme</label>
          <input
            type="radio"
            onChange={() => {
              this.setState({ selectedTheme: lightTheme });
            }}
            name="theme"
            checked={this.state.selectedTheme == lightTheme}
          />
          <label for="light">Dark Theme</label>
          <input
            type="radio"
            onChange={() => {
              this.setState({ selectedTheme: darkTheme });
            }}
            name="theme"
            checked={this.state.selectedTheme == darkTheme}
          />
        </div>
        <Container />
      </ThemeContext.Provider>
    );
  }
}
