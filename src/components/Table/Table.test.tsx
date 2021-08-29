import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Table from "./Table";
import userEvent from "@testing-library/user-event";
import { Document } from "../../schemas/DocumentSchema";

test(`1. caso: exibição do componente <Table />`, () => {
    render(<Table /> );
    const element = screen.getByText(/Nenhum/i);
    expect(element).toBeInTheDocument();
});

test(`2. caso: com dados <Table />`, () => {
    render(<Table 
        columns={[{name: "col", sort: true}]}
        rows={[
            {_id: "asdf13", document: "123654789", isBlacklist: false},
            {_id: "asdf14", document: "1236547890", isBlacklist: true}
        ]} 
    /> );
    const element = screen.getAllByText(/123654789/i);
    expect(element).toHaveLength(2);
});

test(`3. caso: ordenar dados <Table />`, async () => {

    let items = [
        {_id: "asdf13", document: "123654789", isBlacklist: false},
        {_id: "asdf14", document: "1236547890", isBlacklist: false}
    ];

    const toggleBlacklist = ( document: Document ) => {
        items = items.map((item) => {
            if (item._id === document?._id) {
                item.isBlacklist = true;
            }
            return item;
        });
        
        rerender(<Table 
            columns={[{name: "col", sort: true}]}
            rows={items} 
            toggleBlacklist={toggleBlacklist}
        /> );
    
    }
    
    const {rerender} = render(<Table 
        columns={[{name: "col", sort: true}]}
        rows={items} 
        toggleBlacklist={toggleBlacklist}
    /> );
    
    userEvent.click(screen.getByTitle("Toggle Blacklist 123654789"));

    await waitFor(() => expect(screen.getByText("Sim")).toBeInTheDocument() );
});

test(`4. caso: removendo um registro <Table />`, async () => {

    let items = [
        {_id: "asdf13", document: "123654789", isBlacklist: false},
        {_id: "asdf14", document: "1236547890", isBlacklist: false}
    ];

    const onDelete = ( document: Document ) => {
        items = items.filter((item) => {
            return item._id !== document?._id;
        });
        
        rerender(<Table 
            columns={[{name: "col", sort: true}]}
            rows={items} 
            onDelete={onDelete}
        /> );
    
    }
    
    const {rerender} = render(<Table 
        columns={[{name: "col", sort: true}]}
        rows={items} 
        onDelete={onDelete}
    /> );
    
    userEvent.click(screen.getByTitle("Remover 1236547890"));

    await waitFor(() => expect(screen.getAllByText("123654789")).toHaveLength(1) );
});

test(`5. caso: ordenando os registros <Table />`, async () => {

    let items = [
        {_id: "asdf13", document: "023654789", isBlacklist: false},
        {_id: "asdf14", document: "123654789", isBlacklist: false}
    ];

    const onFilter = (  ) => {};
    
    render(<Table 
        columns={[{name: "col", sort: true}]}
        rows={items} 
        onFilter={onFilter}
    /> );

    userEvent.click(screen.getByTestId("col-0"));

    await waitFor(() => expect(screen.getByTitle("col sort desc")).toBeInTheDocument() );

    userEvent.click(screen.getByTestId("col-0"));

    await waitFor(() => expect(screen.getByTitle("col sort asc")).toBeInTheDocument() );
    
});
