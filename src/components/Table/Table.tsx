import classNames from "classnames";
import { useEffect, useState } from "react";
import { Document } from "../../schemas/DocumentSchema";
import TablePropTypesDefault, { TablePropTypes } from "./TableSchema";

const Table = ( props: TablePropTypes<Document[]>) => {
    const {isLoading, loadingText, rows, columns, onDelete, toggleBlacklist, onFilter} = props;
    const [items, setItems] = useState<Document[]>(rows);
    const [sort, setSort] = useState("asc");
    const onSort = () => {
        const _sort = sort === "asc" ? "desc" : "asc";
        setSort(_sort);
        onFilter("sort", _sort);
    };
    useEffect(() => {
        setItems(rows);
    }, [rows]);

    return (
        <table className="table tabl-sm table-striped table-light">
            {columns.length > 0 && <thead>
                <tr>
                    {columns.map( ( column: any ) => {
                        return <th onClick={column.sort ? onSort : () => {}} key={column.name} className={classNames(column.sort ? sort : "", {
                            "sort": column.sort
                        })}>{column.name}</th>
                    })}
                </tr>
            </thead>}
            <tbody>
                { items.length > 0 && !isLoading && items.map( ( item ) => <tr key={`tbody-${item._id}`}>
                    <td> {item.document} </td>
                    <td> {item.isBlacklist ? "Sim" : "Não"} </td>
                    <td align="right"> 
                        <button
                            className="btn btn-sm btn-info mx-3" 
                            onClick={() => toggleBlacklist(item)}
                        >
                            {item.isBlacklist ? "Remover" : "Add"} Blacklist
                        </button> 
                        <button
                            className="btn btn-sm btn-danger" 
                            onClick={() => onDelete(item)}
                        >
                            excluir
                        </button> 
                    </td>
                </tr>)}
                { isLoading && <tr>
                    <td className="is-loading" align="center" colSpan={3}>
                        {loadingText}
                    </td>
                </tr>}
                { !isLoading && !items.length && <tr>
                    <td className="is-empty" align="center" colSpan={3}>
                        Nenhum registro ainda ;)
                    </td>
                </tr>}
            </tbody>
        </table>
    );
}

Table.defaultProps = TablePropTypesDefault;

export default Table;