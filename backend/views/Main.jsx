const React = require("react");
const Layout = require("./Layout");

function Main({ title, user }) {
  return (
    <Layout title={title} user={user}>
      <canvas id="canvas" width={256} height={192} ></canvas>
    </Layout>
  );
}

module.exports = Main;
