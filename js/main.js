
// # 1
// function named 'createElemWithText'
function createElemWithText(HTMLElemStrngToCrt = "p", txtContntOfElToCrt = "", classNameifOneNeeded) {
    // Use document.createElement() to create the requested HTML element
    let requestedElementCreated = document.createElement(HTMLElemStrngToCrt);

    requestedElementCreated.textContent = txtContntOfElToCrt;
   
    if (classNameifOneNeeded) {
      requestedElementCreated.className = classNameifOneNeeded;
    }
    return requestedElementCreated;
   }
   
   
   // # 2
   function createSelectOptions(users) {
     if (!users) {
       return undefined;
     }
     const options = [];
     for (const user of users) {
       const option = document.createElement("option");
       option.value = user.id;
       option.textContent = user.name;
    options.push(option);
     } 
     return options;
   }
   
   // # 3

   function toggleCommentSection(postId) { 
    if (!postId) return undefined; 
    let section = document.querySelector(`section[data-post-id="${postId}"]`); 
    // verify if section exist 
    if (section) { 
      // toggle the class `hide` on the section element 
      section.classList.toggle('hide'); 
    } 
    // return the section element 
    return section; 
  }
   
   // test toggleCommentSection
   toggleCommentSection(1);
   toggleCommentSection(2);
   
   
   // # 4

   function toggleCommentButton (postID) {

     if (!postID) {
       return;
     }
     const btnSelectedEl = document.querySelector(`button[data-post-id = "${postID}"`);
   
     if (btnSelectedEl != null) {
       btnSelectedEl.textContent === "Show Comments" ? (btnSelectedEl.textContent = "Hide Comments") : (btnSelectedEl.textContent = "Show Comments");
     }
     return btnSelectedEl;
   };
   
   // check for function
   console.log(toggleCommentButton("btnToTest"));
   
   
   // # 5
   function deleteChildElements(element) {
     if (!element || !(element instanceof HTMLElement)) {
       return undefined;
     }
   
     // Remove all child elements from the element.
     while (element.firstChild) {
       element.removeChild(element.firstChild);
     }
     return element;
   }
   
   // # 6
   const addButtonListeners = () => {
       let myMainElem = document.querySelector('main')
       let buttonsList = myMainElem.querySelectorAll('button')
       if(buttonsList){
           for(let i = 0; i < buttonsList.length; i++){
               let myButton = buttonsList[i]
               let postId = myButton.dataset.postId
               myButton.addEventListener('click', function(event){
                   toggleComments(event, postId), false
               })
           }
           return buttonsList
       }
   
   }
   
   // # 7
   const removeButtonListeners = () => {
       let myMainElem = document.querySelector('main')
       let buttonsList = myMainElem.querySelectorAll('button')
       console.log(buttonsList)
       if(buttonsList){
           for(let i = 0; i < buttonsList.length; i++){
               let myButton = buttonsList[i]
               postId = myButton.dataset.postId
               myButton.removeEventListener('click', function(event){ 
               toggleComments(event, postId), false
           })
           }
           return buttonsList
       }
   }
   
   // # 8
   
   function createComments(comments) { 
       if (!comments) { 
           return undefined; 
       } 
       let frag = document.createDocumentFragment(); 
       for (let i = 0; i < comments.length; i++) { 
           const comment = comments[i]; 
           let a = document.createElement("article"); 
           let h3 = createElemWithText("h3", comment.name); 
           let p1 = createElemWithText("p", comment.body); 
           let p2 = createElemWithText("p", `From: ${comment.email}`); 
           a.appendChild(h3); 
           a.appendChild(p1); 
           a.appendChild(p2); 
           frag.appendChild(a); 
       } 
       return frag; 
   } 
   
   // # 9 populateSelectMenu
   function populateSelectMenu(users) {
       if (!users) return;
       let menu = document.querySelector("#selectMenu");
       // passes the data to createSelectOptions to get an array
       let options = createSelectOptions(users);
       for (let i = 0; i < options.length; i++) {
           let option = options[i];
           menu.append(option);
       } // end for loop
   
       // return menu
       return menu;
   
   } 
   
   // # 10
   let getUsers = async() => {
   
           let retrieve;
           // fetch users from jsonplaceholder.typicode.com
           try {
               retrieve = await fetch("https://jsonplaceholder.typicode.com/users");
           } // end try
           catch (error) {
               console.log(error);
           } // end catch
   
           // return information
           return await retrieve.json(); 
       } 
   
   // # 11
   let getUserPosts = async(userId) => {
           if (!userId) return;
           let retrieve; 
           // try to fetch data for userId
           try {
               retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
           } // end try
           catch (error) {
               console.log(error);
           } // end catch
   
           // return information
           return retrieve.json();
       } 
   
   // # 12
   let getUser = async(userId) => {
           if (!userId) return;
           let retrieve;
          // try to fetch data for userId
           try {
               retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
           } // end try
           catch (error) {
               console.log(error);
           } // end catch
   
           // return information
           return retrieve.json();
      } 
   
 
   // # 13
   async function getPostComments(postId) {
    if (!postId) return undefined; 
     try {
       const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
       if (!response.ok) {
         throw new Error('Failed to fetch post comments');
       }
       const commentsData = await response.json();
       return commentsData;
     } catch (error) {
       console.error('Error fetching post comments:', error);
       throw error;
     }
   }
   
   // # 14
   const displayComments = async (postId) =>{ 
       if(!postId) return; 
       let section = document.createElement("section"); 
       section.dataset.postId = postId; 
       section.classList.add("comments", "hide"); 
       const comments = await getPostComments(postId); 
       const fragment = createComments(comments); 
       section.append(fragment); 
       console.log(section); 
       return section; 
   } 
   
   console.log(displayComments(5));
   
   
   // #15 
   const createPosts = async (jsonPosts) => {
       if(!jsonPosts) return;
   
       let fragment = document.createDocumentFragment();
   
       for (let i = 0; i < jsonPosts.length; i++) {
   
           let post = jsonPosts[i];
   
           let article = document.createElement("article");
           let section = await displayComments(post.id);
           let author = await getUser(post.userId);
   
           let h2 = createElemWithText("h2", post.title);
           let p = createElemWithText("p", post.body);
           let p2 = createElemWithText("p", `Post ID: ${post.id}`);
   
           let p3 = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
           let p4 = createElemWithText("p", `${author.company.catchPhrase}`);
   
           let button = createElemWithText("button", "Show Comments");
           button.dataset.postId = post.id;
   
           article.append(h2, p, p2, p3, p4, button, section); 
   
           fragment.append(article);
       }
       console.log(fragment);
       return fragment;
   };
   
   
   // #16
   const displayPosts = async (posts) => {
       let myMain = document.querySelector("main");
       let element = (posts) ? await createPosts(posts) : document.querySelector("main p");
       myMain.append(element);
       return element;
   }
   
   
   // #17
   function toggleComments(event, postId){
       if (!event || !postId){
           return undefined;
       }
       event.target.listener = true;
       let section  = toggleCommentSection(postId);
       let button = toggleCommentButton(postId);
       return [section, button];
   }
   
   // #18
   const refreshPosts = async (posts) => {
       if (!posts){
           return undefined;
       }
       let buttons = removeButtonListeners();
       let myMain = deleteChildElements(document.querySelector("main"));
       let fragment = await displayPosts(posts);
       let button = addButtonListeners();
       return [buttons, myMain, fragment, button];
   }
   
   // #19
   const selectMenuChangeEventHandler = async (e) => {
    if (!e) return undefined;
    try {
        const result = document.querySelector('.result')
        const userId = e?.target?.value || 1;
        let posts = await getUserPosts(userId);
        let refreshPostsArray = await refreshPosts(posts);
        return [userId, posts, refreshPostsArray];
    } catch (error) {
        console.error("An error occurred in selectMenuChangeEventHandler: ", error);
        return null;
    }
}

   
   // #20
   
   const initPage = async () => {
       try {
           let users = await getUsers();
           let select = populateSelectMenu(users);
           return [users, select];
       } catch (error) {
           console.error("An error occurred in initPage: ", error);
           return null;
       }
   }
   
   // # 21
   
   function initApp() {
       initPage().then(([users, select]) => {
           let selectMenu = document.getElementById("selectMenu");
           if (selectMenu) {
               selectMenu.appendChild(select);
               selectMenu.addEventListener("change", selectMenuChangeEventHandler, false);
           }
       });
   }
   
   document.addEventListener("DOMContentLoaded", initApp, false);