// Add variables that store DOM elements you will need to reference and/or manipulate
const $studentItems = $('.student-item');
const $pageButtons = $('.pagination');
const $pageList = $('<ul></ul>');
const $pageHeader = $('.page-header');
const $searchDiv = $('<div class="student-search"></div>');
const $searchInput = $('<input placeholder="Search for students...">');
const $searchButton = $('<button>Search</button>');

//appending search bar
$searchDiv.append($searchInput);
$searchDiv.append($searchButton);
$pageHeader.append($searchDiv);

//returns matches from searched
const search = (searchName, list) => {
  $searchItems = list.filter(item => {
    if($(list[item]).find('h3').text().includes(searchName)){
      return list[item];
    }else{
    }
  });
  return $searchItems;
}

//list, page, and an interval to know what and how much to show
const displayStudents = ({list, page = 0, interval = 10} = {}) => {
  //hides everything by default
  $studentItems.hide();
  list.each(function (index,element){
    //shows only the page to the current page
    if(index < (page + 1) * interval){
      if(index > interval * page - 1){
         $(element).show();
      }
    }
  })
}

//takes a list.length value to determine number of buttons
const buttonDisplay = ({itemTotal, interval = 10} = {}) => {
  //resets list links displayed
  $pageList.empty();

  for(i = 0; i < Math.ceil(itemTotal / interval); i++){
    let $button = $('<li><a href="#" class"search">' + (i + 1) + '</a></li>');
    if(i === 0){
      $button = $('<li><a href="#" class"search active">' + (i + 1) + '</a></li>');
    }
    $pageList.append($button);
  }
  $pageButtons.append($pageList);
}

const updateButtons = evnt => {
  const pgnum = $(evnt.target).text() - 1;
  $('a').removeClass('active')
  $(evnt.target).addClass('active');
  displayStudents({
    list: $searchItems,
    page: pgnum
  });
}

//load first 10 items without search filter
displayStudents({list: $studentItems});
buttonDisplay({itemTotal: $studentItems.length});
let $searchItems = $studentItems;

//changes page
$pageButtons.on('click', function(e){
  if(e.target.tagName == 'A'){
    updateButtons(e);
  }
});

//search functionality
$searchButton.on('click', function(){
  $searchItems = search($searchInput.val(),$studentItems);
  if($searchItems.length == 0){
    $pageHeader.append($('<h2 class="alert">Sorry no search results found.</p>'))
  }else{
    $('.alert').hide();
    displayStudents({list: $searchItems});
    buttonDisplay({itemTotal: $searchItems.length});
  }
});
