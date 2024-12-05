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
        success: 'text-green-600',
        error: 'text-red-600',
        warn: 'text-orange-600',
      },
      backgroundImage: {
        'illustrations': 'url(/images/illustrations.png)',
      }
    },
  },
  plugins: [],
};
