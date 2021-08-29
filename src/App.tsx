import React, { Fragment, useEffect, useState } from "react";
import Table from "./components/Table/Table";
import DocumentForm from "./forms/DocumentForm";
import { Document } from "./schemas/DocumentSchema";

const App = () => {

    const [isLoading, setIsloading] = useState(false);
    const [items, setItems] = useState<Document[]>([]);
    const [networkError, setNetworkError] = useState("");
    const [filterSort, setFilterSort] = useState("asc");
    const [filterBlacklist, setFilterBlacklist] = useState("");

    const onDelete = (document: Document) => {
        setIsloading(true);
        fetch(`${process.env.REACT_APP_API_URL}/document/${document.document}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => res.json())
        .then((result) => {

            setItems([...items].filter((item) => item._id !== document._id))
            setIsloading(false);
            setNetworkError("");
        }).catch((e) => {
            setIsloading(false);
            setNetworkError(e.message);
        });
    }

    const toggleBlacklist = (document: Document) => {
        setIsloading(true);
        fetch(`${process.env.REACT_APP_API_URL}/document/${document.document}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
        .then((res) => res.json())
        .then((result) => {

            setItems([...items].map((item) => {
                if (item._id === result.data._id) {
                    item = result.data;
                }
                return item;
            }))
            setIsloading(false);
            setNetworkError("");
        }).catch((e) => {
            setIsloading(false);
            setNetworkError(e.message);
        });
    }

    const createDocument = (document: string) => {
        setIsloading(true);
        fetch(`${process.env.REACT_APP_API_URL}/document`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ document })
        })
        .then((res) => res.json())
        .then((result) => {
            const { success, data, error } = result;
            if (success) {
                const rows = [...items];
                rows.push(data);
                setItems(rows);
                setNetworkError("");
            } else {
                setNetworkError(error);
            }
            setIsloading(false);
        }).catch((e) => {
            setIsloading(false);
            setNetworkError(e.message);
        });
    }

    const onFilter = ( filter: string, value: string ) => {
        if( filter === 'sort' ) {
            setFilterSort(value)
        }
        if( filter === 'blacklist' ) {
            setFilterBlacklist(value)
        }

    }

    useEffect(() => {
        setIsloading(true);
        fetch(`${process.env.REACT_APP_API_URL}/documents?sort=${filterSort}&isBlacklist=${filterBlacklist}`)
        .then((res) => res.json())
        .then((result) => {
            setItems(result.data)
            setNetworkError("");
            setIsloading(false);
        }).catch((e) => {
            setIsloading(false);
            setNetworkError(e.message);
        });
    }, [filterBlacklist, filterSort])

    return (
        <div className="container">
            <div className="d-flex flex-column justify-content-center pt-4">
                <div className="row col-12 text-center">
                    <h4>
                        Gerenciamento de documentos
                    </h4>
                </div>
                {networkError !== "" && <Fragment>
                    <div className="alert alert-danger" role="alert">
                        <b>Ops:</b>
                        <p>{networkError}</p>
                    </div>
                </Fragment>}
                <hr />
                <div className="row">
                    <div className="col-12">
                        <DocumentForm onSubmit={createDocument} />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 mb-2">
                        <div className="row">
                        <label className="col-sm-1 col-form-label">Filtrar: </label>
                        <div className="col-sm-4">
                            <select className="form-select form-select-sm " onChange={(ev) => onFilter("blacklist", ev.currentTarget.selectedOptions[0].value)} aria-label="Blacklist">
                                <option value="">Todos documentos</option>
                                <option value="true">Está na Blacklist</option>
                                <option value="false">Não está na blacklist</option>
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                        <Table
                            isLoading={isLoading}
                            rows={items}
                            columns={[{name: "Documento", sort: true}, {name: "Blacklist"}, {name:""}]}
                            onDelete={onDelete}
                            toggleBlacklist={toggleBlacklist}
                            onFilter={onFilter}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
