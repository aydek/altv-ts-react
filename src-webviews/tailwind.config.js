/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src-webviews/index.html', './src-webviews/src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            transparent: 'rgba(0,0,0,0)',
            whitesmoke: '#f4f4f4',
            whitesmokehover: '#d6d6d6',
            background: 'rgba(0, 0, 0, 0.7)',
            backgroundhover: 'rgba(0, 0, 0, 0.5)',
            accent: '#607d8b',
            accenthover: '#475c66',
            containerBorder: 'rgba(255, 255, 255, 0.61)',
            discord: '#5865f2',
            error: '#aa0000',
            gray: '#777777',
            success: '#00aa00',
            error: '#cc0000',
            warning: '#ffa000',
            darkgray: '#1c1c1c',
            darkred: '#820000',
            darkgreen: '#008200',
        },
        screens: {
            inv2xl: '1669px',
            invxl: '1500px',
            invmd: '1330px',
        },
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                marker: ['Permanent Marker', 'cursive'],
                oswald: ['Oswald', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
