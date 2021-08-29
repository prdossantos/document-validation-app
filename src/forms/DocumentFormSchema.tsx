export interface DocumentFormPropTypes {
	isLoading?: boolean,
    loadingText?: string,
    onSubmit: any,
    error: string
}

const DocumentFormPropTypesDefault: DocumentFormPropTypes = {
	isLoading: false,
    loadingText: "loading...",
    onSubmit: () => {},
    error: ""
};

export default DocumentFormPropTypesDefault;
