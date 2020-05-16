window.onload = () => {
  console.log("Window loaded.");

  let nextLine = (string) => {
    var line = string.substring(0, string.indexOf("\n") + 1);
    return line;
  };

  let xhr = new XMLHttpRequest();
  xhr.open("Get", "./data.txt");
  xhr.onload = () => {
    if (xhr.status != 200) {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      var text = xhr.responseText.trim();
      var objs = [];
      var key = 0;
      do {
        // set info from text to variables
        text = text.substring(text.indexOf("<>") + "<>".length).trim();

        var nameArray = text.substring(0, text.indexOf("\n"));
        text = text.replace(nameArray, "").trim();
        nameArray = nameArray.toLowerCase();

        nameArray = nameArray.split(" ");
        nameArray = nameArray.map((x) => x.trim().replace("\r", ""));
        nameArray = nameArray.map((name) =>
          name.includes("q.c.") ? name.toUpperCase() : name
        );
        nameArray = nameArray.map(
          (name) =>
            name.charAt(0).toUpperCase() + name.substring(1, name.length)
        );
        nameArray = nameArray.map((name) =>
          name.charAt(0) == "("
            ? name.replace(name.charAt(1), name.charAt(1).toUpperCase())
            : name
        );

        var nameURL = nameArray
          .join("")
          .replace(".", "")
          .replace(",", "")
          .replace(".", "")
          .replace(",", "");
        var name = nameArray.join(" ");
        var photoURLs = [nameURL + "1.jpg", nameURL + "2.jpg"];
        //console.log(name);

        var positionPractice = text.substring(0, text.indexOf("\n"));
        var position = positionPractice
          .substring(0, positionPractice.indexOf("/") + 1)
          .trim();
        var practice = positionPractice.replace(position, "");
        position = position.replace("/", "").trim();
        practice = practice.trim();
        practice = practice.split(",");
        practice = practice.map((x) => x.trim().replace("&", "And"));
        practice = practice.map((x) =>
          x == "Insolvency" ? "Bankruptcy, Insolvency And Restructuring" : x
        );
        practice = practice.map((x) =>
          x == "Wills And Estates" ? "Estate Litigation / Wills And Estates" : x
        );
        practice = practice.map((x) =>
          x == "Real Estate" ? "Real Estate Law" : x
        );

        text = text.replace(positionPractice, "").trim();
        //  console.log(position+" "+practice);

        var bio = text.substring(0, text.indexOf("Contact")).trim();
        text = text.replace(bio, "").replace("Contact", "").trim();
        bio = bio.split("\n");
        bio = bio.filter((x) => x.length > 1);
        // console.log(bio);

        var contact = text.substring(0, text.indexOf("Education")).trim();
        // console.log(contact);
        text = text.replace(contact, "").replace("Education", "").trim();

        var education = text.substring(
          0,
          text.indexOf("Professional and Community Experience")
        );
        text = text
          .replace(education, "")
          .replace("Professional and Community Experience", "")
          .trim();
        education = education.split("\n");
        education = education.filter((x) => x.length > 1);
        // console.log(education);

        var experience = text.substring(0, text.indexOf("</>"));
        text = text.replace(experience, "");
        experience = experience.split("\n");
        experience = experience.filter((x) => x.length > 1);
        //console.log(experience);

        objs.push({
          key,
          nameURL,
          name,
          nameArray,
          photoURLs,
          position,
          practice,
          bio,
          contact,
          education,
          experience,
        });

        // save to json file(s)

        key++;
      } while (text.includes("<>")); //Check for more profiles

      console.log(objs);
      var objstringified = JSON.stringify(objs);

      const body = document.getElementById("body");
      body.innerHTML = JSON.stringify(objs);
    }
  };
  xhr.send();

  // localStorage.setItem("field","value");
};
