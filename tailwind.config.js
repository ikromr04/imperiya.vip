/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.ts',
    './resources/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Source Sans 3"', 'sans-serif'],
        'sourceSans': ['"Source Sans 3"', 'sans-serif'],
      },
      colors: {
        'primary': '#0d457e',
      },
      textColor: {
        'success': '#16a34a',
        'error': '#db2626',
        'warn': '#ea580c',
        'base': '#4b5563',
      },
      backgroundColor: {
        'success': '#66bb6a',
      },
      backgroundImage: {
        'illustrations': 'url(/images/illustrations.png)',
      },
    },
  },
  plugins: [],
};
