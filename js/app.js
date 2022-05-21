//create data and add to the DOM
fetch('https://randomuser.me/api/?results=52')
  .then(response => response.json())
  .then(data => {
    return data.results
  })
  .then(data => {
    return dataToStudentItems(data);
  })
  .then(() => {
    for(let i = 0; i < $('.student-item').length; i++){
      if(i > 7){
        $($('.student-item')[i]).hide();
      }
    }
    paginate($('.student-item').length);
  })
  // .then(data)


  //we can use this to modify list quantities
const dataToStudentItems = (data) => {
  data.map(item => {
    $('.student-list').append(
      $(`<li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${item.picture.large}"/>
        <h3>${item.name.first} ${item.name.last}</h3>
        <span class="email">${item.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">${item.registered.date}</span>
        <span class="city">${item.location.city}</span>
      </div>
    </li>`)
    )
  })
}

const paginate = (itemTotal) => {
  let numOfButtons = Math.ceil(itemTotal/8);
  for(let i = 0; i < numOfButtons; i++){
    $('.pagination').append($(`<li><a href="#">${i + 1}</a></li>`));
  }
  $('.pagination').on('click', (e) => {
    if(e.target.tagName == "A"){
      displayStudents(e.target.innerText)
    }
  })
}

const displayStudents = (pageNum) => {
  let max = pageNum * 8 - 1;
  let min = (pageNum - 1) * 8;
  for(let i = 0; i < $('.student-item').length; i++){
    if(i <= max && i >= min){
      $($('.student-item')[i]).show();
    }else{
      $($('.student-item')[i]).hide();
    }
  }
}

