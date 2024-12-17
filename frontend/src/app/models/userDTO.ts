export class userDTO { //user model (database)
  constructor(
      public ID: number,
      public username: string,
      public password: string,
      public dev: number,
      public profilePictureURL: string,
      public email: string

  ) {
      this.ID = ID,
      this.username = username;
      this.password = password;
      this.dev = dev;
      this.profilePictureURL = profilePictureURL;
      this.email = email;
  }
}