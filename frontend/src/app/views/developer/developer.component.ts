import { Component, Input } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Game } from '../../models/game';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GameDTO } from '../../models/gameDTO';
import { User } from '../../models/user';
import { userDTO } from '../../models/userDTO';
import { TokenStorageService } from '../../services/token-storage.service';


@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {

  public userArray : userDTO[] = []
  public user = new userDTO(
    21,                // ID
    'louis',        // username
    'louis',    // password
    1,                // dev
    'assets/images/Pesto_tete.png',  // profilePictureURL
    'louis.rolland@utbm.fr'  // email
  );

  public userConnected: userDTO = new userDTO(21,"louis","louis",1,"louis.rolland@utbm.fr","./assets/images/Pesto_tete.png"); // Default user Connected
  public isUserConnectedDev: boolean = false; // Boolean initially set to false responsible for displaying the add game section if set to true

  public isDeveloper:number = this.user.dev
  public profilePictureUrl: string = this.user.profilePictureURL
  public username:string = this.user.username

  public gamesBought: GameDTO[] = [];
  public showGamesBought: boolean = false;


  public user_id : number

  constructor(private activatedroute : ActivatedRoute, private tokenStorage : TokenStorageService, http: HttpClient, private apiService: ApiserviceService, private router: Router) {

    this.user_id = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0')

    // Get informations of the user connected
    if(this.tokenStorage.getToken()) {
      this.userConnected = this.tokenStorage.getUser(); // gets the user info

      // Check if user connected is the developer displayed
      if(this.userConnected.ID == this.user_id) {
        this.isUserConnectedDev = true;
      } else {
        this.isUserConnectedDev = false;
      }

    // If the user isn't connected
    } else {
      this.isUserConnectedDev = false;
    }

    // Get all informations about the dev displayed
    this.apiService.getUserInfo(this.user_id).subscribe(
      (response) => {
        this.userArray = response.data;

        this.user = this.userArray[0];

        // Store all results
        this.isDeveloper = this.user.dev;
        this.profilePictureUrl = this.user.profilePictureURL;
        this.username = this.user.username;

        return;
      },
      (error) => {
        console.log('Error fetching user info:', error);
      }
    );

  }


  showGames: boolean = false;
  showSuccessMsg: boolean = false;
  showAddGameSection: boolean = false;
  isSelectedFile: boolean = true;

  games: Game[] = [];
  selectedFile: File | null = null;

  gameImg:string = '../assets/images/meta_rifle.jpg';

  images: string[] = [];
  imageFiles: File[] = [];

  successMsg: string = '';

  categories: string[] = [];
  predefinedCategories: string[] = ['Solo', 'Multiplayer', 'Adventure', 'FPS', 'Puzzle', 'Open World', 'RPG', 'Strategy', 'Simulation', 'MOBA', 'Retro'];
//list of predefined categories
  recommendedCPU: string = '';
  predefinedCPU: string[] = ['Intel Core i7-10700K','AMD Ryzen 7 5800X','Intel Core i9-10900K', 'AMD Ryzen 9 5900X', 'Intel Core i5-11600K','AMD Ryzen 5 5600X','Intel Core i3-10100'];


  recommendedGPU: string = '';
  predefinedGPU: string[] = ['NVIDIA GeForce RTX 3070', 'NVIDIA GeForce RTX 3070', 'NVIDIA GeForce RTX 3060 Ti', 'AMD Radeon RX 6800', 'NVIDIA GeForce GTX 1660 Ti', 'AMD Radeon RX 5500 XT', 'AMD Radeon RX 5500 XT'];


  recommendedRAM: string = '';
  predefinedRAM: string[] = ['8 GB DDR4 RAM','16 GB DDR4 RAM','32 GB DDR4 RAM','64 GB DDR4 RAM','12 GB DDR4 RAM','24 GB DDR4 RAM','48 GB DDR4 RAM'];


// Form group for the game form
  userForm = new FormGroup({
    gameName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    longDescription: new FormControl(''),
    price: new FormControl('', Validators.required),
    videoCode: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required)
  });

  // Method responsible for adding a category
  addCategory(event: any): void {
    const category = event.value;
    this.categories.push(category);
    this.predefinedCategories = this.predefinedCategories.filter(c => c !== category);
  }

  // Method responsible for adding a CPU
  addCPU(event: any): void {
    const cpu = event.value;
    this.recommendedCPU = cpu;
    this.predefinedCPU = [];
  }

  // Method responsible for adding a GPU
  addGPU(event: any): void {
    const gpu = event.value;
    this.recommendedGPU = gpu;
    this.predefinedGPU = [];
  }

  // Method responsible for adding a RAM
  addRAM(event: any): void {
    const ram = event.value;
    this.recommendedRAM = ram;
    this.predefinedRAM = [];
  }
  
  
  
  // Method responsible for the redirection to a ggame's page (using router)
  redirectToGamePage(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }

  // Method responsible for showing / hiding list of games
  toggleGames(): void {
    if (this.isDeveloper) {
      this.showGames = !this.showGames;
      if (this.showGames) {
        this.getGamesByDeveloper();
      }
    }
  }

  getGamesByDeveloper(): void {

    // Call the API service to fetch games made by the developer
    this.apiService.getGamesByDeveloper(this.user_id).subscribe(
      (response) => {
        this.games = response.data;
      },
      (error) => {
        console.log('Error fetching games:', error);
      }
    );
  }

  toggleGamesBought(): void {
    
    this.showGamesBought = !this.showGamesBought;
    if (this.showGamesBought) {
      this.getGamesBought();
    }

    

  }


  getGamesBought(): void {
    this.apiService.getGamesBought(this.user_id).subscribe(
      (response) => {
        this.gamesBought = response.data;
      },
      (error) => {
        console.log('Error fetching games bought by the user: ', error);
      }
    );
  }

  // Function called to dismiss the success message
  closeSuccessMsg(): void {
    this.showSuccessMsg = false;

    // Programmatically trigger a click event on the close button
    const successMsgElement = document.getElementById('successMsg');
    if (successMsgElement) {
      const closeButton = successMsgElement.querySelector('.btn-close');
      if (closeButton) {
        closeButton.dispatchEvent(new Event('click'));
      }
    }
  }


  // Function used to choose a picture in the computer
  onFileSelected(event: any): void {

    this.isSelectedFile = false;


    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {

      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  isUploading: boolean = false;

  // Method used to send pictures to the database
  uploadFile() {
    if (this.selectedFile && !this.isUploading) {
      this.isUploading = true; // Set the flag to indicate that file upload is in progress

      this.isSelectedFile = true;

      this.apiService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          // Add the image URL to the images array
          const newFileName = response.newFileName;
          if (newFileName) {
            this.images.push(`../assets/images/${newFileName}`);
          }

          this.isUploading = false; // Reset the flag after successful upload
        },
        (error) => {
          console.log('Error uploading file:', error);
          this.isUploading = false; // Reset the flag in case of upload error
        }
      );
    }
  }


  // Method responsible for adding a game to the database
  addGameByDeveloper(): void {
  
    
    this.userForm.patchValue({
      userId: this.user_id.toString()
    });
    
    if (!this.userForm.valid) {
      return;
    }

    const gameName = this.userForm.get('gameName')?.value;
    const gameDescription = this.userForm.get('description')?.value;
    const longDescription = this.userForm.get('longDescription')?.value || '';
    const price = parseInt(this.userForm.get('price')?.value || "0");
    const videoCode = this.userForm.get('videoCode')?.value || '';

    if (!gameName || !gameDescription) {
      return;
    }

    // Creating a new instance of game with values from the userform
    const newGame: Game = new Game(

      0, // ID is initialized to 0 as it will be assigned by the server
      gameName,
      gameDescription,
      this.user_id,
      longDescription,
      price,
      videoCode,
      this.images.map((imagePath) => imagePath.replace('data:', '/assets')), // Modify the image paths
      this.categories,
      this.recommendedCPU,
      this.recommendedGPU,
      this.recommendedRAM
    );

    // Send data to the service which will handle it
    this.apiService.addGameByDeveloper(newGame).subscribe(
      (response) => {
        const gameId = response.id;
        newGame.ID = gameId;
        this.games.push(newGame);
        this.userForm.patchValue({
          gameName: '',
          description: '',
          longDescription: '',
          price: '',
          videoCode: ''
        });
        this.toggleGames();

        this.showAddGameSection = false;

        // Show the success message
        this.showSuccessMsg = true;
        this.successMsg = `Jeu ${gameName} ajouté ! :)`;

        this.images = [];
        this.categories = [];

        // Start a timer to add the fade-out class after 5 seconds
        setTimeout(() => {
          // Simulate click event to dismiss the success message
          this.closeSuccessMsg();
        }, 5000);
      },
      (error) => {
        console.log('Error adding game:', error);
      }
    );

  }
  
}
