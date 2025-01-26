module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Đảm bảo bao gồm tất cả các tệp cần thiết
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        pinkred: '#F28379',
        steel:'#F2AFA0'  // Tạo màu mới tên 'steel'
      },
      fontFamily: {
        sans: ['Playfair Display', 'serif'], // Thêm font vào đây
        playwrite: ['Playwrite IN', 'sans-serif'],
        playfamily:[ 'Playwrite IN', 'serif']
      },
      screens: {
      'xs': '319px'
      }
    },
  },
  plugins: [],
};
