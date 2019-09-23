export class Commande {
    id: number = 0;
    reference: string ='';
    etat: string = '';
    duree: number;
    date: string = '';
    typeReglement: string = '';
    conditionReglement: string = '';
    typePayement: string = '';
    tva: number = 18;
    showTva = 0;
    mention: string = '';
    commentaire: string = '';
    langue = 'FR';
    accordClient: number = 0;
    refClient: string = '';
    showResource = 0;
    showTjm = 0;
    showRib = 0;
    showOuvre = 0;
    showFactor = 0;
    showNumber = 0;
    showProject = 1;
    showFrais = 0;
    groupmission: number = 0;
    montantht: number = 0;
    rib: string = '';
    crmsociete: string = '';
    projet: any;
    user: any;
    projectId: number = 0;
    userId: number = 0;
    besoinReference?:string = '';
    besoinTitle?:string = '';

}