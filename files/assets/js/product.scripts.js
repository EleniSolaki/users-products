$(document).ready(function(){

    $.ajax({
    url:'http://localhost:3000/api/products/findAll',
    type:'get',
    dataType:'JSON'
  })
  .done(function(response){
    let data = response.data;
    let status = response.status
    
    if (status) { 
        createTbody(data);
    } else {
        alert(false,'Πρόβλημα στην αναζήτηση των προϊόντων ('+ data.message + ')');
    }
  });




  $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

    let product = $("#product").val();
    let cost = $("#cost").val();
    let description = $("#description").val();
    let quantity = $("#quantity").val();

    const item = {
      'product': product,
      'cost': cost,
      'description': description,
      'quantity': quantity
    }

    // console.log($('.btnSubmit').val(), item);
    $.ajax({
      url: "http://localhost:3000/api/products/create",
      type: "post",
      data: item,
      dataType: "JSON",
      // encode: true,
    })
    .done( function(response) {
      // console.log(">>", response);
      
      let data = response.data;
      let status = response.status
  
      if (status) { 
          console.log(true,'Επιτυχής εισαγωγή προϊόντων');
          alert(true,'Επιτυχής εισαγωγή προϊόντων');
          $('#frmProd')[0].reset();
      } else {
          console.log(false,'Πρόβλημα στην εισαγωγή προϊόντων ('+ data.message + ')');
          alert(false,'Πρόβλημα στην εισαγωγή προϊόντων ('+ data.message + ')');
          $('#frmProd')[0].reset();
          // console.log(data.message);
      }
    });

    return false
  });

});

function createTbody(data){

  $("#productTable > tbody").empty();

  const len = data.length;
  for (let i=0; i<len; i++){
    let product = data[i].product;
    let description = data[i].description;
    let quantity = data[i].quantity;
    let cost = data[i].cost;  


    let tr_str = "<tr>" +
      "<td>" + product + "</td>" +
      "<td>" + description + "</td>" +
      "<td>" + quantity + "</td>" +
      "<td>" + cost + "</td>" +    
      "<td>" +
          "<button class='btnUpdate btn btn-primary' value=\'"+product+"\'>Τροποποίηση</button> " +
          "<button class='btnDelete btn btn-primary' value=\'"+product+"\'>Διαγραφή</button>" +
      "</td>" + 
      "</tr>";

    $("#productTable tbody").append(tr_str);
    
$('.btnDelete').on('click', function() {
  let product = $(this).val();
  deleteData(product);
});



}}

function alert(status, message){
  if (status){
      $('.alert').addClass('alert-success');
      $('.alert').removeClass('alert-danger');
  } else {
      $('.alert').addClass('alert-danger');
      $('.alert').removeClass('alert-success');
  }
  $('.alert').html(message);
}



// function deleteData(product) {
//   $.ajax({
//     url: `http://localhost:3000/api/products/delete/${product}`,
//     type: 'DELETE',
//     success: function(response) {
//       console.log(response);
//       // Refresh the product list
//       $.ajax({
//         url: 'http://localhost:3000/api/products/findAll',
//         type: 'GET',
//         dataType: 'json',
//         success: function(response) {
//           let data = response.data;
//           createTbody(data);
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//           console.log(textStatus, errorThrown);
//         }
//       });
//     },
//     error: function(jqXHR, textStatus, errorThrown) {
//       console.log(textStatus, errorThrown);
//     }
//   });
// }

function deleteData(product) {
  $.ajax({
    url: `http://localhost:3000/api/products/delete/${product}`,
    type: 'delete',
    dataType: 'JSON'
  })
  .done(function(response){
    let data = response.data;
    let status = response.status;

    if (status) {
      alert(true, 'Επιτυχία στην διαγραφή προιόντων');
      // Call the findAll function to refresh the product list
      findAll();
    } else {
      alert(false, 'Πρόβλημα στη διαγραφή του προϊόντος (' + data.message + ')');
    }
  });
}


function findAll(){
      $.ajax({
    url:'http://localhost:3000/api/products/findAll',
    type:'get',
    dataType:'JSON'
  })
  .done(function(response){
    let data = response.data;
    let status = response.status
    
    if (status) { 
        createTbody(data);
    } else {
        alert(false,'Πρόβλημα στην αναζήτηση των προϊόντων ('+ data.message + ')');
    }
  });
}

