import { Button, Form, InputGroup } from 'react-bootstrap'

function Buscador({ placeholder, alBuscar }) {
  function enviar(evento) {
    evento.preventDefault()
    if (alBuscar) {
      alBuscar(evento.target.buscar.value)
    }
  }

  return (
    <Form onSubmit={enviar} className="bg-body-secondary rounded-3 p-2">
      <InputGroup>
        <InputGroup.Text className="bg-white text-secondary">
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          type="search"
          name="buscar"
          className="fw-semibold border-start-0"
          placeholder={placeholder}
          aria-label="Servicio a buscar"
        />
        <Button type="submit" variant="primary" className="fw-semibold px-4">
          Buscar
        </Button>
      </InputGroup>
    </Form>
  )
}

export default Buscador
