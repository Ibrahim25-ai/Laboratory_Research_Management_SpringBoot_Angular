export class GlobalConstants {
  // Meesage
  public static genericError: string =
    'Something went wrong. pleases try again later';

  //Regex
  public static nameRegex: string = '[a-zA-Z0-9 ]*';

  public static numberRegex: string = '^[e0-9]{8,8}$';

  public static emailRegex: string =
    '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

  public static memberExistError: string = 'Member already exists';

  public static memberAdded: string = 'Member added successfully';

  public static memberUpdated: string = 'Member updated successfully';

  public static memberDeleteded: string = 'Member Deleted successfully';

  public static emailSend: string = 'Email Send successfully';

  public static passwordChanged: string = 'Password Changed successfully';

  public static contactNumberRegex: string = '^[e0-9]{10,10}$';

  public static unauthroized: string =
    'You are not authorized person to access this page.';

  public static error: string = 'Error';

  public static oldPasswordError: string = 'Error : Wrong Old Password';

  public static signupSuccess: string = 'Signed Up Successfully';

  public static publicationAdded: string = 'Publication added successfully';

  public static publicationUpdated: string = 'Publication updated successfully';

  public static publicationDeleteded: string =
    'Publication Deleted successfully';

  public static publicationAffected: string = 'Publication Affecté';
  public static publicationDisaffected: string = 'Publication Disaffecté';

  public static evnetAdded: string = 'Event added successfully';

  public static evnetUpdated: string = 'Event updated successfully';

  public static evnetDeleteded: string = 'Event Deleted successfully';

  public static toolAdded: string = 'Tool added successfully';

  public static toolUpdated: string = 'Tool updated successfully';

  public static toolDeleteded: string = 'Tool Deleted successfully';

  public static loggedIn: string = 'LoggedIn successfully';

  public static loggedOut: string = 'LoggedOut successfully';
}
