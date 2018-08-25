// Add variables that store DOM elements you will need to reference and/or manipulate
const $studentItems = $('.student-item');
const $pageButtons = $('.pagination');
const $pageList = $('<ul></ul>');
const $pageHeader = $('.page-header');
const $searchDiv = $('<div class="student-search"></div>');
const $searchInput = $('<input placeholder="Search for students...">');
const $searchButton = $('<button>Search</button>');

let $searchItems = [];
let $button;
let pgnum = 0;
let searchName = "";

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
//adds students to the list
$studentItems.each(function(index){
  $searchItems.push($(this));
});
//takes in list and page number to know what and how much to show
const visibleDisplay = (list, page) =>{
  for(i = 0; i < list.length; i++){
    //hides everything by default
    list[i].hide();
    //shows only the page to the current page
    if(i < (page + 1) * 10){
      if(i > 10 * page - 1){
        list[i].show();
      }
    }
  }
}
visibleDisplay($searchItems, pgnum);
// Create and append the pagination links - Creating a function that can do this is a good approach
//takes a list.length value to determine number of buttons
buttonDisplay = (itemTotal) => {
  //resets list links displayed
  $pageList.empty();
  //makes new links
  for(i = 0; i < Math.ceil(itemTotal / 10); i++){
    //adds buttons with respective numbers to the ul
    //gives active class to first page by default
    if(i === 0){
      $button = $('<li><a href="#" class="active">' + (i + 1) + '</a></li>');
    }else{
      $button = $('<li><a href="#" class"search">' + (i + 1) + '</a></li>');
    }
    //adds the button to the new list of links
    $pageList.append($button);
  }
}
buttonDisplay($studentItems.length);

//adds the ul to the div
$pageButtons.append($pageList);

// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
$pageButtons.on('click', function(e){
  //reassigning acive button
  $('a').removeClass('active')
  //update page number
  pgnum = $(e.target).text() - 1;
  //display which page is active
  $(e.target).addClass('active');
  //update page
  visibleDisplay($searchItems,pgnum)
});

//appending search bar
$searchDiv.append($searchInput);
$searchDiv.append($searchButton);
$pageHeader.append($searchDiv);
//search functionality
$searchButton.on('click', function(){
  //clears list on search
  $searchItems = [];
  //resets page to 0
  pgnum = 0;
  searchName = $searchInput.val()
  //check through each student item for matching strings
  $studentItems.each(function(index){
    if($(this).find('h3').text().includes(searchName)){
      //add anything that matches to the search list
      $searchItems.push($(this));
    }
  });
  //notifies if no results found after clicking search
  if($searchItems.length == 0){
    $pageHeader.append($('<h2 class="alert">Sorry no search results found.</p>'))
  }else{
    $('.alert').hide();
  }
  //updates page and number of buttons
  visibleDisplay($searchItems,pgnum);
  buttonDisplay($searchItems.length);
});
