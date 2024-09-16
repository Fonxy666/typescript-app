import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { ISettings } from "../interfaces/ISettings";
import { ITheme } from "../interfaces/ITheme";
import { IFontSize } from "../interfaces/IFontSize";
import { IAnimationSpeed } from "../interfaces/IAnimationSpeed";

export const Settings: React.FC = () => {
    const [theme, setTheme] = useState<string>("light");
    const [primaryColour, setPrimaryColour] = useState<number>(0);
    const [fontSize, setFontSize] = useState<number>(1);
    const [animationSpeed, setAnimationSpeed] = useState<number>(1);
    const [settings, setSettings] = useState<ISettings>({
        "--background-color": "#fff",
        "--background-light": "#fff",
        "--primary-color": "rgb(255, 0, 86)",
        "--shadow-color": "rgba(0,0,0,0.2)",
        "--text-color": "#0A0A0A",
        "--text-light": "#575757",
        "--font-size": "16px",
        "--animation-speed": 1
    });
    
    useEffect(() => {
        const root: HTMLElement = document.documentElement;
        for (let key in settings) {
            if (settings.hasOwnProperty(key)) {
                root.style.setProperty(key, settings[key as keyof ITheme]);
            }
        }
    }, [settings]);
    
    const themes: ITheme[] = [
        {
            "--background-color": "#fff",
            "--background-light": "#fff",
            "--shadow-color": "rgba(0,0,0,0.2)",
            "--text-color": "#0A0A0A",
            "--text-light": "#575757"
        },
        {
            "--background-color": "rgb(29, 29, 29)",
            "--background-light": "rgb(77, 77, 77)",
            "--shadow-color": "rgba(0,0,0,0.2)",
            "--text-color": "#ffffff",
            "--text-light": "#eceaea",
        }
    ];

    const primaryColours: string[] = [
        "rgb(255, 0, 86",
        "rgb(33, 150, 243",
        "rgb(255, 193, 7",
        "rgb(0, 200, 83",
        "rgb(156, 39, 176"
    ];

    const fontSizes: IFontSize[] = [
        {
            title: "Small",
            value: "12px"
        },
        {
            title: "Medium",
            value: "16px"
        },
        {
            title: "Large",
            value: "20px"
        }
    ];

    const animationSpeeds: IAnimationSpeed[] = [
        {
              title: "Slow",
              value: 2
        },
        {
              title: "Medium",
              value: 1
        },
        {
              title: "Fast",
              value: .5
        }
    ];

    const changeTheme = (i: number) => {
        const _theme: ITheme = {...themes[i]};
        setTheme(() => {
            return i === 0? "light" : "dark";
        });

        let _settings:ISettings = {...settings};
        for (let key in _theme) {
            const typedKey = key as keyof ITheme;
            _settings[typedKey] = _theme[typedKey];
        };

        setSettings(() => {
            return _settings;
        });
    };

    const changeColor = (i: number) => {
        const _color = primaryColours[i];
        let _settings = {...settings};
        _settings["--primary-color"] = _color;
        setPrimaryColour(() => {
            return i;
        })
        setSettings(() => {
            return _settings;
        })
    };

    const changeFontSize = (i: number) => {
        const _size : IFontSize = fontSizes[i];
        let _settings = {...settings};
        _settings["--font-size"] = _size.value;
        setFontSize(() => {
            return i;
        });
        setSettings(() => {
            return _settings;
        });
    };

    const changeAnimationSpeed = (i: number) => {
        const _speed: IAnimationSpeed = animationSpeeds[i];
        let _settings = {...settings};
        _settings["--animation-speed"] = _speed.value;
        setAnimationSpeed(() => {
            return i;
        });
        setSettings(() => {
            return _settings;
        });
    };

    return (
        <div className="container settings-container">
            <div className="section d-block">
                <h2>Preferred theme</h2>
                <div className="options-container">
                    <div className="option light" onClick={() => changeTheme(0)}>
                        { theme === "light" && (
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                    </div>
                    <div className="option dark" onClick={() => changeTheme(1)}>
                        { theme === "dark" && (
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="section d-block">
                <h2>Preferred colour</h2>
                <div className="options-container">
                    {  primaryColours.map((colour, index) => (
                        <div key={index} className="option light" style={{backgroundColor: colour}} onClick={() => changeColor(index)}>
                            { primaryColour === index && (
                                <div className="check">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="section d-block">
                <h2>Font size</h2>
                <div className="options-container">
                    {  fontSizes.map((size, index) => (
                        <button key={index} className="btn" onClick={() => (changeFontSize(index))}>
                            {size.title}
                            { fontSize === index && 
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                            }
                        </button>
                    ))}
                </div>
            </div>
            <div className="section d-block">
                <h2>Animation speed</h2>
                <div className="options-container">
                    { animationSpeeds.map((speed, index) => (
                        <button key={index} className="btn" onClick={() => changeAnimationSpeed(index)}>
                            {speed.title}
                            { animationSpeed === index && <span><FontAwesomeIcon icon={faCheck} /></span> }
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
