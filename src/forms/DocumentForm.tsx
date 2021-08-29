import classNames from "classnames";
import { useEffect, useState } from "react";
import DocumentFormPropTypesDefault, { DocumentFormPropTypes } from "./DocumentFormSchema";
//@ts-ignore
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

const DocumentForm = (props: DocumentFormPropTypes) => {
    const { onSubmit, error } = props;
    const [hasError, setHasError] = useState(false);
    const [document, setDocument] = useState("");
    const submit = () => {
        if( !document ) {
            setHasError(true);
            return;
        }
        setHasError(false);
        onSubmit(document);
        setDocument("");
    };

    useEffect(() => {
        setHasError(error !== "");
    }, [error]);

    return (
        <form className={classNames("needs-validation", {
            "was-validated": hasError
        })}>
            <div className="input-group ">
                <CpfCnpj
                    className="form-control form-control-sm"
                    placeholder="Cadastrar novo CPF/CNPJ"
                    type="tel"
                    value={document}
                    required
                    onChange={(ev: any, type: string) => {
                        setDocument(ev.target.value);
                    }}
                />
                <button
                    className="btn btn-outline-secondary" 
                    type="button" 
                    id="button-addon2" 
                    onClick={submit}
                >
                    Salvar
                </button>
                <div className="invalid-feedback">
                    Documento inválido
                </div>
            </div>
        </form>
    );
};

DocumentForm.defaultProps = DocumentFormPropTypesDefault;

export default DocumentForm;