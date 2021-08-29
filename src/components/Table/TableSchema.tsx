export interface TablePropTypes<T> {
	isLoading?: boolean,
    loadingText?: string,
    rows: T,
    columns: any,
    onDelete: any,
    toggleBlacklist: any,
    onFilter: any
}

const TablePropTypesDefault: TablePropTypes<any> = {
	isLoading: false,
    loadingText: "loading...",
    rows: [],
    columns: [],
    onDelete: () => {},
    toggleBlacklist: () => {},
    onFilter: () => {}
}

export default TablePropTypesDefault
