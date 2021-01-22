/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/actor.js":
/*!*******************************!*\
  !*** ./resources/js/actor.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modals_actorM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals/actorM */ "./resources/js/modals/actorM.js");

var actor = {
  show: function show(response) {
    var template = "\n        <thead>\n            <tr>\n                <th>ID</th>\n                <th>First Name</th>\n                <th>Last Name</th>\n                <th>Notes</th>\n                <th>Actions</th>\n            </tr>\n        </thead>\n        <tbody id=\"actorData\"></tbody>\n    ";
    var title = "<h1> Actors </h1>";
    var headtitle = "<title> Actors </title>";
    var createbtn = "<button type=\"button\" class=\"btn btn-color\" data-toggle=\"modal\" data-target=\"#actorCreateModal\"> Add New Actor </button>";
    $('#headtitle').html(headtitle);
    $('#title').html(title);
    $('#createbtn').html(createbtn);
    $('#tableContent').html(template);
    $('#content').append(_modals_actorM__WEBPACK_IMPORTED_MODULE_0__.default); //View

    response.forEach(function (actor) {
      $('#actorData').append("\n                <tr>\n                    <td>".concat(actor.id, "</td>\n                    <td>").concat(actor.fname, "</td>\n                    <td>").concat(actor.lname, "</td>\n                    <td>").concat(actor.note, "</td>\n                    <td>\n                        <i class=\"fas fa-edit actorEditIcon\" data-toggle=\"modal\" \n                            data-target=\"#actorEditModal\" id=\"").concat(actor.id, "\"></i> | \n                        \n                        <i class=\"fas fa-trash-alt actorDeleteIcon\" id=\"").concat(actor.id, "\"></i>\n                    </td>\n                </tr>\n            "));
    });
    var valcreate = $('#actorCreateForm').validate({
      rules: {
        fname: {
          required: true,
          maxlength: 45
        },
        lname: {
          required: true,
          maxlength: 45
        },
        note: {
          required: true,
          maxlength: 90
        }
      },
      messages: {
        fname: {
          required: "First name is required!",
          maxlength: "Only 45 characters"
        },
        lname: {
          required: "Last name is required!",
          maxlength: "Only 45 characters"
        },
        note: {
          required: "Note is required!",
          maxlength: "Only 90 characters"
        }
      },
      errorPlacment: function errorPlacment(error, element) {
        error.insertAfter(element);
      }
    });
    valcreate.form(); //Create

    $("#actorCreateSave").on('click', function (e) {
      if (valcreate.form()) {
        e.preventDefault();
      }

      var actor = $("#actorCreateForm").serialize();
      $.ajax({
        type: "POST",
        url: "/api/actor",
        data: actor,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
        success: function success(actor) {
          // console.log(actor);
          $('#actorCreateForm :input').each(function () {
            var input = $(this);
            input.val('');
          });
          $('#actorCreateModal').hide();
          $('#actorData').append("\n                        <tr>\n                            <td>".concat(actor.id, "</td>\n                            <td>").concat(actor.fname, "</td>\n                            <td>").concat(actor.lname, "</td>\n                            <td>").concat(actor.note, "</td>\n                            <td>\n                                <a><i class=\"fas fa-edit actorEditIcon\" \n                                    data-toggle=\"modal\" data-target=\"#actorEditModal\"\n                                    id=\"").concat(actor.id, "\"></a></i> | \n\n                                <i class=\"fas fa-trash-alt actorDeleteIcon\" \n                                    \n                                    id=\"").concat(actor.id, "\"></i>\n                            </td>\n                        </tr>\n                    "));
        } // error: function (response) {
        //     console.log(response);
        // },

      });
    }); //Edit

    $('.actorEditIcon').on('click', function (e) {
      var id = $(e.currentTarget).attr('id'); // console.log(id);

      $.ajax({
        type: 'GET',
        url: '/api/actor/' + id + '/edit',
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function success(actor) {
          $('#id').val(actor.id);
          $('.actorFirstName').val(actor.fname);
          $('.actorLastName').val(actor.lname);
          $('.actorNote').val(actor.note);
        } // error: function (response) {
        //     console.log(response);
        // },

      });
    });
    var valedit = $('#actorEditForm').validate({
      rules: {
        fname: {
          required: true,
          maxlength: 45
        },
        lname: {
          required: true,
          maxlength: 45
        },
        note: {
          required: true,
          maxlength: 90
        }
      },
      messages: {
        fname: {
          required: "First name is required!",
          maxlength: "Only 45 characters"
        },
        lname: {
          required: "Last name is required!",
          maxlength: "Only 45 characters"
        },
        note: {
          required: "Note is required!",
          maxlength: "Only 90 characters"
        }
      },
      errorPlacment: function errorPlacment(error, element) {
        error.insertAfter(element);
      }
    });
    valedit.form(); //Save 

    $("#actorEditSave").on('click', function (e) {
      if (valedit.form()) {
        e.preventDefault();
      }

      var id = $("#id").val();
      var actordata = $("#actorEditForm").serialize();
      $.ajax({
        type: "PUT",
        url: "/api/actor/" + id,
        data: actordata,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
        success: function success() {
          $('#actorEditModal').hide();
          $.ajax({
            url: '/api/actor',
            success: function success(response) {
              actor.show(response);
            }
          });
        } // error: function (error) {
        //     console.log(error);
        // }

      });
    }); //Delete

    $('.actorDeleteIcon').on('click', function (e) {
      e.preventDefault();
      var id = this.id;
      var $tr = $(this).closest('tr'); // console.log(id);

      if (confirm("Are you sure you want to delete Actor Number ".concat(id, "?"))) {
        $.ajax({
          type: "DELETE",
          url: "/api/actor/" + id,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            // console.log(data);
            $tr.remove();
          } // error:function(data){
          //     console.log('Error:',data);
          // }

        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actor);

/***/ }),

/***/ "./resources/js/genre.js":
/*!*******************************!*\
  !*** ./resources/js/genre.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modals_genreM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals/genreM */ "./resources/js/modals/genreM.js");

var genre = {
  show: function show(response) {
    var template = "\n        <thead>\n            <tr>\n                <th>ID</th>\n                <th>Genre Name</th>\n                <th>Actions</th>\n            </tr>\n        </thead>\n        <tbody id=\"genreData\"></tbody>\n    ";
    var title = "<h1> Genres </h1>";
    var headtitle = "<title> Genres </title>";
    var createbtn = "<button type=\"button\" class=\"btn btn-color\" data-toggle=\"modal\" data-target=\"#genreCreateModal\"> Add New Genre </button>";
    $('#headtitle').html(headtitle);
    $('#title').html(title);
    $('#createbtn').html(createbtn);
    $('#tableContent').html(template);
    $('#content').append(_modals_genreM__WEBPACK_IMPORTED_MODULE_0__.default); //View

    response.forEach(function (genre) {
      $('#genreData').append("\n                <tr>\n                    <td>".concat(genre.id, "</td>\n                    <td>").concat(genre.name, "</td>\n                    <td>\n                        <i class=\"fas fa-edit genreEditIcon\" data-toggle=\"modal\" \n                            data-target=\"#genreEditModal\" id=\"").concat(genre.id, "\"></i> | \n                        \n                        <i class=\"fas fa-trash-alt genreDeleteIcon\" id=\"").concat(genre.id, "\"></i>\n                    </td>\n                </tr>\n            "));
    });
    var valcreate = $('#genreCreateForm').validate({
      rules: {
        name: {
          required: true,
          maxlength: 45
        }
      },
      messages: {
        name: {
          required: "Genre Name is required!",
          maxlength: "Only 45 characters"
        }
      },
      errorPlacment: function errorPlacment(error, element) {
        error.insertAfter(element);
      }
    });
    valcreate.form(); //Create

    $("#genreCreateSave").on('click', function (e) {
      if (valcreate.form()) {
        e.preventDefault();
      }

      var genre = $("#genreCreateForm").serialize();
      $.ajax({
        type: "POST",
        url: "/api/genre",
        data: genre,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
        success: function success(genre) {
          // console.log(genre);
          $('#genreCreateForm :input').each(function () {
            var input = $(this);
            input.val('');
          });
          $('#genreCreateModal').hide();
          $('#genreData').append("\n                        <tr>\n                            <td>".concat(genre.id, "</td>\n                            <td>").concat(genre.name, "</td>\n                            <td>\n                                <a><i class=\"fas fa-edit genreEditIcon\" \n                                    data-toggle=\"modal\" data-target=\"#genreEditModal\"\n                                    id=\"").concat(genre.id, "\"></a></i> | \n\n                                <i class=\"fas fa-trash-alt genreDeleteIcon\" \n                                    id=\"").concat(genre.id, "\"></i>\n                            </td>\n                        </tr>\n                    "));
        } // error: function (response) {
        //     console.log(response);
        // },

      });
    }); //Edit

    $('.genreEditIcon').on('click', function (e) {
      var id = $(e.currentTarget).attr('id'); // console.log(id);

      $.ajax({
        type: 'GET',
        url: '/api/genre/' + id + '/edit',
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function success(genre) {
          $('#id').val(genre.id);
          $('.genreName').val(genre.name);
        } // error: function (response) {
        //     console.log(response);
        // },

      });
    });
    var valedit = $('#genreEditForm').validate({
      rules: {
        name: {
          required: true,
          maxlength: 45
        }
      },
      messages: {
        name: {
          required: "Genre Name is required!",
          maxlength: "Only 45 characters"
        }
      },
      errorPlacment: function errorPlacment(error, element) {
        error.insertAfter(element);
      }
    });
    valedit.form(); //Save 

    $("#genreEditSave").on('click', function (e) {
      if (valedit.form()) {
        e.preventDefault();
      }

      var id = $("#id").val();
      var genredata = $("#genreEditForm").serialize();
      $.ajax({
        type: "PUT",
        url: "/api/genre/" + id,
        data: genredata,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
        success: function success() {
          $('#genreEditModal').hide();
          $.ajax({
            url: '/api/genre',
            success: function success(response) {
              genre.show(response);
            }
          });
        } // error: function (error) {
        //     console.log(error);
        // }

      });
    }); //Delete

    $('.genreDeleteIcon').on('click', function (e) {
      e.preventDefault();
      var id = this.id;
      var $tr = $(this).closest('tr'); // console.log(id);

      if (confirm("Are you sure you want to delete Genre Number ".concat(id, "?"))) {
        $.ajax({
          type: "DELETE",
          url: "/api/genre/" + id,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            // console.log(data);
            $tr.remove();
          } // error:function(data){
          //     console.log('Error:',data);
          // }

        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (genre);

/***/ }),

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actor */ "./resources/js/actor.js");
/* harmony import */ var _genre__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./genre */ "./resources/js/genre.js");
/* harmony import */ var _producer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./producer */ "./resources/js/producer.js");
/* harmony import */ var _movie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./movie */ "./resources/js/movie.js");




$(document).ready(function () {
  $('.linkIndex').on('click', function (e) {
    var linkIndex = e.currentTarget.dataset.id;
    $.ajax({
      type: "GET",
      url: "/api/" + linkIndex,
      error: function error(response) {
        console.log(response);
      },
      success: function success(response) {
        switch (linkIndex) {
          case 'actor':
            _actor__WEBPACK_IMPORTED_MODULE_0__.default.show(response);
            break;

          case 'movie':
            _movie__WEBPACK_IMPORTED_MODULE_3__.default.show(response);
            break;

          case 'genre':
            _genre__WEBPACK_IMPORTED_MODULE_1__.default.show(response);
            break;

          case 'producer':
            _producer__WEBPACK_IMPORTED_MODULE_2__.default.show(response);
            break;

          default:
            break;
        }
      }
    });
  });
  $(".draggable").draggable();
}); // const modals = {
//     movie:`
//     <div class="modal fade bd-modal-lg" id="movieCreate" tabindex="-1" aria-labelledby="movieCreate" aria-hidden="true">
//       <div class="modal-dialog modal-lg">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h2>Create New Movie</h2>
//                 <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">X</button>
//             </div>
//             <div class="modal-body">
//                 <form id="createMovieForm" method="post" action="{{route('movie.store')}}">
//                     <input type="hidden" name="_token" value="{{ csrf_token() }}">
//                     <div class="form-group">
//                             <label for="imgpath" class="control-label">Upload Image</label>
//                                 <div class="custom-file">
//                                     <input type="file" class="custom-file-input" id="imgpath" name="imgpath" value="">
//                                     <label class="custom-file-label" for="imgpath">Choose file</label>
//                                 </div>
//                         </div>
//                         <div class="form-group">
//                             <label for="title" class="control-label">Title</label>
//                             <input type="text" class="form-control" id="title" name="title" value="">
//                         </div>
//                         <div class="form-group">
//                             <label for="description" class="control-label">Description</label>
//                             <textarea class="form-control" id="description" name="description" rows="3" value=""></textarea>
//                         </div>
//                         <div class="md-form form-group md-outline input-with-post-icon datepicker">
//                             <label for="Release">Release</label>
//                             <input placeholder="Select date" type="date" id="release" class="form-control" name="release" value=""> 
//                         </div>
//                         <div class="row">
//                             <div class="form-group col-md-6">
//                                 <label for="producer">Producer</label>
//                                 <select id="ProducerIDName" class="form-control">
//                                 </select>
//                             </div>
//                             <div class="form-group col-md-6">
//                                 <label for="genre">Genre</label>
//                                 <select id="GenreIDName" class="form-control">
//                                 </select>
//                             </div>
//                         </div>
//                         <div class="modal-footer">
//                             <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
//                             <button type="submit" id="movieSubmit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
//                         </div>
//                     </div>
//                 </form>                
//             </div>
//         </div>
//       </div>
//     </div>`
//     `
//     <div class="modal fade bd-modal-lg" id="movieEdit" tabindex="-1" aria-labelledby="movieEdit" aria-hidden="true">
//     <div class="modal-dialog modal-lg">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h2>Edit Movie</h2>
//                 <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">X</button>
//             </div>
//             <div class="modal-body">
//                 <form id="editMovieForm" method="post" action="{{route('movie.store')}}">
//                     <input type="hidden" name="_token" value="{{ csrf_token() }}">
//                     <div class="form-group">
//                             <label for="imgpath" class="control-label">Upload Image</label>
//                                 <div class="custom-file">
//                                     <input type="file" class="custom-file-input" id="imgpath" name="imgpath" value="">
//                                     <label class="custom-file-label" for="imgpath">Choose file</label>
//                                 </div>
//                         </div>
//                         <div class="form-group">
//                             <label for="title" class="control-label">Title</label>
//                             <input type="text" class="form-control" id="title" name="title" value="">
//                         </div>
//                         <div class="form-group">
//                             <label for="description" class="control-label">Description</label>
//                             <textarea class="form-control" id="description" name="description" rows="3" value=""></textarea>
//                         </div>
//                         <div class="md-form form-group md-outline input-with-post-icon datepicker">
//                             <label for="Release">Release</label>
//                             <input placeholder="Select date" type="date" id="release" class="form-control" name="release" value=""> 
//                         </div>
//                         <div class="row">
//                             <div class="form-group col-md-6">
//                                 <label for="producer">Producer</label>
//                                 <select id="ProducerIDName" class="form-control">
//                                 </select>
//                             </div>
//                             <div class="form-group col-md-6">
//                                 <label for="genre">Genre</label>
//                                 <select id="GenreIDName" class="form-control">
//                                 </select>
//                             </div>
//                         </div>
//                         <div class="modal-footer">
//                             <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Close</button>
//                             <button type="submit" id="movieSubmit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
//                         </div>
//                     </div>
//                 </form>                
//             </div>
//         </div>
//         </div>
//     </div>
//     `,

/***/ }),

/***/ "./resources/js/modals/actorM.js":
/*!***************************************!*\
  !*** ./resources/js/modals/actorM.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ actorModals
/* harmony export */ });
function actorModals() {
  return "\n        <div class=\"modal fade\" id=\"actorCreateModal\" tabindex=\"-1\" aria-labelledby=\"actorCreate\" aria-hidden=\"true\"\n            data-backdrop=\"false\">\n            <div class=\"modal-dialog modal-lg\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h1 class=\"modal-title\">Create New Actor</h1>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form class=\"actorCreateForm\" id=\"actorCreateForm\">\n                            <div class=\"form-group\">\n                                <label for=\"fname\" class=\"control-label\">First Name</label>\n                                <input type=\"text\" class=\"form-control\" id=\"fname\" name=\"fname\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"lname\" class=\"control-label\">Last name</label>\n                                <input type=\"text\" class=\"form-control \" id=\"lname\" name=\"lname\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"note\">Note</label>\n                                <textarea class=\"form-control\" id=\"note\" name=\"note\" rows=\"3\"></textarea>\n                            </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"submit\" class=\"btn btn-color\" id=\"actorCreateSave\">Save</button>\n                                <button type=\"button\" class=\"btn cancel\" id=\"data-cancel\" data-dismiss=\"modal\">Cancel</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"modal fade\" id=\"actorEditModal\" tabindex=\"-1\" aria-labelledby=\"actorEditModal\" aria-hidden=\"true\"\n            data-backdrop=\"false\">\n            <div class=\"modal-dialog modal-lg\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h1 class=\"modal-title\">Edit Actor</h1>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form class=\"actorEditForm\" id=\"actorEditForm\">\n                        <div class=\"form-group\">\n                                <input type=\"hidden\" id=\"id\" name=\"id\" value=\"\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"fname\" class=\"control-label\">First Name</label>\n                                <input type=\"text\" class=\"form-control actorFirstName\" id=\"fname\" name=\"fname\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"lname\" class=\"control-label\">Last name</label>\n                                <input type=\"text\" class=\"form-control actorLastName\" id=\"lname\" name=\"lname\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"note\">Note</label>\n                                <textarea class=\"form-control actorNote\" id=\"note\" name=\"note\" rows=\"3\"></textarea>\n                            </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"submit\" class=\"btn actorEditSave btn-color\" \n                                    id=\"actorEditSave\">Save</button>\n                                    \n                                <button type=\"button\" class=\"btn cancel\" data-dismiss=\"modal\">Cancel</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ";
}

/***/ }),

/***/ "./resources/js/modals/genreM.js":
/*!***************************************!*\
  !*** ./resources/js/modals/genreM.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ genreModals
/* harmony export */ });
function genreModals() {
  return "\n    <div class=\"modal fade\" id=\"genreCreateModal\" tabindex=\"-1\" aria-labelledby=\"genreCreate\" aria-hidden=\"true\"\n            data-backdrop=\"false\">\n            <div class=\"modal-dialog modal-lg\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h1 class=\"modal-title\">Create New Genre</h1>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form class=\"genreCreateForm\" id=\"genreCreateForm\">\n                            <div class=\"form-group\">\n                                <label for=\"lname\" class=\"control-label\">Genre Description</label>\n                                <input type=\"text\" class=\"form-control \" id=\"name\" name=\"name\">\n                            </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"submit\" class=\"btn btn-color\" id=\"genreCreateSave\">Save</button>\n                                <button type=\"button\" class=\"btn cancel\" id=\"data-cancel\" data-dismiss=\"modal\">Cancel</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"modal fade\" id=\"genreEditModal\" tabindex=\"-1\" aria-labelledby=\"genreEditModal\" aria-hidden=\"true\"\n            data-backdrop=\"false\">\n            <div class=\"modal-dialog modal-lg\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h1 class=\"modal-title\">Edit Genre</h1>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form class=\"genreEditForm\" id=\"genreEditForm\">\n                        <div class=\"form-group\">\n                                <input type=\"hidden\" id=\"id\" name=\"id\" value=\"\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"lname\" class=\"control-label\">Genre Description</label>\n                                <input type=\"text\" class=\"form-control genreName\" id=\"name\" name=\"name\">\n                            </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"submit\" class=\"btn genreEditSave btn-color\" \n                                    id=\"genreEditSave\">Save</button>\n                                <button type=\"button\" class=\"btn cancel\" data-dismiss=\"modal\">Cancel</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n    ";
}

/***/ }),

/***/ "./resources/js/modals/movieM.js":
/*!***************************************!*\
  !*** ./resources/js/modals/movieM.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ moviesModals
/* harmony export */ });
function moviesModals() {
  return "\n        <div class=\"modal fade\" id=\"movieCreateModal\" tabindex=\"-1\" aria-labelledby=\"movieCreate\" aria-hidden=\"true\"\n            data-backdrop=\"false\">\n            <div class=\"modal-dialog modal-lg\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h1 class=\"modal-title\">Create New Movie</h1>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form class=\"movieCreateForm\" id=\"movieCreateForm\">\n                        <div class=\"form-group\">\n                            <label for=\"title\" class=\"control-label\">Title</label>\n                            <input type=\"text\" class=\"form-control\" id=\"title\" name=\"title\" value=\"\">\n                        </div>\n                        <div class=\"form-group\">\n                            <label for=\"description\" class=\"control-label\">Description</label>\n                            <textarea class=\"form-control\" id=\"description\" name=\"description\" rows=\"3\" value=\"\"></textarea>\n                        </div>\n                        <div class=\"md-form form-group md-outline input-with-post-icon datepicker\">\n                            <label for=\"Release\">Release</label>\n                            <input placeholder=\"Select date\" type=\"date\" id=\"release\" class=\"form-control\" name=\"release\" value=\"\"> \n                        </div>\n\n                        <div class=\"row\">\n                            <div class=\"form-group col-md-6\">\n                                <label for=\"genre\">Genre</label>\n                                <select id=\"GenreIDName\" class=\"form-control\" name=\"genre_id\">\n                                </select>\n                            </div>\n\n                            <div class=\"form-group col-md-6\">\n                                <label for=\"producer\">Producer</label>\n                                <select id=\"ProducerIDName\" class=\"form-control\" name=\"producer_id\">\n                                </select>\n                            </div>\n                        </div>\n                        \n                            <div class=\"modal-footer\">\n                                <button type=\"submit\" class=\"btn btn-color\" id=\"movieCreateSave\">Save</button>\n                                <button type=\"button\" class=\"btn cancel\" id=\"movieDismiss\" data-bs-dismiss=\"modal\">Cancel</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"modal fade\" id=\"movieEditModal\" tabindex=\"-1\" aria-labelledby=\"movieEditModal\" aria-hidden=\"true\"\n            data-backdrop=\"false\">\n            <div class=\"modal-dialog modal-lg\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h1 class=\"modal-title\">Edit Movie</h1>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form class=\"movieEditForm\" id=\"movieEditForm\">\n                        <div class=\"form-group\">\n                                <input type=\"hidden\" id=\"id\" name=\"id\" value=\"\">\n                            </div>\n                            <div class=\"form-group\">\n                            <label for=\"title\" class=\"control-label\">Title</label>\n                            <input type=\"text\" class=\"form-control movieTitle\" id=\"title\" name=\"title\" value=\"\">\n                        </div>\n                        <div class=\"form-group\">\n                            <label for=\"description\" class=\"control-label\">Description</label>\n                            <textarea class=\"form-control movieDescription\" id=\"description\" name=\"description\" rows=\"3\" value=\"\"></textarea>\n                        </div>\n                        <div class=\"md-form form-group md-outline input-with-post-icon datepicker\">\n                            <label for=\"Release\">Release</label>\n                            <input placeholder=\"Select date\" type=\"date\" id=\"release\" class=\"form-control movieRelease\" name=\"release\" value=\"\"> \n                        </div>\n\n                        <div class=\"row\">\n                            <div class=\"form-group col-md-6\">\n                                <label for=\"producer\">Producer</label>\n                                <select id=\"ProducerIDName\" class=\"form-control movieProducer\">\n                                </select>\n                            </div>\n\n                            <div class=\"form-group col-md-6\">\n                                <label for=\"genre\">Genre</label>\n                                <select id=\"GenreIDName\" class=\"form-control movieGenre\">\n                                </select>\n                            </div>\n                        </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"submit\" class=\"btn movieEditSave btn-color\" \n                                    id=\"movieEditSave\">Save</button>\n                                <button type=\"button\" class=\"btn cancel\" data-bs-dismiss=\"modal\">Cancel</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ";
}

/***/ }),

/***/ "./resources/js/modals/producerM.js":
/*!******************************************!*\
  !*** ./resources/js/modals/producerM.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ producerModals
/* harmony export */ });
function producerModals() {
  return "\n    <div class=\"modal fade\" id=\"producerCreateModal\" tabindex=\"-1\" aria-labelledby=\"producerCreate\" aria-hidden=\"true\"\n            data-backdrop=\"false\">\n            <div class=\"modal-dialog modal-lg\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h1 class=\"modal-title\">Create New Producer</h1>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form class=\"producerCreateForm\" id=\"producerCreateForm\">\n                            <div class=\"form-group\">\n                                <label for=\"name\" class=\"control-label\">Producer Name</label>\n                                <input type=\"text\" class=\"form-control \" id=\"name\" name=\"name\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"name\" class=\"control-label\">Email</label>\n                                <input type=\"email\" class=\"form-control\" id=\"email\" name=\"email\">\n                            </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"submit\" class=\"btn btn-color\" id=\"producerCreateSave\">Save</button>\n                                <button type=\"button\" class=\"btn cancel\" id=\"data-cancel\" data-dismiss=\"modal\">Cancel</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"modal fade\" id=\"producerEditModal\" tabindex=\"-1\" aria-labelledby=\"producerEditModal\" aria-hidden=\"true\"\n            data-backdrop=\"false\">\n            <div class=\"modal-dialog modal-lg\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h1 class=\"modal-title\">Edit Producer</h1>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form class=\"producerEditForm\" id=\"producerEditForm\">\n                        <div class=\"form-group\">\n                                <input type=\"hidden\" id=\"id\" name=\"id\" value=\"\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"name\" class=\"control-label\">Producer Name</label>\n                                <input type=\"text\" class=\"form-control producerName\" id=\"name\" name=\"name\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"name\" class=\"control-label\">Email</label>\n                                <input type=\"email\" class=\"form-control producerEmail\" id=\"email\" name=\"email\">\n                            </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"submit\" class=\"btn producerEditSave btn-color\" \n                                    id=\"producerEditSave\">Save</button>\n                                <button type=\"button\" class=\"btn cancel\" data-dismiss=\"modal\">Cancel</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n    ";
}

/***/ }),

/***/ "./resources/js/movie.js":
/*!*******************************!*\
  !*** ./resources/js/movie.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modals_movieM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals/movieM */ "./resources/js/modals/movieM.js");

var movie = {
  show: function show(response) {
    var template = "\n        <thead>\n            <tr>\n                <th>ID</th>\n                <th>Title</th>\n                <th>Description</th>\n                <th>Release</th>\n                <th>Genre</th>\n                <th>Producer</th>\n                <th>Action</th>\n            </tr>\n        </thead>\n        <tbody id=\"movieData\"></tbody>\n    ";
    var title = "<h1> Movies </h1>";
    var headtitle = "<title> Movies </title>";
    var createbtn = "<button type=\"button\" class=\"btn btn-color\" data-bs-toggle=\"modal\" data-bs-target=\"#movieCreateModal\"> Add New Movie </button>";
    $('#headtitle').html(headtitle);
    $('#title').html(title);
    $('#createbtn').html(createbtn);
    $('#tableContent').html(template);
    $('#content').append(_modals_movieM__WEBPACK_IMPORTED_MODULE_0__.default); //View

    response.forEach(function (movie) {
      $('#movieData').append("\n                <tr>\n                    <td>".concat(movie.id, "</td>\n                    <td>").concat(movie.title, "</td>\n                    <td>").concat(movie.description, "</td>\n                    <td>").concat(movie.release, "</td>\n                    <td>").concat(movie.genre.name, "</td>\n                    <td>").concat(movie.producer.name, "</td>\n                    <td>\n                        <i class=\"fas fa-edit movieEditIcon\" data-bs-toggle=\"modal\" \n                            data-bs-target=\"#movieEditModal\" id=\"").concat(movie.id, "\"></i> | \n                        \n                        <i class=\"fas fa-trash-alt movieDeleteIcon\" id=\"").concat(movie.id, "\"></i>\n                    </td>\n                </tr>\n            "));
    });
    var valcreate = $('#movieCreateForm').validate({
      rules: {
        title: {
          required: true,
          maxlength: 45
        },
        description: {
          required: true,
          maxlength: 45
        },
        release: {
          required: true,
          date: true
        },
        genre_id: {
          required: true
        },
        producer_id: {
          required: true
        }
      },
      messages: {
        title: {
          required: "Title is Required!",
          maxlength: "Only 45 Characters"
        },
        description: {
          required: "Description is Required!",
          maxlength: "Only 45 Characters"
        },
        release: {
          required: "Date is Required!",
          date: "Must be Valid Date Format"
        },
        genre_id: {
          required: "Genre is Required!"
        },
        producer_id: {
          required: "Producer is Required!"
        }
      },
      errorPlacment: function errorPlacment(error, element) {
        error.insertAfter(element);
      }
    });
    valcreate.form();
    $('#movieCreateModal').on('show.bs.modal', function (e) {
      $.ajax({
        type: "GET",
        url: "/api/producer",
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
        success: function success(response) {
          response.forEach(function (producer) {
            $('#ProducerIDName').append("\n                            <option value=\"".concat(producer['id'], "\">").concat(producer['name'], "</option>\n                        "));
          });
        }
      });
      $.ajax({
        type: "GET",
        url: "/api/genre",
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
        success: function success(response) {
          response.forEach(function (genre) {
            $('#GenreIDName').append("\n                            <option value=\"".concat(genre['id'], "\">").concat(genre['name'], "</option>\n                        "));
          });
        }
      });
    });
    $('#movieCreateModal').on('hidden.bs.modal', function (e) {
      $('#GenreIDName').empty();
      $('#ProducerIDName').empty();
    }); //Create

    $("#movieCreateSave").on('click', function (e) {
      if (valcreate.form()) {
        e.preventDefault();
      }

      var movie = $("#movieCreateForm").serialize();
      console.log(movie);
      $.ajax({
        type: "POST",
        url: "/api/movie",
        data: movie,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
        success: function success(movie) {
          $('#movieCreateForm :input').each(function () {
            var input = $(this);
            input.val('');
          });
          $('#movieCreateModal').hide();
          $('#movieData').append("\n                        <tr>\n                            <td>".concat(movie.id, "</td>\n                            <td>").concat(movie.title, "</td>\n                            <td>").concat(movie.description, "</td>\n                            <td>").concat(movie.release, "</td>\n                            <td>").concat(movie.genre.name, "</td>\n                            <td>").concat(movie.producer.name, "</td>\n                            <td>\n                                <a><i class=\"fas fa-edit movieEditIcon\" \n                                    data-bs-toggle=\"modal\" data-bs-target=\"#movieEditModal\"\n                                    id=\"").concat(movie.id, "\"></a></i> | \n\n                                <i class=\"fas fa-trash-alt movieDeleteIcon\" \n                                    \n                                    id=\"").concat(movie.id, "\"></i>\n                            </td>\n                        </tr>\n                    "));
        } // error: function (response) {
        //     console.log(response);
        // },

      });
    }); //Edit

    $('.movieEditIcon').on('click', function (e) {
      var id = $(e.currentTarget).attr('id'); // console.log(id);

      $.ajax({
        type: 'GET',
        url: '/api/movie/' + id + '/edit',
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function success(movie) {
          $('#id').val(movie.id);
          $('.movieTitle').val(movie.title);
          $('.movieDescription').val(movie.description);
          $('.movieRelease').val(movie.release);
          $('.movieProducer').val(movie.producer['name']);
          $('.actorGenre').val(movie.genre['name']);
        } // error: function (response) {
        //     console.log(response);
        // },

      });
    });
    var valedit = $('#movieEditForm').validate({
      rules: {
        fname: {
          required: true,
          maxlength: 45
        },
        lname: {
          required: true,
          maxlength: 45
        },
        note: {
          required: true,
          maxlength: 90
        }
      },
      messages: {
        fname: {
          required: "First name is required!",
          maxlength: "Only 45 characters"
        },
        lname: {
          required: "Last name is required!",
          maxlength: "Only 45 characters"
        },
        note: {
          required: "Note is required!",
          maxlength: "Only 90 characters"
        }
      },
      errorPlacment: function errorPlacment(error, element) {
        error.insertAfter(element);
      }
    });
    valedit.form(); //Save 

    $("#movieEditSave").on('click', function (e) {
      if (valedit.form()) {
        e.preventDefault();
      }

      var id = $("#id").val();
      var moviedata = $("#movieEditForm").serialize();
      $.ajax({
        type: "PUT",
        url: "/api/movie/" + id,
        data: moviedata,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
        success: function success() {
          $('#movieEditModal').hide();
          $.ajax({
            url: '/api/movie',
            success: function success(response) {
              movie.show(response);
            }
          });
        } // error: function (error) {
        //     console.log(error);
        // }

      });
    }); //Delete

    $('.movieDeleteIcon').on('click', function (e) {
      e.preventDefault();
      var id = this.id;
      var $tr = $(this).closest('tr'); // console.log(id);

      if (confirm("Are you sure you want to delete Movie Number ".concat(id, "?"))) {
        $.ajax({
          type: "DELETE",
          url: "/api/movie/" + id,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            // console.log(data);
            $tr.remove();
          } // error:function(data){
          //     console.log('Error:',data);
          // }

        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (movie);

/***/ }),

/***/ "./resources/js/producer.js":
/*!**********************************!*\
  !*** ./resources/js/producer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modals_producerM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals/producerM */ "./resources/js/modals/producerM.js");

var producer = {
  show: function show(response) {
    var template = "\n        <thead>\n            <tr>\n                <th>ID</th>\n                <th>Producer Name</th>\n                <th>Email</th>\n                <th>Actions</th>\n            </tr>\n        </thead>\n        <tbody id=\"producerData\"></tbody>\n    ";
    var title = "<h1> Producers </h1>";
    var headtitle = "<title> Producers </title>";
    var createbtn = "<button type=\"button\" class=\"btn btn-color\" data-toggle=\"modal\" data-target=\"#producerCreateModal\"> Add New Producer </button>";
    $('#headtitle').html(headtitle);
    $('#title').html(title);
    $('#createbtn').html(createbtn);
    $('#tableContent').html(template);
    $('#content').append(_modals_producerM__WEBPACK_IMPORTED_MODULE_0__.default); //View

    response.forEach(function (producer) {
      $('#producerData').append("\n                <tr>\n                    <td>".concat(producer.id, "</td>\n                    <td>").concat(producer.name, "</td>\n                    <td>").concat(producer.email, "</td>\n                    <td>\n                        <i class=\"fas fa-edit producerEditIcon\" data-toggle=\"modal\" \n                            data-target=\"#producerEditModal\" id=\"").concat(producer.id, "\"></i> | \n                        \n                        <i class=\"fas fa-trash-alt producerDeleteIcon\" id=\"").concat(producer.id, "\"></i>\n                    </td>\n                </tr>\n            "));
    });
    var valcreate = $('#producerCreateForm').validate({
      rules: {
        name: {
          required: true,
          maxlength: 45
        },
        email: {
          required: true,
          maxlength: 60,
          email: true
        }
      },
      messages: {
        name: {
          required: "Genre Name is required!",
          maxlength: "Only 45 characters"
        },
        email: {
          required: "Email is required!",
          maxlength: "Only 60 characters",
          email: "Must be an email!"
        }
      },
      errorPlacment: function errorPlacment(error, element) {
        error.insertAfter(element);
      }
    });
    valcreate.form(); //Create

    $("#producerCreateSave").on('click', function (e) {
      if (valcreate.form()) {
        e.preventDefault();
      }

      var producer = $("#producerCreateForm").serialize();
      $.ajax({
        type: "POST",
        url: "/api/producer",
        data: producer,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
        success: function success(producer) {
          // console.log(producer);
          $('#genreCreateForm :input').each(function () {
            var input = $(this);
            input.val('');
          });
          $('#producerCreateModal').hide();
          $('#producerData').append("\n                        <tr>\n                            <td>".concat(producer.id, "</td>\n                            <td>").concat(producer.name, "</td>\n                            <td>").concat(producer.email, "</td>\n                            <td>\n                                <a><i class=\"fas fa-edit producerEditIcon\" \n                                    data-toggle=\"modal\" data-target=\"#producerEditModal\"\n                                    id=\"").concat(producer.id, "\"></a></i> | \n\n                                <i class=\"fas fa-trash-alt producerDeleteIcon\" \n                                    id=\"").concat(producer.id, "\"></i>\n                            </td>\n                        </tr>\n                    "));
        } // error: function (response) {
        //     console.log(response);
        // },

      });
    }); //Edit

    $('.producerEditIcon').on('click', function (e) {
      var id = $(e.currentTarget).attr('id'); // console.log(id);

      $.ajax({
        type: 'GET',
        url: '/api/producer/' + id + '/edit',
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function success(producer) {
          $('#id').val(producer.id);
          $('.producerName').val(producer.name);
          $('.producerEmail').val(producer.email);
        } // error: function (response) {
        //     console.log(response);
        // },

      });
    });
    var valedit = $('#producerEditForm').validate({
      rules: {
        name: {
          required: true,
          maxlength: 45
        }
      },
      messages: {
        name: {
          required: "First name is required!",
          maxlength: "Only 45 characters"
        }
      },
      errorPlacment: function errorPlacment(error, element) {
        error.insertAfter(element);
      }
    });
    valedit.form(); //Save 

    $("#producerEditSave").on('click', function (e) {
      if (valedit.form()) {
        e.preventDefault();
      }

      var id = $("#id").val();
      var producerdata = $("#producerEditForm").serialize();
      $.ajax({
        type: "PUT",
        url: "/api/producer/" + id,
        data: producerdata,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
        success: function success() {
          $('#producerEditModal').hide();
          $.ajax({
            url: '/api/producer',
            success: function success(response) {
              producer.show(response);
            }
          });
        } // error: function (error) {
        //     console.log(error);
        // }

      });
    }); //Delete

    $('.producerDeleteIcon').on('click', function (e) {
      e.preventDefault();
      var id = this.id;
      var $tr = $(this).closest('tr'); // console.log(id);

      if (confirm("Are you sure you want to delete Producer Number ".concat(id, "?"))) {
        $.ajax({
          type: "DELETE",
          url: "/api/producer/" + id,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            // console.log(data);
            $tr.remove();
          } // error:function(data){
          //     console.log('Error:',data);
          // }

        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (producer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./resources/js/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;