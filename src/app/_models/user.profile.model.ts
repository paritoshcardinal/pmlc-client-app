import { UserType, EducatorType} from './../enums/user.enums';
import {UserModel} from './user.model'

export class UserProfileModel extends UserModel {
    public Email: string
    public Password: string
    public NewPassword: string
    public CellPhoneNumber: string   
    public DisplayName: string
    public FormattedDate: string    
    public OtherEducatorType: string
    public Children: Array<string>
    public ChildrenWithApproval: Array<any>
    //public ParentInformation: Array<any>
    public HasLastName: boolean
    public HasClass: boolean
    public EnableEmailUpdates: boolean    
    public IsGameDisabled: boolean 
    public UserType: UserType
    public EducatorType: EducatorType    
    public IsTextContact: boolean = true;
    public IsEmailContact: boolean = true;
    public IsPremiumUser: boolean;
    public IsImageRemoved: boolean = false;
    public EnableNewsletterUpdates: boolean = false;
    public settings: any = [];
    public SubjectList: any = [];
    public GradeList: any = [];
    public CloudMediaId: any;
    public ProfileThumbUrl: string;
    public ProfileImageUrl: string;

    constructor() { super() }
    setEducatorModelValue(profileData) {
        this.FirstName = profileData.FirstName;
        this.LastName = profileData.LastName;
        this.OtherEducatorType = profileData.OtherEducatorType;
        this.SchoolName = profileData.SchoolName;
        this.SchoolId = profileData.SchoolId;
        this.State = profileData.State;
        this.Email = profileData.Email;
        this.EducatorType = profileData.EducatorType;
        this.DisplayName = profileData.DisplayName;
        this.CloudMediaId = profileData.CloudMediaId;
        this.UserType = 2;
        this.Password = '';
        this.NewPassword = '';
        this.EnableEmailUpdates = profileData.EnableEmailUpdates;
        this.EnableNewsletterUpdates = profileData.EnableNewsletterUpdates;
        if (profileData.ProfileImageUrl && !profileData.CloudMediaId) {
            this.ProfileThumbUrl = profileData.ProfileImageUrl;
        }
    }
    setStudentModelValue(profileData) {
        this.FirstName = profileData.FirstName;
        this.LastName = profileData.LastName;
        this.OtherEducatorType = profileData.OtherEducatorType;
        this.SchoolName = profileData.SchoolName;
        this.SchoolId = profileData.SchoolId;
        this.State = profileData.State;
        this.Email = profileData.Email;
        this.EducatorType = profileData.EducatorType;
        this.DisplayName = profileData.DisplayName;
        this.City = profileData.City;
        this.UserType = 0;
        this.IsGameDisabled = profileData.IsGameDisabled;
        this.BirthDate = profileData.BirthDate;
        this.CellPhoneNumber = profileData.CellPhoneNumber;
        this.Children = profileData.Children;
        this.ChildrenWithApproval = profileData.ChildrenWithApproval;
        this.EnableEmailUpdates = profileData.EnableEmailUpdates;
        this.HasClass = profileData.HasClass;
        this.HasLastName = profileData.HasLastName;
        this.HomeLanguage = profileData.HomeLanguage;
        this.Password = '';
        this.NewPassword = '';
    }
    setParentModelValue(profileData) {
        this.FirstName = profileData.FirstName;
        this.LastName = profileData.LastName;
        this.Email = profileData.Email;
        this.UserType = 1;
        this.CellPhoneNumber = profileData.CellPhoneNumber;
        this.Children = profileData.Children;
        this.ChildrenWithApproval = profileData.ChildrenWithApproval;
        this.EnableEmailUpdates = profileData.EnableEmailUpdates;        
        this.HomeLanguage = profileData.HomeLanguage == null ? 'English' : profileData.HomeLanguage;
        this.Password = '';
        this.NewPassword = '';
        this.IsTextContact = profileData.IsTextContact;
        this.IsEmailContact = profileData.IsEmailContact;
        this.IsPremiumUser = isPremiumUser;
    }
}