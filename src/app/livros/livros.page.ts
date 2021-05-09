import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Livros } from './livros.model';
import { LivrosService } from './livros.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {

  livros: Livros[];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private livrosService: LivrosService
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {
  }

  listar() {
    this.livrosService
      .getLivros()
      .subscribe(
        (dados) => {
          this.livros = dados;
        },
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(livro: Livros) {
    this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o livro ${livro.titulo}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(livro)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  private excluir(livro: Livros) {
    this.livrosService
      .excluir(livro.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o livro ${livro.titulo}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }

}
