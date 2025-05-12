import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, inject, ViewChild } from '@angular/core';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent {
  dataSource!: MatTableDataSource<Pessoa>;
  displayedColumns: string[] = ['nome', 'cpf', 'genero', 'endereco', 'idade', 'municipio', 'estado'];

  personService = inject(PessoaService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  carregarDados(): void {
    this.personService.obterPessoas().subscribe(pessoas => {
      this.dataSource = new MatTableDataSource(pessoas);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
