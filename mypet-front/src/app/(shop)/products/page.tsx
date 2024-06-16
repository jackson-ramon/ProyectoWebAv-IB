import { useState } from "react";
import { Container, Content, Header, Input, Table, Button, IconButton, Grid, Row, Col, ButtonToolbar } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import SearchIcon from '@rsuite/icons/Search';
import PlusIcon from '@rsuite/icons/Plus';
import CrearActualizar from "./crearActualizar";

// export default function StockProductos({ data: {} }) {
export default function StockProductos() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", price: 8.40, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Product 2", price: 4.20, image: "https://via.placeholder.com/150"},
        { id: 3, name: "Product 3", price: 6.30, image: "https://via.placeholder.com/150"},
    ]);
    const [openModal, setOpenModal] = useState(false);

    const handleInput = (value: string) => {
        setSearchKeyword(value);
    };

    const handleSearch = () => {
        console.log(searchKeyword);
    };

    const handleDelete = (id: number) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        console.log("Product deleted");
    };

    const handleCreate = () => {
        setOpenModal(true);
    };

    return (
        <>
            <Container>
                <Header>
                    <h2>Stock de productos</h2>
                </Header>
                <Content className="mt-3">
                    <Grid fluid>
                        <Row className="show-grid mb-3">
                            <Col xs={24} sm={24} md={8}>
                                <Input
                                    placeholder="Buscar producto"
                                    value={searchKeyword}
                                    onChange={(event) => handleInput(event)}
                                />
                            </Col>
                            <Col>
                                <ButtonToolbar>
                                    <IconButton 
                                        icon={<SearchIcon />}
                                        size="md"
                                        className="ms-2"
                                        onClick={handleSearch} 
                                    />
                                    
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <IconButton 
                                    icon={<PlusIcon />}
                                    size="md"
                                    onClick={handleCreate}
                                >
                                    Nuevo producto
                                </IconButton>
                            </Col>
                        </Row>
                    </Grid>
                    
                    <Table
                        data={products}
                        height={400}
                        autoHeight
                        wordWrap
                        rowKey="id"
                    >
                        <Column width={300}>
                            <HeaderCell>Nombre</HeaderCell>
                            <Cell dataKey="name" />
                        </Column>
                        <Column width={200}>
                            <HeaderCell>Precio</HeaderCell>
                            <Cell dataKey="price" />
                        </Column>
                        <Column width={300}>
                            <HeaderCell>Imagen</HeaderCell>
                            <Cell dataKey="image" />
                        </Column>
                        <Column width={100} flexGrow={1}>
                            <HeaderCell className="text-center">Acciones</HeaderCell>
                            <Cell>
                                {(rowData: { id: number }) => (
                                    <div className="d-flex justify-content-around">
                                        <IconButton 
                                            icon={<TrashIcon />}
                                            onClick={() => handleDelete(rowData.id)} 
                                        />
                                        <IconButton 
                                            icon={<EditIcon />}
                                            // onClick={() => handleDelete(rowData.id)} 
                                        />
                                    </div>
                                )}
                            </Cell>
                        </Column>
                    </Table>
                </Content>
            </Container>

            {openModal && <CrearActualizar open={openModal} setOpen={setOpenModal}/>}
        </>
    );
}

// export async function getServerSideProps() {
//     const url = "http://localhost:3001/api/products";
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log(data);
    
//     return {
//         data,
//     };
// };