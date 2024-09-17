import { IAnimationSpeed } from "./IAnimationSpeed";
import { IFontSize } from "./IFontSize";

export interface SettingsProps {
    theme: string;
    primaryColour: number;
    fontSize: number;
    animationSpeed: number;
    primaryColours: string[];
    fontSizes: IFontSize[];
    animationSpeeds: IAnimationSpeed[];
    changeTheme: (index: number) => void;
    changeColor: (index: number) => void;
    changeFontSize: (index: number) => void;
    changeAnimationSpeed: (index: number) => void;
}