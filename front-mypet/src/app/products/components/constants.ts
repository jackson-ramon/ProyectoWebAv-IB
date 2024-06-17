interface ColumnConfig {
    width: number;
    header: string;
    dataKey: string;
    flexGrow?: number;
}

const columnsProduct: ColumnConfig[] = [
    { width: 100, header: 'No', dataKey: 'num' },
    { width: 300, header: 'Nombre', dataKey: 'name', flexGrow: 1},
    { width: 150, header: 'Precio', dataKey: 'price' },
    { width: 300, header: 'Imagen', dataKey: 'image', flexGrow: 1},
    { width: 150, header: 'Acciones', dataKey: 'actions' }
];

export { columnsProduct };