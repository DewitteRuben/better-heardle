import Container from "./components/Container";
import Entrypoint from "./components/Entrypoint";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Entrypoint />
      </Container>
    </>
  );
}

export default App;
