import { useEffect, useState } from "react";
import { Container, Content, Header, Input, Table, Button, IconButton, Grid, Row, Col, ButtonToolbar } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import SearchIcon from '@rsuite/icons/Search';
import PlusIcon from '@rsuite/icons/Plus';
import CrearActualizar from "./components/crearActualizar";
import { columnsProduct } from "./components/constants";
import axios from "axios";
import ConfirmationModal from "./components/confirmation";

const data = [
    { id: 1, name: "Product 1", price: 8.40, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", price: 4.20, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", price: 6.30, image: "https://via.placeholder.com/150" },
];

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

// export default function StockProductos({ data: {} }) {
export default function StockProductos() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [dataActualizar, setDataActualizar] = useState({} as Product);
    const [actualizar, setActualizar] = useState(false);
    const [api, setApi] = useState(false);
    const [remove, setRemove] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    // useEffect(() => {
    //     if (api) {
    //         axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
    //             .then(response => {
    //                 console.log(response);
    //                 // setProducts(response.data);
    //                 // setLoading(false);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching products:', error);
    //                 // setLoading(false);
    //             });
    //         setApi(false);
    //     }
    // }, [api]);

    const handleInput = (value: string) => {
        setSearchKeyword(value);
    };

    const handleSearch = () => {
        console.log(searchKeyword);
        setApi(true);
    };

    const handleCreate = () => {
        setOpenModal(true);
    };

    const handleUpdate = (product: Product) => {
        // console.log(product);
        setActualizar(true);
        setOpenModal(true);
        setDataActualizar(product);
    };
    
    const handleDelete = (id: number) => {
        setConfirmation(true);
        if (remove) {
            removeProduct();
        }
    };

    const removeProduct = () => {
        console.log('Eliminado');
        setRemove(false);
    };

    const renderColumns = () => {
        return columnsProduct.map((col, index) => (
            <Column key={index} width={col.width} flexGrow={col.flexGrow || 0}>
                <HeaderCell>{col.header}</HeaderCell>
                <Cell dataKey={col.dataKey} />
            </Column>
        ));
    };

    const mapperTable = () => {
        return data.map((product, index) => ({
            ...product,
            num: index + 1,
            actions: (
                <div className="d-flex justify-content-around">
                    <IconButton
                        icon={<TrashIcon />}
                        onClick={() => handleDelete(product.id)}
                    />
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => handleUpdate(product)}
                    />
                </div>
            )
        }));
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
                        data={mapperTable()}
                        height={400}
                        autoHeight
                        wordWrap
                        rowKey="id"
                        bordered
                        cellBordered
                        className="mt-3"
                    >
                        {renderColumns()}
                    </Table>
                </Content>
            </Container>

            {openModal && 
                <CrearActualizar 
                    open={openModal} 
                    setOpen={setOpenModal} 
                    actualizar={actualizar}
                    setActualizar={setActualizar}
                    dataActual={dataActualizar} 
                />
            }

            {confirmation &&
                <ConfirmationModal
                    open={confirmation}
                    setOpen={setConfirmation}
                    setRemove={setRemove}
                />
            }
        </>
    );
}