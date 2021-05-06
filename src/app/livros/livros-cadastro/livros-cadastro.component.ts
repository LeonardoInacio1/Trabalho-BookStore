import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Livros } from '../livros.model';
import { LivrosService } from '../livros.service';


@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.scss'],
})
export class LivrosCadastroComponent implements OnInit {
  livrosId:number;
  livrosForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private livrosService: LivrosService,
    private router: Router,
  ){
    let livros = {
      id: null,
      titulo: '',
      isbn: 0,
      paginas: 0,
      autor: null,
      preco: 0
    };
    this.initializaFormulario(livros);
   }

  ngOnInit() {
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

  initializaFormulario(Livros: Livros) {
    this.livrosForm = new FormGroup({
      nome: new FormControl(Livros.titulo, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(150),  
      ]) 
    })
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
    return this.livrosForm.get('nome');
  }

}
