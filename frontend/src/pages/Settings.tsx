import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SettingsProps } from "../interfaces/ISettingsProps";

export const Settings: React.FC<SettingsProps> = ({
        theme,
        primaryColour,
        fontSize,
        animationSpeed,
        primaryColours,
        fontSizes,
        animationSpeeds,
        changeTheme,
        changeColor,
        changeFontSize,
        changeAnimationSpeed,
    }) => {
    
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
                        <button key={index} className="basic-btn" onClick={() => (changeFontSize(index))}>
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
                        <button key={index} className="basic-btn" onClick={() => changeAnimationSpeed(index)}>
                            {speed.title}
                            { animationSpeed === index && <span><FontAwesomeIcon icon={faCheck} /></span> }
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
