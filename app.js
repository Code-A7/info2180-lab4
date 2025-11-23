window.onload = () => {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchField");
    const result = document.getElementById("result");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let query = input.value.trim();

        // sanitize to prevent injection
        query = query.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        let url = "superheroes.php";

        if (query !== "") {
            url += "?query=" + encodeURIComponent(query);
        }

        fetch(url)
            .then(response => response.text())
            .then(data => {
                // PHP already returns clean HTML: <ul> list OR <h3><h4><p> OR "Superhero not found"
                result.innerHTML = data;
            })
            .catch(error => {
                result.innerHTML = "An error occurred while retrieving data.";
            });
    });
};

