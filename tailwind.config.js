export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.ts',
    './resources/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sourceSans: ['"Source Sans 3"', 'sans-serif'],
      },
      colors: {
        primary: '#0d457e',
      },
      textColor: {
        base: '#4b5563',
        success: '#16a34a',
        danger: '#db2626',
        warning: '#ea580c',
      },
      backgroundColor: {
        success: '#66bb6a',
      },
      backgroundImage: {
        illustrations: 'url(/images/illustrations.png)',
      },
      animation: {
        rotation: 'rotation 1s linear infinite',
      },
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
