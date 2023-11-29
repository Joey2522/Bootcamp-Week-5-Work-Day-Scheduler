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

  function blockColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentTime);
      $(this).toggleClass('present', blockHour === currentTime);
      $(this).toggleClass('future', blockHour > currentTime);
      });
    }
    
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

  function textEntry() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }

  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  blockColor();
  textEntry();
  refreshColor();
  //Updates the clock in 1 second intervals
  setInterval(updateTime, 1000);
});
