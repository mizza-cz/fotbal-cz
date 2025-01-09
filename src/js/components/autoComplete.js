/*!
 * autoComplete.js
 */
(function () {
  if (document.querySelector(".js-autoComplete--clubs")) {
    const srcUrl = document.querySelector(".js-autoComplete--clubs").dataset.autocompleteSrc;
    const autoCompleteClubs = new autoComplete({
      selector: ".js-autoComplete--clubs",
      data: {
        src: async () => {
          try {
            // Loading placeholder text
            // document.getElementById("autoComplete").setAttribute("placeholder", "Loading...");
            // Fetch External Data Source
            const source = await fetch(srcUrl);
            const data = await source.json();
            // Post Loading placeholder text
            // document.getElementById("autoComplete").setAttribute("placeholder", autoCompleteJS.placeHolder);
            // Returns Fetched data
            return data;
          } catch (error) {
            return error;
          }
        },
        keys: ["id", "name"],
        cache: true
        // filter: (list) => {
        //   // Filter duplicates
        //   // incase of multiple data keys usage
        //   const filteredResults = Array.from(new Set(list.map((value) => value.match))).map((food) => {
        //     return list.find((value) => value.match === food);
        //   });

        //   return filteredResults;
        // }
      },
      resultsList: {
        element: (list, data) => {
          if (!data.results.length) {
            // Create "No Results" message element
            const message = document.createElement("p");
            // Add class to the created element
            message.setAttribute("class", "no_result");
            // Add message text content
            message.innerText = `Žádné výsledky pro "${data.query}"`;
            // Append message element to the results list
            list.prepend(message);
          }
          // const info = document.createElement("p");
          // if (data.results.length > 0) {
          //   info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
          // } else {
          //   info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
          // }
          // list.prepend(info);
        },
        noResults: true,
        maxResults: 999,
        tabSelect: true
      },
      resultItem: {
        element: (item, data) => {
          // console.log(data);
          // Modify Results Item Style
          // item.style = "display: flex; justify-content: space-between;";
          // Modify Results Item Content
          if (data.key === "name") {
            item.innerHTML = `
          <p class="result">
            ${data.match}
          </p>
          <p class="note">
            ${data.value.competition}
          </p>`;
          } else if (data.key === "id") {
            item.innerHTML = `
            <p class="result">
              ${data.value.name}
            </p>
            <p class="note">
              ${data.value.competition}
            </p>`;
          }
        },
        highlight: true
      },
      events: {
        input: {
          focus: () => {
            if (autoCompleteClubs.input.value.length) autoCompleteClubs.start();
          }
        }
      }
    });

    autoCompleteClubs.input.addEventListener("selection", function (event) {
      const feedback = event.detail;
      autoCompleteClubs.input.blur();
      // Prepare User's Selected Value
      const selection = feedback.selection.value[feedback.selection.key];
      // Render selected choice to selection div
      // document.querySelector(".selection").innerHTML = selection;
      // Replace Input value with the selected value
      autoCompleteClubs.input.value = selection;
      // Console log autoComplete data feedback
      // console.log(feedback);
      if (feedback.selection.value.url) {
        location.href = feedback.selection.value.url;
      }
    });
  }
})();
