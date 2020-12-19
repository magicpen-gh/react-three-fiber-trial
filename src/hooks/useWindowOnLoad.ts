import { useState, useEffect } from "react";

const useWindowOnLoad = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleIsLoaded = () => {
            setIsLoaded((prevState) => !prevState);
        };
        window.addEventListener("load", handleIsLoaded);
        return () => window.removeEventListener("load", handleIsLoaded);
    }, []);

    return isLoaded;
};

export default useWindowOnLoad;
