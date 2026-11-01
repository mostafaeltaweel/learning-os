/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fluent: {
          dark: '#002050',
          darkHover: '#00163A',
          primary: '#0078D4',
          primaryHover: '#106EBE',
          secondary: '#2B88D8',
          accent: '#50E6FF',
          bg: '#F8F9FA',
          card: '#FFFFFF',
          border: '#EDEBE9',
          muted: '#605E5C',
          text: '#201F1E',
          success: '#107C41',
          warning: '#D83B01',
          amber: '#FFB900',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        fluent: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
        fluentCard: '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)',
      },
    },
  },
  plugins: [],
};
