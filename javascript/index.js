var webName = document.getElementById("name");
var webURL = document.getElementById("URL");
var myForm = document.getElementById("myForm");
allSitesArr = [];
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,})([/\w .-]*)*\/?$/i;
const websiteNameRegex = /^[a-zA-Z0-9.-\s]+(\.[a-zA-Z]{2,})?$/;
const defaultProtocol = "https://";
if (localStorage.getItem("webSites") != null) {
  allSitesArr = JSON.parse(localStorage.getItem("webSites"));
  displaySites();
}
myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    !webURL.value.startsWith("http://") &&
    !webURL.value.startsWith("https://")
  ) {
    webURL.value = defaultProtocol + webURL.value;
  }

  // Check for duplicate website names
  const isDuplicateName = allSitesArr.some(
    (site) => site.sName === webName.value
  );
  if (isDuplicateName) {
    swal("Not valid!", "make sure the website name is not used", "error");
    return; // Exit the function if a duplicate name is found
  }

  if (urlRegex.test(webURL.value) && websiteNameRegex.test(webName.value)) {
    var site = {
      sName: webName.value,
      url: webURL.value,
    };
    allSitesArr.push(site);
    displaySites();
    clearForm();
    localStorage.setItem("webSites", JSON.stringify(allSitesArr));
    swal("Good job!", "Website was added to list!", "success");
  } else {
    swal(
      "Not valid!",
      `    Invalid URL or website name. Please enter valid data.
            URL Format: http(s)://example.com
       Website Name Format: alphanumeric characters, dots, hyphens, and spaces allowed`,
      "error"
    );
  }
});

function displaySites() {
  var cartoona = "";
  for (var i = 0; i < allSitesArr.length; i++) {
    cartoona += `
          <tr>
            <td>${i}</td>
            <td>${allSitesArr[i].sName}</td>
            <td>
            <a href="${allSitesArr[i].url}" target="_blank">
             <button class="btn btn-success " >
               <i class="fas fa-eye me-1"></i>Visit
              </button>
            </a>
             
            </td>
            <td>
              <button class="btn btn-warning pe-2 text-white" onclick ='deleteItem(${i})' >
               <i class="fas fa-trash-alt me-1"></i>
                Delete
              </button>
            </td>
          </tr>
        `;
  }
  document.querySelector("#tableContent").innerHTML = cartoona;
}

function clearForm() {
  webName.value = "";
  webURL.value = "";
}

function deleteItem(idx) {
  // Show confirmation alert
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this bookmark!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      allSitesArr.splice(idx, 1);
      localStorage.setItem("webSites", JSON.stringify(allSitesArr));
      displaySites();
      swal("Poof! Your bookmark has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your bookmark is safe!", {
        icon: "info",
      });
    }
  });
}
