
function get_stakeholders(type, data_object, callback) {
    //alert("Making Network Call");
    var stakeholders = [];
    $('#loader_modal').modal('show');
    url = "https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getStakeHolders";
    $.ajax({
        url: url,
        type: 'POST',
        data: data_object,
        dataType: 'json',
        success: function (data) {
            console.log("https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getStakeHolders", data);
            stakeholders = data;
            $('#loader_modal').modal('hide');
            switch (type) {
                case 'all': {
                    return stakeholders;
                };

                case 'startup':
                    {
                        var filtered_array = stakeholders.filter(function (el) {
                            return el.stakeholder_type == 'startup'
                        });
                        //console.log("serverside", filtered_array);
                        callback(filtered_array);
                        break;
                    }

                case 'single_profile':
                    {
                        //console.log("serverside", data);
                        $('#loader_modal').modal('hide');
                        if (data_object.internal_type) {
                            if (data_object.internal_type == "innovador") {
                                if (data.length > 0)
                                callback(data_object.internal_type, data[0]);
                            }
                        }
                        else {
                            if (data.length > 0)
                                callback(data[0]);
                            break;
                        }
                    }

                case 'fund-vc-pe': {
                    var filtered_array = stakeholders.filter(function (el) {
                        return el.stakeholder_type == 'fund-vc-pe'
                    });
                    //console.log("serverside", filtered_array);
                    callback(filtered_array);
                    break;
                }

                case 'setup_stakeholder_management':
                    {
                        setup_stakeholder_management_operator_module(data_object.callback, stakeholders);
                        break;
                    }
            }
        },
        error: function (request, error) {
            $('#loader_modal').modal('hide');
            alert("Request: " + JSON.stringify(request));
            return stakeholders;
        }
    });

}

function get_stakeholder(id, stakeholders) {
    console.log("serverside", id, stakeholders);

    var filtered_array = stakeholders.filter(function (el) {
        return el.id == id
    });
    console.log("serverside", filtered_array);
    return filtered_array;
}

function save_stakeholders_list(stakeholders_string) {
    localStorage.setItem('stakeholders', stakeholders_string);
}


function updatestakeHolder(type, data_object, callback) {
    //alert("Making Network Call");
    var stakeholders = [];
    $('#loader_modal').modal('show');
    url = "https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateStakeHolder";
    $.ajax({
        url: url,
        type: 'POST',
        data: data_object,
        dataType: 'json',
        success: function (data) {
            console.log("https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateStakeHolder", data);
            stakeholders = data;
            $('#loader_modal').modal('hide');
            switch (type) {
                case 'all': {
                    return stakeholders;
                };

                case 'startup':
                    {
                        callback(data.id);
                        break;
                    }

                case 'single_profile':
                    {
                        //console.log("serverside", data);
                        $('#loader_modal').modal('hide');
                        if (data_object.internal_type) {
                            if (data_object.internal_type == "innovador") {
                                if (data.length > 0)
                                callback(data_object.internal_type, data[0]);
                            }
                        }
                        else {
                            if (data.length > 0)
                            callback(data[0]);
                            break;
                        }
                    }

                case 'fund-vc-pe': {
                    var filtered_array = stakeholders.filter(function (el) {
                        return el.stakeholder_type == 'fund-vc-pe'
                    });
                    //console.log("serverside", filtered_array);
                    callback(filtered_array);
                    break;
                }

                case 'setup_stakeholder_management':
                    {
                        setup_stakeholder_management_operator_module(data_object.callback, stakeholders);
                        break;
                    }
            }
        },
        error: function (request, error) {
            $('#loader_modal').modal('hide');
            alert("Request: " + JSON.stringify(request));
            return stakeholders;
        }
    });

}

