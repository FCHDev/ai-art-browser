import React, { useState, useEffect } from 'react';

const Loader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    return (
        isLoading ? (
            <div>Chargement...</div>
        ) : null
    );
};

export default Loader;
