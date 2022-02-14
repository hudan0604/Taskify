module.exports = {
  serverRuntimeConfig: {
    secret: "LoikUion;Kl,.w",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/api" // development api
        : "http://localhost:3001/api", // production api
  },
  images: {
    domains: ["www.docstring.fr", "img.freepik.com"],
  },
};
