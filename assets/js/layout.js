var showNotification = (type, message) => {
  new Noty({
    theme: "relax",
    text: message,
    type: type,
    layout: "topCenter",
    timeout: 3000,
  }).show();
};

function goToPage(ele, url) {
  window.location.href = url;
}

function showBody(ele, targetElementId) {
  $(".home-body").hide();
  $(`#${targetElementId}`).show();

  $(".heading").removeClass("active");
  $(ele).addClass("active");
}

function openFeedbackForm(ele, for_user) {
  $.ajax({
    url: "/review/feedback-form",
    type: "post",
    data: {
      for_user: for_user,
    },
    success: function (response) {
      $("#modal .modal-content").html(response);
    },
    error: function (err) {
      console.log(err);
      $(".modal").modal("hide");
    },
  });
}

function viewFeedback(ele, for_user) {
  $.ajax({
    url: "/review/view-feedback",
    type: "post",
    data: {
      for_user: for_user,
    },
    success: function (response) {
      $("#modal .modal-content").html(response);
    },
    error: function (err) {
      console.log(err);
      $(".modal").modal("hide");
    },
  });
}

function updateFeedback(ele, event) {
  event.preventDefault();
  let form = $(ele);
  let formData = form.serialize();
  // console.log(formData);
  // return;
  $.ajax({
    url: form.attr("action"),
    type: form.attr("method"),
    data: formData,
    success: function (response) {
      $(".modal").modal("hide");
      showNotification("success", response.message);
      let employee = response.data.employee;
      if (response.data.previousStatus == "Pending" && response.data.reviewStatus == "Submitted") {
        $(`#pending-reviews-table tbody #row-${employee.id}`).remove();
        let dom = submittedReviewRow(employee);
        $(`#submitted-reviews-table tbody`).prepend(dom);
      } else if(response.data.previousStatus == "Submitted" && response.data.reviewStatus == "Pending"){
        $(`#submitted-reviews-table tbody #row-${employee.id}`).remove();
        let dom = pendingReviewRow(employee);
        $(`#pending-reviews-table tbody`).prepend(dom);
      }
    },
    error: function (err) {
      $(".modal").modal("hide");
      console.log(err);
      let status;
      if (err.status == 500) status = "error";
      else status = "warning";
      showNotification(status, err.responseJSON.message);
    },
  });
}

function submittedReviewRow(employee) {
  return (dom = `<tr id="row-${employee.id}">
                  <td class="user-name">${employee.name}</td>
                  <td class="user-email">${employee.email}</td>
                  <td>
                    <i
                      class="fas fa-eye"
                      style="color: #038705"
                      data-bs-toggle="modal"
                      data-bs-target="#modal"
                      onclick="viewFeedback(this,'${employee.id}')"
                    ></i>
                  </td>
                </tr>`);
}

function pendingReviewRow(employee) {
  return (dom = `<tr id="row-${employee.id}">
                  <td class="user-name">${employee.name}</td>
                  <td class="user-email">${employee.email}</td>
                  <td>
                    <i
                    class="fas fa-edit"
                    style="color: #1255ca"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                    onclick="openFeedbackForm(this,'${employee.id}')"
                    ></i>
                  </td>
                </tr>`);
}
