export interface Page {
    name: string;
    title: string;
    content: string;
}

export interface Pages extends Page {
    id: string;
}

export interface iPage {
    [id: string]: Page;
}