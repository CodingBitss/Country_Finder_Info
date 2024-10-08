document.addEventListener("DOMContentLoaded", function () {
    const fetchButton = document.getElementById("fetchButton");

    fetchButton.addEventListener("click", function () {
        const country_name = document.getElementById("countryInput").value;
        
        if (country_name === "") {
            alert("Please enter a country name.");
            return;
        }

        const api_url = `https://restcountries.com/v3.1/name/${country_name}`;

        fetch(api_url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Country not found");
                }
                return response.json();
            })
            .then(data => {
                const countryData = data[0];

                document.getElementById("country").textContent = countryData.name.common;
                document.getElementById("capital").textContent = countryData.capital ? countryData.capital[0] : "N/A";
                document.getElementById("population").textContent = countryData.population.toLocaleString();
                document.getElementById("area").textContent = `${countryData.area} km²`;
                document.getElementById("currencies").textContent = Object.values(countryData.currencies)[0].name;
                document.getElementById("languages").textContent = Object.values(countryData.languages).join(", ");
                document.getElementById("borders").textContent = countryData.borders ? countryData.borders.join(", ") : "None";
                document.getElementById("region").textContent = countryData.region;
                document.getElementById("subregion").textContent = countryData.subregion;
            })
            .catch(error => {
                alert("Error fetching country data: " + error.message);
            });
    });
});
