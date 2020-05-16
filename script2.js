const open = "<>";
const Close = "</>";
var practiceAreas = [];
var key = 0;
window.onload = () => {
  var xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status == 200) {
      var responseText = xhr.responseText;

      do {
        var textPortion = responseText.substring(
          0,
          responseText.indexOf("</>") + 5
        );
        responseText = responseText.replace(textPortion, "");

        textPortion = textPortion.substring(textPortion.indexOf("<>") + 4);
        var name = textPortion.substring(0, textPortion.indexOf("\n"));
        textPortion = textPortion.replace(name, "");
        name = name.trim().toLowerCase().replace("&", "and");
        var name = name.split(" ");

        var nameURL = name.join("_").replace(",", "");

        name = name.map(
          (word) =>
            word.charAt(0).toUpperCase() + word.substring(1, word.length)
        );
        name = name.join(" ");

        var description = textPortion.substring(
          0,
          textPortion.indexOf("We can guide you through")
        );
        if (name == "Civil Litigation")
          description = textPortion.substring(
            0,
            textPortion.indexOf("Our wide range of experience")
          );

        textPortion = textPortion.replace(description, "");
        description = description.split("\n");
        description = description.filter(
          (desc) => desc != "" && desc != " " && desc != "\r"
        );

        var subAreasRough = textPortion.substring(
          0,
          textPortion.indexOf("contact us".toUpperCase())
        );
        textPortion = textPortion.replace(subAreasRough, "");

        var subAreas = [];
        subAreasRough = subAreasRough.split("\n");
        subAreasRough.forEach((subArea) => {
          if (subArea.trim() != "") {
            subAreas.push(subArea);
          }
        });
        subAreas.shift();

        var teamRough = textPortion
          .replace("contact us".toUpperCase(), "")
          .replace("</>", "");
        teamRough = teamRough.split("\n");
        var team = [];
        teamRough.forEach((element) => {
          if (element.trim() != "") {
            team.push(element);
          }
        });

        var practiceArea = {
          key: key,
          name: name,
          nameURL: nameURL,
          description: description,
          subAreas: subAreas,
          team: team,
        };

        practiceAreas.push(practiceArea);

        key++;
      } while (responseText.includes("<>"));
      console.log(practiceAreas);

      document.getElementById("body").innerText = JSON.stringify(practiceAreas);
    }
  };
  xhr.open("GET", "data2.txt");
  xhr.send();
};
