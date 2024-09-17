import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Recipes } from './pages/Recipes'
import { Settings } from './pages/Settings'
import TestPage from './pages/TestPage'
import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import { SignupPage } from './pages/SignupPage'
import { IAnimationSpeed } from './interfaces/IAnimationSpeed'
import { IFontSize } from './interfaces/IFontSize'
import { ITheme } from './interfaces/ITheme'
import { ISettings } from './interfaces/ISettings'

function App() {
    const defaultSettings = {
        "--background-color": "#fff",
        "--background-light": "#fff",
        "--primary-color": "rgb(255, 0, 86)",
        "--shadow-color": "rgba(0,0,0,0.2)",
        "--text-color": "#0A0A0A",
        "--text-light": "#575757",
        "--font-size": "16px",
        "--animation-speed": "1"
    };

    const [settings, setSettings] = useState<ISettings>(() => {
        const storedSettings = { ...defaultSettings };
        Object.keys(defaultSettings).forEach(key => {
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                storedSettings[key as keyof ISettings] = storedValue;
            }
        });
        return storedSettings;
    });
    const [theme, setTheme] = useState<string>(settings["--background-color"] === "#fff"? "light" : "dark");
    const primaryColours: string[] = [
        "rgb(255, 0, 86)",
        "rgb(33, 150, 243)",
        "rgb(255, 193, 7)",
        "rgb(0, 200, 83)",
        "rgb(156, 39, 176)"
    ];
    const [primaryColour, setPrimaryColour] = useState<number>(primaryColours.indexOf(settings["--primary-color"]));
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
    const initialFontSizeIndex = fontSizes.findIndex(size => size.value === settings["--font-size"]);
    const [fontSize, setFontSize] = useState<number>(initialFontSizeIndex !== -1 ? initialFontSizeIndex : 1);
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
    const initialAnimationSpeed = animationSpeeds.findIndex(speed => speed.value === Number(settings["--animation-speed"]));
    const [animationSpeed, setAnimationSpeed] = useState<number>(initialAnimationSpeed !== -1 ? initialAnimationSpeed : 1);
    
    useEffect(() => {
        const root: HTMLElement = document.documentElement;
        
        Object.keys(settings).forEach(key => {
            root.style.setProperty(key, settings[key as keyof ISettings]);
        });
        
        Object.keys(settings).forEach(key => {
            localStorage.setItem(key, settings[key as keyof ISettings]);
        });
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
        _settings["--animation-speed"] = _speed.value.toString();
        setAnimationSpeed(() => {
            return i;
        });
        setSettings(() => {
            return _settings;
        });
    };
    
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { path: "/", element: <HomePage /> },
                { path: "/recipes", element: <Recipes /> },
                { path: "/settings", element: <Settings
                    theme={theme}
                    primaryColour={primaryColour}
                    fontSize={fontSize}
                    animationSpeed={animationSpeed}
                    primaryColours={primaryColours}
                    fontSizes={fontSizes}
                    animationSpeeds={animationSpeeds}
                    changeTheme={changeTheme}
                    changeColor={changeColor}
                    changeFontSize={changeFontSize}
                    changeAnimationSpeed={changeAnimationSpeed}
                /> },
                { path: "/test", element: <TestPage /> },
                { path: "signup", element : <SignupPage /> }
            ]
        }
    ])
    return (
        <React.StrictMode>
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </React.StrictMode>
    )
}

export default App
