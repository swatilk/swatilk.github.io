/*name, role and welcome message */
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span class="role">%data%</span>';
var HTMLwelcomeMsg = '<em>%data%</em>';

/*drop down menu*/
var HTMLdropProfile = '<li role="presentation"><a href="#header">%data%</a></li>';
var HTMLdropContact = '<li role="presentation"><a href="#topContacts">%data%</a></li>';
var HTMLdropWork = '<li role="presentation"><a href="#workExperience">%data%</a></li>';
var HTMLdropSkills ='<li role="presentation"><a href="#skillHeader">%data%</a></li>';
var HTMLdropProjects = '<li role="presentation"><a href="#projects">%data%</a></li>';
var HTMLdropEducation = '<li role="presentation"><a href="#education">%data%</a></li>';
var HTMLdropLocation = '<li role="presentation"><a href="#map-div">%data%</a></li>';

/*contact details*/
var HTMLcontactGeneric = '<i class="fa fa-book fa-2x"></i><h2>Contact</h2>';
var HTMLmobile = '<li class="contact-item"><i class="fa fa-mobile"></i><span>%data%</span></li>';
var HTMLemail = '<li class="contact-item"><i class="fa fa-envelope"></i><span>%data%</span></li>';
var HTMLtwitter = '<li class="contact-item"><i class="fa fa-twitter"></i><span>%data%</span></li>';
var HTMLgithub = '<li class="contact-item"><i class="fa fa-github-alt"></i><span>%data%</span></li>';
var HTMLlocation = '<li class="contact-item"><i class="fa fa-map-marker"></i><span>%data%</span></li>';

/*Navigation menu details */
var HTMLnavProfile = '<li class="nav-item"><a href="#header">%data%</a></li>';
var HTMLnavContact = '<li class="nav-item"><a href="#topContacts">%data%</a></li>';
var HTMLnavwork = '<li class="nav-item"><a href="#workExperience">%data%</a></li>';
var HTMLnavSkills = '<li class="nav-item"><a href="#skillHeader">%data%</a></li>';
var HTMLnavProjects = '<li class="nav-item"><a href="#projects">%data%</a></li>';
var HTMLnavEducation = '<li class="nav-item"><a href="#education">%data%</a></li>';
var HTMLnavMap = '<li class="nav-item"><a href="#map-div">%data%</a></li>';

/*skills header */
var HTMLskillsStart = '<i class="fa fa-wrench fa-2x"></i><h2 id="skillHeader">Skills</h2>';

/*Work details */
var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkTitle = '<div class="work-title">%data%</div>';
var HTMLworkEmployer = '<span class="work-employer">%data%';
var HTMLworkLocation = ' - %data%</span><br />';
var HTMLworkDates = '<span class="date-text">%data%</span>';
var HTMLworkDescription = '<p>%data%</p>';

/*Project details*/
var HTMLprojectStart = '<br /><div class="project-entry"></div>';
var HTMLprojectTitle = '<div class="project-title">%data%</div>';
var HTMLprojectDates = '<div class="date-text project-dates">%data%</div>';
var HTMLprojectDescription = '<p><br />%data%</p>';
var HTMLprojectImage = '<img src="%data%" class="project-image img-responsive">';

/*Education details*/
var HTMLschoolStart = '<br /><div class="education-entry"></div>';
var HTMLschoolName = '<div class="school-name">%data%';
var HTMLschoolDegree = ' -- %data%</div>';
var HTMLschoolDates = '<div class="date-text school-date">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<p><br />Major: %data%</p>';

/*Online class details*/
var HTMLonlineClasses = '<em><h4>Online Classes</h4></em>';
var HTMLonlineTitle = '<div class="online-name">%data%';
var HTMLonlineSchool = ' - %data%</div>';
var HTMLonlineDates = '<div class="date-text online-date">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a><br>';

/*Google Map header and the map div*/
var mapHeader = ' <i class="fa fa-map-marker fa-2x"><h2>Where I\'ve lived and worked</h2>';
var googleMap = '<div id="map"></div>';

/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName() || function(){};
    $('#name').html(iName);  
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  logClicks(loc.pageX, loc.pageY);
});



/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };


  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array
    for (var school in education.schools) {
      locations.push(education.schools[school].location);
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
    }

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
      infoWindow.open(map,marker);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});
