/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
],
  theme: {
    fontFamily:{
      main:['Poppins','sans-serif']
    },
    listStyleType: {
        none : 'none',
        disc:'disc',
        decimal:'decimal',
        square: 'square',
        roman: 'upper-roman',
    },
    extend: {
      width: {
        main : '1220px'
      },
      backgroundColor: {
        main: '#ee3131',
        overlay:'rgba(0,0,0,0.7)'
      }, 
      colors: {
        main: '#ee3131'
      },
      flex: {
        '2':'2 2 0%',
        '3':'3 3 0%',
        '4':'4 4 0%',
        '5':'5 5 0%',
        '6':'6 6 0%',
        '7':'7 7 0%',
      },
      keyframes:  {
        'slide top':{
          '0%' :{
            '-webkit-transform': 'translateY(0);',
                    transform: 'translateY(0);'
          },
          '100%' :{
            '-webkit-transform': 'translateY(-100px);',
                    transform: 'translateY(-100px);'
          }
        }
      },
      animation: {
        'slide-top':' animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}

