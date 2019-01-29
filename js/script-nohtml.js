// Add variables that store DOM elements you will need to reference and/or manipulate
const $studentList = $('.student-list');
const $pageButtons = $('.pagination');
const $pageList = $('<ul></ul>');
const $pageHeader = $('.page-header');
const $searchDiv = $('<div class="student-search"></div>');
const $searchInput = $('<input placeholder="Search for students...">');
const $searchButton = $('<button>Search</button>');

//appending search bar
$pageHeader.append($searchDiv);
$searchDiv.append($searchInput);
$searchDiv.append($searchButton);

$pageButtons.append($pageList)

let page = 1;
//after searched results if any
//pushes the first 10 in the list to students[i]
const visibleStudents = searched => {
  //holds what students get shown
  const students = [];
  let limit = searched.length - (page - 1) * 10
  if(limit >= 10){
    limit = 10;
  }
  for(let i = 0; i < limit ; i++){
    students.push(searched[i + (page - 1) * 10]);
  }
  return students;
}

const search = includedText => {
  const searched = allStudents.filter(student => {
    if(student.name.includes(includedText)){
      return student;
    }//if includes
  })//filter;
  return searched;
}

//makes the list items for the students[i]
//and appends to the $studentList
const makeStudents = students =>{
  $studentList.html("");
  studentListItems = students.map(student => {
    return $(`<li class="student-item cf">
          <div class="student-details">
              <img class="avatar" src="${student.img}">
              <h3>${student.name}</h3>
              <span class="email">${student.email}</span>
          </div>
          <div class="joined-details">
                 <span class="date">Joined ${student.joined}</span>
         </div>
      </li>`);
  });
  studentListItems.forEach(studentItem => {
    $studentList.append(studentItem);
  });
}

//makes clickable buttons to change page
//or set of 10 students
const pageButtons = (searched) => {
  $pageList.html("");
  let numOfButtons = Math.ceil(searched.length/10);

  for(let i = 0; i < numOfButtons; i++){
    $pageList.append($(`<li><a href="#">${i + 1}</a></li>`));
  }

  return searched;
}
// visibleStudents(search("am"));
// visibleStudents()

//promise it
const loadPage = () => {
  new Promise(resolve => {
    resolve(search($searchInput.val()));
  })
    .then(pageButtons)
    .then(visibleStudents)
    .then(makeStudents);
}

new Promise(resolve => {
  page = 1;
  resolve(search($searchInput.val()));
})
  .then(pageButtons)
  .then(visibleStudents)
  .then(makeStudents);

//event listeners for pages and searches
$searchButton.on('click',function(e){
  page = 1;
  loadPage();
});
$pageList.on('click', function(e){
  page = e.target.text;
  loadPage();
});
