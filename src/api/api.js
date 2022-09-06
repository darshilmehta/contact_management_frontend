// BASE URL FOR LOCAL HOST
// let url = "http://127.0.0.1:8000/";

// BASE URL FOR DEPLOYED BACKED
let url = "https://contact-management-app-futuryz.herokuapp.com/";

// URLS
let login_url = url + "auth/login/";
let register_url = url + "auth/register/";
let refresh_url = url + "auth/refresh/";
let create_contact = url + "contacts/create/";
let get_all_contacts = url + "contacts/all/";
let update_contact = url + "contacts/update/";
let delete_contact = url + "contacts/delete/";
let get_contact = url + "contacts/get/";

export let update_contact_detail = (
  id,
  first_name,
  last_name,
  email,
  phone_number
) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: id,
    fname: first_name,
    lname: last_name,
    email: email,
    phone_number: phone_number
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = fetch(update_contact + id + "/", requestOptions);
  return response;
};

export let get_contact_number = async (access_token, id) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + access_token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  let response = await fetch(
    get_contact + id + "/",
    requestOptions
  );
  return response;
}

export let create_contact_detail = (
  first_name,
  last_name,
  email,
  phone_number
) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    fname: first_name,
    lname: last_name,
    email: email,
    phone_number: phone_number
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = fetch(create_contact, requestOptions);
  return response;
};

export let delete_contact_number_by_id = async (access_token, id) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + access_token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  let response = await fetch(
    delete_contact + id + "/",
    requestOptions
  );
  return response;
}

export let get_all_contact_numbers = async (access_token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + access_token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  let response = await fetch(
    get_all_contacts,
    requestOptions
  );
  return response;
}

export let register = (
  first_name,
  last_name,
  username,
  email,
  phone_number,
  password
) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    phone_number: phone_number,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = fetch(register_url, requestOptions);
  return response;
};

export let login = async (email, password) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: email,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = await fetch(login_url, requestOptions);
  return response;
};

export let refresh = async (refresh_token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    refresh: refresh_token,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let response = await fetch(refresh_url, requestOptions);
  return response;
};