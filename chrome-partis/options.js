let table = document.getElementById('filters');

var filters = {
    "ot_chk40": "Blu-ray 1080p/i",
    "ot_chk42": "Blu-ray 720p/i",
    "ot_chk43": "Blu-ray B-Disc",
    "ot_chk41": "Blu-ray 3D",
    "ot_chk44": "Blu-ray Remux",
    "ot_chk45": "Blu-ray Remux/Disc",
    "ot_chk32": "UHD 4K Disc",
    "ot_chk55": "UHD 4K Remux",
    "ot_chk20": "HD",
    "ot_chk4": "DVD-R",
    "ot_chk7": "XviD",
    "ot_chk2": "Anime",
    "ot_chk30": "Risanke",
    "ot_chk5": "Sport",
    "ot_chk51": "TV 1080p/i",
    "ot_chk52": "TV 720p/i",
    "ot_chk53": "TV WEB-DL",
    "ot_chk38": "SD-TV",
    "ot_chk60": "TV-Xvid",
    "ot_chk54": "WEBRip",
    "ot_chk59": "WEB-DL",
    "ot_chk24": "Dokumentarci",
    "ot_chk10": "PC igre/ISO",
    "ot_chk11": "PC igre/Rips/Repack",
    "ot_chk64": "PC igre/Update & Patch",
    "ot_chk48": "Linux Igre",
    "ot_chk49": "Mac Igre",
    "ot_chk15": "PC programi/drugo",
    "ot_chk16": "PC programi/ISO",
    "ot_chk50": "Linux Programi",
    "ot_chk58": "Mac Programi",
    "ot_chk46": "Glasba/Flac",
    "ot_chk47": "Glasba/Mp3",
    "ot_chk8": "Glasba/Ostalo",
    "ot_chk22": "Music DVD",
    "ot_chk23": "Videospoti",
    "ot_chk9": "GBA",
    "ot_chk63": "PS4",
    "ot_chk12": "PS2",
    "ot_chk28": "PS3",
    "ot_chk13": "PSP",
    "ot_chk14": "XboX",
    "ot_chk27": "Wii",
    "ot_chk25": "GSM/Igre",
    "ot_chk61": "GSM/Programi",
    "ot_chk62": "GSM/Ostalo",
    "ot_chk26": "PDA",
    "ot_chk29": "Ipod",
    "ot_chk19": "Slike",
    "ot_chk3": "eKnjige",
    "ot_chk21": "AudioBook",
    "ot_chk37": "XXX-HD",
    "ot_chk36": "XXX-DVD",
    "ot_chk18": "XXX-XviD",
    "ot_chk35": "XXX-Clip",
    "ot_chk56": "XXX-eKnjige",
    "ot_chk39": "XXX-Slike"
};

var nCols = 3;
let rows = [];

function constructOptions(filters) {
    keys = Object.keys(filters); // Retrieve filter codes
    for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        //console.log(key);

        let row;
        // Check if new row is required
        if(i % nCols == 0) { // New row required
            row = document.createElement('tr');
            rows[rows.length] = row;
        } else { // Not required
            row = rows[rows.length - 1];
        }

        // Create new cell
        let cell = document.createElement('td');

        // Create checkbox
        let checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        checkbox.name = key;
        checkbox.id = checkbox.name;
        checkbox.addEventListener('click', function() {
            chrome.storage.sync.set({[checkbox.name]: checkbox.checked}, function() {
                if(chrome.runtime.lastError != null) {
                    console.log("Error: " + chrome.runtime.lastError);
                } else {
                    //console.log("Value of " + key + " stored as: " + checkbox.checked + ".")
                }
            });
        });

        // Create label
        let label = document.createElement('label');
        label.textContent = filters[key];
        label.htmlFor = checkbox.name;

        // Read current setting and set checkbox
        chrome.storage.sync.get(key, function(result) {
            if(chrome.runtime.lastError != null) {
                console.log("Error: " + chrome.runtime.lastError);
            } else {
                checkbox.checked = result[checkbox.name];
                //console.log("Value of " + key + ": " + result[checkbox.name])
            }
        });

        // Append DOM elements
        cell.appendChild(label);
        cell.appendChild(checkbox);

        // Append cell to row
        row.appendChild(cell);
    }

    // Append rows to tables
    for(i = 0; i < rows.length; i++) {
        table.appendChild(rows[i]);
    }
}

constructOptions(filters);
document.getElementById('close').addEventListener('click', function() {
    window.close();
});
