import helmet from "helmet";

export const getHelmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Base configuration for APIs
    const baseConfig = {
        contentSecurityPolicy: false,
    };

    if (isDevelopment) {
        return helmet({
            ...baseConfig,
            hsts: false,
            // Using a content based security
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            // Using same-site policy
            crossOriginResourcePolicy: { policy: "same-site"},
            frameguard: { action: "sameorigin" },
        });
    }

    // Production gets full security
    return helmet({
        ...baseConfig,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        referrerPolicy: { policy: "no-referrer" },
    });
};
