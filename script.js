document.getElementById("convert").addEventListener("click", function () {
  let markdownText = document.getElementById("markdown").value;
  let div = document.createElement("div");
  div.innerHTML = marked.parse(markdownText);
  let h1 = div.getElementsByTagName("h1")[0].textContent;
  console.log(h1);
  let elements = div.childNodes;
  let radio = document.getElementById("toggle").checked;
  let output = radio !== true ?  '<section class="odi-content">\n' : `<section class="odi-content"> 
  <div class="banner-img b-0">
      <img src="https://odi-test.opensourcelearning.co.uk/draftfile.php/2787/user/draft/418161189/Moodle-header-UDE-AI_M4.png" alt="banner image" width="3000" height="462" role="presentation" class="img-fluid 0">
      <h2 class="top-left"><span>${h1}</span></h2>
  </div>`;
  
  let colorClasses = [
    "info",
    "discuss",
    "reflect",
    "practice",
    "produce",
    "enquire",
    "journal",
  ];
  let iconClasses = [
    "odi-icon-summary",
    "odi-icon-podcast",
    "odi-icon-discuss",
    "odi-icon-reflect",
    "odi-icon-practice",
    "odi-icon-produce",
    "odi-icon-enquire",
    "odi-icon-journal",
    "odi-icon-emphasis",
    "odi-icon-link",
    "odi-icon-video",
  ];
  let colorIndex = 0;
  let iconIndex = 0;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (element.tagName === "H1" || element.tagName === "H2") {
      let nextElement = elements[i + 1];
      output += `<div class="panel ${colorClasses[colorIndex]}">\n`;
      output += `<h2 class="odi-icon ${iconClasses[iconIndex]}">${element.textContent}</h2>\n`;
      while (
        nextElement &&
        nextElement.tagName !== "H1" &&
        nextElement.tagName !== "H2"
      ) {
        if (nextElement.tagName === "P") {
          output += `<p>${nextElement.textContent}</p>\n`;
        } else if (nextElement.tagName === "UL") {
          output += "<ul>\n";
          let listItems = nextElement.getElementsByTagName("li");
          for (let j = 0; j < listItems.length; j++) {
            output += `<li>${listItems[j].textContent}</li>\n`;
          }
          output += "</ul>\n";
        }
        nextElement = nextElement.nextElementSibling;
      }
      output += "</div>\n";
      colorIndex = (colorIndex + 1) % colorClasses.length;
      iconIndex = (iconIndex + 1) % iconClasses.length;
    }
  }
  output += "</section>\n";
  document.getElementById("output").value = output;
  document.getElementById("preview").innerHTML = output;
});

var output = document.getElementById("output");
output.addEventListener("keyup", function () {
  document.getElementById("preview").innerHTML = output.value;
});

var copy = document.getElementById("copy");
copy.addEventListener("click", function () {
  var output = document.getElementById("output");
  var outputText = output.value;

  navigator.clipboard
    .writeText(outputText)
    .then(function () {
      console.log("Text copied successfully!");
    })
    .catch(function (err) {
      console.error("Failed to copy text: ", err);
    });
});
