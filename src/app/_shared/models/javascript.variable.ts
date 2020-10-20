// vendor definations
declare var jQuery: any;
declare var Custommap: any;
declare var Appcues: any;

//mission PlayWindow
declare var MissionConfig: any;

//app definations
declare var userType: string;
declare var impUserId: string;
declare var isImpSchoolAdmin: string;
declare var impDisplayName: string;
declare var impUserName: string;

declare var questionType: string;
declare var isAdminUser: boolean;
declare var isPremiumUser: boolean;
declare var isSchoolAdmin: boolean;
declare var isSchoolLibraryContributor: boolean;
declare var userName: string;
declare var displayName: string;
declare var isTaskNotificationClose: boolean;
declare var timeintervale: any;
declare var premiumLanguage: any;
declare var isNewSchoolYear: boolean;

declare var ssologindata: any;
declare var ssoUserType: any;
declare var ltilogindata: any;

declare var parentAccountFromEmail: boolean;
declare var paintErroImagePath: string;
declare var paintErroImagePathHTTPS: string;
//declare moreinfopopup
declare function handleMoreInfoPopup(event, thisref, cname);

//declare for print functionality of Rubric
declare function applyCssForPrintRubricText(elementId);
declare function keepTimeZoneInCookie(name, newValue);

declare function openLoginPopup();
declare function openRegistrationPopup();
declare function askSSOUserPopup(isGoogleSSO);
declare function redirectPage(userType);

declare function isDateValid(param);

// used in uploading image in personal activity form
declare var FileAPI: any;

// Check why we need these
declare function scrollTop();
declare function iePrintIssue(idToPrint, idToHide, isClass);

declare var gapi: any;
declare var google: any;
declare var insertedDoc: any;
//declare logout Util
declare function logOutUtil(userType);
declare function getWindow();
declare function geParamFromUrlByName(name);

declare var moment: any;
declare var browserType: any;
declare var alasql: any;
declare function removeHypenInPhone(pnNo);

//email variable for resetting password when impersonating
declare var resetPasswordEmail:any

// This variable is for global footer id which we have set on layout page
declare var globalFooterId: any;

declare var bundleversion: any;

declare var globalFooterId: any;

// This variable is for holding preloaded data for MyPlayList
declare var initialPLData: any;
// This variable is for holding preloaded data for Mycommunities
declare var initialComData: any;
// This variable is for holding preloaded data for Rosters
declare var initialRosterData: any;
// This variable is for holding preloaded data for Myquestions
declare var initialQuestData: any;
// This variable is for holding preloaded data for Educator Assignments
declare var initialAssignData: any;
// This variable is for holding Home Language
declare var homeLanguages: any;
// This variable is for holding Prefered Contact Language
declare var preferredContactLanguages: any;
//This variable is for holding Prefered Contact Language JSON
declare var availablePrefferedLanguageJSON: any;
//This variable is for getting Device name that application is using (used in Analytics)
declare var deviceNameForAnaytics: any;
//This function delete cookies when user login
declare function deleteCookie();
//This function get cookies for language
declare function getCookie(cname);
//This variable is for selecting language for translation
declare var languageKeyArray: any;
//This function add a click event listener for FPL transltion acc to google
declare function addListenerToGTranslte(translate);
//This variable keeps messaging mobile number
declare var smsFromNumber: any;
//These are the function and variables for google plugin translation
declare function setLanguageForProfTranslation(translate, el);
declare function changeLanguageText(id);
declare function htmlreplace(a, b, element);
declare function doEnglishGTranslate();
declare var langJson;
//This function select and copy value of textbox
declare function selectTextboxValue(el);
declare function Painterro(obj);

declare var isPendingToExpired: any;
declare var isExpired: any;
declare var subEndDate: any;

//This variable is for current selected google dropdown language
declare var selectedGoogleLang;
//This method is for detect language change and apply callback
declare function getChangeGoogleLang(callback);
//This function returns language
declare function getlanguage();
// This method is used in StudentDetailComponent
declare function handleMenuDropdown(path, index, openFrom);
// This method is used in StudentDetailComponent
declare function handleDropdownPosition(el, flag);
// This method is used in StudentDetailComponent
declare function scrollStudentView(path);
// This method is used in StudentDetailComponent
declare function removeErrorClass();
// This method is used in StudentDetailComponent
declare function getPopupPostion(eveTarget);
// Supported and Other Language sorting
declare function getAllSortedLanguage();
// This method is used in StudentFormComponent
declare function removeEmailError(target);
// This method is used in StudentFormComponent
declare function handleSelectDropdownPosition(thisRef, flag);
// This method is used in StudentFormComponent
declare function scrollAddTableDuplicate(index);
// This method is used in StudentFormComponent
declare function setScrollTopInStudentForm();
// This method is used in StudentFormComponent
declare function scrollAddTable();
// This method is used in StudentFormComponent
declare function validateAfterFirstName(target);
// This method is used in StudentFormComponent
declare function addErrorClass(event, showNext, errMsg);
// This method is used in StudentFormComponent
declare function removeErrorClass(event, hideNext);
// This method is used in StudentFormComponent
declare function removeErrorClassForPhoneAndEmail(event, field);
// This method is used in StudentFormComponent
declare function addErrorClassForPhoneAndEmail(event, field, errMsg);
declare function getYearList();
declare function remindDateCheck(event);
declare function classListScrollTop();
declare function sendDateCheck(id, date);
declare function disablePreviousDate(date);
declare function showDueDatePicker(elementId, currentOpenId, topPx);
declare function sendTimeListArray();
declare function remindTimeListArray();
declare function zoneListArray();
declare function decrptData(cryptoJS, data);
declare function encrptData(cryptoJS, data);

declare function validatePreviousDate(sendDate);
declare function validateDate(dueDate);
declare function createDateString(dateString, timeString, timeZone);
declare function scrollReportView(waitTime);
declare function checkImage(feedback);
declare function getCorrectTimeAndZoneValue();
declare function returnTimeZone(timeZone); // return string like 'ET, CT'
declare function getTimeZoneValue(timeZone);
declare function getTimeZone(timeZone); // return difference like '-05:00'
declare function calcTime(offset);
declare function extractMediaFromResponse(mediaArray, response);
declare function getCSSForCheckAns(checkPointData);
declare function hasStudentResponses(student, headerData);
declare var statusMapArray: any;
declare var questionIconMapArray: any;
declare var questionTypeMapArray: any;
declare var reportLangJson: any;
declare var stateList: any;
declare var numberToCharacterArray: any;//this variable is used to convert integer to character(from A to Z)
declare function getCourseCompanionSubject();//this method is used to get the course companion subject list.
declare function getSubjectList();
declare function getGradeList();
declare function getSortedArray(paramArray, sortKey, type);
declare var sliderJson: any;
declare var typeCastingUrl: any;
declare function doGTranslate(code);
declare var sliderJson: any;
declare var sliderFamilyPlaylistJson: any;
declare function convertItemsToDisplayFamilyItems(items, itemToAdd, fromTab);
declare function createItemListToSave(itemList);
declare function createItemListToDelete(itemList, contentGuid);
declare function getPlaylistUrl(contextPath, playlistGuid, itemType, itemGuid);
declare function getSingleEntityUrl(type, mode, itemGuid);

declare var viewType: string;// to identify playwindow type

//declare var urlItemPlTypeJson: any;
//declare var urlItemJson: any;
//declare var itemGroupJson: any;
declare function creatMyCommunityUrl(userType, communityGuid, postType, attachmentId, contentType, playlistGuid);
declare function keepSearchInCookie(name, newValue);
declare function deleteMyPlSearchCookie();
declare function deleteAdminQuesSearchCookie();
declare function deleteLibSearchCookie();
// Box - javascript - SDK
declare var BoxSdk: any;
// Video File Extension
declare var videoFileExtension: any;
// // convert bytes to KB, MB and GB
declare function formatBytes(bytes, decimals);
declare function fixTableHeightForStudentDetails(UserId);
declare function deleteSubmenuCookie(expires); 
declare function setClassElementPosition(clName1, clName2, posTop, posLeft, post);
declare function setClassElementPosition(clName1, clName2, posTop, posLeft, post);
declare function deleteMasterTaskCookie();

// To check Device is Mobile or Ipad
declare function isIpadOrMobile();

declare function validatePremiumLang();

// To get date and time from send on date
declare function getDateFromSendDate(dt);
declare function getTimeFromSendDate(dt);
declare function getFormatedSentNowDateTime(dt);
// Community Default Box image Id
declare var DefaultImageOneId;
declare var DefaultImageTwoId;

// Classes Default Box image Id
declare var DefaultClassImageId;
declare var defaultActivityImageId: any;

// local storage keys
declare var localStorageKeys: any;
declare function deleteLocalStorageData(key);