import { Component, OnInit } from '@angular/core';
import { Cour } from '../../modeles/cour';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CoursService } from '../../services/cours.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Classe } from '../../modeles/classe';
import { Utilisateur } from '../../modeles/utilisateur';
import { ClasseService } from '../../services/classe.service';
import { AuthserviceService } from '../../services/authservice.service';

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit {
  //ki yabda 3andk des input ma3neha des donnes mch da5alhom lel base de donner wala mch ta3ml modification ml base de donner  thot fl balise form [formGroup]="esem el form" w mba3ed fl balise input mch thot  [(ngModel)]="esemel model.esem l champ"
  cour: Cour = new Cour();       
  cours: Cour[] = [];            
 classe:Classe[] = []
 enseignant: Utilisateur[] = []
  formajout!: FormGroup;           
  formupdate!: FormGroup;         
  selectedCour!: Cour;             

  constructor(
    private CoursService: CoursService,  private fb: FormBuilder, private router: Router,private classeService: ClasseService,private authService:AuthserviceService )
  {}

  ngOnInit(): void {
    this.getAllCours();
    this.getAllClasses();
    this.getAllEnseignat();

    // Initialisation des formulaires
    this.formajout = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required],
      enseignantId: ['', Validators.required],
      classeId: ['', Validators.required],
      
      
    });

    this.formupdate = this.fb.group({
      id: ['', Validators.required],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required],
      enseignantId: ['', Validators.required],
      classeId: ['', Validators.required],
      
      
    });
  }

  // Méthode pour récupérer tous les cours
  getAllCours() {
    this.CoursService.getAllCours().subscribe(
      (res: Cour[]) => {
        this.cours = res;  
        console.log('Liste des cours', this.cours);
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours', error);
      }
    );
  }

  // Méthode pour ajouter un nouveau cours
  addCour() {
    if (this.formajout.valid) {
    this.CoursService.addCour(this.cour).subscribe(
        (res) => {
          Swal.fire('Succès', 'Le cours a été ajouté avec succès', 'success');
          this.getAllCours();  
          this.formajout.reset(); 
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors de l\'ajout du cours', 'error');
          console.error('Erreur lors de l\'ajout', error);
        }
      );
    }
  }

  // Méthode pour ouvrir un cours pour mise à jour
  openUpdateModal(cour: Cour) {
    this.selectedCour = cour;  
    this.formupdate.patchValue({
      id: cour.id,
      titre: cour.titre,
      description: cour.description,
      datedebut: cour.datedebut,
      datefin:cour.datefin
    

    });
  }

  // Méthode pour mettre à jour un cours
  updateCour() {
    if (this.formupdate.valid) {
      const updatedCour: Cour = this.formupdate.value;

      // this.CoursService.updateCour(updatedCour, updatedCour.id).subscribe(
      //   (res) => {
      //     Swal.fire('Succès', 'Le cours a été mis à jour avec succès', 'success');
      //     this.getAllCours(); 
      //     this.formupdate.reset(); 
      //   },
      //   (error) => {
      //     Swal.fire('Erreur', 'Erreur lors de la mise à jour du cours', 'error');
      //     console.error('Erreur lors de la mise à jour', error);
      //   }
      // );
    }
  }

  // Méthode pour supprimer un cours
  deleteCour(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CoursService.deleteCour(id).subscribe(
          (res) => {
            Swal.fire('Supprimé !', 'Le cours a été supprimé avec succès.', 'success');
            this.getAllCours();  
          },
          (error) => {
            Swal.fire('Erreur', 'Erreur lors de la suppression du cours', 'error');
            console.error('Erreur lors de la suppression', error);
          }
        );
      }
    });
  }

  // Méthode pour obtenir un cours par son ID (optionnel)
  getCourById(id: number) {
    this.CoursService.getCourById(id).subscribe(
      (res: Cour) => {
        console.log('Détails du cours', res);
      },
      (error) => {
        console.error('Erreur lors de la récupération du cours', error);
      }
    );
  }

  getAllClasses() {
    this.classeService.getAllClasse().subscribe(
      (res: Classe[]) => {
        this.classe = res;  
        console.log('Liste des classes', this.classe);
      },
      (error) => {
        console.error('Erreur lors de la récupération des classes', error);
      }
    );
  }
  getAllEnseignat() {
    this.authService.getUtilisateurs().subscribe(
      (res: Utilisateur[]) => {
        this.enseignant = res.filter(
          (el: any) => el.role =='ENSEIGNANT');;  
        console.log('Liste des enseignant', this.enseignant);
      },
      (error) => {
        console.error('Erreur lors de la récupération des enseignant', error);
      }
    );
  }
}             