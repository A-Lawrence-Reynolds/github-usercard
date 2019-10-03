/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardMaker(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.setAttribute("src", data.avatar_url);
  card.appendChild(img);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const name = document.createElement("h3");
  name.classList.add("name");
  name.textContent = data.name;
  cardInfo.appendChild(name);

  const username = document.createElement("p");
  username.classList.add("username");
  username.textContent = data.username;
  cardInfo.appendChild(username);

  const location = document.createElement("p");
  location.textContent = data.location;
  cardInfo.appendChild(location);

  const profile = document.createElement("p");
  profile.textContent = "Profile: ";
  cardInfo.appendChild(profile);

  const address = document.createElement("a");
  address.setAttribute("href", data.html_url);
  address.textContent = data.html_url;
  profile.appendChild(address);

  const followers = document.createElement("p");
  followers.textContent = "Followers: ";
  followers.textContent += data.followers;
  cardInfo.appendChild(followers);

  const following = document.createElement("p");
  following.textContent = "Following: ";
  following.textContent += data.following;
  cardInfo.appendChild(following);

  const repos = document.createElement("p");
  repos.textContent = "Repositories: ";
  repos.textContent += data.public_repos;
  cardInfo.appendChild(repos);

  const lastUpdate = document.createElement("p");
  lastUpdate.textContent = "Last Active On: ";
  lastUpdate.textContent += data.updated_at;
  cardInfo.appendChild(lastUpdate);

  const bio = document.createElement("p");
  bio.textContent = "Bio: ";
  bio.textContent += data.bio;
  cardInfo.appendChild(bio);

  card.appendChild(cardInfo);

  return card;
}

function fetchGitHubData() {
  container = document.querySelector(".cards");

  axios
    .get("https://api.github.com/users/A-Lawrence-Reynolds")
    .then(profileRespone => {
      console.log(profileRespone);
      const myCard = cardMaker(profileRespone.data);
      container.appendChild(myCard);
      return axios.get(profileRespone.data.followers_url);
    })
    .then(followersResponse => {
      followersResponse.data.forEach(follower => {
        axios
          .get(follower.url)
          .then(followersResponse => {
            const followerCard = cardMaker(followersResponse.data);
            container.appendChild(followerCard);
          })
          .catch(error => {
            console.error("bad!");
          });
      });
    })
    .catch(error => {
      console.error("bad!");
    });
}
window.addEventListener("load", () => {
  fetchGitHubData();
});
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
