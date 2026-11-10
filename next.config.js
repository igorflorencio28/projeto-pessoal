module.exports = {
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/falso-pastor.html" }],
    };
  },
};
