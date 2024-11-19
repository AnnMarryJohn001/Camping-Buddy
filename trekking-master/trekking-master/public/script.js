/*

document.addEventListener("DOMContentLoaded", function () {
  // Function to search and display camping locations
  function searchCampingLocations() {
      const searchInput = document.getElementById("searchInput").value.toLowerCase();
      const postBlocks = document.querySelectorAll(".post_block");

      postBlocks.forEach(function (postBlock) {
          const locationName = postBlock.querySelector("h2").textContent.toLowerCase();
          if (locationName.includes(searchInput)) {
              postBlock.style.display = "block";
          } else {
              postBlock.style.display = "none";
          }
      });
  }

  // Add event listener to the search button
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", searchCampingLocations);

  // Your existing code...
});




document.addEventListener("DOMContentLoaded", function () {
    // Function to search and display camping locations
    function searchCampingLocations() {
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const postBlocks = document.querySelectorAll(".post_block");
        const noResultsMessage = document.getElementById("noResultsMessage");
  
        let foundMatch = false;
  
        postBlocks.forEach(function (postBlock) {
            const locationName = postBlock.querySelector("h2").textContent.toLowerCase();
            if (locationName.includes(searchInput)) {
                postBlock.style.display = "block";
                foundMatch = true;
            } else {
                postBlock.style.display = "none";
            }
        });
  
        // Display a message when no matches are found
        if (!foundMatch) {
            noResultsMessage.style.display = "block";
        } else {
            noResultsMessage.style.display = "none";
        }
    }
  
    // Add event listener to the search button
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", searchCampingLocations);
  
    // Your existing code...
  
  });
  
  */

  document.addEventListener("DOMContentLoaded", function () {
    // Function to search and display camping locations
    function searchCampingLocations() {
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const postBlocks = document.querySelectorAll(".post_block");
        const noResultsMessage = document.getElementById("noResultsMessage");
  
        let foundMatch = false;
  
        postBlocks.forEach(function (postBlock) {
            const locationName = postBlock.querySelector("h2").textContent.toLowerCase();
            const paragraphs = postBlock.querySelectorAll("p");
  
            // Check for a match in location name
            if (locationName.includes(searchInput)) {
                postBlock.style.display = "block";
                foundMatch = true;
            } else {
                let paragraphMatch = false;
  
                // Check for a match in all paragraph contents
                paragraphs.forEach(function (paragraph) {
                    const paragraphContent = paragraph.textContent.toLowerCase();
                    if (paragraphContent.includes(searchInput)) {
                        postBlock.style.display = "block";
                        paragraphMatch = true;
                        foundMatch = true;
                    }
                });
  
                // If no paragraph matches, hide the block
                if (!paragraphMatch) {
                    postBlock.style.display = "none";
                }
            }
        });
  
        // Display a message when no matches are found
        if (!foundMatch) {
            noResultsMessage.style.display = "block";
        } else {
            noResultsMessage.style.display = "none";
        }
    }
  
    // Add event listener to the search button
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", searchCampingLocations);
  
    // Your existing code...
  
  });
  