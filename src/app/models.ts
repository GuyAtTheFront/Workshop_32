export interface Form {
    description: string;
    priority: string;
    due: string;
}

export interface ModifiedTask extends Form {
    index: number;
}