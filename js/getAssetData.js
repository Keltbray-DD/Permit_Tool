start();

// Store the initial view settings for the map
const initialLat = 54.65309442311874;
const initialLng = -2.6686477661132812;
const initialZoom = 13;

// Initialize the map and set its view to the initial latitude and longitude
const map = L.map("map").setView([initialLat, initialLng], initialZoom); // Default view over the UK

// Define different tile layers (Terrain, Satellite, Street, etc.)

// OpenStreetMap standard tile layer (default)
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map); // Add it by default to the map

// Google Satellite tile layer
const satelliteLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: '© Google'
});
const hybridLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: '© Google'
});
const googleTerrainLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 18,
    attribution: '© Google'
});

// Add a control to switch between layers
const baseLayers = {
    "Street Map": osmLayer,
    "Satellite": satelliteLayer,
    "Terrain": googleTerrainLayer,
    "Hybrid":hybridLayer,
};

L.control.layers(baseLayers, null, { position: 'bottomright' }).addTo(map); // Add layer control to the map

// Object to hold the polyline objects by route name
// const polylines = {};

// // Create polylines from route data and store them in the 'polylines' object
// routesData.forEach(route => {
//     const polyline = L.polyline(route.coordinates, { color: route.color });
//     polylines[route.name] = polyline;
//     polyline.addTo(map); // Add to the map initially
//     // Add a hover effect using the 'mouseover' event to show the polyline name
//     polyline.on('mouseover', function(e) {
//         const popup = L.popup()
//             .setLatLng(e.latlng)  // Set the popup at the mouse hover location
//             .setContent(`<strong>${route.name}</strong>`)  // Show the name of the polyline
//             .openOn(map);
//     });

//     // Close the popup when the mouse leaves the polyline
//     polyline.on('mouseout', function() {
//         map.closePopup();  // Close the popup when hover ends
//     });
// });
// console.log(routesData)
// Create a custom control to toggle routes
// const customControl = L.Control.extend({
//     onAdd: function(map) {
//         const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom routesControl');
//         container.style.backgroundColor = 'white';
//         container.style.padding = '10px';
//         container.id = 'routeBox'

//         // Add checkboxes for each route dynamically from the array
//         container.innerHTML = `
//             <h4 style="display: flex; align-items: center; justify-content: space-between;">
//                 Routes
//                 <button id="toggleButton" style="font-size: 20px; padding:0 10px;color:black; border: none; background: none; cursor: pointer;">+</button>
//             </h4>
//             <div id="routeList" style="overflow: hidden; transition: height 0.3s ease; display:none;">
//             </div>
//         `;
//         // Add checkboxes for each route inside the collapsible list
//         const routeList = container.querySelector('#routeList');
//         routesData.forEach((route, index) => {
//             const routeId = `route${index+1}Checkbox`;
//             // container.innerHTML += `
//             //     <label>
//             //         <input type="checkbox" id="${routeId}" checked> ${route.name}
//             //     </label><br>
//             // `;

//             // Attach event listener for each checkbox to toggle the route
//             const checkbox = document.createElement('input');
//             checkbox.type = 'checkbox';
//             checkbox.id = routeId;
//             checkbox.checked = true;
//             checkbox.addEventListener('change', function() {
//                 toggleRoute(route.name, this.checked);
//             });
//             const label = document.createElement('li');
            
//             label.innerHTML = ` <label>
//             <span style="width: 20px; height: 2px; background-color: ${route.color}; margin-right: 8px; display: inline-block;"></span>
//                          ${route.name}
//                     </label>`
//                     label.appendChild(checkbox)   
//                     routeList.appendChild(label)

//             // Append the checkbox to the container
//             // container.querySelector(`#${routeId}`).addEventListener('change', function() {
//             //     toggleRoute(route.name, this.checked);
//             // });
//         });
//         // Toggle the route list's visibility
//         const toggleButton = container.querySelector('#toggleButton');
//         toggleButton.addEventListener('click', function() {
//             const routeList = container.querySelector('#routeList');
//             if (routeList.style.display === 'none') {
//                 routeList.style.display = 'block';
//                 toggleButton.textContent = '-'; // Change the button to "-" when expanded
//             } else {
//                 routeList.style.display = 'none';
//                 toggleButton.textContent = '+'; // Change the button to "+" when collapsed
//             }
//         });
//         return container;
//     }
// });

// Add the custom control to the map
// map.addControl(new customControl({ position: 'bottomright' }));

//     // Object to store the KML layers
//     const kmlLayers = {};

//     // Fetch the list of KML files from the server
//     async function getKMLFiles() {
//         const response = await fetch('/get-kml-files');
//         const kmlFiles = await response.json();
//         loadKMLLayers(kmlFiles);
//     }

//     // Load KML layers and create a list of checkboxes for toggling
//     function loadKMLLayers(kmlFiles) {
//         const layerControl = document.getElementById('layerControl');
//         layerControl.innerHTML = '<h4>Available KML Layers</h4>';

//         kmlFiles.forEach((file, index) => {
//             const layerId = `layer${index}`;

//             // Create a checkbox for each KML file
//             const checkbox = document.createElement('input');
//             checkbox.type = 'checkbox';
//             checkbox.id = layerId;
//             checkbox.checked = true;  // Load the layers by default
//             checkbox.addEventListener('change', () => toggleKMLLayer(file, checkbox.checked));

//             const label = document.createElement('label');
//             label.htmlFor = layerId;
//             label.textContent = file;

//             layerControl.appendChild(checkbox);
//             layerControl.appendChild(label);
//             layerControl.appendChild(document.createElement('br'));

//             // Load the KML layer onto the map
//             const kmlLayer = omnivore.kml(`/kml-files/${file}`).addTo(map);
//             kmlLayers[file] = kmlLayer;  // Store the layer reference
//         });
//     }

//     // Function to toggle KML layer visibility
//     function toggleKMLLayer(file, isVisible) {
//         if (isVisible) {
//             kmlLayers[file].addTo(map);  // Add layer to the map
//         } else {
//             map.removeLayer(kmlLayers[file]);  // Remove layer from the map
//         }
//     }

//     // Fetch the KML files when the page loads
    

// Define the custom control for the logo and text
const logoControl = L.Control.extend({
    onAdd: function(map) {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom logoBox');
        container.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';  // Light background
        container.style.padding = '10px';  // Padding for the logo and text
        container.style.borderRadius = '5px';  // Optional rounded corners
        container.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.2)';  // Optional: Add a shadow

        // Add your logo and text (replace 'logo_url.png' with your actual logo URL)
        container.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="./assets/media/Keltbray-logo_single.png" alt="Company Logo" style="height: 30px; margin-right: 10px;"> <!-- Your logo -->
                <span style="font-size: 16px; font-weight: bold;">KISL GIS</span> <!-- Your text -->
            </div>
        `;

        return container;
    }
});

// Add the custom logo control to the bottom-left corner of the map
map.addControl(new logoControl({ position: 'bottomleft' }));

// Function to toggle the visibility of a route (polyline)
function toggleRoute(routeName, isVisible) {
    console.log(routeName)
    if (isVisible) {
        polylines[routeName].addTo(map);
    } else {
        map.removeLayer(polylines[routeName]);
    }
}

// Variable to store the marker and coordinates
let markers;
let coordinates = { lat: null, lng: null };
let isMapClickEnabled = false;

let formOptions = [
  { id: 1, name: 'Daily Safety Inspection' },
  { id: 2, name: 'Hot Works Permit' },
  { id: 3, name: 'Equipment Check' }
];

// Add click event to the button
document.getElementById('toggleButtonNewPermit').addEventListener('click', function() {
  isMapClickEnabled = !isMapClickEnabled;

  if (isMapClickEnabled) {
      this.textContent = 'Disable Premit Creation';
      map.getContainer().style.cursor = 'crosshair'; // Change cursor to crosshair
      alert('Map click to drop a pin is enabled. Click on the map to place a pin.');
  } else {
      this.textContent = 'Create Premit';
      map.getContainer().style.cursor = ''; // Reset cursor to default
      alert('Map click to drop a pin is disabled.')
      // Clear all markers when map click is disabled
      clearAllMarkers();
  }
});
// Function to clear all markers from the map
function clearAllMarkers() {

      map.removeLayer(markers);

  markers = null; // Clear the array after removing markers
}
// Add click event to the map
map.on('click', function(e) {
  if (!isMapClickEnabled) return; // Only run if map click is enabled

  const { lat, lng } = e.latlng;

  // Place or move the marker
  if (markers) {
      markers.setLatLng([lat, lng]);
  } else {
      markers = L.marker([lat, lng]).addTo(map);
  }

  // Store the coordinates
  coordinates.lat = lat;
  coordinates.lng = lng;

  // Create a popup with form options
  let popupContent = '<strong>Select Form Type:</strong><br>';
  formOptions.forEach(option => {
      popupContent += `<button onclick="createForm(${option.id}, '${option.name}')" class="pemirtOptionButton">${option.name}</button><br>`;
  });

  // Bind popup to the marker
  markers.bindPopup(popupContent).openPopup();

    // Display coordinates (you can update the form inputs here)
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    document.getElementById('latitudeInput').innerHTML = lat;
    document.getElementById('longitudeInput').innerHTML = lng;
});

// Function to handle form creation
function createForm(formId, formName) {
  alert(`Form selected: ${formName} (ID: ${formId})`);
  // Add your logic for creating or navigating to the specific form
}

async function start() {
  // Call the function to plot all assets
  const fullUrl = window.location.href;
  toolURL = fullUrl.split('?')[0];
  await checkLogin()
  await getFormTemplatesFromACC()
  //await createAssetList();
  //await plotAssetsOnMap(assetListUpdated);
  //await getKMLFiles();
  await hideLoadingScreen()
}

// Add reset button functionality to zoom back to the initial view
document.getElementById("resetButton").addEventListener("click", function () {
  map.setView([initialLat, initialLng], initialZoom, { animate: true }); // Reset to initial view
});

// Function to create markers for each asset and handle asset list clicks
async function plotAssetsOnMap(array) {
  array.forEach(async (asset) => {
    let assetItem = document.createElement("div"); // Create the list item for the asset
    assetItem.classList.add("asset-item");

    if (asset.Postcode !== "NULL") {
      // If the asset has a valid postcode, geocode it
      let convertedData = await getCoordinatesUK(asset.Postcode);

      if (convertedData) {
        // Create a marker at the asset's location
        let marker = L.marker([convertedData.lat, convertedData.lng]).addTo(
          map
        );

        // Bind popup with asset information
        marker.bindPopup(`
                    <strong>${asset["Site Name"]}</strong><br>
                    ${asset["Postcode"]}<br>
                    ${convertedData.lat}, ${convertedData.lng}<br>
                    <a href="https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${convertedData.lat},${convertedData.lng}" target="_blank">
                        Open Street View
                    </a>
                `);
        // Add a click event listener to the marker
        marker.on('click', function(e) {
            showDetailsPanel(asset); 
        });
        // Populate the sidebar item with the asset details
        assetItem.innerHTML = `
                    <strong>${asset["Site Name"]}</strong><br>
                    <p>${convertedData.lat}, ${convertedData.lng}<br>
                    ${asset["Postcode"]}</p>
                `;

        assetItem.addEventListener("mouseout", function () {
          //marker.closePopup(); // Close popup when not hovering
          //document.getElementById("detailsPanel").style.right = "-60vw"; // Hide the panel off-screen
        });

        // Click functionality to pan and zoom the map to the marker
        assetItem.addEventListener("click", function () {
          // Set the map view to the marker's location, zoom level 15 for closer zoom
          map.setView([convertedData.lat, convertedData.lng], 15, {
            animate: true,
          });
          setTimeout(() => marker.openPopup(), 300); // Delay opening the popup to allow zoom animation

          // Display more details in the right-side panel
          showDetailsPanel(asset); // Pass the clicked asset's data to the details panel
        });
      } else {
        console.error(`Could not geocode postcode: ${asset.Postcode}`);
        greyOutAssetItem(assetItem, asset); // Grey out the asset if no geocode data is available
      }
    } else {
      greyOutAssetItem(assetItem, asset); // Grey out the asset if no postcode is available
    }

    // Append the asset item to the sidebar list regardless of validity
    document.getElementById("assets").appendChild(assetItem);
  });
}

// Helper function to grey out assets without valid postcodes
function greyOutAssetItem(assetItem, asset) {
  assetItem.innerHTML = `
        <strong>${asset["Site Name"]}</strong><br>
        Location not available
    `;
  assetItem.style.color = "#888"; // Greyed out text color
  assetItem.style.backgroundColor = "#f0f0f0"; // Light grey background
  assetItem.style.cursor = "not-allowed"; // Change cursor to indicate non-clickable
  assetItem.style.boxShadow = "none"
}
document.addEventListener('DOMContentLoaded',async function(){
    let detailsPanel = document.getElementById('detailsPanel');
    let resizeHandle = document.getElementById('resizeHandle');
    let closeDetails = document.getElementById('closeDetails');
    let isResizing = false;



    // Close the details panel
    closeDetails.addEventListener('click', function() {
        detailsPanel.style.right = '-60vw'; // Hide the panel by sliding it out
        adjustLayerControlPosition(0); // Move the control back to default position
    });

    // JavaScript for resizable panel
    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        document.body.style.cursor = 'ew-resize'; // Change cursor while resizing
    });

    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;

        // Calculate new width based on mouse movement
        let newWidth = window.innerWidth - e.clientX;
        if (newWidth > 200 && newWidth < window.innerWidth * 0.5) { // Set min and max width
            detailsPanel.style.width = newWidth + 'px';
        }
        adjustLayerControlPosition(newWidth); // Adjust the layer control position
    });

    document.addEventListener('mouseup', function() {
        isResizing = false;
        document.body.style.cursor = ''; // Reset cursor after resizing
    });

    // Sample function that gets triggered when an asset is clicked
    function onAssetClick(asset) {
        // Call showDetailsPanel with the asset's data
        showDetailsPanel(asset);
    }
})
// Function to adjust the position of the layer control
function adjustLayerControlPosition(panelWidth) {
    const controlContainerLayers = document.querySelector('.leaflet-control-layers'); // Get the control container
    if (controlContainerLayers && panelWidth > 200 && panelWidth < window.innerWidth * 0.5) {
        controlContainerLayers.style.right = panelWidth ? `${panelWidth +30}px` : '0px'; // Adjust based on panel width
    }
    const controlContainerRoutes = document.querySelector('.routesControl'); // Get the control container
    if (controlContainerRoutes && panelWidth > 200 && panelWidth < window.innerWidth * 0.5) {
        controlContainerRoutes.style.right = panelWidth ? `${panelWidth +30}px` : '0px'; // Adjust based on panel width
    }
    if(panelWidth == 0){
        controlContainerRoutes.style.right = panelWidth ? `${panelWidth +30}px` : '0px'; // Adjust based on panel width
        controlContainerLayers.style.right = panelWidth ? `${panelWidth +30}px` : '0px'; // Adjust based on panel width
    }
}
// Show the details panel with asset information
function showDetailsPanel(asset) {
    // Get the element where the details will be displayed
    const detailsContent = document.getElementById("detailsContent");

    // Start building the HTML content
    let content = '';

    // Loop through each key in the asset object
    for (let key in asset) {
        if (asset.hasOwnProperty(key)) {
            // Add each key-value pair as a row in the details panel
            content += `<strong>${key.replace(/_/g, ' ')}:</strong> ${asset[key] ? asset[key] : 'Not available'}<br>`;
        }
    }

    // Populate the details content with the dynamically generated HTML
    detailsContent.innerHTML = content;
const panelWidthPx = vwToPx(20); // Convert panel width from vw to pixels
    adjustLayerControlPosition(panelWidthPx);
  // Slide the details panel in from the right
  document.getElementById("detailsPanel").style.right = "0";
}

// Close the details panel
document.getElementById("closeDetails").addEventListener("click", function () {
  document.getElementById("detailsPanel").style.right = "-60vw"; // Hide the panel off-screen
});
function vwToPx(vw) {
    return (vw / 100) * window.innerWidth;
}
// Function to filter and search through the asset list
function searchAssets() {
  // Get the value from the search bar
  let searchValue = document.getElementById("searchBar").value.toLowerCase();

  // Get all the asset items in the asset list
  let assetItems = document.querySelectorAll("#assets .asset-item");

  // Loop through all asset items and hide or show based on the search query
  assetItems.forEach(function (item) {
    // Get the text content of each asset item (e.g., site name and postcode)
    let itemText = item.textContent.toLowerCase();

    // If the item text includes the search value, show the item; otherwise, hide it
    if (itemText.includes(searchValue)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

async function getCoordinatesUK(postcode) {
  let location;
  let lat;
  let lng;
  let apiUrl = `https://api.postcodes.io/postcodes/${encodeURIComponent(
    postcode
  )}/nearest`;
  console.log(apiUrl);
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.status === 200) {
      location = data.result[0];
      lat = location.latitude;
      lng = location.longitude;

      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      return { lat: lat, lng: lng };
    } else {
      console.error("Postcode not found");
      apiUrl = `https://api.postcodes.io/terminated_postcodes/${encodeURIComponent(
        postcode
      )}`;
      response = await fetch(apiUrl);
      data = await response.json();
      location = data.result;
      lat = location.latitude;
      lng = location.longitude;

      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      return { lat: lat, lng: lng };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function getFormTemplatesFromACC() {
  formTemplateData = await getFormTemplates()
  console.log(formTemplateData)
}

async function createAssetList() {
  //accessToken = await get3LegToken();
  customAttributeList = await getCustomAttributeDetails();
  assetArray = await getAssets();
  assetRawList = assetArray;
  const lookup = {};
  customAttributeList.results.forEach((item) => {
    lookup[item.name] = item.displayName;
  });
  assetRawList.forEach((element) => {
    tempObject = {
      assetId: element.id,
      categoryId: element.categoryId,
      ...element.customAttributes,
    };
    assetList.push(tempObject);
  });
  assetListUpdated = assetList.map((obj) => {
    let newObj = {};

    Object.keys(obj).forEach((key) => {
      if (lookup[key]) {
        // Replace the key with the displayName
        newObj[lookup[key]] = obj[key];
      } else {
        // Keep the key as is if not found in the lookup
        newObj[key] = obj[key];
      }
    });

    return newObj;
  });

  console.log("Asset List:", assetListUpdated);

  //uploadtoSP(assetListUpdated,excel_MIDP_Filename)
}
async function get3LegToken() {
  const bodyData = {};

  const headers = {
    "Content-Type": "application/json",
  };

  const requestOptions = {
    method: "GET",
    headers: headers,
    //body: JSON.stringify(bodyData)
  };

  const apiUrl = `https://prod-26.uksouth.logic.azure.com:443/workflows/477a403e5c7345bf9dc3eaa77599a3eb/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tY2VJt9GRJAxUMI_DNm2b-Np0VHAUQm9lChOHEyLABw`;
  //console.log(apiUrl)
  //console.log(requestOptions)
  responseData = await fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const JSONdata = data;

      console.log("SP Response accessToken:", JSONdata);

      return JSONdata.accessToken;
    })
    .catch((error) => console.error("Error fetching data:", error));

  return responseData;
}
async function getCustomAttributeDetails() {
  const bodyData = {};

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };

  const requestOptions = {
    method: "GET",
    headers: headers,
    //body: JSON.stringify(bodyData)
  };

  const apiUrl = `https://developer.api.autodesk.com/bim360/assets/v1/projects/${projectID}/custom-attributes`;
  //console.log(apiUrl)
  //console.log(requestOptions)
  responseData = await fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const JSONdata = data;

      console.log("ACC Response CustomAttributesList:", JSONdata);

      return JSONdata;
    })
    .catch((error) => console.error("Error fetching data:", error));

  return responseData;
}

async function getAssets() {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };

  let apiUrl = `https://developer.api.autodesk.com/construction/assets/v2/projects/${projectID}/assets?filter[categoryId]=${catID}&includeCustomAttributes=true`;
  let allResults = []; // Array to hold all results across paginated requests

  // Loop to fetch all paginated data
  while (apiUrl) {
    try {
      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      // Add current page results to the total results
      allResults = allResults.concat(data.results);

      // Check if a nextUrl is present, and if so, update the apiUrl to the nextUrl
      if (data.pagination && data.pagination.nextUrl) {
        apiUrl = data.pagination.nextUrl;
      } else {
        apiUrl = null; // No more pages
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      break; // Stop on error
    }
  }

  console.log("ACC Response allAssets:", allResults);
  return allResults; // Return in the same structure as the previous version
}

async function getFormTemplates() {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  let apiUrl = `https://developer.api.autodesk.com/construction/forms/v1/projects/${projectID}/form-templates`;

  const response = await fetch(apiUrl, requestOptions);
  const data = await response.json();
  return data

}

async function uploadtoSP(array, fileName) {
  const bodyData = {
    fileName: fileName,
    inputArray: array,
  };

  const headers = {
    //'Authorization':'Bearer '+access_token,
    "Content-Type": "application/json",
  };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(bodyData),
  };
  const apiUrl =
    "https://prod-08.uksouth.logic.azure.com:443/workflows/936465390a80402abf0aab45f1bdc322/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=iQojsSUmBSNp-QpfEBvMN8WZrciGJXdLQNdduJWMpvY";
  //console.log(requestOptions)
  await fetch(apiUrl, requestOptions);
}

// Modal functionality
const modal = document.getElementById("assetModal");
const toggleButton = document.getElementById("toggleButton");
const closeModal = document.getElementById("closeModal");

// Toggle the modal when the button is clicked
toggleButton.addEventListener("click", () => {
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
  toggleButton.textContent =
    modal.style.display === "flex" ? "Hide Asset List" : "Show Asset List";
});

// Close the modal when the close (X) is clicked
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  toggleButton.textContent = "Show Asset List";
});

// Function to hide the loading screen with a fade effect
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Set the opacity to 0 (fade out)
    loadingScreen.style.opacity = '0';
    
    // Wait for the transition to complete (1 second in this case) before setting display to 'none'
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1000);  // Match the duration of the CSS transition (1 second)
}
