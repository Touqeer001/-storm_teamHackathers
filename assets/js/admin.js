function addUserForm(ele) {
  $.ajax({
    url: "/user/admin/add-user-form",
    type: "get",
    data: {},
    success: function (response) {
      $("#modal .modal-content").html(response);
    },
    error: function (err) {
      console.log(err);
      $(".modal").modal("hide");
    },
  });
}

function createUser(ele, event) {
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
      let employee = response.data.employee;
      let dom = createNewUserRow(employee);
      $('#all-users-table tbody').prepend(dom);
      showNotification("success", response.message);
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

function editUserForm(ele, employee_id) {
  $.ajax({
    url: "/user/admin/edit-user-form",
    type: "post",
    data: {
      employee_id: employee_id,
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

function updateUser(ele, event) {
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
      let employee = response.data.employee;
      $(`#row-${employee._id} .user-name`).html(employee.name);
      $(`#row-${employee._id} .user-email`).html(employee.email);
      $(`#row-${employee._id} .user-role`).html(employee.role);
      showNotification("success", response.message);
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

function removeUser(ele, employee_id) {
  $.ajax({
    url: "/user/admin/delete-user",
    type: "post",
    data: {
      employee_id: employee_id,
    },
    success: function (response) {
      $(`#row-${employee_id}`).remove();
      showNotification("success", response.message);
    },
    error: function (err) {
      console.log(err);
      let status;
      if (err.status == 500) status = "error";
      else status = "warning";
      showNotification(status, err.responseJSON.message);
    },
  });
}

function assignReviewersForm(ele,employee_id) {
  $.ajax({
    url: "/user/admin/assign-reviewers-form",
    type: "post",
    data: {
      employee_id:employee_id
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

function assignReviewers(ele, event) {
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

function editFeedbackForm(ele,for_user,from_user) {
  $.ajax({
    url: "/user/admin/edit-feedback-form",
    type: "post",
    data: {
      for_user: for_user,
      from_user: from_user
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

function createNewUserRow(employee){
  return dom = `<tr id="row-${employee._id}">
                  <td class="user-name">${employee.name}</td>
                  <td class="user-email">${employee.email}</td>
                  <td class="user-role">${employee.role}</td>
                  <td>
                    <i
                      class="fas fa-user-edit"
                      style="color: #1255ca"
                      data-bs-toggle="modal"
                      data-bs-target="#modal"
                      onclick="editUserForm(this,'${employee._id}')"
                    ></i>
                  </td>
                  <td>
                    <i
                      class="fas fa-user-times"
                      style="color: #cf200c"
                      onclick="removeUser(this,'${employee._id}')"
                    ></i>
                  </td>
                  <td>
                    <i
                      class="fas fa-user-plus"
                      style="color: #02a0e3"
                      data-bs-toggle="modal"
                      data-bs-target="#modal"
                      onclick="assignReviewersForm(this,'${employee._id}')"
                    ></i>
                  </td>
                  <td>
                    <i
                      class="fas fa-eye"
                      style="color: #038705"
                      onclick="goToPage(this,'/user/admin/view-reviewers/${employee._id}')"
                    ></i>
                  </td>
                </tr>`;
}