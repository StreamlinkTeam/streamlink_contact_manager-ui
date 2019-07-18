import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/entities/bill.model';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import {Email} from '../shared/entities/mail.model';
import {SocietyContactService} from '../shared/services/society-contact.service';
import Swal from 'sweetalert2';
import {MailService} from '../shared/services/mail.service';


@Component({
  selector: 'app-bill-editor',
  templateUrl: './bill-editor.component.html',
  styleUrls: ['./bill-editor.component.css']
})
export class BillEditorComponent implements OnInit {

  editing = false;
  bill: Bill = new Bill();
  billReference = '';
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
    this.editing = this.activeRoute.snapshot.parent.params['reference'] !== undefined;
    // this.resourceReference   TO_DO

    if (this.editing) {
      console.log(this.activeRoute);
      this.billReference = this.activeRoute.snapshot.parent.params['reference'];
      this.billService.getBillByReference(this.billReference)
        .subscribe(response => {
            this.bill = response;
            this.societyContactReference = response.societyContactReference;
            this.societyReference = response.societyReference;
            console.log(this.bill);
          }
          , error =>
            this.router.navigate(['/bills', 'error']));
    } else {
      console.log('ERROR');
      // this.loadSocieties(null);
    }
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
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 0, 0);
      pdf.save(this.bill.reference + '.pdf');
    });
  }

  sendMail() {
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

  }

}
