import { ClientService } from './../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { ConfirmationService } from 'primeng/api';
import { BroadCastService } from 'src/app/broadcast.service';

@Component({
  selector: 'app-client',
  templateUrl: '../templates/client.component.html',
  styleUrls: ['../styles/client.component.css']
})
export class ClientComponent implements OnInit {

  filteredClients: Client[] = [];

  _clients: Client[] = [];

  _filterBy: string;

  spinner = false;

  constructor(private clientService: ClientService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.broadCast();
    this.getClients();
  }

  getClients(): void {
    BroadCastService.get("spinner").emit(true);
    this.clientService.listAll().subscribe({
      next: clients => {
        this._clients = clients;
        this.filteredClients = this._clients;
        BroadCastService.get("spinner").emit(false);
      },
      error: err => {
        console.log('Error', err);
        BroadCastService.get("spinner").emit(false);
      }
    });
  }

  deleteById(client_id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este cliente??',
      accept: () => {
        BroadCastService.get("spinner").emit(true);
        this.clientService.deleteById(client_id).subscribe({
          next: () => {
            console.log(`Client with id ${client_id} deleted with sucess. `);
            this.getClients();
          },
          error: err => {
            console.log('Error', err);
            BroadCastService.get("spinner").emit(false);
          }
        });
      }
    });

  }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredClients = this._clients.filter((client: Client) => client.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
  }

  get filter() {
    return this._filterBy;
  }

  broadCast(): void {
    BroadCastService.get("spinner").subscribe((spinner: boolean) => {
      this.spinner = spinner;
    });
  }
}
