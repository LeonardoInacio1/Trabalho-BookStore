import { Autor } from "../autores/autor.model";

export class Livros {
    id?: number;
    titulo: string;
    isbn: number;
    paginas: number;
    autores: Autor;
    preco: number; 
}
