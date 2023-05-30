'use client';

import React from "react";
/* import { useTranslation } from "react-i18next"; */
import { useLocalStorage } from 'usehooks-ts';

interface ThemeType {}

interface ThemeContextProps {
    mode:  'light' | 'dark';
    direction: 'rtl' | 'ltr';
    lang: string;
    toggleMode: () => void;
    toggleDirection: () => void;
    toggleLanguage: () => void;
    changeLanguage: (lang: string, dir: 'rtl' | 'ltr') => void;
    theme?: ThemeType | null
}

const ThemeContext = React.createContext<ThemeContextProps>({
    mode: "light",
    direction: "ltr",
    lang: "en",
    toggleMode: () => { },
    toggleDirection: () => { },
    toggleLanguage: () => { },
    changeLanguage: () => { },
    theme: null,
});


export const ThemeContextProvider = ({children} : { children: React.ReactNode}) => {

    let prefersDarkMode= true
    /* if (typeof window !== undefined) {
        prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } */


    const [mode, setMode] = useLocalStorage<'light' | 'dark'>('mode', prefersDarkMode ? 'dark' : 'light');
    const [direction, setDirection] = useLocalStorage<'ltr' | 'rtl' >('direction', 'ltr');
    const [language, setLanguage] = useLocalStorage<string>('language', 'en');

    // document.documentElement.classList.add(mode)
    // document.getElementsByTagName("body")[0].dir = direction;

    const toggleModeHandler = () => {
        setMode((prevState) => {
            if (prevState === 'dark') {
                document.documentElement.classList.remove('dark')
                document.documentElement.classList.add('light')
                return 'light'
            }
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')
            return 'dark'
        } );
    };
    const toggleDirectionHandler = () => {
        setDirection((prevState) => prevState === "ltr" ? "rtl" : "ltr");
        setLanguage((prevState) => prevState === "en" ? "ar" : "en"); 
    };
    const toggleLanguageHandler = () => {
        setLanguage((prevState) => {
            if (prevState === "en") {
                // i18n.changeLanguage("ar");
                return "ar";
            } else {
                // i18n.changeLanguage("en");
                return "en";
            }
        });
        setDirection((prevState) => prevState === "ltr" ? "rtl" : "ltr");
    };

    const changeLanguageHandler = (lang : string , dir : 'rtl' | 'ltr' ) => {
        setDirection(dir);
        // i18n.changeLanguage(lang);
        setLanguage(lang);
    };

    /* const theme = React.useMemo(
        () =>
            createTheme({
                direction: direction,
                palette: {
                    mode,
                },
                typography: {
                    fontFamily: direction === "ltr" ? "'Poppins', sans-serif" : "'Cairo', sans-serif",
                },
            }),
        [mode, direction]
    ); */

    const contextValue = {
        mode: mode,
        direction: direction,
        lang: language,
        toggleMode: toggleModeHandler,
        toggleDirection: toggleDirectionHandler,
        toggleLanguage: toggleLanguageHandler,
        changeLanguage: changeLanguageHandler,
        //theme: theme,
    };
    // We Use Styled Componet To Pass The Theme
    // We Pass The Theme Through The Context To Access It In Our Components

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;