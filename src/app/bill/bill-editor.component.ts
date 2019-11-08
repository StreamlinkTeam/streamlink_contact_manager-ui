import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/entities/bill.model';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Email } from '../shared/entities/mail.model';
import { SocietyContactService } from '../shared/services/society-contact.service';
import Swal from 'sweetalert2';
import { MailService } from '../shared/services/mail.service';


@Component({
  selector: 'app-bill-editor',
  templateUrl: './bill-editor.component.html',
  styleUrls: ['./bill-editor.component.css']
})
export class BillEditorComponent implements OnInit {

  editing = false;
  bill: any;
  billReference;
  societyReference = '';
  societyContactReference = '';
  email: Email = new Email();
  mail: any;


  constructor(private activeRoute: ActivatedRoute,
    private billService: BillService,
    private router: Router,
    private societyContactService: SocietyContactService,
    private mailService: MailService) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.billReference = params['id'];
      this.billService.getBillById(this.billReference)
        .subscribe(response => {
          this.bill = response;
          console.log(this.bill);
        });
    });
  }

  downloadPDF() {

    const pdf = new jsPDF();

    const data = document.getElementById('table');

    // const res = pdf.autoTableHtmlToJson(document.getElementById('table'));
    // pdf.text('Le ' + this.bill.createdDate, 120, 10);
    // pdf.text(this.bill.societyName, 70, 30);
    //
    // pdf.autoTable({
    //   head: [['Reference', 'Tarif HT', 'Q', 'TVA', 'Montant HT', 'Montant TTC']],
    //   body: [
    //     [this.bill.reference,
    //       this.bill.unitPrice,
    //       this.bill.quantity,
    //       this.bill.tva,
    //       this.bill.total,
    //       this.bill.totalTtc,
    //     ],
    //   ]
    // });
    pdf.autoTable(data);
    pdf.save('Facture' + this.bill.reference + '.pdf');
  }

  generatePDF() {
    const data = document.getElementById('divId');
    html2canvas(data).then(canvas => {


      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF("p", "mm", "a4");

      let width = pdf.internal.pageSize.getWidth();
      let height = pdf.internal.pageSize.getHeight();

      pdf.addImage(contentDataURL, 'PNG', 10, 10, 180, 150);
      pdf.save(this.bill.id + '.pdf');
    });
  }

  sendMail() {
    /*
    console.log(this.societyReference);

    this.societyContactService.getSocietyContactContact(this.societyContactReference, this.societyReference).subscribe(resp => {
      this.mail = resp.email1;

      console.log(this.mail);

      this.email.to = this.mail;
      this.email.messageSubject = 'Facture';
      this.email.messageBody = `// TO_DO`;
      this.mailService.sendMail(this.email).subscribe();
      Swal.fire('Facture envoyée avec succés', 'Opération Réussite!', 'success');
    });
    */
  }

}
