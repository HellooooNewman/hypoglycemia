app.filter('todayFilter', function() {
  return function(items, field) {

    var newItems = [];

    var currentDate = new Date();
    var tomorrow = new Date();

    currentDate.setHours(0, 0, 0, 0);
    tomorrow.setDate(currentDate.getDate() + 1);

    angular.forEach(items, function(item) {
      if (item[field] >= currentDate && item[field] <= tomorrow) {
        newItems.push(item);
      }
    });

    return newItems;
  }
});