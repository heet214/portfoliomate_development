function toggle_mobile_stakeholder_type(){
    
    $('#stakeholder_type_menu_opener i').toggleClass('fa-caret-up fa-caret-down');
    if($('#stakeholder_type_list').is(":visible"))
    {
        $('#stakeholder_type_list').hide();
    }
    else{
        $('#stakeholder_type_list').show();
    }
}

