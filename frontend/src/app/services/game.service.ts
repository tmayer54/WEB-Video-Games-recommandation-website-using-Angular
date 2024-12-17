import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentDTO } from '../models/CommentDTO';
import { userDTO } from '../models/userDTO';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameArray: Game[] = [];
  categories: string[] = [];
  images: string[] = [];
  image_ie : string[] = ['../assets/images/csgo.png'];

  readySubject: Subject<boolean> = new Subject<boolean>();
  readyImediately: boolean = false;


  isDoneGenerating: boolean = false;

  gameApiUrl = 'http://localhost:3000/games';
  commentApiUrl = 'http://localhost:3000/comment';
  apiUrl = 'http://localhost:3000/user';
  buyUrl = 'http://localhost:3000/buy';


  constructor(private router: Router, private _http:HttpClient) { 
    //this.gameArray = [];

    //Modèle incluant cpu, gpu et ram : 
    // this.gameArray.push(new Game(1, 'Counter Strike Global Offensive', '../assets/images/csgo.png', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur'], 'edYCtaNueQY',"Intel Core 2 Duo E6600", "AMD Phenom X3 8750 or better", "2 GB"));
    // this.gameArray.push(new Game(2, 'CSS', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur', 'Aventure'], 'XMmQ2DTGHOk',"Intel Core i7 ", "Nvidia Geforce GTX560", "5 GB"));
    // this.gameArray.push(new Game(3, 'CS2', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur'], '2iivKSgqlgs',"Intel Core i9 ", "Nvidia Geforce RTX4090 Ti", "34 GB"));
    
    //this.gameArray.push(new Game(1,'CSGO', 'La description courte.', 22, 'La description longue.', 12, 'edYCtaNueQY', ['../assets/images/csgo.png'], ['FPS', 'Multijoueur'],"Intel Core i9 ", "Nvidia Geforce RTX4090 Ti", "34 GB" ));

    this.getAllGames().subscribe(
      (response: any) => {
        const fetchedGames = response.data;
    
        const gameRequests: Observable<Game>[] = fetchedGames.map((gameData: any) => {
          const id_game = gameData.ID;
          const categories$ = this.getCategories(id_game);
          const images$ = this.getImages(id_game);
    
          // Used for synchronization
          return forkJoin([categories$, images$]).pipe(
            map(([categoriesResponse, imagesResponse]: [any, any]) => {
              const categories = categoriesResponse.data;
              const images = Array.isArray(imagesResponse.data)
                ? imagesResponse.data.map((image: any) => image.link)
                : [];
    
              return new Game(
                gameData.ID,
                gameData.name,
                gameData.description,
                gameData.dev,
                gameData.longDescription,
                gameData.price,
                gameData.videoCode,
                images,
                categories,
                gameData.cpu,
                gameData.gpu,
                gameData.ram
              );
            })
          );
        });
    
        forkJoin(gameRequests).subscribe(
          (games: Game[]) => {
            // Assign each game to the game's array
            this.gameArray.push(...games);
    
            //Service ready
            this.readySubject.next(true);
            this.readySubject.complete();
            this.readyImediately = true;
          },
          (error) => {
            console.log('Error fetching games:', error);
          }
        );
      },
      (error) => {
        console.log('Error fetching games:', error);
      }
    );
  }

  isReady(): Observable<boolean> {
    return this.readySubject.asObservable();
  }  

  isReadyImediately(): boolean {
    return this.readyImediately;
  }

  getGames(): Game[] {
    return this.gameArray;
  }

  // getPrdByIndex(idx : number): Game {
  //   return this.gameArray[idx];
  // }


  getGameById(id: number): Game {
    const game = this.gameArray.find( ({ID}) => ID === id);

    return game ? game : new Game(1, 'Counter Strike Global Offensive', 'DESCRIPTIONNN', 21, 'La description longue.', 12, 'edYCtaNueQY', ['edYCtaNueQY'], ['FPS', 'Multijoueur'],"Intel Core 2 Duo E6600", "AMD Phenom X3 8750 or better", "2 GB"); // Renvoie un nouvel objet Game vide si aucun jeu correspondant n'est trouvé
  }

  devpage(id : number) : void{
    this.router.navigate(['/', 'developer', id])
  }

  getAllGames(): Observable<any> {

    return this._http.get(`${this.gameApiUrl}`);
  }

  getCategories(ID:number): Observable<any> {

    return this._http.get(`${this.gameApiUrl}/categories/${ID}`);
  }

  getImages(ID:number): Observable<any> {

    return this._http.get(`${this.gameApiUrl}/images/${ID}`);
  }

  postComm(data:CommentDTO): Observable<any> {
    const url = `${this.commentApiUrl}`;

    return this._http.post(url, data);
  }

  getAllComments(ID:number): Observable<any> {

    return this._http.get(`${this.commentApiUrl}/${ID}`);
  }

  // getPPFromID(ID:number): Observable<any>{

  //   return this._http.get(`${this.commentApiUrl}/user/${ID}`)
  // }

  getUserByID(userID: number): Observable<any> {
    const url = `${this.commentApiUrl}/user/${userID}`;
    return this._http.get(url);
  }

  getUserInfo(id : number):Observable<any> {
    const url = `${this.apiUrl}/userinfo/${id}`; 
    return this._http.get(url);
  }

  bought(data:number[]): Observable<any> {
    const url = `${this.buyUrl}`;

    return this._http.post(url, data);
  }

  getHasBought(data:number[]): Observable<any> {
    const url = `${this.buyUrl}/${data[0]}/${data[1]}`;

    return this._http.get(url);
  }


}
