module.exports = {
    theme: {
        fontFamily: {
            dmSans: ['"DM Sans"', 'sans-serif'],
            inter: ['Inter', 'sans-serif']
        }
    },
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
        // For the best performance and to avoid false positives,
        // be as specific as possible with your content configuration.
    ],
    plugins: [
        require('@tailwindcss/forms')
    ],
};
