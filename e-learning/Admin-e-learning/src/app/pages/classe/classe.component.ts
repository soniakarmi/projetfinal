import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classe } from '../../modeles/classe';
import Swal from 'sweetalert2';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  Classe: Classe = new Classe();  
  classes: Classe[] = [];       

  formajout!: FormGroup;         
  formupdate!: FormGroup;        
  selectedClasse!: Classe;         

  constructor(
    private classeService: ClasseService, 
    private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getAllClasses();

    // Initialisation des formulaires
    this.formajout = this.formbuilder.group({
      nom: ['', Validators.required],  
    });

    this.formupdate = this.formbuilder.group({
      id: ['', Validators.required],  
      nom: ['', Validators.required],  
    });
  }

  // Méthode pour récupérer toutes les classes
  getAllClasses() {
    this.classeService.getAllClasse().subscribe(
      (res: Classe[]) => {
        this.classes = res;  
        console.log('Liste des classes', this.classes);
      },
      (error) => {
        console.error('Erreur lors de la récupération des classes', error);
      }
    );
  }

  // Méthode pour ajouter une nouvelle classe
  addClasse() {
    if (this.formajout.valid) {
      this.Classe.nom = this.formajout.value.nom; // Récupération de la valeur du formulaire
      this.classeService.addClasse(this.Classe).subscribe(
        (res) => {
          Swal.fire('Succès', 'La classe a été ajoutée avec succès', 'success');
          this.getAllClasses();  // Rafraîchir la liste des classes après ajout
          this.formajout.reset(); // Réinitialiser le formulaire
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors de l\'ajout de la classe', 'error');
          console.error('Erreur lors de l\'ajout', error);
        }
      );
    }
  }

  // Méthode pour ouvrir une classe pour mise à jour
  openUpdateModal(classe: Classe) {
    this.selectedClasse = classe;  // Stocke la classe sélectionnée
    this.formupdate.patchValue({   // Remplir le formulaire de mise à jour avec les données de la classe
      id: classe.id,
      nom: classe.nom,
    });
  }

  // Méthode pour mettre à jour une classe
  updateClasse() {
    if (this.formupdate.valid) {
      const updatedClasse: Classe = this.formupdate.value; // Récupération des valeurs du formulaire
      this.classeService.updateClasse(updatedClasse, updatedClasse.id).subscribe(
        (res) => {
          Swal.fire('Succès', 'La classe a été mise à jour avec succès', 'success');
          this.getAllClasses(); // Rafraîchir la liste des classes après mise à jour
          this.formupdate.reset(); // Réinitialiser le formulaire
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors de la mise à jour de la classe', 'error');
          console.error('Erreur lors de la mise à jour', error);
        }
      );
    }
  }

  // Méthode pour supprimer une classe
  deleteClasse(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.classeService.deleteClasse(id).subscribe(
          (res) => {
            Swal.fire('Supprimé !', 'La classe a été supprimée avec succès.', 'success');
            this.getAllClasses();  // Rafraîchir la liste après suppression
          },
          (error) => {
            Swal.fire('Erreur', 'Erreur lors de la suppression de la classe', 'error');
            console.error('Erreur lors de la suppression', error);
          }
        );
      }
    });
  }
}
