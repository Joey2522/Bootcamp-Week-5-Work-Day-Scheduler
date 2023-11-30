//waits until the html and css have loaded before the scripts will render
$(document).ready(() => {
  
  //global variables
  const currentTime = dayjs().format("H");
  const localSettings = {};
  dayjs.locale(localSettings);

  //sets date and time
  function updateTime() {
    const today = dayjs();
    const formatdDate = today.format('MMM DD, YYYY');
    $('#date').text(formatdDate);
    const formatTime = today.format('h:mm:ss A');
    $('#time').text(formatTime);
  }
  //sets the color of the hourly block based off of the time
  function blockColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentTime);
      $(this).toggleClass('present', blockHour === currentTime);
      $(this).toggleClass('future', blockHour > currentTime);
      });
    }
    
  //refreshed the color of the hourly block when the hour changes while you are still on the site  
  function refreshColor() {
    $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        if (blockHour == currentTime) {
         $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentTime) {
           $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
      };
    });
  }

    //saves the entered text to the local storage when the save button is hit
  function textEntry() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }

  //allows the saved text to remain in the local storage even after a page refresh
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  //calls the functions
  blockColor();
  textEntry();
  refreshColor();

  //Updates the clock in 1 second intervals
  setInterval(updateTime, 1000);
});
