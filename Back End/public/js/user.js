function showUserDetailsForm(){
    $('#userDetailsModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Login com');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openUserDetailsModal(){
    showUserDetailsForm();
    setTimeout(function(){
        $('#userDetailsModal').modal('show');    
    }, 230);
    
}