// Retrieve all filters
var input = document.querySelectorAll('input[type="checkbox"][name="ddc"]');
var i = input.length;

// Read values from storage
chrome.storage.sync.get(null, function(items) {
    filters = JSON.parse(items.filters)

    for(key in filters) {
        let checkbox = document.getElementById(key);

        // If checkbox exist, set it to the value in storage
        if(checkbox != null) {
            if(!filters[key]) {
                // If unset, just remove the checkbox
                checkbox.checked = false;
            } else {
                // If set, click the checkbox
                checkbox.click();
            }
        }
    }
});
