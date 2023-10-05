$(document).ready(function () {
  let tableHospital = $("#tableHospital tbody");
  let prev = $("#prev");
  let next = $("#next");
  let countDiv = $("#count");
  let hospitalData; // Store the fetched data globally

  let count = 1;
  countDiv.text(count);

  function apiCall() {
    $.ajax({
      url: "WEQ.json",
      dataType: "json",
      success: function (data) {
        hospitalData = data;
        createTable(hospitalData); // calling the table function
      },
      error: function (xhr, status, error) {
        console.error("API call failed:", status, error);
      },
    });
  }

  apiCall();

  function createTable(hospitalData) {
    // Clear existing table rows
    tableHospital.empty();

    hospitalData?.slice(count * 10 - 10, count * 10).map(function (data) {
      // Pagination by using slice
      tableHospital.append(`
                <tr>
                    <td>${data["Sr. No."]}</td>
                    <td>${data.Hospital}</td>
                    <td>${data.City}</td>
                    <td>${data.State}</td>
                    <td>${data.Address}</td>
                    <td>${data.Pin}</td>
                </tr>`);
    });
  }

  prev.on("click", function () {
    if (count > 1) {
      count--;
      countDiv.text(count);
      createTable(hospitalData); // Pass hospitalData as an argument
    }
  });

  next.on("click", function () {
    if (count < Math.ceil(hospitalData.length / 10)) {
      count++;
      countDiv.text(count);
      createTable(hospitalData); // Pass hospitalData as an argument
    }
  });

  // Initial table creation
  createTable(hospitalData);
});
