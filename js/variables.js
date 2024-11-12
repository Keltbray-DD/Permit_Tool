const projectID = "b.cc04c5f0-9a49-4195-96ea-8276a4fd1201";
let catID = 5;
let accessToken; //= "eyJhbGciOiJSUzI1NiIsImtpZCI6IlhrUFpfSmhoXzlTYzNZS01oRERBZFBWeFowOF9SUzI1NiIsInBpLmF0bSI6ImFzc2MifQ.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJhY2NvdW50OnJlYWQiLCJhY2NvdW50OndyaXRlIl0sImNsaWVudF9pZCI6IlVNUElvRmM4aVFvSjJlS1M2R3NKYkNHU21NYjRzMVBZIiwiaXNzIjoiaHR0cHM6Ly9kZXZlbG9wZXIuYXBpLmF1dG9kZXNrLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tIiwianRpIjoieGpXanp0elM3U3JyRnAzTTZSdFB3MFBwU3A3Tm00aldLcUJ4WnN1WkVzaWd5VVJyQXZRaGpzNmJtU0lWSU9GdyIsImV4cCI6MTcyOTA3OTg5MCwidXNlcmlkIjoiWlJDSjMyVVJLWTQ4OUFYUSJ9.Wc9Jo-PN6zaQOamtgw6jyTF8n10JVo3wYWjBNdhgArbTyhwVpJKBfS2eFHDYvpcQeXzXQtgsr61P710j9UtiKZ6j762YTPutgAZUG3a9VnZDItISuThV4eCYxMx9QX9mZGaHLj0IuLENH7dRHfhMNcEsA9cOZaTkGxbqCCatXUdxVmwIc397gqbLuIfOI2jM3CgNxCu6wNdKFkj8snUz11s_C8zmzrH7Y6i61tu2vbjoAF-YRSFAm58YKaaSuBtT78t5hL5tc8mX195lsqzkbQ7ykMqiue0YsFoMuefu7n15a67L1LE9XFzCB0zcsUuzKFZYnQGjBnuQvP-vUooLvw"
let customAttributeList;
let assetRawList;
let assetList = [];
let assetListUpdated = [];
let excel_MIDP_Filename = "ACC_Training_Project_Asset_Data";
let toolURL
let formTemplateData = []


async function setToolMode() {
    const rolesToCheck = [
      "System Administrator",
      "Document Controller",
      "Information Manager",
    ];
  
    // Check if any roles in rolesToCheck are present in userProjectRoles
    isAdmin = rolesToCheck.some((role) =>
      userProjectRoles.some((userRole) => userRole.name === role)
    );
  
    if (isAdmin) {
      activateAdminMode();
    }
  
    function activateAdminMode() {
      console.log("Admin mode activated");
    }
  }
  
  async function getUserDetailsFill() {
    await getUserDetails();
    accessToken = await getAccessToken("account:read data:read");
    userID = userDetails.sub;
  
    await getUserProjectDetails(access_token, userID);
    setUserInfo(userProjectDetails);
    userCompany = userProjectDetails.companyName;
    console.log(userCompany);
    console.log("userProjectRoles", userProjectRoles);
    await setToolMode();
  }
  async function setUserInfo(data) {
    const profilePic = document.getElementById("userPicture");
    const profileName = document.getElementById("userName");
    const profileEmail = document.getElementById("userEmail");
    if (data.imageUrl) {
      profilePic.src = data.imageUrl;
    } else {
      console.error("Image URL is undefined");
    }
    profileName.textContent = data.name;
    profileEmail.textContent = data.email;
  }
  
  function showCustomAlert() {
    document.getElementById('custom-alert').style.display = 'flex';
    document.getElementById('AAFLink').href = AAFLink;
  }
  
  async function getUserProjectDetails(accessToken, userId) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Make sure this is securely handled
    };
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    const apiUrl = `https://developer.api.autodesk.com/construction/admin/v1/projects/${projectID}/users/${userId}`;
    response = await fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if(data.status == '404'){
          showCustomAlert()
        }
        console.log(data);
        userProjectDetails = data;
        userProjectRoles = data.roles;
        return data;
      })
      .catch((error) => console.error("Error fetching data:", error));
    return response;
  }
  async function getUserDetails() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: userAccessToken, // Make sure this is securely handled
    };
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    const apiUrl = "https://api.userprofile.autodesk.com/userinfo";
    response = await fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        userDetails = data;
        return data;
      })
      .catch((error) => console.error("Error fetching data:", error));
    return response;
  }
  window.onload = function () {
  
  
  
  };
  async function signin() {
    window.open(
      "https://developer.api.autodesk.com/authentication/v2/authorize?response_type=code&client_id=UMPIoFc8iQoJ2eKS6GsJbCGSmMb4s1PY&redirect_uri=" +
        toolURL +
        "&scope=data:read data:write data:create&prompt=login&state=12321321",
      "_self"
    );
  }
  async function checkLogin() {
    // Check if 'code' parameter exists in the URL
    var codeParam = getParameterByName("code");
    var loaclRefreshToken = localStorage.getItem('user_refresh_token')
    console.log(loaclRefreshToken)
    if(loaclRefreshToken == 'blank'){
      if (codeParam !== null) {
        console.log("Code parameter found: " + codeParam);
        // Call the function to handle authorization
        await getAuthorisation(codeParam);
      } else {
        await signin();
      }
    }else{
      await refreshToken()
    }
  
  }
// Function to parse URL parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
  // Function to clear URL parameters (after reload or after successful fetch)
  function clearUrlParameters() {
    // Replace the current URL without reloading the page, and remove query parameters
    const cleanUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, "", cleanUrl);
  }
  async function getAuthorisation(code) {
    const bodyData = {
      code: code,
      grant_type: "authorization_code",
      redirect_uri: toolURL,
    };
  
    let formBody = [];
    for (let property in bodyData) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(bodyData[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic VU1QSW9GYzhpUW9KMmVLUzZHc0piQ0dTbU1iNHMxUFk6M1ZQMUdyekxMdk9Vb0V6dQ==", // Make sure this is securely handled
    };
  
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: formBody,
    };
  
    const apiUrl = "https://developer.api.autodesk.com/authentication/v2/token";
    console.log(apiUrl, requestOptions)
    AccessToken_Local = await fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === "invalid_grant") {
          // If there's an error, reload the page
          clearUrlParameters();
          location.reload();
        } else {
          console.log(data);
          
          userRefreshToken = data.refresh_token;
          console.log("userAccessToken",userRefreshToken)
          localStorage.setItem('user_refresh_token', userRefreshToken);
          userAccessToken = data.access_token;
          console.log("userAccessToken", userAccessToken);
          // Clear the URL parameters once the token is retrieved successfully
          getUserDetailsFill();
        }
        return data;
      })
      .catch((error) => console.error("Error fetching data:", error));
    return AccessToken_Local;
  }
  async function refreshToken() {
    var loaclRefreshToken = localStorage.getItem('user_refresh_token')
    const bodyData = {
      //code: code,
      grant_type: "refresh_token",
      //scope:'data:read data:write data:create',
      refresh_token:loaclRefreshToken,
      //client_id:'UMPIoFc8iQoJ2eKS6GsJbCGSmMb4s1PY',
      //client_secret:'3VP1GrzLLvOUoEzu',
      redirect_uri: toolURL,
    };
    const formBody = Object.keys(bodyData)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(bodyData[key])}`)
    .join("&");
    //const formBody = Object.keys(bodyData).map(key => `${key}=${bodyData[key]}`).join("&");
    //formBody = formBody.join("&");
  
    //formBody = `grant_type=refresh_token&scope=data%3Aread%20data%3Awrite%20data%3Acreate&refresh_token=${loaclRefreshToken}&redirect_uri=${toolURL}`
  
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic VU1QSW9GYzhpUW9KMmVLUzZHc0piQ0dTbU1iNHMxUFk6M1ZQMUdyekxMdk9Vb0V6dQ==", // Make sure this is securely handled
    };
  
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: formBody,
    };
  
    const apiUrl = "https://developer.api.autodesk.com/authentication/v2/token";
    console.log(apiUrl, requestOptions)
    AccessToken_Local = await fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === "invalid_grant") {
          // If there's an error, reload the page
          localStorage.setItem('user_refresh_token','blank');
          clearUrlParameters();
          location.reload();
        } else {
          console.log(data);
          localStorage.setItem('user_refresh_token',data.refresh_token);
          userRefreshToken = data.refresh_token;
          console.log("userRefreshToken", userRefreshToken);
          userAccessToken = data.access_token;
          console.log("userAccessToken", userAccessToken);
          getUserDetailsFill();
        }
        return data;
      })
      .catch((error) => console.error("Error fetching data:", error));
    return AccessToken_Local;
  }

  async function getAccessToken(scopeInput){

    const bodyData = {
        scope: scopeInput,
        };

    const headers = {
        'Content-Type':'application/json'
    };

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bodyData)
    };

    const apiUrl = "https://prod-18.uksouth.logic.azure.com:443/workflows/d8f90f38261044b19829e27d147f0023/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-N-bYaES64moEe0gFiP5J6XGoZBwCVZTmYZmUbdJkPk";
    //console.log(apiUrl)
    //console.log(requestOptions)
    signedURLData = await fetch(apiUrl,requestOptions)
        .then(response => response.json())
        .then(data => {
            const JSONdata = data

        //console.log(JSONdata)

        return JSONdata.access_token
        })
        .catch(error => console.error('Error fetching data:', error));


    return signedURLData
    }