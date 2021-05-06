import { Autor } from "../autores/autor.model";

export class Livros {
    id?: number;
    titulo: string;
    isbn: number;
    paginas: number;
    autor: Autor;
    preco: number; 
}
