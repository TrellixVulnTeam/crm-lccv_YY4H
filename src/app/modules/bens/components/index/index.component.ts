import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {Bem} from '../../shared/bem.model'
import { BensService } from '../../shared/services/bens.service';
import { Location } from '@angular/common';
import { delay } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  bens: Bem[];
  bensForm: FormGroup;

  constructor(private bensService: BensService, private location: Location ) { }

  sucess:boolean = false
  
  ngOnInit(): void {
    this.bensService.getAll()
    .subscribe(f => this.bens = f)

    const date = new Date
    const today = String(date.getFullYear()) + '-' + String(date.getMonth()+1) + '-' + String(date.getDate())
    this.bensForm = new FormGroup({

      'marca': new FormControl('', [Validators.required]), 
      'quantidade': new FormControl('', [Validators.required]),
      'valor_unitario': new FormControl('', [Validators.required]), 
      'inicio_garantia': new FormControl('', [Validators.required]),
      'termino_garantia': new FormControl('', [Validators.required]),
      'observacoes': new FormControl(''),
      'estado': new FormControl('Bom'), 
      'situacao': new FormControl('Em uso'),
      'data_cadastro': new FormControl(today),
      'tombamento': new FormControl('')
      
    })
  }

  del(bem: Bem, i){
    if (confirm("Tem certeza que deseja remover este bem?"))
    this.bensService.delete(bem) 
    .subscribe( _ => {
      this.bens.splice(i, 1)
    })
  }

  onSubmit(){
    const newBem = this.bensForm.value
    newBem.tombamento = newBem.termino_garantia.split('-')[0] + '123456'

    this.bensService.create(newBem).subscribe( _ => {
      this.sucess = true
    })
  }

}
