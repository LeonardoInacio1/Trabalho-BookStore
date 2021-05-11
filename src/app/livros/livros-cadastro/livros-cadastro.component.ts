import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Livros } from '../livros.model';
import { LivrosService } from '../livros.service';
import { AutorService } from 'src/app/autores/autor.service';
import { Autor } from 'src/app/autores/autor.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.scss'],
})
export class LivrosCadastroComponent implements OnInit {
  livrosId:number;
  livrosForm: FormGroup;
  autores: Autor[];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private livrosService: LivrosService,
    private router: Router,
    private autorService: AutorService
  ){
    let livro = {
      id: null,
      imagem: '',
      titulo: '',
      isbn: 0,
      paginas: 0,
      autor: null,
      preco: 0
    };
    this.initializaFormulario(livro);
   }

  ngOnInit() {
    this.autorService.getAutores().subscribe( autor => this.autores = autor)
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    if(!isNaN(id)){
      this.livrosId = id;
      this.livrosService
      .getLivro(id)
      .subscribe((livros) => {
      this.initializaFormulario(livros);
      });
    }
  }

  initializaFormulario(livro: Livros) {
    this.livrosForm = new FormGroup({
      imagem: new FormControl(livro.imagem),
      titulo: new FormControl(livro.titulo, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      isbn: new FormControl(livro.isbn, [Validators.required]),
      paginas: new FormControl(livro.paginas, [Validators.required]),
      autor: new FormControl(livro.autor, [Validators.required]),
      preco: new FormControl(livro.preco, [Validators.required]),
    });
  }

  salvar() {
    const livros: Livros = {...this.livrosForm.value, id: this.livrosId}
    this.livrosService.salvar(livros).subscribe(
      () => this.router.navigate(['livros']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar o Livro ${livros.titulo}`,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );

    this.router.navigate(['livros']);
  }

  get titulo(){
    return this.livrosForm.get('titulo');
  }

  get imagem(){
    return this.livrosForm.get('imagem');
  }

  get isbn() {
    return this.livrosForm.get('isbn');
  }

  get paginas() {
    return this.livrosForm.get('paginas');
  }

  get autor() {
    return this.livrosForm.get('autor');
  }

  get preco() {
    return this.livrosForm.get('preco');
  }

}
