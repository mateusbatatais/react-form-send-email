import React from "react";
import { Container, Nav } from "react-bootstrap";

function TopMenu() {
  return (
    <header className="bgBlack text-light-custom">
      <Container>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/listagem">Itens cadastrados</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">Como funciona</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">Privacidade</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">Ajuda</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </header>
  );
}

export default TopMenu;
