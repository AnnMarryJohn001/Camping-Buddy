document.addEventListener("DOMContentLoaded", function () {
    // Function to search and display camping locations
    function searchCampingLocations() {
        const searchInput1 = document.getElementById("searchInput1").value.toLowerCase();
        const searchInput2 = document.getElementById("searchInput2").value.toLowerCase();
        const postBlocks = document.querySelectorAll(".post_block");
        const noResultsMessage = document.getElementById("noResultsMessage");

        postBlocks.forEach(function (postBlock) {
            const locationName = postBlock.querySelector("h2").textContent.toLowerCase();
            const paragraphs = postBlock.querySelectorAll("p");

            const matchInput1 = locationName.includes(searchInput1);
            const matchInput2 = locationName.includes(searchInput2);

            let paragraphMatch1 = false;
            let paragraphMatch2 = false;

            paragraphs.forEach(function (paragraph) {
                const paragraphContent = paragraph.textContent.toLowerCase();
                if (paragraphContent.includes(searchInput1)) {
                    paragraphMatch1 = true;
                }
                if (paragraphContent.includes(searchInput2)) {
                    paragraphMatch2 = true;
                }
            });

            if ((matchInput1 || paragraphMatch1) && (matchInput2 || paragraphMatch2)) {
                postBlock.style.display = "block";
            } else {
                postBlock.style.display = "none";
            }
        });

        // Check if there are no results
        const allHidden = [...postBlocks].every(postBlock => postBlock.style.display === "none");
        if (allHidden) {
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
