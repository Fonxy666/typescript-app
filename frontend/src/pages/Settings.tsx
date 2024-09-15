import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const Settings = () => {
    const [theme, setTheme] = useState("light");
    const primaryColours: string[] = [
        "rgb(255, 0, 86",
        "rgb(33, 150, 243",
        "rgb(255, 193, 7",
        "rgb(0, 200, 83",
        "rgb(156, 39, 176"
    ];
    const [primaryColour, setPrimaryColour] = useState(0);

    return (
        <div>
            <section className="section d-block container">
                <h2>Preferred theme</h2>
                <div className="options-container">
                    <div className="option light">
                        { theme === "light" && (
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                    </div>
                    <div className="option dark">
                        { theme === "dark" && (
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className="section d-block container">
                <h2>Primary color</h2>
                <div className="options-container">
                    {  primaryColours.map((colour, index) => (
                        <div className="option light" style={{backgroundColor: colour}}>
                        { primaryColour === index && (
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                    </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
