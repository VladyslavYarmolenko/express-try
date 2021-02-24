const app = require("./app");

const port = process.env.PORT ?? 8081;

console.log("NODE_ENV:", app.get("env"));

app.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}`);
});
