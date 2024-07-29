d3.csv("Car_sales.csv").then((data) => {
  data.forEach((d) => {
    d.Sales_in_thousands = +d.Sales_in_thousands;
    d.Price_in_thousands = +d.Price_in_thousands;
  });

  // Event listeners
  d3.select("#sceneMain").on("click", scatterplotMain);
  d3.select("#sceneTop10").on("click", scatterplotTop10);
  d3.select("#top10Bar").on("click", barChart3);
  d3.select("#sceneVersus").on("click", scatterplotVehicleType);
  d3.select("#versusPie").on("click", pieChartCarVsSUV);
  d3.select("#sceneByMake").on("click", scatterplotByMake);

  scatterplotMain();

  function scatterplotMain() {
    d3.select("#title-display").html(
      "Number of Cars Sold vs Price By Make and Model"
    );

    d3.select("#chart").html("");

    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Sales_in_thousands))
      .nice()
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Price_in_thousands))
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.Sales_in_thousands))
      .attr("cy", (d) => y(d.Price_in_thousands))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `${d.Manufacturer} ${d.Model}<br>Sold: ${d.Sales_in_thousands}k<br>Price: ${d.Price_in_thousands}k`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("Number of Vehicles Sold");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Selling Price (in thousands)");

    d3.select("#text-display").html(
      "This scatterplot shows the number of cars sold vs the price of the car. Each point represents a car model."
    );

    d3.select("#top10Bar").style("display", "none");
    d3.select("#versusPie").style("display", "none");
    d3.select("#dropdown-container").style("display", "none");
    d3.select("#text-display").style("display", "inline");
  }

  function scatterplotTop10() {
    d3.select("#title-display").html("Top 10 Models");

    d3.select("#chart").html("");

    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Sales_in_thousands))
      .nice()
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Price_in_thousands))
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    const top10 = data
      .sort((a, b) => b.Sales_in_thousands - a.Sales_in_thousands)
      .slice(0, 10);

    const topSelling = top10[0];

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.Sales_in_thousands))
      .attr("cy", (d) => y(d.Price_in_thousands))
      .attr("r", 5)
      .attr("fill", (d) => (top10.includes(d) ? "orange" : "steelblue"))
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `${d.Manufacturer} ${d.Model}<br>Sold: ${d.Sales_in_thousands}k<br>Price: ${d.Price_in_thousands}k`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    const annotationX = x(topSelling.Sales_in_thousands);
    const annotationY = y(topSelling.Price_in_thousands) - 10;

    const textAnchor = annotationX > width - 150 ? "end" : "start";
    const textX = annotationX > width - 150 ? annotationX - 5 : annotationX + 5;

    svg
      .append("text")
      .attr("x", textX)
      .attr("y", annotationY)
      .attr("fill", "black")
      .attr("font-size", "12px")
      .attr("text-anchor", textAnchor)
      .text(
        `The ${topSelling.Manufacturer} ${topSelling.Model} is the top-selling model`
      );

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("Number of Vehicles Sold");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Selling Price (in thousands)");

    d3.select("#top10Bar").style("display", "inline");
    d3.select("#versusPie").style("display", "none");
    d3.select("#dropdown-container").style("display", "none");
    d3.select("#text-display").style("display", "none");
  }

  function scatterplotVehicleType() {
    d3.select("#title-display").html("Passenger vs SUV");

    d3.select("#chart").html("");

    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Sales_in_thousands))
      .nice()
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Price_in_thousands))
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.Sales_in_thousands))
      .attr("cy", (d) => y(d.Price_in_thousands))
      .attr("r", 5)
      .attr("fill", (d) =>
        d.Vehicle_type === "Car"
          ? "green"
          : d.Vehicle_type === "Passenger"
          ? "red"
          : "steelblue"
      )
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `${d.Manufacturer} ${d.Model}<br>Type: ${
              d.Vehicle_type === "Car" ? "SUV" : d.Vehicle_type
            }`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("Number of Vehicles Sold");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Selling Price (in thousands)");

    svg
      .append("text")
      .attr("x", 10)
      .attr("y", -10)
      .attr("fill", "green")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("SUVs are colored green");

    svg
      .append("text")
      .attr("x", 10)
      .attr("y", 10)
      .attr("fill", "red")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Passenger cars are colored red");

    d3.select("#top10Bar").style("display", "none");
    d3.select("#versusPie").style("display", "inline");
    d3.select("#dropdown-container").style("display", "none");
    d3.select("#text-display").style("display", "none");
  }

  function scatterplotByMake() {
    d3.select("#title-display").html("Filter by Manufacturer");

    d3.select("#chart").html("");

    const dropdownContainer = d3.select("#dropdown-container");
    dropdownContainer.html("");

    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Sales_in_thousands))
      .nice()
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Price_in_thousands))
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const dropdown = d3.select("#dropdown-container").append("select");
    const manufacturers = Array.from(new Set(data.map((d) => d.Manufacturer)));
    console.log(manufacturers);

    dropdown
      .selectAll("option")
      .data(manufacturers)
      .enter()
      .append("option")
      .attr("value", (d) => d)
      .text((d) => d);

    dropdown.on("change", function () {
      const selectedManufacturer = this.value;
      const filteredData = data.filter(
        (d) => d.Manufacturer === selectedManufacturer
      );

      svg.selectAll("circle").remove();

      svg
        .selectAll("dot")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.Sales_in_thousands))
        .attr("cy", (d) => y(d.Price_in_thousands))
        .attr("r", 5)
        .attr("fill", "steelblue")
        .on("mouseover", (event, d) => {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(
              `${d.Manufacturer} ${d.Model}<br>Sold: ${d.Sales_in_thousands}k<br>Price: ${d.Price_in_thousands}k`
            )
            .style("left", event.pageX + 5 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", () => {
          tooltip.transition().duration(500).style("opacity", 0);
        });

      const totalSales = d3.sum(filteredData, (d) => d.Sales_in_thousands);
      const roundedSales = totalSales.toFixed(3);
      d3.select("#text-display").html(
        `Total vehicles sold by ${selectedManufacturer}: ${roundedSales}k`
      );
    });

    svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.Sales_in_thousands))
      .attr("cy", (d) => y(d.Price_in_thousands))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `${d.Manufacturer} ${d.Model}<br>Sold: ${d.Sales_in_thousands}k<br>Price: ${d.Price_in_thousands}k`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("Number of Vehicles Sold");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Selling Price (in thousands)");

    d3.select("#text-display").html(
      "Select a Manufacturer from the dropdown to filter the scatterplot."
    );

    d3.select("#top10Bar").style("display", "none");
    d3.select("#versusPie").style("display", "none");
    d3.select("#dropdown-container").style("display", "inline");
    d3.select("#text-display").style("display", "inline");
  }

  function barChart3() {
    d3.select("#title-display").html("Top 10 Cars Sold By Make and Model");

    d3.select("#chart").html("");

    const margin = { top: 20, right: 30, bottom: 90, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const top10 = data
      .sort((a, b) => b.Sales_in_thousands - a.Sales_in_thousands)
      .slice(0, 10);

    const x = d3
      .scaleBand()
      .domain(top10.map((d) => `${d.Manufacturer} ${d.Model}`))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(top10, (d) => d.Sales_in_thousands)])
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll(".bar")
      .data(top10)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(`${d.Manufacturer} ${d.Model}`))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.Sales_in_thousands))
      .attr("height", (d) => height - y(d.Sales_in_thousands))
      .attr("fill", "orange")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `${d.Manufacturer} ${d.Model}<br>Sold: ${d.Sales_in_thousands}k<br>Price: ${d.Price_in_thousands}k`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("Make and Model");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Vehicles Sold");
  }

  function pieChartCarVsSUV() {
    d3.select("#title-display").html(
      "Passenger vs SUV Sales By Make and Model"
    );

    d3.select("#chart").html("");

    const vehicleTypeData = d3
      .rollups(
        data,
        (v) => d3.sum(v, (d) => d.Sales_in_thousands),
        (d) => d.Vehicle_type
      )
      .map(([key, value]) => ({
        Vehicle_type: key === "Car" ? "SUV" : key,
        Sales_in_thousands: value,
      }));

    const totalSales = d3.sum(vehicleTypeData, (d) => d.Sales_in_thousands);

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr(
        "transform",
        `translate(${(width + margin.left + margin.right) / 2},${
          (height + margin.top + margin.bottom) / 2
        })`
      );

    const color = d3
      .scaleOrdinal()
      .domain(["SUV", "Passenger"])
      .range(["green", "red"]);

    const pie = d3.pie().value((d) => d.Sales_in_thousands);

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const labelArc = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const g = svg
      .selectAll(".arc")
      .data(pie(vehicleTypeData))
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", (d) => color(d.data.Vehicle_type));

    g.append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text((d) => {
        const percentage = Math.round(
          (d.data.Sales_in_thousands / totalSales) * 100
        );
        const sales = d.data.Sales_in_thousands.toFixed(3);
        return `${d.data.Vehicle_type}\n(${percentage}%)\n Sold: ${sales}k`;
      });

    d3.select("#text-display").html(
      "This pie chart shows the percentage of SUVs and Cars sold."
    );

    d3.select("#top10Bar").style("display", "none");
    d3.select("#versusPie").style("display", "inline");
    d3.select("#dropdown-container").style("display", "none");
    d3.select("#text-display").style("display", "inline");
  }

  // highlight buttons
  const buttons = document.querySelectorAll("button");

    function highlightButton(button) {
      buttons.forEach((btn) => btn.classList.remove("highlighted"));
      button.classList.add("highlighted");
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        highlightButton(button);
      });
    });

    const defaultButton = document.getElementById("sceneMain");
    highlightButton(defaultButton);
});
