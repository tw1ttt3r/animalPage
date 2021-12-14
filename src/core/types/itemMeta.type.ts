export default interface ItemMeta {
    dataType: string;
    name: string;
    tags: any[];
    aggregationFunction: string;
    shortName: string;
    link: string;
    units: string | null;
    description: string
};
