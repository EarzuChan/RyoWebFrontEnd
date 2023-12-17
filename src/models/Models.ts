export interface MassFileModel {
    namedItems: MassFileNamedItemModel[],
    adaptions: MassFileAdaptionModel[]
}

export interface MassFileNamedItemModel {
    name: string,
    id: number,
    adaption: MassFileAdaptionModel
}

export interface MassFileAdaptionModel {
    dataJavaClass: string,
    adapterJavaClass: string
}