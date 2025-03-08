module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Đảm bảo bao gồm tất cả các tệp cần thiết
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        yelloww:'#FFFF00',
        pinkred: '#F28379',
        steel:'#F2AFA0',
        redd:'#FF4652',
        blckk:'#353538',
        fffa:'#edfffa',
        graysoul:'#222222'  // Tạo màu mới tên 'steel'
      },
      fontFamily: {
        sans: ['Playfair Display', 'serif'], // Thêm font vào đây
        playwrite: ['Playwrite IN', 'sans-serif'],
        playfamily:[ 'Playwrite IN', 'serif'],
        fantasy: ['Cinzel', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
      screens: {
      'xs': '319px'
      }
    },
  },
  plugins: [],
};
