import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DocumentForm from "./DocumentForm";

test(`1. caso: exibição do componente <DocumentForm />`, () => {
    render(<DocumentForm /> );
    const element = screen.getByText(/Salvar/i);
    expect(element).toBeInTheDocument();
});

test(`2. caso: erro de validação <DocumentForm />`, async () => {
    
    render(<DocumentForm /> );
    
    userEvent.click(screen.getByTitle("Salvar"))

    await waitFor(() => expect(screen.getByText("Documento inválido")).toBeInTheDocument() )  
});

test(`3. caso: passando documento <DocumentForm />`, async () => {
    
    render(<DocumentForm /> );
    
    userEvent.type(screen.getByPlaceholderText("Cadastrar novo CPF/CNPJ"), "123456789")

    userEvent.click(screen.getByTitle("Salvar"))

    await waitFor(() => screen.getByText("Documento inválido"))

    expect(screen.getByText("Documento inválido")).toBeInTheDocument()
});