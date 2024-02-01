// app/components/ThemeSwitcher.tsx
'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/switch";
import SunIcon from "../../public/icons/SunIcon";
import MoonIcon from "../../public/icons/MoonIcon";

export function ThemeSwitcher() {

    const { theme, setTheme } = useTheme();
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (dark) {
            setTheme('dark');
        } else {
            setTheme('light');
        }

    }, [dark, setTheme]);

    return (
        <>
            <Switch
                //isSelected={dark}
                size="md"
                color="warning"
                thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                        <MoonIcon className={className} />
                    ) : (
                        <SunIcon className={className} />
                    )
                }
                onValueChange={setDark}
            />

        </>

    );
};