export class Commande {
    id  ? = 0;
    reference ? = '';
    etat ? = '';
    duree ?;
    montantR ?: number;
    date ? = new Date();
    typeReglement ? = '';
    conditionReglement ? = '';
    typePayement ? = '';
    tva ? = 18;
    showTva ? = 0;
    mention ? = '';
    commentaire ? = '';
    langue ? = 'FR';
    accordClient ? = 0;
    refClient ? = '';
    showResource ? = 0;
    showTjm ? = 0;
    showRib ? = 0;
    showOuvre ? = 0;
    showFactor ? = 0;
    showNumber ? = 0;
    showProject ? = 1;
    showFrais ? = 0;
    groupmission ? = 0;
    montantht ? = 0;
    rib ? = '';
    crmsociete ?= '';
    projet ?: any;
    user ?: any;
    projectId ? = 0;
    userId ? = 0;
    besoinReference ? = '';
    besoinTitle ? = '';

}
