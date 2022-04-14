import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../document';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Input('proccess-id') proccessId: number | undefined = undefined;

  documents: Document[] = [];

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.documentService
      .getDocuments(id)
      .subscribe((documents) => (this.documents = documents));
  }

  toggleAddDocument(): void {}

  selectDocument(id: number): void {}
}
